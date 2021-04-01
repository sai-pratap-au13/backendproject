const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const compression= require('compression');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const helmet= require('helmet')


// DataBase connection
dotenv.config();
require('./db')

//Midlleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(helmet());
app.use(compression());
const accessLogsStream = fs.createWriteStream(path.join(__dirname, 'access.log'),{flags:'a'})
app.use(morgan('combined',{stream: accessLogsStream }))


//MVC routes
app.get('/', (req, res)=> res.send({message:"this is API based web application"}))

app.use(require("./routes/postRoutes"));
app.use(require("./routes/getRoutes"));
app.use(require("./routes/deleteRoutes"))
app.use(require('./routes/updateRoutes'))


// Server setup 
const port = process.env.PORT || 2021;
app.listen(port, ()=> console.log(`Server is up and running : ${port}`));
