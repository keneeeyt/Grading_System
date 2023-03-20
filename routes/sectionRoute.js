const express = require('express');
const router = express.Router();
const sectionController = require('../controllers/sectionController');
const auth = require('../auth');

// routes for adding a student
router.post('/addstudent', auth.verify, sectionController.addStudent);

//routes for adding a section

router.post('/addsection/:id', auth.verify, sectionController.addSection);


//routes for get single section
router.get('/studsection/:id', auth.verify, sectionController.getSingleSection);


//route for get all section
router.get('/sections', auth.verify, sectionController.getSection);

//route for delete section

router.delete('/deletesection/:id', auth.verify, sectionController.deleteSection);

module.exports = router;