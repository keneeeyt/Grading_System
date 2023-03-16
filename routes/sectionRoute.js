const express = require('express');
const router = express.Router();
const sectionController = require('../controllers/sectionController');
const auth = require('../auth');

// routes for adding a student
router.post('/addstudent', auth.verify, sectionController.addStudent);

//routes for adding a section

router.post('/addsection', auth.verify, sectionController.addSection);


module.exports = router;