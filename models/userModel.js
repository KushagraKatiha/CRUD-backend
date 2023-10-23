const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'User must have a name']
    },
    username:{
        type: String,
        required: [true, 'User must have a username'],
        unique: true,
        trim: true,
    },
    email:{
        type: String,
        required: [true, 'User must have an email'],
        unique: true,
        trim: true,
    },
    password:{
        type: String,
        required: [true, 'User must have a password']
    },
})

const User = mongoose.model('User', userSchema);