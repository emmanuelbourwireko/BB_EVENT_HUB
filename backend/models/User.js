const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add a username'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false // Do not return password by default
    },
    roles: {
        type: [String], // CORRECTED
        enum: ['user', 'organizer', 'admin'],
        default: ['user']
    }
}, {
    timestamps: true // REFINED
});

// Encrypt password using bcrypt before saving
UserSchema.pre('save', async function () {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) {
        return; // CORRECTED
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', UserSchema);