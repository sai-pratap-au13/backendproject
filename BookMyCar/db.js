const mongoose = require('mongoose');
const {MONGODB_URI} = process.env;


mongoose.connect(MONGODB_URI,{
    useUnifiedTopology : true,
    useNewUrlParser : true,
    useCreateIndex : true,
    useFindAndModify : false
})
.then(()=> console.log('---successfully connected to database '))
.catch( (err)=> console.log('unable to connect with db'))
