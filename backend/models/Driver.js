const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Driver schema
const driverSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures that each email is unique in the database
    },
    password: {
        type: String,
        required: true,
    },
    assignedRequests: [{
        type: Schema.Types.ObjectId,
        ref: 'PickupRequest', // Reference to the PickupRequest model
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Pre-save hook to update the updatedAt field
driverSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Create the Driver model
const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;