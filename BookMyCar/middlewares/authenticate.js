const {Owner} = require('../models/owner')
const {Customer} = require('../models/customer');
const {Admin}= require('../models/admin')

const jwt = require('jsonwebtoken');

module.exports= {
    //____________Authenticate Owner_____________________
    async authenticateOwnersToken(req, res, next){
        try{
            const token = req.header('Authorization')
            console.log(12, token)
            if(!token) return res.sendStatus(401)

            const payload = await jwt.verify(token, process.env.SECRET)
console.log(15,'---Authentication payload---------')
            console.log("payload", payload)
            if (!payload._id){
                return res.sendStatus(403)
            }
            //const owner = await Owner.findById(payload._id)
            // const owner = await Owner.findById(payload._id)
            const owner = await Owner.findById(payload)
console.log(25,'------------', owner)
            if(owner.isBlocked) return res.status(401).send(`${owner.name}, You are blocked contact to admin`)
            if(!owner) return res.sendStatus(401)
            req.owner = owner
            console.log(owner)

            next()
        }
        catch(err){
            console.log(err)
            res.sendStatus(500);
        }
    },

//____________Authenticate cusotmer_____________________
    async authenticateCustomerToken(req, res, next){
        try{
            const token = req.header('Authorization')
            console.log(token)
            if(!token) return res.sendStatus(401)
            const payload = await jwt.verify(token, process.env.SECRET)
            console.log("payload", payload)
            if (!payload._id){
                return res.sendStatus(403)
            }
            const customer = await Customer.findOne({_id:payload._id, jwt: token})
            if(customer.isBlocked) return res.status(401).send(`${customer.name}, You are blocked contact to admin`)
            if(!customer) return res.sendStatus(401)

            req.customer = customer
            console.log(customer)
            next()
        
        
        }
        catch(err){
            console.log(err)
            res.sendStatus(500);
        }
    },

    //____________Authenticate Admin_____________________
    async authenticateAdminToken(req, res, next){
        try{
            const token = req.header('Authorization')
            console.log(token)
            if(!token) return res.sendStatus(401)
            const payload = await jwt.verify(token, process.env.SECRET)
            console.log("payload", payload)
            if (!payload._id){
                return res.sendStatus(403)
            }
            const admin = await Admin.findOne({_id:payload._id, jwt: token})
            if(admin.isBlocked) return res.status(401).send(`${admin.name}, You are blocked contact to admin`)
            if(!admin) return res.sendStatus(401)

            req.admin = admin
            console.log(admin)
            next()
        
        
        }
        catch(err){
            console.log(err)
            res.sendStatus(500);
        }
    }






}