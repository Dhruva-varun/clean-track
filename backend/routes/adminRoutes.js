const express = require('express');
const { registerAdmin, loginAdmin, viewAllDrivers, getAllPickupRequests, assignDriverToPickupRequest } = require('../controllers/adminController');
const router = express.Router();

// Admin registration
router.post('/register', registerAdmin);

// Admin login
router.post('/login', loginAdmin);

// View all drivers (admin functionality)
router.get('/drivers', viewAllDrivers);

// Get all pickup requests (admin functionality)
router.get('/requests', getAllPickupRequests);

// Assign a driver to a pickup request (admin functionality)
router.post('/assign-driver', assignDriverToPickupRequest);

module.exports = router;