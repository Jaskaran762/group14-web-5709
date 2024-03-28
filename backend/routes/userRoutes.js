const express = require('express');
const router = express.Router();
const { userLogin, userSignup } = require('./../controllers/userController');
const userAuth = require('../middleware/auth');

router.post('/signup', userSignup);
router.post('/login', userLogin);

module.exports = router;
