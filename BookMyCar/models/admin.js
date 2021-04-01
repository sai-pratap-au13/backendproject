const mongoose = require ('mongoose');
const Joi = require('joi');
const Schema =mongoose.Schema;
const adminSchema = new Schema({
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
      jwt:{
        type: String,
        required: false
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
})
const Admin = mongoose.model('Admin', adminSchema);

// //validation
// function validateAdmin(admin){
//     const schema={
//         name:Joi.string().min(2).max(255).required(),
//         email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().required(),
//         password:Joi.string().min(6).max(255).required(),
//         jwt:Joi.string(),
//         profilePicture:Joi.string().required(),
//         isVerified:Joi.boolean(),
//         isBlocked:Joi.boolean()
    
//     }
//     return Joi.validate(admin, schema);
// };


exports.adminSchema = adminSchema;
exports.Admin = Admin;
// exports.validate= validateAdmin;
// exports.validateadmin= validateAdmin;