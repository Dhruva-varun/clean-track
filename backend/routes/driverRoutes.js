// driverRoutes.js
const express = require('express');
const { registerDriver, loginDriver, viewAssignedRequests, submitCompletedRequest } = require('../controllers/driverController');
const {driverauth} = require('../utils/auth'); // Assuming you have an auth middleware
const router = express.Router();

// Driver registration route
router.post('/register', registerDriver);

// Driver login route
router.post('/login', loginDriver);

// View assigned requests route (protected by auth middleware)
router.get('/requests', driverauth, viewAssignedRequests);

// Submit completed request route (protected by auth middleware)
router.post('/complete-request', driverauth, submitCompletedRequest);

module.exports = router;