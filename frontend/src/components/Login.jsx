import React, { useState } from 'react';

export default function Login() {
    const [role, setRole] = useState('fleet-manager');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Authenticating:", { username, password, role });
    };

    return (
        <div className="flex min-h-screen bg-slate-50 w-full text-slate-900">
            {/* Left Side: Hero Banner Panel */}
            <div className="hidden lg:flex flex-[1.2] flex-col justify-between p-12 relative text-white bg-cover bg-center"
                 style={{ backgroundImage: `linear-gradient(rgba(10, 25, 47, 0.75), rgba(10, 25, 47, 0.85)), url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=1920')` }}>
                <div className="flex items-center gap-3 text-xl font-bold">
                    <i className="fa-solid fa-truck-fast bg-blue-600 p-2 rounded-md"></i>
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

                    <form onSubmit={handleSubmit}>
                        <span className="block text-sm font-semibold text-slate-900 mb-3">Select Your Role</span>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className={`border rounded-lg p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 select-none ${role === 'fleet-manager' ? 'border-blue-300 bg-blue-50 border-2 text-blue-800 font-semibold' : 'border-slate-200 bg-white hover:border-slate-400'}`}
                                 onClick={() => setRole('fleet-manager')}>
                                <i className={`fa-solid fa-border-all text-lg ${role === 'fleet-manager' ? 'text-blue-800' : 'text-slate-400'}`}></i>
                                <span>Fleet Manager</span>
                            </div>
                            
                            <div className={`border rounded-lg p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 select-none ${role === 'admin' ? 'border-blue-300 bg-blue-50 border-2 text-blue-800 font-semibold' : 'border-slate-200 bg-white hover:border-slate-400'}`}
                                 onClick={() => setRole('admin')}>
                                <i className={`fa-solid fa-gear text-lg ${role === 'admin' ? 'text-blue-800' : 'text-slate-400'}`}></i>
                                <span>Admin</span>
                            </div>

                            <div className={`col-span-2 border rounded-lg p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 select-none ${role === 'driver' ? 'border-blue-300 bg-blue-50 border-2 text-blue-800 font-semibold' : 'border-slate-200 bg-white hover:border-slate-400'}`}
                                 onClick={() => setRole('driver')}>
                                <i className={`fa-solid fa-steering-wheel text-lg ${role === 'driver' ? 'text-blue-800' : 'text-slate-400'}`}></i>
                                <span>Driver</span>
                            </div>
                        </div>

                        <div className="mb-5">
                            <label className="block text-sm font-semibold text-slate-900 mb-2">Email or Username</label>
                            <div className="relative flex items-center">
                                <i className="fa-regular fa-user absolute left-4 text-slate-400 pointer-events-none"></i>
                                <input type="text" placeholder="Enter your email or username" required
                                       value={username} onChange={(e) => setUsername(e.target.value)}
                                       className="w-full py-3.5 pl-11 pr-4 border border-slate-200 rounded-md outline-none text-sm transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100" />
                            </div>
                        </div>

                        <div className="mb-5">
                            <label className="block text-sm font-semibold text-slate-900 mb-2">Password</label>
                            <div className="relative flex items-center">
                                <i className="fa-solid fa-lock absolute left-4 text-slate-400 pointer-events-none"></i>
                                <input type={showPassword ? "text" : "password"} placeholder="Enter password" required
                                       value={password} onChange={(e) => setPassword(e.target.value)}
                                       className="w-full py-3.5 pl-11 pr-11 border border-slate-200 rounded-md outline-none text-sm transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100" />
                                <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'} absolute right-4 text-slate-400 cursor-pointer p-1 hover:text-slate-900`}
                                   onClick={() => setShowPassword(!showPassword)}></i>
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