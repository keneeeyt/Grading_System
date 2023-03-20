const express = require('express');
const router = express.Router();
const studentCard = require('../controllers/studenCardController');
const auth = require('../auth');



//route for adding a card for student

router.post('/card/:id', auth.verify, studentCard.createCard)

//route for retreive card by studentID

router.get('/gradecard/:id', auth.verify, studentCard.retreiveCard)
module.exports = router;