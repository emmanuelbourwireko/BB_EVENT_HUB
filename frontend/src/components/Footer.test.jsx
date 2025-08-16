import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    // This makes the year update automatically
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4 text-center">
                <div className="mb-4">
                    <Link to="/" className="text-xl font-bold hover:text-blue-400 transition-colors duration-300">
                        BB_EVENT_HUB
                    </Link>
                </div>
                <nav className="flex justify-center space-x-6 mb-4">
                    <Link to="/events" className="hover:text-blue-400">Events</Link>
                    <Link to="/about" className="hover:text-blue-400">About Us</Link>
                    <Link to="/contact" className="hover:text-blue-400">Contact</Link>
                </nav>
                <p className="text-gray-400 text-sm">
                    &copy; {currentYear} BB_EVENT_HUB. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
