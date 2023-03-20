const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../auth');


// routes for add user
router.post('/adduser', userController.addUsers)

// route for authentication or login
router.post('/login', userController.login)

// route for retreive all teachers admin only
router.get('/teachers', auth.verify, userController.getAllUser)

//route for get profile

router.get('/details', auth.verify, userController.getProfile);


//get student to show card
router.get('/studentcard/:id', auth.verify, userController.getStudent);

router.delete('/delete/:id', auth.verify, userController.deleteUser)

module.exports = router;