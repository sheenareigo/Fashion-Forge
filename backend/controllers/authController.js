const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.Register = async (req, res) => {
    try {
        const newUser = await User.create(req.body);

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
        console.error('Login error:', error);
        res.status(500).json({ status: 'failed', error: 'Internal server error' });
    }
};
