const StudentCard = require('../models/studentCard');
const Section = require('../models/sectionSchema');
const User = require('../models/userSchema');
const auth = require('../auth');


//Add card for students

module.exports.createCard = async (req, res) => {
  try {
    const userData = auth.decode(req.headers.authorization);
    const id = req.params.id;

    if (userData.role !== 'teacher') {
      return res.status(403).send('You are not a teacher');
    }

    const {
      subject,
      firstGrading,
      secondGrading,
      thirdGrading,
      fourthGrading,
      average
    } = req.body;

    // Ensure all grading values are valid numbers
    const grades = [
      parseFloat(firstGrading),
      parseFloat(secondGrading),
      parseFloat(thirdGrading),
      parseFloat(fourthGrading)
    ];

    if (grades.some(isNaN)) {
      return res.status(400).send('Invalid grading values');
    }

    // Calculate finalGrade
    const finalGrade = grades.reduce((sum, grade) => sum + grade, 0) / grades.length;

    // Determine remarks
    const remarksResult = finalGrade >= 75 ? 'PASSED' : 'FAILED';

    // Create the card object
    const card = {
      subject,
      firstGrading,
      secondGrading,
      thirdGrading,
      fourthGrading,
      finalGrading: finalGrade.toString(),
      remarks: remarksResult,
      average
    };

    // Find the student card by studentId
    const existingCard = await StudentCard.findOne({ studentId: id });

    if (!existingCard) {
      // Create a new card if it doesn't exist
      const newCard = new StudentCard({
        studentId: id,
        card: [card]
      });

      await newCard.save();

      return res.status(201).send({
        msg: 'Card created successfully',
        card: { ...newCard._doc }
      });
    } else {
      // Update the existing card
      existingCard.card.push(card);
      const updatedCard = await existingCard.save();

      return res.status(200).send({
        msg: 'Card updated successfully',
        card: { ...updatedCard._doc }
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};

// Get card by studentID 

module.exports.retreiveCard = (req,res) => {
    let id = req.params.id;
    const userData = auth.decode(req.headers.authorization)

    if(userData.role !== 'user'){
        return res.send('You are not allowed to do that!')
    } else {
        StudentCard.find({studentId: id})
        .then(result => {
            if(!result){
                return res.send('no card exists!')
            }else {
                console.log(result)
                return res.send(result)
            }
        }).catch(err => {
            return res.send(err)
        })
    }
}

module.exports.retrieveAllCard = async (req, res) => {
    try {
      const userData = auth.decode(req.headers.authorization);
  
      if (!userData) {
        return res.status(401).json({ message: 'Token is required!' });
      }
  
      const result = await StudentCard.find({});
  
      if (!result || result.length === 0) {
        return res.status(404).json({ message: 'No cards exist!' });
      }
  
      console.log(result);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
  };
  
  


//DELETE STUDENT CARD

module.exports.deleteSubject = (req,res) => {
    let id = req.params.id
    const userData = auth.decode(req.headers.authorization)
    if(userData.role === 'teacher'){
    StudentCard.findOneAndDelete({_id: id})
    .then(result =>{
        StudentCard.findOneAndUpdate({studentId: id},{
            $pull : {
                card: result
            }
        },{new: true})
        console.log(result)

        res.send(true)
    })
    .catch(error =>{
        return res.send(false)
    })
    }else{
        res.send(false)
    }
}

//DELETE SUBJECT CARD FROM STUDENT USER

// module.exports.pullSub = (req,res) => {
//     let id = req.params.id
//     const userData = auth.decode(req.headers.authorization)
//     if(userData.role === 'teacher'){
//         User.findByIdAndUpdate({_id: id}, {
//             $pull : {
//                 card: result
//             }
//         },{new: true})
//         .then(data => {
//             console.log(data)
//         })
//         .catch(err => {
//             return res.send(err)
//         })
//     }
// }