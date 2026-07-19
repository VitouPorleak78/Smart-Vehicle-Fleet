import React, { useState } from 'react';
import Login from './components/Login';
import DriverHub from './components/DriverHub';

export default function App() {
    const [userRole, setUserRole] = useState(null); 

    const handleLoginSuccess = (selectedRole) => {
        setUserRole(selectedRole);
    };

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        setUserRole(null);
    };

    return (
        <div className="app-container w-full h-screen">
            {/* 1. Show login screen if not authenticated */}
            {userRole === null && (
                <Login onLoginSuccess={handleLoginSuccess} />
            )}

            {/* 2. Show Driver Dashboard */}
            {userRole === 'driver' && (
                <DriverHub currentDriverId={1} onLogout={handleLogout} />
            )}

            {/* 3. Placeholder for other roles */}
            {(userRole === 'fleet-manager' || userRole === 'admin') && (
                <div className="p-8 text-center bg-slate-100 min-h-screen">
                    <h1 className="text-2xl font-bold mb-4">Dashboard View ({userRole})</h1>
                    <p className="text-slate-500 mb-6">Visual route transition successful! Only Driver layout is active on this branch.</p>
                    <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">
                        Log Out
                    </button>
                </div>
            )}
        </div>
    );
}