const {Carmodel} = require('../models/carmodel');
const {Owner} = require('../models/owner');
const  {Customer} = require('../models/customer');
const jwt = require('jsonwebtoken');
const { isFunction } = require('lodash');

module.exports={
//____________________________Searching of the availabe Vehicles for rent__________________________
async allAvailableVehicles(req, res){
    try{
        const vehicles = await Carmodel.find({isAccepted: false, isBlocked: false})
                         .skip(((req.params.pagenumber)-1 )* 10)
                         .limit(10)
                         .sort({createdAt:-1});
                         const count = await Carmodel.find({isAccepted:false, isBlocked:false})
                         .countDocuments({});
                         return res.status(200).json({count,vehicles})
                         
    }catch(error){
        console.log(error)
        return res.status(500).send({error:error.message})
    }
},

//____________________________Searching of the vehicle with vehicleId__________________________

async vehicleById(req, res){
    try{
        const vehicle = await Carmodel.find({isAccepted: false, isBlocked:false})
        console.log(this.vehicle)
        return res.status(200).json({vehicle})

    } catch(error){
        console.log(error)
        return res.status(500).send({error:error.message})
    }
},

//____________________________Filtering the available vehicle for rent________________________

async filterVehicles (req, res){
    try{
            //-------if query is empty-----
        if(!req.query) res.return({erroror:"Please enter a definition query"})
            //-------Filter by name------
        if(req.query.name){
            var vehicles = await Carmodel.find({isAccepted:false, name:req.query.name, isBlocked:false})
            .skip(((req.params.pagenumber)-1) *10)
            .limit(10)
            .sort({ createdAt: -1 });
            const count = await Carmodel.find({isAccepted:false, name:req.query.name, isBlocked:false})
            .countDocuments({});
            return res.status(200).json({count, vehicles})
            }

               //-------Filter by city------
        if(req.query.city){
            var vehicles = await Carmodel.find({isAccepted:false, city:req.query.city, isBlocked:false})
            .skip(((req.params.pagenumber)-1) *10)
            .limit(10)
            .sort({ createdAt: -1 });
            const count = await Carmodel.find({isAccepted:false, city:req.query.city, isBlocked:false})
            .countDocuments({});
            return res.status(200).json({count, vehicles})
            }
        
               //-------Filter by zipcode------
        if(req.query.zipcode){
            var vehicles = await Carmodel.find({isAccepted:false, zipcode:req.query.zipcode, isBlocked:false})
            .skip(((req.params.pagenumber)-1) *10)
            .limit(10)
            .sort({ createdAt: -1 });
            const count = await Carmodel.find({isAccepted:false, zipcode:req.query.zipcode, isBlocked:false})
            .countDocuments({});
            return res.status(200).json({count, vehicles})
        }
        
            //-------Filter by fuelType------
        if(req.query.fuelType){
            var vehicles = await Carmodel.find({isAccepted:false, fuelType:req.query.fuelType, isBlocked:false})
            .skip(((req.params.pagenumber)-1) *10)
            .limit(10)
            .sort({ createdAt: -1 });
            const count = await Carmodel.find({isAccepted:false, fuelType:req.query.fuelType, isBlocked:false})
            .countDocuments({});
            return res.status(200).json({count, vehicles})
        }

           //-------Filter by make------
           //-------attention here------------
        if(req.query.make){
                var vehicles = await Carmodel.find({isAccepted:false, make:req.query.make, isBlocked:false})
                .skip(((req.params.pagenumber)-1) *10)
                .limit(10)
                .sort({ createdAt: -1 });
                const count = await Carmodel.find({isAccepted:false, make:req.query.make, isBlocked:false})
                .countDocuments({});
                return res.status(200).json({count, vehicles})
            }
    
           //-------Filter by vehicle------
           //-------attention here------------
           if(req.query.vehicle){
            var vehicles = await Carmodel.find({isAccepted:false, vehicle:req.query.vehicle, isBlocked:false})
            .skip(((req.params.pagenumber)-1) *10)
            .limit(10)
            .sort({ createdAt: -1 });
            const count = await Carmodel.find({isAccepted:false, vehicle:req.query.vehicle, isBlocked:false})
            .countDocuments({});
            return res.status(200).json({count, vehicles})
        }    

        //-------Filter by Color------------
        if(req.query.color){
            var vehicles = await Carmodel.find({isAccepted:false, color:req.query.color, isBlocked:false})
            .skip(((req.params.pagenumber)-1) *10)
            .limit(10)
            .sort({ createdAt: -1 });
            const count = await Carmodel.find({isAccepted:false, color:req.query.color, isBlocked:false})
            .countDocuments({});
            return res.status(200).json({count, vehicles})
        }    
    
        } catch(error){
            console.log(error)
        return res.status(500).send({error:error.message})
    }
},

//_______________________________Accepted vehicle on rent by Customers__________________________________________
async vehileOnRentAcceptedByParticularCustomer(req, res){
    try{
        const vehicle = await Carmodel.find({customerId:req.Customer._id, isBlocked:false})
        .skip(((req.params.pagenumber) -1) *10)
        .limit(10)
        .sort({createdAt: -1});

        const count = await Carmodel.find({customerId: req.Customer._id, isBlocked:false})
        .countDocuments({});
        console.log({customerId : req.Customer._id, isBlocked:false})
        return res.status(200).send({count, vehicle:vehicle})
    }catch(error){
        console.log(error)
        return res.status(500).send({error:error.message})
    }
},

//_______________________________Viewing Accepted vehicle on rent by Owners__________________________________________
async vehileOnRentByParticularOwner(req, res){
    try{
        const vehicle = await Carmodel.find({ownerId:req.Owner._id, isBlocked:false})
        .skip(((req.params.pagenumber) -1) *10)
        .limit(10)
        .sort({createdAt: -1});

        const count = await Carmodel.find({ownerId: req.Owner._id, isBlocked:false})
        .countDocuments({});
        console.log({ownerId : req.Owner._id, isBlocked:false})
        return res.status(200).send({count, vehicle:vehicle})
    }catch(error){
        console.log(error)
        return res.status(500).send({error:error.message})
    }
},

//_______________________________Account Activation (Owner & Customer)__________________________________________
async accountActivation(req, res){
    try{
        if(!req.query.user) throw new Error("Invalid route")
        
        else if( req.query.user === "Owner") var schema = Owner
        else if (req.query.user === "Customer") var schema = Customer
        else throw new Error("Invalid route")
        if(!req.params.activationtoken) return res.status(401)
        const payload = await jwt.verify(req.params.activationtoken, process.env.SECRET);

        if(payload){
            const updated = await schema.findOneAndUpdate({activationToken: req.params.activationtoken}, {isVerified: true, activationToken: null})
            if(updated) return res.status(202).send({message:"Account activated Successfully. Please visit carbooking and Login"});
            return res.send({message:"Account already activated. Visit rentmecar website to login into your Account"})
        }
        return res.send({error:"Invalid Token"})
    }
     catch(error){
        console.log(error,"-----------Error--------")
        return res.status(500).send({error:error.message})
    }
},

//_______________________________Admin routes__________________________________________
            //_______________________________All vehicle__________________________________________
async allAvailableVehicleIncludingBlocked(req, res){
    try{
            const vehicles = await Carmodel.find({ isAccepted:false })
            .skip(((req.params.pagenumber) -1) *10)
            .limit(10)
            .sort({createdAt: -1});
            const count = await Carmodel.find({isAccepted : false})
            .countDocuments({});
            return res.status(200).json({count, vehicles})
    } catch(error){
        console.log(error)
        return res.status(500).send({error:error.message})
    }
},

    //_______________________________All accepted vehicle__________________________________________
async allAcceptedVehicle(req, res){
    try{
       const vehicles = await Carmodel.find({ isAccepted:true })
            .skip(((req.params.pagenumber) -1) *10)
            .limit(10)
            .sort({createdAt: -1});
  
            const count = await Carmodel.find({isAccepted : true})
                .countDocuments({});
                    return res.status(200).json({count, vehicles})
        } catch(error){
            console.log(error)
            return res.status(500).send({error:error.message})
            }
        },
            

            //_______________________________All Owners list__________________________________________
async allOwners(req, res){
    try{
            const owners = await Owner.find({ isVerified:true })
            .skip(((req.params.pagenumber) -1) *10)
            .limit(10)
            .sort({createdAt: -1});
            const count = await Owner.find({ })
            .countDocuments({});
            return res.status(200).json({count, owners})
    } catch(error){
        console.log(error)
        return res.status(500).send({error:error.message})
    }
},

        //_______________________________All Customers list__________________________________________
async allCustomers(req, res){
    try{
        const customers = await Customer.find({ isVerified:true })
            .skip(((req.params.pagenumber) -1) *10)
            .limit(10)
            .sort({createdAt: -1});
 
            const count = await Customer.find({ })
                .countDocuments({});
                    return res.status(200).json({count, customers})
        } catch(error){
            console.log(error)
                return res.status(500).send({error:error.message})
            }
       },


}