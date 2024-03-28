const jwt = require('jsonwebtoken');

const userAuth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided' });

    try {
        const decoded = jwt.verify(token, 'userAccessKey');
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = userAuth;
