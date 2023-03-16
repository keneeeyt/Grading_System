const mongoose = require('mongoose');

const sectionSchema = mongoose.Schema({
    sectionName: {
        type: String,
        required: true,
    },
    students: [{
        type: mongoose.Types.ObjectId, ref: 'user'
    }],
    grade: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('section', sectionSchema);