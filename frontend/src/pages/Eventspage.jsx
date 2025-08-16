import { useState, useEffect } from 'react';
import apiClient from '../api/axios';
import EventCard from '../components/EventCard';

const EventsPage = () => {
    const [events, setEvents] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await apiClient.get('/events');
                setEvents(response.data.data);
            } catch (err) {
                setError('Failed to fetch events.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    },); // Empty dependency array means this effect runs once on mount

    if (loading) return <p>Loading events...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map(event => (
                    <EventCard key={event._id} event={event} />
                ))}
            </div>
        </div>
    );
};

export default EventsPage;