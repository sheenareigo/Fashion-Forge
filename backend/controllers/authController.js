const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const PasswordResetToken = require('../models/PasswordResetToken'); 

//configure the nodemailer
const transporter = nodemailer.createTransport({
    host: process.env.BREVO_SMTP_SERVER,
    port: process.env.BREVO_SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_PASSWORD
    }
});



exports.Register = async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        const mailOptions = {
            from: 'fashionforgeservices@gmail.com',
            to: newUser.email, // Assuming newUser contains the registered user's email
            subject: 'Welcome to Fashion Forge Services!',
            text: 'Thank you for registering with us.\n\nUse the coupon code "FF20" to get 20% discount on all products.\n\nCoupon is valid for only seven days from the date of registration.'
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.error('Email sending error:', error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(201).json({
            newUser
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.Login = async (req, res) => {
    try {
    const { email, password } = req.body;
    if (!email || !password) {
    return res.status(400).json({ status: 'failed', error: 'Email and password are required' });
    }
    // Find user by email
    const user = await User.findOne({ email }).exec();
    if (!user) {
    return res.status(401).json({ status: 'failed', error: 'Wrong email or password' });
    }
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
    return res.status(401).json({ status: 'failed', error: 'Wrong email or password' });
    }
    // Successful login
    res.status(200).json({ currentUser: user });
    
    } catch (error) {
    res.status(500).json({ status: 'failed', error: 'Internal server error' });
    }
    };

    exports.VerifyEmail = async (req, res) => {
        try {
        const { email } = req.body;
        if (!email) {
        return res.status(400).json({ status: 'failed', error: 'Email is required' });
        }
        // Find user by email
        const user = await User.findOne({ email }).exec();
        if (!user) {
        return res.status(401).json({ status: 'failed', error: 'Email is not registered' });
        }
        if (user) {
        return res.status(200).json({ status: 'success', error: 'Email is  registered' });
        }
        res.status(200).json({ currentUser: user });
        
        } catch (error) {
        console.error('Verify email error:', error);
        res.status(500).json({ status: 'failed', error: 'Internal server error' });
        }
        };

exports.requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ status: 'failed', error: 'Email is required' });
            }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ status: 'failed', message: 'Email not registered' });
        }

        const token = crypto.randomBytes(20).toString('hex');
        await PasswordResetToken.create({
            userId: user._id,
            token: token
        });

        const resetUrl = `${process.env.FRONTEND_BASE_URL}/reset-password/${token}`;
        const mailOptions = {
            from: 'fashionforgeservices@gmail.com',
            to: user.email,
            subject: 'Password Reset Request',
            text: `You requested a password reset. Please click the following link to reset your password:\n\n${resetUrl}`
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ status: 'success', message: 'Password reset email sent' });
    } catch (error) {
        return res.status(400).json({ status: 'failed', message: 'Email not registered' });
    }
};

exports.resetPassword = async (req, res) => {
try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const passwordResetToken = await PasswordResetToken.findOne({ token });
    if (!passwordResetToken) {
        return res.status(400).json({ status: 'failed', message: 'Invalid or expired token' });
    }

    const user = await User.findById(passwordResetToken.userId);
    if (!user) {
        return res.status(400).json({ status: 'failed', message: 'Invalid or expired token' });
    }
    
    user.password = newPassword;
    await user.save();

    await PasswordResetToken.findByIdAndDelete(passwordResetToken._id);

    res.status(200).json({ status: 'success', message: 'Password reset successfully' });
} catch (error) {
    res.status(500).json({ status: 'failed', error: error.message });
}
};
