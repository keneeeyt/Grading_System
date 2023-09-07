const mongoose = require('mongoose');

const sectionSchema = mongoose.Schema({
    sectionName: {
        type: String,
        required: true,
    },
    students: {
        type: Array,
        default:[]
    },
    grade: {
        type: String,
        required: true
    },
    update_time: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('section', sectionSchema);