import React from 'react';
import { useAuthStore } from '../../store/authStore';
import GuestLanding from './GuestLanding';
import UserDashboard from '../private/UserDashboard';

export const LandingPage = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    if (isAuthenticated) {
        return <UserDashboard />;
    }

    return <GuestLanding />;
};

export default LandingPage;