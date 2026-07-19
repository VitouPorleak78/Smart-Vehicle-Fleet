import React, { useState } from 'react';
import Login from './components/Login';

export default function App() {
    const [userRole, setUserRole] = useState(null); 

    const handleLoginSuccess = (selectedRole) => {
        setUserRole(selectedRole);
    };

    const handleLogout = () => {
        setUserRole(null);
    };

    return (
        <div className="app-container w-full h-screen">
            {/* 1. Everyone sees the exact same Login view initially */}
            {userRole === null && (
                <Login onLoginSuccess={handleLoginSuccess} />
            )}

            {/* 2. Driver Route Pointer */}
            {userRole === 'driver' && (
                <div className="p-8 text-center bg-slate-50 min-h-screen">
                    <h1 className="text-2xl font-bold">Driver Dashboard View</h1>
                    <p className="text-slate-500 my-4">Placeholder: Ready for the Driver branch code.</p>
                    <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">Log Out</button>
                </div>
            )}

            {/* 3. Fleet Manager Route Pointer */}
            {userRole === 'fleet-manager' && (
                <div className="p-8 text-center bg-slate-50 min-h-screen">
                    <h1 className="text-2xl font-bold">Fleet Manager Dashboard View</h1>
                    <p className="text-slate-500 my-4">Placeholder: Ready for the Fleet Manager branch code.</p>
                    <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">Log Out</button>
                </div>
            )}

            {/* 4. Admin Route Pointer */}
            {userRole === 'admin' && (
                <div className="p-8 text-center bg-slate-50 min-h-screen">
                    <h1 className="text-2xl font-bold">Admin Panel View</h1>
                    <p className="text-slate-500 my-4">Placeholder: Ready for the Admin branch code.</p>
                    <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">Log Out</button>
                </div>
            )}
        </div>
    );
}