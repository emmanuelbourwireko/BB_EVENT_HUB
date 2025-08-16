const request = require('supertest');
const express = require('express');
const eventRoutes = require('../routes/events');

// --- THIS IS THE CORRECTED STRUCTURE ---

// 1. First, define the mock functions.
const mockProtect = (req, res, next) => {
    req.user = { id: 'mockUserId', roles: ['organizer'] };
    next();
};

const mockAuthorize = (...roles) => (req, res, next) => next();

// 2. Second, tell Jest to use the functions you just defined.
jest.mock('../middleware/auth', () => ({
    protect: mockProtect,
    authorize: jest.fn(mockAuthorize),
}));


// --- The rest of your file ---

const app = express();
app.use(express.json());
app.use('/api/events', eventRoutes);

describe('Event API Routes', () => {
    it('should fetch all events', async () => {
        // This test requires a running database connection to pass
        // or for the controller to be mocked.
        const res = await request(app).get('/api/events');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('success', true);
    });
});
