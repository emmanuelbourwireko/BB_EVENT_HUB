const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.ObjectId,
        ref: 'Event',
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    ticketTier: { type: String, required: true },
    tickets: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    bookingDate: {
        type: Date,
        default: Date.now,
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending',
    },
});

module.exports = mongoose.model('Booking', BookingSchema);