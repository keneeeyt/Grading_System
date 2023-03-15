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


module.exports = router;