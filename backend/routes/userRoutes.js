const express = require('express');
const router = express.Router();
const { userLogin, userSignup, getUserProfile } = require('./../controllers/userController');
const userAuth = require('../middleware/auth')

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.get('/user/:id', userAuth, getUserProfile);

module.exports = router;
