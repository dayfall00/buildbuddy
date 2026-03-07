import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar sketch-card">
            <div className="navbar-container container">
                <a href="/" className="navbar-logo">
                    Build <span className="handwriting">Buddy</span>
                </a>
                <div className="navbar-links">
                    <a href="/login" className="btn">Log In</a>
                    <a href="/signup" className="btn btn-primary">Sign Up</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
