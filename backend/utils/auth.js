// middleware/auth.js
const jwt = require('jsonwebtoken');

exports.driverauth = async (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.driver = decoded.driver; // Set the driver object on the request object
        next();
    } catch (err) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
};

// middleware/auth.js

exports.userauth = async (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; // Set the user object on the request object
        next();
    } catch (err) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
};