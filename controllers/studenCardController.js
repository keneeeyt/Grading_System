const StudentCard = require('../models/studentCard');
const User = require('../models/userSchema');
const auth = require('../auth');


//Add card for students

module.exports.createCard = (req,res) => {
    let input = req.body;
    const userData = auth.decode(req.headers.authorization);

    if(userData.role !== 'teacher'){
        return res.send('You are not a teacher');
    }else {
        let newCard = new StudentCard({
            _id: input._id,
            firstGrading: input.firstGrading,
            secondGrading: input.secondGrading,
            thirdGrading: input.thirdGrading,
            fourthGrading: input.fourthGrading,
            finalGrading: input.finalGrading,
            remarks: input.remarks
        })
        newCard.save()
        .then(result => {
            User.findOne({_id: input._id})
            .then(result => {
                if(result === null){
                    return res.send('this is cannot be found!')
                }else {
                    result.card.push(newCard)

                    result.save()
                    .then(save => true)
                    .catch(err = false)
                }
            })
            return res.send({
                msg: 'card creaated successfully',
                card :{
                    ...newCard._doc
                }
            })
        })
        .catch(err => {
            return res.send(err)
        })
       
    }
}


// Get card by studentID 

module.exports.retreiveCard = (req,res) => {
    let input = req.body;
    const userData = auth.decode(req.headers.authorization)

    if(userData.role !== 'user'){
        return res.send('You are not allowed to do that!')
    } else {
        StudentCard.findOne({studentId: input._id})
        .then(result => {
            if(!result){
                return res.send('no card exists!')
            }else {
                return res.send(result)
            }
        }).catch(err => {
            return res.send(err)
        })
    }
}