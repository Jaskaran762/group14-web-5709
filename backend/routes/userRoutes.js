const express = require('express');
const router = express.Router();
const { userLogin, userSignup } = require('./../controllers/userController');
const verifyToken = require('../middleware/auth');

router.post('/signup', userSignup);
router.post('/login', userLogin);


router.get('/profile', verifyToken, (req, res) => {
    res.json({ message: 'Profile route accessed successfully', user: req.user });
});

module.exports = router;
