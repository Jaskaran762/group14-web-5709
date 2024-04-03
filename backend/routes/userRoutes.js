const express = require('express');
const router = express.Router();
const { userLogin, userSignup, getUserProfile, updateUserProfile } = require('./../controllers/userController');
const userAuth = require('../middleware/auth')

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.get('/user/:id', userAuth, getUserProfile);
router.put('/user/update/:id',  userAuth, updateUserProfile);

module.exports = router;
