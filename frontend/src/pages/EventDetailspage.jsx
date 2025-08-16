import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../api/axios';
import BookingForm from '../components/BookingForm'; // Import the form

const EventDetailsPage = () => {
    const { id } = useParams(); // Get the event ID from the URL
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get(`/events/${id}`);
                setEvent(response.data.data);
                // eslint-disable-next-line no-unused-vars
            } catch (err) {
                setError('Failed to load event details.');
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]); // Re-run the effect if the ID in the URL changes

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            {/* You can display all the event details here */}
            <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
            <img src={event.imageUrl} alt={event.title} className="w-full h-96 object-cover rounded-lg mb-4" />
            <p className="text-lg mb-6">{event.description}</p>

            {/* --- INTEGRATION POINT --- */}
            {/* Render the BookingForm and pass the fetched event data to it */}
            <BookingForm event={event} />
        </div>
    );
};

export default EventDetailsPage;
