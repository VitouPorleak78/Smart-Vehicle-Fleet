import React, { useState } from 'react';
import Login from './components/Login';
import DriverHub from './components/DriverHub';
import AdminDashboard from './components/AdminDashboard';
import FleetHealth from './components/FleetHealth';

export default function App() {
    const [userRole, setUserRole] = useState(null); 
    const [currentUserId, setCurrentUserId] = useState(null);

    const handleLoginSuccess = (selectedRole, userId) => {
        setUserRole(selectedRole);
        if (userId) {
            setCurrentUserId(userId);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        setUserRole(null);
        setCurrentUserId(null);
    };

    return (
        <div className="app-container w-full h-screen">
            {/* 1. Unauthenticated State */}
            {userRole === null && (
                <Login onLoginSuccess={handleLoginSuccess} />
            )}

            {/* 2. Driver Dashboard */}
            {userRole === 'driver' && (
                <DriverHub currentDriverId={currentUserId || 1} onLogout={handleLogout} />
            )}

            {/* 3. Fleet Manager / Operator Dashboard */}
            {(userRole === 'fleet-manager' || userRole === 'operator') && (
                <FleetHealth userId={currentUserId} onLogout={handleLogout} />
            )}

            {/* 4. Admin Dashboard */}
            {userRole === 'admin' && (
                <AdminDashboard userId={currentUserId} onLogout={handleLogout} />
            )}
        </div>
    );
}