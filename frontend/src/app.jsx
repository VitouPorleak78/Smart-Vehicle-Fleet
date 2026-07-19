import React, { useState } from 'react';
import AdminDashboard from './components/AdminDashboard';
import MaintenanceLogs from './components/MaintenanceLogs';
import UserManagement from './components/UserManagement';
import AdminSettings from './components/AdminSettings';
import FleetHealth from './components/FleetHealth';
import Logo from './components/Logo';
import { LayoutDashboard, ShieldAlert, Users, Settings, Wrench, Search, Bell } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');

  // Navigation Links matching your Figma blueprints
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'health', label: 'Fleet Health', icon: ShieldAlert },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'maintenance', label: 'Maintenance Log', icon: Wrench },
    { id: 'settings', label: 'Admin Settings', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-[#F4F7FC]">
      {/* 1. Left Hand Deep Navy Sidebar Container */}
      <aside className="w-64 bg-sky-100 text-slate-600 flex flex-col justify-between border-r border-sky-200 shrink-0">
        <div>
          {/* Integrated Branded Logo Header Area */}
          <div className="p-6 border-b border-sky-200">
            <Logo variant="light" size="md" />
          </div>
          
          {/* Sidebar Tabs */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive 
                    ? 'bg-sky-300 text-sky-950 shadow-md shadow-sky-300/40' 
                    : 'hover:bg-sky-200 hover:text-sky-950'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-sky-950' : 'text-sky-600'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Footer Profile Card */}
        <div className="p-4 border-t border-sky-200 bg-sky-200/50 flex items-center gap-3">
          <div className="relative h-8 w-8 overflow-hidden rounded-full bg-sky-200 border border-sky-300 text-sky-800 font-bold text-xs flex items-center justify-center">
            <span>MT</span>
            <img
              src="/admin-avatar.jpg"
              alt="Marcus Thorne"
              onError={(event) => { event.currentTarget.style.display = 'none'; }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-bold text-sky-950 leading-none">Marcus Thorne</p>
            <span className="text-[10px] text-sky-700 mt-1 block">Super Admin</span>
          </div>
        </div>
      </aside>

      {/* 2. Right Side Workspace Area */}
      <div className="flex-1 flex flex-col overflow-x-hidden">
        {/* Persistent Top Search Utility Header Bar */}
        <header className="h-16 bg-white border-b border-[#E2E8F0] px-8 flex items-center justify-between shadow-sm shrink-0">
          <div className="relative w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search systems, SKUs, or assets..." 
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-sky-400"
            />
          </div>
          <div className="flex items-center gap-4 text-slate-600">
            <button className="relative p-1.5 hover:bg-slate-100 rounded-full transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 bg-red-500 rounded-full" />
            </button>
            <div className="h-4 w-[1px] bg-[#E2E8F0]" />
            <span className="text-xs font-bold text-[#0F172A] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 text-emerald-600 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              System Live
            </span>
          </div>
        </header>

        {/* Dynamic Screen Mounting Portal */}
        <main className="flex-1 overflow-y-auto">
          {currentTab === 'dashboard' && <AdminDashboard />}
          {currentTab === 'health' && <FleetHealth />}
          {currentTab === 'users' && <UserManagement />}
          {currentTab === 'maintenance' && <MaintenanceLogs />}
          {currentTab === 'settings' && <AdminSettings />}
        </main>
      </div>
    </div>
  );
}
