const {Carmodel} = require('../models/carmodel');
const {Owner} = require('../models/owner');
const {Customer} = require('../models/customer');
const {isAcceptedMailToOwner, isAcceptedMailToCustomer} = require('../utils/nodemailer');

const cloudinary = require('../utils/cloudinary')
const convertBufferToString = require('../utils/convertBufferToString');
const { hash } = require('bcrypt');

function noOfVehicleOnRentIncrement(totalPosted){
    return totalPosted += 1
}

module.exports = {
    //____________________________Updating vehicle by Owner__________________________
async updatingVehicle(req, res){
    try{
        await Carmodel.findOneAndUpdate({id:req.params.vehicleid, isAccepted:false}, {...req.body})
        return res.status(202).send({message:'Vehicle Updated Succesfully'})
    } catch(error){
        console.log(error);
        return res.status(500).send({error:error.message })
    }
},

    //____________________________Accepting of vehicle by Customer__________________________
async isAcceptedVehicle(req, res){
    try{
        const vehicleOne = await Carmodel.findOne({_id:req.params.vehicleid})
        if(vehicleOne.isAccepted) return res.send({message:"Job has been accepted"})

        const vehicle = await Carmodel.findOneAndUpdate({_id:req.params.jobid}, {isAccepted:true,
        customerId:req.customer._id, customerName: req.customer.name, customerContactNumber: req.customer.contact, customerAdhaar:req.customer.adhaarNumber}) 

        isAcceptedMailToOwner(vehicle.ownerEmail, vehicle.name, vehicle.createdAt, req.customer._id);
        isAcceptedMailToCustomer(req.customer.email, vehicle.title, vehicle.createdAt, vehicle.OwnerName);
        
        const customers = await Customer.findOne({_id:req.customer._id})
        const totalAccepted = noOfVehicleOnRentIncrement(customers.totalAccepted);
        customers.totalPosted = totalAccepted;
        customers.save()
        return res.status(202).send({message:"Vehicle in on rent"})
    }catch(error){
        console.log(error)
        return res.status(500).send({error:error.message})
    }
},


    //____________________________Uploading profile-picture Owner and Customer__________________________
async uploadProfilePicture(req, res){
    try{
        if(req.owner) {var schema = Owner; var user = req.owner}
        if(req.customer){ var schema = Customer; var user= req.customer }
        console.log(55, req.owner)
        const { originalname, buffer } = req.file
        let imageContent = convertBufferToString(originalname, buffer)
        let imageResponse = await cloudinary.uploader.upload(imageContent)
        await schema.findByIdAndUpdate(user._id, { profilePicture : imageResponse.secure_url})
        res.status(202).json({
            message: "Profile picture uploaded successfully... You are looking awesome.",
            url : imageResponse.secure_url
        })
    }catch(error){
        console.log(error)
        return res.status(500).send({error:error.message})
    }
},


 //____________________________Uploading multiple vehicle photos__________________________
 async uploadVehiclePhotos(req, res){
    try{
        var schema = Carmodel;
        let imageContent = convertBufferToString(req.file.originalName, req.file.buffer)
        let imageResponse = await cloudinary.uploader.upload(imageContent)
        await schema.findOneAndUpdate({_id:Carmodel._id}, {vehiclePhotos:imageResponse.secure_url})

        response.status(202).send({message:"Vehicle pictures uploaded successfully...."})
    }catch(error){
        console.log(error)
        return res.status(500).send({error:error.message})
    }
},



  //____________________________Editing profile of Owner and Customer__________________________
async editProfile(req, res){
    try{
        if(req.Owner) {var schema = Owner; user = req.Owner}
        if(req.Customer) {var schema = Customer; user = req.Customer }
        await schema.Update({_id: user._id }, { contactNumber: req.body.contactNumber, address: req.body.address })
        const User = await schema.findOne({_id:user._id})
        return res.status(202).send({message:"Profile Updated successfully",user:User})
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
},

// ---------------------------Changing Password (owner & customer------------------------------
async editPassword(req, res) {
    try {
        if (req.Owner) { var schema = Owner; user = req.Owner }
        if (req.Customer) { var schema = Customer; user = req.Customer }
        const hashedPassword = await hash(req.body.password, 10)
        console.log("hashed=", hashedPassword)
        console.log("user=", user)
        await schema.Update({_id: user._id}, { password: hashedPassword })
        return res.status(202).send({message:"Password changed successfully"})

    } catch (error) {
        return res.status(500).send({error:error.message})
    }
},

  //____________________________Blocking by Admin__________________________
async blocking(req, res){
    try{
        if(req.query.model === "Owner") var schema = Owner;
        else if(req.query.model == "Customer") var schema = Customer;
        else if(req.query.model == "Carmodel") var schema = Carmodel;
        else return res.send({message:"There is no valid route in Query..."})
        const update = await schema.findOneAndUpdate({_id:res.params.id, isBlocked:false}, {isBlocked:true});
        if(!update) return res.send({error:"This Vehicle is blocked already"});
        if(req.query.model === "Owner"){
            var schema = Carmodel;
            const obj = await schema.updateMany({OwnerId: req.params.id}, {isBlocked: true})
        }
        return res.status(202).send({message:"Blocked Successfully"})
    } catch(error){
        console.log(error)
        return res.status(500).send({error:error.message})
    }
}




}