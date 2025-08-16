const express = require('express');
const { createBooking } = require('../controllers/bookings');
// --- UNCOMMENT THIS LINE ---
const { protect } = require('../middleware/auth');
const router = express.Router();

// --- ADD 'protect' BACK TO THIS LINE ---
router.route('/').post(protect, createBooking);

module.exports = router;
