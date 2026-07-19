import React, { useState } from 'react';
import { LayoutDashboard, HeartPulse, Users, Wrench, Settings, Car } from 'lucide-react';
import AdminDashboard from './components/AdminDashboard';
import FleetHealth from './components/FleetHealth';
import UserManagement from './components/UserManagement';
import MaintenanceLogs from './components/MaintenanceLogs';
import AdminSettings from './components/AdminSettings';

export default function App() {
  const [currentTab, setTab] = useState('users');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'fleet', label: 'Fleet Health', icon: HeartPulse },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'maintenance', label: 'Maintenance Log', icon: Wrench },
    { id: 'settings', label: 'Admin Settings', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-[#F1F5F9] text-slate-800 antialiased font-sans">
      
      {/* SIDEBAR PANEL */}
      <aside className="w-64 bg-[#00337C] text-slate-300 flex flex-col shrink-0">
        <div className="p-6 flex items-center gap-3 border-b border-white/5">
          <div className="bg-white/10 p-2 rounded-lg">
            <Car className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-[11px] font-black uppercase text-white tracking-wider leading-tight">Fleet Management</h2>
            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">System</span>
          </div>
        </div>

        <nav className="flex-1 py-4 space-y-0.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center gap-3.5 px-6 py-3.5 text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-[#0061B0] text-white border-l-4 border-sky-400'
                    : 'text-slate-300/90 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* COMPONENT VIEWPORT WINDOW */}
      <main className="flex-1 overflow-y-auto">
        {currentTab === 'dashboard' && <AdminDashboard />}
        {currentTab === 'fleet' && <FleetHealth />}
        {currentTab === 'users' && <UserManagement />}
        {currentTab === 'maintenance' && <MaintenanceLogs />}
        {currentTab === 'settings' && <AdminSettings />}
      </main>

    </div>
  );
}