const Admin = require('../models/Admin');
const Driver = require('../models/Driver');
const PickupRequest = require('../models/PickupRequest');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new admin
exports.registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if admin exists
        let admin = await Admin.findOne({ email });
        if (admin) return res.status(400).send('Admin already exists');

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create admin
        admin = new Admin({
            name,
            email,
            password: hashedPassword
        });

        // Save admin
        await admin.save();

        res.status(201).send('Admin registered successfully');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Login admin
exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for admin email
        let admin = await Admin.findOne({ email });
        if (!admin) return res.status(400).send('Invalid credentials');

        // Check password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');

        // Create token
        const payload = {
            admin: {
                id: admin.id
            }
        };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// View all drivers
exports.viewAllDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.status(200).json(drivers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all pickup requests
exports.getAllPickupRequests = async (req, res) => {
    try {
        const requests = await PickupRequest.find({ status: 'pending' });
        res.status(200).json(requests);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Assign a driver to a pickup request
exports.assignDriverToPickupRequest = async (req, res) => {
    try {
        const { requestId, driverId } = req.body;

        // Find the pickup request and driver
        const request = await PickupRequest.findById(requestId);
        const driver = await Driver.findById(driverId);

        if (!request || !driver) {
            return res.status(404).send('Request or driver not found');
        }

        // Assign the driver to the request
        request.driver = driverId;
        request.status = 'assigned';
        driver.assignedRequests.push(requestId);

        // Save the changes
        await request.save();
        await driver.save();

        res.status(200).send('Driver assigned to request successfully');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};