const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// --- Import ALL your routes here ---
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const bookingRoutes = require('./routes/bookings'); // This line is new

// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());

// Enable CORS
app.use(cors());

// Simple test route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// --- Mount ALL routers ---
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes); // This line is new

const PORT = process.env.PORT || 5000;

module.exports = app; (
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
    module.exports = app;
});
