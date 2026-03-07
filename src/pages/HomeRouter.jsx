import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Landing from './Landing';

export default function HomeRouter() {
    const { currentUser } = useAuth();

    return currentUser ? <Navigate to="/dashboard" /> : <Landing />;
}
