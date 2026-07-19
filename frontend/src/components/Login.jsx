import React, { useState } from 'react';

// --- Inline SVG Icons ---
const IconTruckFast = () => (
    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

const IconFleetManager = ({ active }) => (
    <svg className={`w-6 h-6 ${active ? 'text-blue-800' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
);

const IconAdmin = ({ active }) => (
    <svg className={`w-6 h-6 ${active ? 'text-blue-800' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const IconDriver = ({ active }) => (
    <svg className={`w-6 h-6 ${active ? 'text-blue-800' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 17a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h11v11H3V5zm11 3h4l3 3v5h-7V8z" />
    </svg>
);

const IconUser = () => (
    <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const IconLock = () => (
    <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

const IconEye = ({ show }) => (
    <svg className="w-5 h-5 text-slate-400 hover:text-slate-900 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        {show ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.016 10.016 0 013.682-.813c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m-4.092-4.092a3 3 0 11-4.243-4.243" />
        ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        )}
    </svg>
);

export default function Login({ onLoginSuccess }) {
    const [role, setRole] = useState('driver');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (role === 'admin' && !username.toLowerCase().includes('@admin')) {
            setError('Invalid Admin credentials. Email must belong to the @admin domain.');
            return;
        }

        if (role === 'driver' && !username.toLowerCase().endsWith('@driver.com')) {
            setError('Invalid Driver credentials. Email must end with @driver.com.');
            return;
        }

        if (role === 'fleet-manager' && !username.toLowerCase().endsWith('@fleet.com')) {
            setError('Invalid Fleet Manager credentials. Email must end with @fleet.com.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: username, password, role })
            });

            const data = await response.json();

            if (response.ok) {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                }
                if (onLoginSuccess) {
                    onLoginSuccess(role);
                }
            } else {
                setError(data.message || 'Login failed. Please check your details.');
            }
        } catch (err) {
            console.error('Login request error:', err);
            setError('Server unreachable. Make sure backend is running on port 5000.');
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-50 w-full text-slate-900">
            {/* Left Side: Hero Banner Panel */}
            <div 
                className="hidden lg:flex flex-[1.2] flex-col justify-between p-12 relative text-white bg-cover bg-center"
                style={{ backgroundImage: `linear-gradient(rgba(10, 25, 47, 0.75), rgba(10, 25, 47, 0.85)), url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=1920')` }}
            >
                <div className="flex items-center gap-3 text-xl font-bold">
                    <div className="bg-blue-600 p-2 rounded-md flex items-center justify-center">
                        <IconTruckFast />
                    </div>
                    <div>
                        Smart Vehicle Fleet
                        <span className="block text-xs font-normal text-slate-400">Management System</span>
                    </div>
                </div>

                <div className="max-w-md">
                    <h1 className="text-4xl font-bold leading-tight mb-6">Optimize Your Fleet, Enhance Your Business</h1>
                    <p className="text-slate-300 leading-relaxed">Harness real-time analytics and predictive intelligence to drive operational excellence across your entire logistics network.</p>
                </div>

                <div className="flex gap-16">
                    <div>
                        <h2 className="text-3xl font-bold">24k+</h2>
                        <p className="text-sm text-slate-400">Active Vehicles</p>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold">99.9%</h2>
                        <p className="text-sm text-slate-400">Uptime Relay</p>
                    </div>
                </div>
            </div>

            {/* Right Side: Login Input Panel */}
            <div className="flex-1 bg-white p-6 md:p-14 flex flex-col justify-center overflow-y-auto">
                <div className="w-full max-w-lg mx-auto">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h2>
                        <p className="text-slate-500 text-sm">Access your command center and manage your operations.</p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLoginSubmit}>
                        <span className="block text-sm font-semibold text-slate-900 mb-3">Select Your Role</span>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div 
                                className={`border rounded-lg p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 select-none ${role === 'fleet-manager' ? 'border-blue-300 bg-blue-50 border-2 text-blue-800 font-semibold' : 'border-slate-200 bg-white hover:border-slate-400'}`}
                                onClick={() => setRole('fleet-manager')}
                            >
                                <IconFleetManager active={role === 'fleet-manager'} />
                                <span>Fleet Manager</span>
                            </div>
                            
                            <div 
                                className={`border rounded-lg p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 select-none ${role === 'admin' ? 'border-blue-300 bg-blue-50 border-2 text-blue-800 font-semibold' : 'border-slate-200 bg-white hover:border-slate-400'}`}
                                onClick={() => setRole('admin')}
                            >
                                <IconAdmin active={role === 'admin'} />
                                <span>Admin</span>
                            </div>

                            <div 
                                className={`col-span-2 border rounded-lg p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 select-none ${role === 'driver' ? 'border-blue-300 bg-blue-50 border-2 text-blue-800 font-semibold' : 'border-slate-200 bg-white hover:border-slate-400'}`}
                                onClick={() => setRole('driver')}
                            >
                                <IconDriver active={role === 'driver'} />
                                <span>Driver</span>
                            </div>
                        </div>

                        <div className="mb-5">
                            <label className="block text-sm font-semibold text-slate-900 mb-2">Email or Username</label>
                            <div className="relative flex items-center">
                                <span className="absolute left-4 pointer-events-none">
                                    <IconUser />
                                </span>
                                <input 
                                    type="text" 
                                    placeholder={role === 'driver' ? 'vitou@driver.com' : role === 'admin' ? 'admin@admin.com' : 'operator@fleet.com'} 
                                    required
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full py-3.5 pl-11 pr-4 border border-slate-200 rounded-md outline-none text-sm transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100" 
                                />
                            </div>
                        </div>

                        <div className="mb-5">
                            <label className="block text-sm font-semibold text-slate-900 mb-2">Password</label>
                            <div className="relative flex items-center">
                                <span className="absolute left-4 pointer-events-none">
                                    <IconLock />
                                </span>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Enter password" 
                                    required
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full py-3.5 pl-11 pr-11 border border-slate-200 rounded-md outline-none text-sm transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100" 
                                />
                                <span 
                                    className="absolute right-4 p-1"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <IconEye show={showPassword} />
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-sm mb-6">
                            <label className="flex items-center gap-2 text-slate-500 cursor-pointer select-none">
                                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                                Remember this device
                            </label>
                            <a href="#" className="text-blue-600 font-medium hover:underline">Forgot Password?</a>
                        </div>

                        <button type="submit" className="w-full bg-[#0A192F] text-white font-semibold p-4 rounded-md transition hover:bg-[#112240]">
                            Authenticate Access
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}