const express = require('express');
const { registerUser,loginUser, addPickupRequest, viewPickupRequests, deletePickupRequest } = require('../controllers/userController');
const {userauth} = require('../utils/auth'); // Assuming you have an auth middleware
const router = express.Router();

// User registration route
router.post('/register', registerUser);

router.post('/login', loginUser);

// User adds a pickup request (protected by auth middleware)
router.post('/request', userauth, addPickupRequest);

// View user's pickup requests (protected by auth middleware)
router.get('/requests', userauth, viewPickupRequests);

// Delete a pickup request (protected by auth middleware)
router.delete('/request/:requestId', userauth, deletePickupRequest);

module.exports = router;