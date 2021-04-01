const mongoose = require ('mongoose');
const Joi = require('joi');
const Schema =mongoose.Schema;

const customerSchema = new Schema({
    name:{
       type:String,
       required:true,
       minlenght: 2,
       maxlenght: 255 
    },
    email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      contact:{
        type:Number,
        required:true,
        unique:true,
        minlength:0000000001,
        maxlength:9999999999 
      },
      adhaarNumber:{
        type: String,
        required: true,
        unique: true,
        minlength:000000000001,
        maxlength:999999999999
      },
      drivingLicense:{
        type: String,
        required: true,
        unique: true
      },
      age:{
        type: Number,
        minlength:18,
        maxlength:55,
        required: true
      },
      gender:{
        type:String,
        required: false
      },
      address:{
        type:String,
        required:false
      },
      city:{
        type:String,
        required:false
      },
      state:{
        type:String,
        required:false
      },
      zipcode:{
        type:Number,
        required:false
      },
      role:{
        type:String,
        required: false
      },
      totalPosted:{
          type:String,
          required: false
        },
        jwt:{
          type:String,
          defualt: null
        },
        activationToken:{
          type:String
        },
      profilePicture:{
        type:String,
        required:false,
        default:null
      },
      isVerified:{
        type:Boolean,
        default:false
      },
      isBlocked:{
        type:Boolean,
        default:false
      }
}, {timestamps:true})


const Customer = mongoose.model('Customer', customerSchema);

//validation
// function validateCustomer(customer){
//     const schema={
//         name:Joi.string().min(2).max(255).required(),
//         email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().unique(),
//         password:Joi.string().min(6).max(255).required(),
//         contact:Joi.number().min(0000000001).max(9999999999).unique().required(),
//         adhaarNumber:Joi.number().min(000000000001).max(999999999999).unique().required(),
//         drivingLicense: Joi.string().min(6).max(255).unique().required(),
//         age:Joi.number().min(18).max(55).required(),
//         gender:Joi.string().required(),
//         address:Joi.string().required(),
//         city:Joi.string().required(),
//         state:Joi.string().required(),
//         zipcode:Joi.number().required(),
//         role:Joi.string().required(),
//         totalPosted:Joi.number().min(0).max(255).required(),
//         jwt:Joi.string(),
//         activationToken:Joi.string(),
//         profilePicture:Joi.string(),
//         isVerified:Joi.boolean(),
//         isBlocked:Joi.boolean()
    
//     }
//     return Joi.validate(customer, schema);
// };


exports.customerSchema = customerSchema;
exports.Customer = Customer;
// exports.validate= validateCustomer;
// exports.validatecustomer= validateCustomer;