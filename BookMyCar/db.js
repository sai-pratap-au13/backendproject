const mongoose = require('mongoose');
const {MONGODB_URI} = process.env || "mongodb+srv://saipratap_609:mongo123@cluster0.ngq4z.mongodb.net/cabBooking?retryWrites=true&w=majority";


mongoose.connect(MONGODB_URI,{
    useUnifiedTopology : true,
    useNewUrlParser : true,
    useCreateIndex : true,
    useFindAndModify : false
})
.then(()=> console.log('---successfully connected to database '))
.catch( (err)=> console.log('unable to connect with db'))
