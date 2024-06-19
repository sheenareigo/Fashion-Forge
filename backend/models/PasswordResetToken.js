const mongoose = require('mongoose');

const passwordResetTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 3600 // Token expires in 1 hour
    }
});

module.exports = mongoose.model('PasswordResetToken', passwordResetTokenSchema);
