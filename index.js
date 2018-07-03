const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors');

//app.use(cors());

app.use(cors({
  origin: 'http://localhost:3333',
  credentials: true
}));

  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
// allow-cors
// app.use(function(req,res,next){
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   })
app.get('/',(req,res)=>{

        res.send('Hello from Backend');


})
app.post('/api/form',(req,res)=>{

        console.log(req.body);
        console.log(123);
        const output = `
    <p> You have a new Volunteer Request</p>
        <h3> Contact Details </h3>
        <ul>
            <li> Name : ${req.body.name}</li>
            <li> Interest : ${req.body.interest}</li>
            <li> Email : ${req.body.email}</li>
            <li> Email : ${req.body.phone}</li>
            <li> Email : ${req.body.message}</li>
        </ul>
    `;

     // create reusable transporter object using the default SMTP transport
     let transporter = nodemailer.createTransport({

        //host: 'smtp.ethereal.email',
         host: 'mail.google.com',
         service : 'gmail',
         port: 587,
         secure: false, // true for 465, false for other ports
         auth: {
             user: 'mythilmeshram@gmail.com', // generated ethereal user
             pass: 'toxicmetal@2013' // generated ethereal password
             //
         }

     });

     // setup email data with unicode symbols
    let mailOptions = {
        from: '"Mithilesh" <mythilmeshram@gmail.com>', // sender address
        to: 'mithilesh.tarkar@gmail.com', // list of receivers
        subject: 'Teach for India - Volunteer Request', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

     // send mail with defined transport object
     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
      // res.send('Hello');
    res.send('contact',{msg:'Email has been sent.'});


})

const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{

    console.log('Server listening on port ${PORT}');

});