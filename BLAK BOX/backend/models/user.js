const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    lastName: { 
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    userType: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer'
    },
    phoneNumber: {
        type: String,
        match: [/^\+?[0-9]{7,14}$/, 'Please enter a valid phone number']
    },
}, {
  collection: 'user'
});

module.exports = mongoose.model('User', userSchema, 'user');