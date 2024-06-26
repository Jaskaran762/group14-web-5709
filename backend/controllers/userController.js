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
        // Check if the user is subscribed and the subscription end date is after the current date
        console.log("user controller user.isSubscribed", user.isSubscribed);
        if (user.isSubscribed) {
            const subscriptionEndDate = moment(user.subscriptionEndDate);
            const currentDate = moment();
            console.log("subscriptionEndDate userController", subscriptionEndDate)
            console.log("currentDate userController", currentDate)
            console.log("subscriptionEndDate.isAfter(currentDate) userController", subscriptionEndDate.isAfter(currentDate))
            if (!subscriptionEndDate.isAfter(currentDate)) {
                // If the subscription end date is not after the current date, set isSubscribed to false
                user.isSubscribed = false;
                await user.save();
            }
        }

        res.status(200).json({ user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const { firstName, lastName, email, contactNo, dateOfBirth, income } = req.body;

        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }


        if (email !== user.email) {
            const existingUser = await User.findOne({ email, _id: { $ne: userId } });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already exists' });
            }
        }

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.email = email || user.email;
        user.contactNo = contactNo || user.contactNo;
        user.dateOfBirth = dateOfBirth || user.dateOfBirth;
        user.income = income || user.income;

        await user.save();

        res.status(200).json({ message: 'User profile updated successfully', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


module.exports = {
    userSignup,
    userLogin,
    getUserProfile,
    updateUserProfile
};
