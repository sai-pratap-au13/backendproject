const {
    Carmodel
} = require('../models/carmodel')
const {
    Owner
} = require('../models/owner')
const {
    Customer
} = require('../models/customer');
const {
    Admin
} = require('../models/admin')

const jwt = require('jsonwebtoken');
const {
    hash,
    compare
} = require('bcrypt');
const Joi = require('@hapi/joi');
const {
    sendMailToUser,
    forgotPasswordMailing
} = require('../utils/nodemailer');
require('dotenv');

//---------function to increase vehicle on rent post-------------
// function noOfVehicleOnRentIncrement(totalPosted) {
//     return totalPosted += 1
// }

//---------------------modules to exports-------------------------
module.exports = {
    //_________________Posting vehicle on rent by owner_________________
    async vehicleOnRent(req, res) {
        try {
            const rentVehicle = await new Carmodel({
                ...req.body
            })
            console.log("Vehicle on rent", rentVehicle)

            console.log(26, "---", req.owner)
            //        rentVehicle.ownerId = req.owner._id;       
            //      rentVehicle.ownerEmail = req.owner.email;
            //    rentVehicle.ownerName = req.owner.name;
            console.log(29, "----------")
            const token = req.header('Authorization')
            const payload = await jwt.verify(token, process.env.SECRET)
            rentVehicle.ownerId =  payload._id
            rentVehicle.save();
            console.log(31, "-----Saving-----")

            const user = await Owner.findById(req.owner._id)
            console.log(user)
            console.log(35, "----------")

            // const totalPosted = noOfVehicleOnRentIncrement.findById(user.totalPosted);
            await Owner.findOneAndUpdate({
                id: req.owner._id,
                isBlocked: false
            }, { $inc : {
                totalPosted: 1
            }
            })
            console.log("---Your vehicle is on rent---")
            // console.log(40, "----------", totalPosted)

            res.status(202).send({
                message: "---Your vehicle is on rent---"
            })
        } catch (error) {
            return res.status(500).send(error.message)
        }
    },


    // _______________User Registration______________________________________
    async userRegister(req, res) {
        try {
            //------------Validating schema from body--------------
            const {
                name,
                email,
                password,
                contact,
                adhaarNumber,
                drivingLicense,
                age
            } = req.body
            const SchemaValidation = Joi.object({
                name: Joi.string().min(2).max(50).required(),
                email: Joi.string().min(2).max(50).required().email({
                    minDomainSegments: 2,
                    tlds: {
                        allow: ['com', 'net']
                    }
                }),
                password: Joi.string().min(2).max(50).required(),
                contact: Joi.number().min(0000000000).max(9999999999).required(),
                adhaarNumber: Joi.number().min(000000000000).max(999999999999).required(),
                drivingLicense: Joi.string().min(2).max(50).required(),
                age: Joi.number().min(18).max(50).required()
            })
            //--------------Result part-------------------------------
            const {
                error,
                result
            } = SchemaValidation.validate({
                name: name,
                email: email,
                password: password,
                contact: contact,
                adhaarNumber: adhaarNumber,
                drivingLicense: drivingLicense,
                age: age
            });
            if (error) return res.status(422).send({
                Error: error.message
            }) //in case of error in schema

            //------------------------------Searching user type------------------------------
            if (req.body.role == "Owner") {
                var schema = Owner;
                var userType = "Owner"
            }
            if (req.body.role == "Customer") {
                var schema = Customer;
                var userType = "Customer"
            }

            console.log(req.body.email)
            // //-------------Checking email--------------
            // const emailCheck = await schema.find({ email:req.body.email })
            // if(emailCheck) return res.send( { error: "Duplicate Email"});

            // //-------------Checking adhaar--------------
            // const adhaarNumberCheck = await schema.find({ adhaarNumber:req.body.adhaarNumber })
            // if(adhaarNumberCheck) return res.send( { error: "Duplicate Aadhaar Number"});

            //---------------------Authentication-------------------------------------
            const activationToken = await jwt.sign({
                id: Math.random()
            }, process.env.SECRET, {
                expiresIn: 1000 * 1000 * 6
            })
            const user = await schema({
                ...req.body
            });

            //    //---------------------Hashing password--------------------------------------
            const hashedPassword = await hash(req.body.password, 10);
            user.password = hashedPassword;
            user.activationToken = activationToken;
            user.save()

            // // _________________Sending mail_____________________________                
            sendMailToUser(`${userType}`, req.body.email, activationToken);
            res.status(202).send({
                message: `${userType} account registered successfully. Please visit your Email and activate the account by verifying the link sent to your EMail `
            })
            console.log(92, user)
        } catch (err) {
            return res.status(400).send(`error: ${err.message}`);
        }
    },

    //-------------------------LogIn--------------------------
    async userLogin(req, res) {
        try {
            var email = req.body.email;
            var password = req.body.password;
            //role must be provided in post
            if (!email || !password)
                return res.status(400).send({
                    error: "---Incorrect email or Password, try with correct one---"
                });

            //______________Defining Type of User_____________________
            if (req.body.role == "Owner") var schema = Owner;
            if (req.body.role == "Customer") var schema = Customer;
            if (req.body.role == "Admin") var schema = Admin;

            const user = await schema.findOne({
                email
            });
            if (!user) return res.status(400).send({
                error: "---Email is not found, Try again---"
            })
            //-----------hashing password to match-----------------
            const hashedPassword = await hash(req.body.password, 10);
            user.password = hashedPassword;
            //-------------looking at both password----------------
            // console.log("password", password);
            // console.log("user.database.password", user.password)

            //_____________isPassword matching_________________________
            const isMatched = await compare(password, user.password)
            if (!isMatched) return res.send({
                error: "---Incorrect password, have a look---"
            })
            //not verified--- make it happen on nodemailer   
            if (!user.isVerified) return res.status(401).send({
                error: '---You are not verified, Kindly activate your account by clicking on activation link on your Email id---'
            })
            if (user.isBlocked) return res.status(401).send({
                error: '-- You are blocked, Kindly contact to admin department---'
            });

            const token = await jwt.sign({
                _id: user._id
            }, process.env.SECRET, {
                expiresIn: 1000 * 1000 * 6
            })
            user.jwt = token;
            console.log(126, token)
            user.save()
            return res.status(202).send({
                jwt: token,
                user
            })

        } catch (err) {
            return res.status(500).send({
                err: err.message
            })
        }
    },

    //-----------------------Forgot password for sending OTP------------------------
    async resetPassword(req, res) {
        try {
            if (req.body.role == 'Owner') var schema = Owner;
            if (req.body.role == "Customer") var schema = Customer;
            if (!req.body.role) return res.send({
                error: "--=Incorrect credentials---"
            })
            const user = await schema.findOne({
                email: req.body.email,
                adhaarNumber: req.body.adhaarNumber
            })
            if (!user) return res.send({
                error: "---Incorrect creadential or Register again---"
            })
            if (user.isBlocked) return res.status(401).send({
                error: `${user.name}, You are blocked, ---for more details contact to rentmecar.com---`
            })
            user.password = await hash(req.body.newPassword, 10);
            console.log(req.body.newPassword);
            user.save();
            return res.status(202).send({
                message: `---Password Reset Successful: Your new password is (( ${req.body.newPassword} ))---`
            });
        } catch (err) {
            return res.status(500).send({
                error: err.message
            })
        }
    }

}