const {Carmodel} = require('../models/carmodel');
const {Owner} = require('../models/owner');
const {Customer} = require('../models/customer');
const Admin = require('../models/admin');

function noOfVehicleOnRentDecrement(totalPosted){
    return totalPosted -= 1
}

module.exports ={
    //--------------------Logout from the Account (only owner & customer)------------------------
    async logoutUser(req, res){
        try{
            console.log("OWNER:::::",req.owner)
            if(req.owner) {var schema = Owner; var user = req.onwer}
            if(req.Customer) {var schema = Customer ; var user = req.customer};
            if(req.admin) {var schema = admin ; var user = req.admin }
            console.log("18 SCHEMA::::::::::::::::::::::", schema)
            await schema.findOneAndUpdate({_id: req.owner._id}, {jwt: null })
            return res.status(202).send({message:"You are logged out"})
        } catch(error){
            console.log(error)
            return res.status(404).send({error:error.message})
        }
    },

    //--------------------Deleting the vehicle on rent by Owner------------------------

    async deletingVehicle(req, res){
    try{
        const destroyed = await Carmodel.findOneAndDelete({_id:req.params.vehicleId, isBlocked:false});
        if(!destroyed) return res.send({error:'vehicle doesnot existed or already deleted'})

        const ownerDetails = await Owner.findOne({_id:req.Owner._id})
        const totalPosted = noOfVehicleOnRentDecrement(ownerDetails.totalPosted)
        ownerDetails.totalPosted = totalPosted;
        ownerDetails.save()
        return res.status(202).send({message:"The Vehicle has been deleted successfully"})

    }catch(error){
        console.log(error)
        return res.status(404).send({error:error.message})
    }
}


}