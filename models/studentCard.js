const mongoose = require('mongoose');

const studentCard = mongoose.Schema({
    studentId: {
        type: mongoose.Types.ObjectId, ref:'user'
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
})

module.exports = mongoose.model('studentcard', studentCard)