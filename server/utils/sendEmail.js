const nodemailer = require('nodemailer')

const sendEmail = async (options)=>{
    var transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const mailOptions ={
        from: process.env.EMAIL_USER,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html
    }

    await transport.sendMail(mailOptions);
}

module.exports = sendEmail;