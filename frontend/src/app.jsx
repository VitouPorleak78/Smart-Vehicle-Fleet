import React, { useState } from 'react';
import Login from './components/Login';

export default function App() {
    // Track who is logged in. null = show login screen
    const [userRole, setUserRole] = useState(null); 

    const handleLoginSuccess = (selectedRole) => {
        // Log to terminal console for verification
        console.log(`Successfully simulated login for role: ${selectedRole}`);
        setUserRole(selectedRole);
    };

    const handleLogout = () => {
        setUserRole(null);
    };

    return (
        <div className="app-container w-full h-screen">
            {/* 1. Show login screen if nobody is authenticated */}
            {userRole === null && (
                <Login onLoginSuccess={handleLoginSuccess} />
            )}

            {/* 2. Show Driver Test Hub View */}
            {userRole === 'driver' && (
                <div className="p-8 text-center bg-slate-100 min-h-screen">
                    <h1 className="text-3xl font-bold text-blue-900 mb-4">🚗 Driver Dashboard View</h1>
                    <p className="text-slate-600 mb-6">Visual route transition successful! Your DriverHub elements will mount here after merging.</p>
                    <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                        Log Out / Back to Login
                    </button>
                </div>
            )}

            {/* 3. Show Fleet Manager Test View */}
            {userRole === 'fleet-manager' && (
                <div className="p-8 text-center bg-slate-100 min-h-screen">
                    <h1 className="text-3xl font-bold text-slate-900 mb-4">📊 Fleet Manager Dashboard View</h1>
                    <p className="text-slate-600 mb-6">Visual route transition successful! Your friend's OperatorHub elements will load here.</p>
                    <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                        Log Out / Back to Login
                    </button>
                </div>
            )}

            {/* 4. Show Admin Test View */}
            {userRole === 'admin' && (
                <div className="p-8 text-center bg-slate-100 min-h-screen">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">⚙️ Admin Settings Panel</h1>
                    <p className="text-slate-600 mb-6">Visual route transition successful!</p>
                    <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                        Log Out / Back to Login
                    </button>
                </div>
            )}
        </div>
    );
}