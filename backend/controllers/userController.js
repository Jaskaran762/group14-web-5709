const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const dotenv = require("dotenv");
dotenv.config();

const userSignup = async (req, res) => {
    const { firstName, lastName, email, contactNo, password } = req.body;
    const { dateOfBirth, income } = "";

    try {

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            firstName,
            lastName,
            email,
            contactNo,
            password: hashedPassword,
            contactNo,
            dateOfBirth,
            income
        });

        await user.save();

        jwt.sign({
            userId: user.id
        }, process.env.JWT_ACCESS_KEY,
        { 
            expiresIn: '40h' 
        }, (err) => {
            if (err) throw err;
            res.status(200).json({ message: 'Signup successful' });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        console.log(process.env.JWT_ACCESS_KEY)
        jwt.sign( {userId: user.id}, process.env.JWT_ACCESS_KEY, { expiresIn: '40h' }, (err, token) => {
            if (err) throw err;
            res.status(200).json({
                message: "login successful",
                id: user.id,
                token
            });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User with this email not found' });
        }
        res.status(200).json({ user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


module.exports = {
    userSignup,
    userLogin,
    getUserProfile
};
