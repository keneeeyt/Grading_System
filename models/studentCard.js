const mongoose = require('mongoose');

const studentCard = mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    firstGrading: {
        type:String,
        required: true
    },
    secondGrading: {
        type:String,
        required: true
    },
    thirdGrading: {
        type:String,
        required: true
    },
    fourthGrading: {
        type:String,
        required: true
    },
    finalGrading: {
        type:String,
        required: true
    },
    remarks: {
        type:String,
        required: true
    },
    average: {
        type:String,
        required: true
    }
})

module.exports = mongoose.model('studentcard', studentCard)