import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">BB_EVENT_HUB</Link>
                <div className="space-x-4">
                    <Link to="/" className="hover:text-gray-300">Home</Link>
                    <Link to="/events" className="hover:text-gray-300">Events</Link>
                    <Link to="/contact" className="hover:text-gray-300">Contact</Link>
                    {/* Conditional links for Login/Dashboard will be added later */}
                    <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;