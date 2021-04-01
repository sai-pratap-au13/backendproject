const mongoose = require('mongoose');
const Joi = require('joi');

const Schema = mongoose.Schema

const Carmodel = mongoose.model('Carmodel', new Schema({
  
    name:{
        type: String,
        required: true
    },
    make:{
        type:String,  
    },
    vehicle:{
        type:String,
    },
    model:{
      type:Number,
      required: true,
      minlenght: 1920,
      maxlength: 2050
    },
    fuelType:{
        type: [String],
        required: true
    },
    Capacity:{
        type:Number,
        required: true
    },
    inStock:{
        type:Number,
        required:true,
        default:0
    },
    dailyRentalRate:{
        type: Number,
        required:true
    },
    Description:{
        type: String,
        required:false
    },
    color:{
        type:[String],
        required: false
    },
    mileage:{
        type:[String],
        required: false
    },
    isOwned:{
        type: [Boolean],
        required: true
    },
    photos:{
        type:[String],
        required:false
    },

    ownerId:{
        type: Schema.Types.ObjectId,
        ref: 'Owner'
    },
    ownerName:{
        type:String,
        required:false
    },
    ownerEmail:{
        type:String,
        required:false
    },
    ownerNumber:{
        type:String,
        required:false
    },
    isAccepted:{
        type:Boolean,
        default:false
    },

    customerId:{
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    customerName:{
        type:String,
        required:false
    },
    customerEmail:{
        type:String,
        required:false
    },
    customerNumber:{
        type:String,
        required:false
    },
    customerAdhaar:{
        type:String,
        required:false
    },
    customerDrivingLicense:{
        type:String,
        required:false
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    
}));


//const Carmodel = mongoose.model('Carmodel', carmodelSchema);

// //Validation
// function validateCarmodel(carmodel){
//     const schema = {
//         name:Joi.string().required(),
//         makeId:Joi.string().required(),
//         vehicleId:Joi.string().required(),
//         model:Joi.number().min(1920).max(2050).required(),
//         fuelType:Joi.array().required(),
//         Capacity: Joi.number().min(1).max(52).required(),
//         inStock:Joi.number().min(0).max(100).required(),
//         dailyRentalRate:Joi.number().required(),
//         Description :Joi.string(),
//         color:Joi.array(),
//         mileage:Joi.array(),
//         isOwned:Joi.boolean().required(),
//         photos:Joi.array(),

//         ownerId:Joi.string(),
//         ownerEmail:Joi.string(),
//         ownerNumber:Joi.number(),
//         isAccepted:Joi.boolean(),

//         customerId:Joi.string(),
//         customerEmail:Joi.string(),
//         customerNumber:Joi.number(),
//         customerAdhaar:Joi.number(),
//         customerDrivingLicense:Joi.string(),
//         isBlocked:Joi.boolean(),
//     }
//     return Joi.validate(carmodel, schema)
// }

exports.Carmodel = Carmodel;
// exports.validate  = validateCarmodel
// exports.validateCarModel  = validateCarmodel