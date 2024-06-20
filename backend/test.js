const nodemailer = require('nodemailer');
require('dotenv').config();

// Configure nodemailer with your SMTP server settings
const transporter = nodemailer.createTransport({
    host: process.env.BREVO_SMTP_SERVER,
    port: process.env.BREVO_SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_PASSWORD
    },
    authMethod: 'PLAIN',
    connectionTimeout: 10 * 60 * 1000

});

// Test email details
const mailOptions = {
    from: 'fashionforgeservices@gmail.com',
    to: 'recipient@example.com', // Replace with your recipient email address
    subject: 'Test Email from Fashion Forge Services',
    text: 'This is a test email from Fashion Forge Services. If you received this, your SMTP server configuration is correct.'
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
    } else {
        console.log('Email sent successfully:', info.response);
    }
});
