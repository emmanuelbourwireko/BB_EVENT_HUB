/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from 'react';
import apiClient from '../api/axios';
import AuthContext from '../context/AuthContext';

const BookingForm = ({ event }) => {
    // Use a single state object for all form data
    const [bookingDetails, setBookingDetails] = useState({
        ticketTier: '',
        numberOfTickets: 1,
        totalPrice: 0,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { user } = useContext(AuthContext);

    // This effect runs when the component loads or when the event data changes.
    // It sets the initial ticket tier and price.
    useEffect(() => {
        if (event && event.ticketTiers && event.ticketTiers.length > 0) {
            const initialTier = event.ticketTiers[0];
            setBookingDetails({
                ticketTier: initialTier.name,
                numberOfTickets: 1,
                totalPrice: initialTier.price,
            });
        }
    }, [event]); // Re-run this effect if the event prop changes

    // A single handler for all form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookingDetails(prevDetails => {
            const newDetails = { ...prevDetails, [name]: value };

            // Recalculate price based on the new state
            const selectedTier = event.ticketTiers.find(t => t.name === newDetails.ticketTier);
            const tickets = parseInt(newDetails.numberOfTickets, 10);

            if (selectedTier && tickets > 0) {
                newDetails.totalPrice = selectedTier.price * tickets;
            }

            return newDetails;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setError('You must be logged in to book an event.');
            return;
        }
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await apiClient.post('/bookings', {
                event: event.id,
                ticketTier: bookingDetails.ticketTier,
                numberOfTickets: parseInt(bookingDetails.numberOfTickets, 10),
            });
            setSuccess('Booking successful! A confirmation has been sent to your email.');
        } catch (err) {
            setError(err.response?.data?.error || 'Booking failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Don't render the form if there's no event data yet
    if (!event || !event.ticketTiers) {
        return <div>Loading event details...</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="mt-6 p-4 border rounded-lg bg-gray-50">
            <h3 className="text-2xl font-bold mb-4">Book Your Spot</h3>

            {/* Ticket Tier Dropdown */}
            <div className="mb-4">
                <label htmlFor="ticketTier" className="block text-gray-700 font-bold mb-2">Ticket Type</label>
                <select
                    id="ticketTier"
                    name="ticketTier"
                    value={bookingDetails.ticketTier}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    {event.ticketTiers.map((tier) => (
                        <option key={tier.name} value={tier.name}>
                            {tier.name} - ${tier.price.toFixed(2)}
                        </option>
                    ))}
                </select>
            </div>

            {/* Number of Tickets Input */}
            <div className="mb-4">
                <label htmlFor="numberOfTickets" className="block text-gray-700 font-bold mb-2">Number of Tickets</label>
                <input
                    type="number"
                    id="numberOfTickets"
                    name="numberOfTickets"
                    value={bookingDetails.numberOfTickets}
                    onChange={handleChange}
                    min="1"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            {/* Total Price Display */}
            <div className="text-xl font-bold mb-4">
                Total: ${bookingDetails.totalPrice.toFixed(2)}
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={isLoading} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full disabled:bg-gray-400">
                {isLoading ? 'Processing...' : 'Book Now'}
            </button>

            {/* Success and Error Messages */}
            {success && <p className="text-green-500 mt-4">{success}</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
    );
};

export default BookingForm;
