import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppNavbar from '../components/layout/AppNavbar';
import { Construction } from 'lucide-react';

export default function ComingSoon() {
    const navigate = useNavigate();

    return (
        <div className="home-page min-h-screen bg-background">
            <AppNavbar />
            <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[70vh] text-center">
                <div className="bg-surface-container border border-outline-variant p-10 rounded-3xl shadow-lg max-w-lg w-full flex flex-col items-center animate-fade-in-up">
                    <div className="w-20 h-20 rounded-full bg-primary-container text-primary flex items-center justify-center mb-6 shadow-inner ring-4 ring-primary/20">
                        <Construction size={40} />
                    </div>
                    <h1 className="text-4xl font-black font-heading text-on-surface mb-3">Coming Soon</h1>
                    <p className="text-on-surface-variant text-lg mb-8 leading-relaxed">
                        We are currently crafting this experience! It will be available very soon. Check back later for cool updates.
                    </p>
                    <button 
                        onClick={() => navigate(-1)}
                        className="px-8 py-3.5 rounded-pill bg-primary text-on-primary font-bold tracking-wide hover:-translate-y-[2px] shadow-md hover:shadow-lg hover:bg-primary-container hover:text-on-primary-container transition-all"
                    >
                        &larr; Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}
