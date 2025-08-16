import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
    // Destructure for easier access and cleaner code
    const { id, imageUrl, title, date, description } = event;

    return (
        // The main card container
        <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">

            {/* Event Image */}
            <img
                src={imageUrl || `https://placehold.co/400x200/334155/ffffff?text=Event`}
                alt={title || 'Event Image'}
                className="w-full h-48 object-cover"
                // Add a fallback in case the image fails to load
                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x200/334155/ffffff?text=Image+Not+Found` }}
            />

            {/* Card Content */}
            <div className="p-4">
                <h3 className="text-xl font-bold mb-2 truncate">{title}</h3>
                <p className="text-gray-500 text-sm mb-2">
                    {new Date(date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </p>
                <p className="text-gray-700 mb-4 text-sm h-16 overflow-hidden">
                    {description}
                </p>

                {/* --- THIS IS THE CORRECTED PART --- */}
                {/* We use event.id instead of event._id */}
                <Link
                    to={`/events/${id}`}
                    className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default EventCard;
