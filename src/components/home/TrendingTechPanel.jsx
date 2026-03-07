import React from 'react';
import './HomeSidebar.css';

export default function TrendingTechPanel() {
    return (
        <div className="sketch-card trending-tech-panel mt-4 border-dashed">
            <h3 className="panel-title handwriting text-accent mb-3">// Trending Tech</h3>

            <p className="trending-text text-sm" style={{ lineHeight: '1.6' }}>
                The campus is currently obsessed with <span className="font-bold">#EdgeAI</span> and <span className="font-bold">#Web3Social</span>.
                <br /><br />
                5 new projects started in these niches today.
            </p>
        </div>
    );
}
