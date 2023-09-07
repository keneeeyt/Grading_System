const express = require('express');
const router = express.Router();
const studentCard = require('../controllers/studenCardController');
const auth = require('../auth');



//route for adding a card for student

router.post('/card/:id', auth.verify, studentCard.createCard)

//route for retreive card by studentID

router.get('/gradecard/:id', auth.verify, studentCard.retreiveCard)

//route for retreive all cards
router.get('/all-cards', auth.verify, studentCard.retrieveAllCard)

//delete subject from section schema
router.delete('/subject/:id', auth.verify, studentCard.deleteSubject)

// //delete subject from student schema
// router.put('/subject-stud/:id', auth.verify, studentCard.pullSub)
module.exports = router;