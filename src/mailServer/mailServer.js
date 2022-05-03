const nodemailer = require('nodemailer');
const mailServer = (mail,verifyToken='') => {
    const url = 'http://localhost:3000/account/verify/';
    console.log(url);
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });
    
    let mailOptions = {
        from: 'phuvinh.job.277@gmail.com',
        to: `${mail}`,
        subject: 'VERIFY YOUR ACCOUNT IN AWARE SHOP',
        html: `
        <div style="margin: 0 auto; width: 500px; height: 300px;
        background: linear-gradient(0deg, #fad961cc 0%, #f76b1cdd 100%);
        border-radius: 15px; text-align: center;
                 ">
                 <h1 style="color: white; padding-top: 50px">aware@</h1>
                 <button style="font-size: 18px;
       position: relative;
       padding: 0.8em 1.5em;
       border: none;
       color: white;
       transition: 0.2s;
       text-decoration: none;
       border: white solid 1px;
       text-transform: uppercase;
       letter-spacing: 1px;
                           
     background: #b22234"><a href="${url+verifyToken}" style="color: white; text-decoration: none">Click to verify your email</a></button>
       <h5>If the above link does not work, copy and paste this URL into your browser: </h5>
       <h5><a href="${url+verifyToken}">Click Here</a></h5>
             </div>
    
    
        `
    };
    
    transporter.sendMail(mailOptions,(err,data)=>{
        if(err){
            console.log("error occurs",err);
        }else{
            console.log('email send!');
        }
    });
}
module.exports = mailServer;