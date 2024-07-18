// DriverController.js
const Driver = require('../models/Driver');
const PickupRequest = require('../models/PickupRequest');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new driver
exports.registerDriver = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if driver exists
        let driver = await Driver.findOne({ email });
        if (driver) return res.status(400).send('Driver already exists');

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create driver
        driver = new Driver({
            name,
            email,
            password: hashedPassword
        });

        // Save driver
        await driver.save();

        res.status(201).send('Driver registered successfully');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Login driver
exports.loginDriver = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for driver email
        let driver = await Driver.findOne({ email });
        if (!driver) return res.status(400).send('Invalid credentials');

        // Check password
        const isMatch = await bcrypt.compare(password, driver.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');

        // Create token
        const payload = {
            driver: {
                id: driver.id
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

// View assigned pickup requests
exports.viewAssignedRequests = async (req, res) => {
    try {
        const driver = await Driver.findById(req.driver.id).populate('assignedRequests');
        if (!driver) return res.status(404).send('Driver not found');

        res.status(200).json(driver.assignedRequests);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Submit completed pickup request
exports.submitCompletedRequest = async (req, res) => {
    try {
        const { requestId } = req.body;

        // Find the pickup request
        let request = await PickupRequest.findById(requestId);
        if (!request) return res.status(404).send('Request not found');

        // Check if the request is assigned to the driver
        if (request.driver.toString() !== req.driver.id) {
            return res.status(403).send('Not authorized to complete this request');
        }

        // Update the request status
        request.status = 'completed';
        request.updatedAt = Date.now(); // Update the updatedAt field

        // Save the changes
        await request.save();

        res.status(200).send('Request marked as completed');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};