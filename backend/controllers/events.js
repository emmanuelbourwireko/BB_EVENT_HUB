const Event = require('../models/Event');

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('organizer', 'username email');
        res.status(200).json({ success: true, count: events.length, data: events });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.getEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('organizer', 'username email');
        if (!event) {
            return res.status(404).json({ success: false, error: 'Event not found' });
        }
        res.status(200).json({ success: true, data: event });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.createEvent = async (req, res) => {
    try {
        req.body.organizer = req.user.id;
        const event = await Event.create(req.body);
        res.status(201).json({ success: true, data: event });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        let event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ success: false, error: 'Event not found' });
        }
        // Make sure user is the event organizer
        if (event.organizer.toString() !== req.user.id && req.user.roles !== 'admin') {
            return res.status(401).json({ success: false, error: 'Not authorized to update this event' });
        }
        event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json({ success: true, data: event });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ success: false, error: 'Event not found' });
        }
        // Make sure user is the event organizer
        if (event.organizer.toString() !== req.user.id && req.user.roles !== 'admin') {
            return res.status(401).json({ success: false, error: 'Not authorized to delete this event' });
        }
        await event.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};