import React from 'react';
import { NavLink } from 'react-router-dom';
import { Flame, Bookmark, Users, GraduationCap } from 'lucide-react';
import './HomeSidebar.css';

export default function QuickAccessPanel() {
    return (
        <div className="sketch-card quick-access-panel">
            <h3 className="panel-title handwriting text-muted mb-4">// Quick Access</h3>

            <div className="quick-access-list">
                <NavLink to="/my-projects" className="quick-access-item">
                    <span className="icon-wrapper"><Flame size={18} className="text-accent" /></span>
                    <span className="item-text font-bold text-accent">My Active Builds</span>
                    <span className="badge badge-count">2</span>
                </NavLink>

                <NavLink to="/saved" className="quick-access-item">
                    <span className="icon-wrapper"><Bookmark size={18} /></span>
                    <span className="item-text font-bold">Saved Projects</span>
                </NavLink>

                <NavLink to="/messages" className="quick-access-item">
                    <span className="icon-wrapper"><Users size={18} className="text-warning" /></span>
                    <span className="item-text font-bold">Team Requests</span>
                    <span className="badge badge-count badge-warning">1</span>
                </NavLink>

                <NavLink to="/events" className="quick-access-item">
                    <span className="icon-wrapper"><GraduationCap size={18} /></span>
                    <span className="item-text font-bold">Campus Events</span>
                </NavLink>
            </div>
        </div>
    );
}
