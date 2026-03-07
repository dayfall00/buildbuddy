import React from 'react';
import AppNavbar from '../components/layout/AppNavbar';

export default function MyProjects() {
    return (
        <div className="page-wrapper">
            <AppNavbar />
            <div className="container mt-4 text-center">
                <div className="sketch-card">
                    <h2 className="handwriting text-3xl">My Projects</h2>
                    <p className="mt-3 text-muted">This page is under construction. Coming soon in a future phase!</p>
                </div>
            </div>
        </div>
    );
}
