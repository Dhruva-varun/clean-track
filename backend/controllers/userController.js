const User = require('../models/User');
const PickupRequest = require('../models/PickupRequest');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).send('User already exists');

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        user = new User({
            name,
            email,
            password: hashedPassword
        });

        // Save user
        await user.save();

        res.status(201).send('User registered successfully');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for user email
        let user = await User.findOne({ email });
        if (!user) return res.status(400).send('Invalid credentials');

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');

        // Create token
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 }, // Token expires in 100 hours
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

// User adds a pickup request
exports.addPickupRequest = async (req, res) => {
    try {
      const { location, image } = req.body;
      const userId = req.user.id; // Get user ID from the token
  
      // Find the user
      let user = await User.findById(userId);
      if (!user) return res.status(404).send('User not found');
  
      // Create the pickup request
      const request = new PickupRequest({
        user: userId,
        location,
        image
      });
  
      // Save the request
      await request.save();
  
      // Add the request to the user's requests array
      user.pickupRequests.push(request._id);
      await user.save();
  
      res.status(201).json(request);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  

// View user's pickup requests
exports.viewPickupRequests = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('pickupRequests');
        if (!user) return res.status(404).send('User not found');

        res.status(200).json(user.pickupRequests);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete a pickup request
exports.deletePickupRequest = async (req, res) => {
    try {
        const { requestId } = req.params;

        // Find the user
        let user = await User.findById(req.user.id);
        if (!user) return res.status(404).send('User not found');

        // Check if the request belongs to the user
        const requestIndex = user.pickupRequests.findIndex(id => id.toString() === requestId);
        if (requestIndex === -1) return res.status(404).send('Request not found');

        // Remove the request from the user's array
        user.pickupRequests.splice(requestIndex, 1);
        await user.save();

        // Delete the request from the database
        await PickupRequest.findByIdAndDelete(requestId);

        res.status(200).send('Request deleted successfully');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};