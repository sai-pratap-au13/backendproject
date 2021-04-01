const nodemailer = require('nodemailer');
const dotenv = require('dotenv')
//const smtpTransport = require('nodemailer-smtp-transport');
dotenv.config();

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
   port: 465,
   secure: true,
    // port: 587,
    // secure: false,
    auth: {
        //type: 'OAuth2',
        user: process.env.GMAIL,
        pass: process.env.PASSWORD
        
    }
})
//console.log("Transport is here", transport)

transport.verify().then((res) => console.log(res))

//----------------sendMailToUser----------------------
function sendMailToUser(user, email, activationToken){
    transport.sendMail({
        from:process.env.GMAIL,
        to: email,
        subject: 'Email verification required for authenticating your Registration on rentMeCar.com',
        html: `Click on this link to activate your account on <b>Rent Me Car</b> 
        <a href="http://localhost:2021/api/accountactivation/${activationToken}?user=${user}" > link here </a>`,
   
})
    .then((response)=> {
        console.log(response);
    }).catch((err)=>{
        console.log(err.message)
    })
    // console.log(3)
}

// -------------isAcceptedMailToOwner-----------
function isAcceptedMailToOwner( emailOwner, name, postedOn, customerName){
    transport.sendMail({
        from:process.env.GMAIL,
        to: emailOwner,
        subject:`Congratulations your vehicle is going on rent`,
        html: `Your got your vehicle - ${name} posted on ${postedOn} has got new customer ${Customer} Please visit your profile to view the additonal details of the Customer.
        Stay-Connected & Get-helped`,

    }) .then((response) => {
        console.log(response);
    }) .catch((err) => console.log(err.message))
}



// ----------------isAccepterMailToCustomer---------------------
function isAcceptedMailToCustomer( emailCustomer, name, postedOn, OwnerName){
    transport.sendMail({
        from:process.env.GMAIL,
        to: emailCustomer,
        subject:`Congratulations you got your vehicle`,
        html: `You got your vehicle - ${name} posted on ${postedOn} by ${owner}.  We believe you will enjoy your ride. Please visit your profile to view the additonal details of the Vehicle.
        Stay-Connected & Get-helped` 

    }) .then((response) => {
        console.log(response);
    }) .catch((err) => console.log(err.message))
}

// ----------------Forgotpassword-----------------------------------
function forgotPasswordMailing(email, password){
    transport.sendMail({
        from: process.env.GMAIL,
        to: email,
        subject:`System generated password to login into RentMeCar.com `,
        html: `<p> This password is system generated to login into your account on <b>RentMeCar.com</b>. Please Login with this password and change your password in profile section if needed.</p>
        <h3>Password: ${password}`
    }).then((response) => {
        console.log(response);
    }).catch((err) => console.log(err.message))
}


module.exports = {sendMailToUser,isAcceptedMailToOwner, isAcceptedMailToCustomer, forgotPasswordMailing};