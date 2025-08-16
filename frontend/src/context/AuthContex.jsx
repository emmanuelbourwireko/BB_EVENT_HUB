import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // This effect will run once when the component mounts
    useEffect(() => {
        // Check localStorage for a token or user data
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);


    const login = (userData) => {
        // Set user data in state
        setUser(userData);
        // Store user data and token in localStorage to persist login
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', userData.token); // Assuming token is part of userData
    };

    const logout = () => {
        // Clear user data from state
        setUser(null);
        // Remove user data and token from localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
