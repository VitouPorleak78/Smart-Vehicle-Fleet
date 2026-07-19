import React, { useState } from 'react';
import { User, Shield, Key, Bell, ShieldCheck, Mail, Phone, Lock } from 'lucide-react';

export default function AdminSettings() {
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567'
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    app: true
  });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    alert('Profile parameters committed successfully.');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) return alert('Password mismatch detected.');
    alert('Security matrix authorization keys rotated successfully.');
    setPasswords({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="p-8 space-y-6 bg-[#F1F5F9] min-h-screen text-slate-800">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Settings</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 max-w-5xl">
        
        {/* Profile Information Block */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
          <h3 className="text-xs font-bold text-[#1D4487] uppercase tracking-wider mb-4">Profile Information</h3>
          <form onSubmit={handleProfileSubmit} className="space-y-4 max-w-xl">
            <div className="flex items-center gap-4">
              <label className="text-xs font-semibold text-slate-600 w-28">Name:</label>
              <div className="flex-1">
                <input 
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="w-full bg-white border border-slate-200 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:border-[#1D4487]"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="text-xs font-semibold text-slate-600 w-28">Email:</label>
              <div className="flex-1">
                <input 
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  className="w-full bg-white border border-slate-200 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:border-[#1D4487]"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="text-xs font-semibold text-slate-600 w-28">Phone Number:</label>
              <div className="flex-1 relative">
                <input 
                  type="text"
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  className="w-full bg-white border border-slate-200 rounded-md pl-3 pr-8 py-1.5 text-xs focus:outline-none focus:border-[#1D4487]"
                />
                <Phone className="absolute right-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
              </div>
            </div>

            <div className="pt-2">
              <button type="submit" className="bg-[#1D4487] hover:bg-[#153366] text-white px-4 py-2 rounded-md text-xs font-semibold tracking-wide shadow-xs transition-colors">
                Update Profile
              </button>
            </div>
          </form>
        </div>

        {/* Two-Column Lower Options Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Notification Preferences Block */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-[#1D4487] uppercase tracking-wider mb-4">Notification Preferences</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 text-xs font-semibold text-slate-700 cursor-pointer select-none">
                  <input 
                    type="checkbox"
                    checked={notifications.email}
                    onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                    className="rounded border-slate-300 text-[#1D4487] focus:ring-[#1D4487] h-3.5 w-3.5"
                  />
                  <span>Email Alerts</span>
                </label>

                <label className="flex items-center gap-3 text-xs font-semibold text-slate-700 cursor-pointer select-none">
                  <input 
                    type="checkbox"
                    checked={notifications.sms}
                    onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                    className="rounded border-slate-300 text-[#1D4487] focus:ring-[#1D4487] h-3.5 w-3.5"
                  />
                  <span>SMS Notifications</span>
                </label>

                <label className="flex items-center gap-3 text-xs font-semibold text-slate-700 cursor-pointer select-none">
                  <input 
                    type="checkbox"
                    checked={notifications.app}
                    onChange={(e) => setNotifications({...notifications, app: e.target.checked})}
                    className="rounded border-slate-300 text-[#1D4487] focus:ring-[#1D4487] h-3.5 w-3.5"
                  />
                  <span>App Notifications</span>
                </label>
              </div>
            </div>

            <div className="pt-6">
              <button 
                onClick={() => alert('Preferences saved.')}
                className="bg-[#1D4487] hover:bg-[#153366] text-white px-4 py-2 rounded-md text-xs font-semibold tracking-wide shadow-xs transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>

          {/* Change Password Block */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
            <h3 className="text-xs font-bold text-[#1D4487] uppercase tracking-wider mb-4">Change Password</h3>
            <form onSubmit={handlePasswordSubmit} className="space-y-3">
              <div className="flex items-center gap-2">
                <label className="text-[11px] font-semibold text-slate-600 w-28 shrink-0">Current Password:</label>
                <input 
                  type="password"
                  required
                  value={passwords.current}
                  onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                  className="flex-1 bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#1D4487]"
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="text-[11px] font-semibold text-slate-600 w-28 shrink-0">New Password:</label>
                <input 
                  type="password"
                  required
                  value={passwords.new}
                  onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                  className="flex-1 bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#1D4487]"
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="text-[11px] font-semibold text-slate-600 w-28 shrink-0">Confirm New Password:</label>
                <input 
                  type="password"
                  required
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                  className="flex-1 bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#1D4487]"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button type="submit" className="bg-[#1D4487] hover:bg-[#153366] text-white px-4 py-2 rounded-md text-xs font-semibold tracking-wide shadow-xs transition-colors">
                  Update Password
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>

      <div className="text-center text-[11px] text-slate-400 font-medium mt-8">Your data is encrypted and secure.</div>
    </div>
  );
}