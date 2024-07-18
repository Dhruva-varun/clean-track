const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the PickupRequest schema
const pickupRequestSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        // If you're storing the image path or URL
    },
    status: {
        type: String,
        enum: ['pending', 'assigned', 'completed'],
        default: 'pending',
        required: true,
    },
    driver: {
        type: Schema.Types.ObjectId,
        ref: 'Driver',
        // This field will be populated when a driver is assigned
    },
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
pickupRequestSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Create the PickupRequest model
const PickupRequest = mongoose.model('PickupRequest', pickupRequestSchema);

module.exports = PickupRequest;