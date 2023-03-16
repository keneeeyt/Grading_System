const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName : {
        type: String,
        required: true,
    },
    lastName : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user'
    },

    section: {
        type: Array,
        default: []
    },
    card: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model('user', userSchema);