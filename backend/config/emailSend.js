const nodemailer = require('nodemailer');

require('dotenv').config();


async function sendEmail(email, body){

    const transporter = nodemailer.createTransport({

        host: process.env.EMAIL_HOST,
        port: 587 ,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    })

    const info = await transporter.sendMail({
        from: 'Apna Bazar Ecommerce Website',
        to: email,
        subject: 'Thanks For Using the Apna Bazar',
        html: body
    })

    console.log('Email Sending information ', info);

}


module.exports =  sendEmail ;