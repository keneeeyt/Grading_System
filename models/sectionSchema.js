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
    }
})

module.exports = mongoose.model('section', sectionSchema);