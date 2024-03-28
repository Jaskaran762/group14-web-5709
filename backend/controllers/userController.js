const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


const userSignup = async (req, res) => {
    console.log("Received signup request:", req.body);
    const { firstName, lastName, email, contactNo, password } = req.body;
    const { dateOfBirth, income } = "";
    console.log("firstName:", firstName);
        console.log("lastName:", lastName);
        console.log("email:", email);
        console.log("contactNo:", contactNo);
        console.log("password:", password);

    try {

        let user = await User.findOne({ email });
        console.log("req.body: ", req.body);
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
            id: user.id
        }, 'userAccessKey',
        { 
            expiresIn: '40h' 
        }, (err) => {
            if (err) throw err;
            res.json({ message: 'Signup successful' });
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


        jwt.sign( {id: user.id}, 'userAccessKey', { expiresIn: '40h' }, (err, token) => {
            if (err) throw err;
            res.json({
                message: "login successful",
                token
            });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    userSignup,
    userLogin
};
