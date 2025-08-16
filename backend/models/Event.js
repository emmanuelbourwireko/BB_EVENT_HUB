const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: {
        street: String,
        city: String,
        state: String,
        zipcode: String,
    },
    organizer: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    attendees: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    }],
    // --- THIS IS THE CORRECTED PART ---
    // It is now an array of objects, each with a name, price, and quantity.
    ticketTiers: [{
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
    }],
    category: String,
    imageUrl: String,
    sponsors: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User', // Assuming sponsors are also users
    }],
    isFeatured: { type: Boolean, default: false },
});

module.exports = mongoose.model('Event', EventSchema);
