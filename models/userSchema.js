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
    advisory: {
        type: String,
        default: ''
    },

    section: {
        type: Array,
        default:[]
    },
    student: {
        type: Array,
        default:[]
    },
    card: {
        type: Array,
        default: []
    },
    avatar: {
        type:String,
        default: 'https://res.cloudinary.com/dzosecp8f/image/upload/v1677940151/blank-profile-picture-g2b8faf720_1280_eks7er.png'
    },
    isArchive: {
        type:Boolean,
        default: false
    }
})

module.exports = mongoose.model('user', userSchema);