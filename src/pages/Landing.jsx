import React from 'react';
import Navbar from '../components/layout/Navbar';
import './Landing.css';
import { Rocket, Users, Target, ArrowRight } from 'lucide-react';

const Landing = () => {
    return (
        <div className="landing-page">
            <Navbar />

            <main className="landing-main container">
                {/* Hero Section */}
                <section className="hero-section">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Find teammates.<br />
                            <span className="handwriting highlight">Build awesome projects.</span>
                        </h1>
                        <p className="hero-subtitle">
                            Build Buddy is the college student's platform to team up, collaborate, and ship real-world ideas together. Mix of a social feed, project board, and developer community.
                        </p>
                        <div className="hero-actions">
                            <a href="/signup" className="btn btn-primary btn-lg">
                                Start Building <ArrowRight size={20} />
                            </a>
                            <a href="#how-it-works" className="btn btn-lg">Learn More</a>
                        </div>
                    </div>
                    <div className="hero-illustration sketch-card">
                        {/* Abstract decorative representation of a project board */}
                        <div className="mock-window">
                            <div className="mock-header">
                                <span className="dot dot-close"></span>
                                <span className="dot dot-min"></span>
                                <span className="dot dot-max"></span>
                            </div>
                            <div className="mock-body">
                                <div className="mock-title">🔥 Looking for React Dev</div>
                                <div className="mock-tags">
                                    <span className="tag">Frontend</span>
                                    <span className="tag">Firebase</span>
                                </div>
                                <div className="mock-desc">Building a campus carpool app. Need a frontend wizard.</div>
                                <button className="btn btn-sm btn-primary mt-2">Join Request Sent</button>
                            </div>
                        </div>
                        <div className="decorative-scribble"></div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="how-it-works" className="features-section">
                    <div className="section-header">
                        <h2 className="handwriting feature-tag">How it works</h2>
                        <h2>Turn ideas into shipped products.</h2>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card sketch-card">
                            <div className="feature-icon icon-accent">
                                <Target size={32} />
                            </div>
                            <h3>1. Post your Idea</h3>
                            <p>Pitch your project, list the skills needed, and let the community see what you're brewing.</p>
                        </div>
                        <div className="feature-card sketch-card">
                            <div className="feature-icon icon-secondary">
                                <Users size={32} />
                            </div>
                            <h3>2. Form a Team</h3>
                            <p>Review join requests, check out portfolios, and accept the perfect teammates.</p>
                        </div>
                        <div className="feature-card sketch-card">
                            <div className="feature-icon icon-primary">
                                <Rocket size={32} />
                            </div>
                            <h3>3. Build & Ship</h3>
                            <p>Collaborate with your new squad, build the MVP, and launch it to the campus.</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Landing;
