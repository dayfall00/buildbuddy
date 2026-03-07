import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './IdeaInputBar.css';

export default function IdeaInputBar() {
    const { userProfile, currentUser } = useAuth();
    const navigate = useNavigate();

    const avatarLetter = userProfile?.displayName?.charAt(0).toUpperCase() || currentUser?.displayName?.charAt(0).toUpperCase() || 'U';

    return (
        <div className="sketch-card idea-input-container">
            <div className="idea-avatar">
                {avatarLetter}
            </div>

            <div
                className="idea-input-mock"
                onClick={() => navigate('/projects/new')}
                role="button"
                tabIndex={0}
            >
                <span className="placeholder-text handwriting">Got a new build idea? Drop it here...</span>
            </div>
        </div>
    );
}
