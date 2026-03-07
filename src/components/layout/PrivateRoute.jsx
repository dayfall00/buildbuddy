import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function PrivateRoute({ children }) {
    const { currentUser, userProfile } = useAuth();
    const location = useLocation();

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    // Checking profile completion logic
    const isOnboardingRoute = location.pathname === '/create-profile';

    if (!userProfile && !isOnboardingRoute) {
        // Logged in but no firestore document -> needs onboarding
        return <Navigate to="/create-profile" replace />;
    }

    if (userProfile && isOnboardingRoute) {
        // Has profile but trying to go to onboarding -> send to feed
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}
