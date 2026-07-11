import React, { useState } from 'react';
import AdminDashboard from './components/AdminDashboard';
import MaintenanceLogs from './components/MaintenanceLogs';
import FleetHealth from './components/FleetHealth';
import UserManagement from './components/UserManagement';
import AdminSettings from './components/AdminSettings';

export default function App() {
  // Navigation active tab router state
  const [activeTab, setActiveTab] = useState('User Management');

  // Dynamic canvas component router switcher
  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'Dashboard':        return <AdminDashboard />;
      case 'Maintenance Logs': return <MaintenanceLogs />;
      case 'Fleet Health':     return <FleetHealth />;
      case 'User Management':  return <UserManagement />;
      case 'Admin Settings':   return <AdminSettings />;
      default:                 return <UserManagement />;
    }
  };

  return (
    <div className="bg-[#f8f9ff] text-[#0b1c30] flex h-screen w-screen overflow-hidden font-['Inter',_sans-serif]">
      
      {/* 🧭 Fleet Operations Navigation Sidebar */}
      <aside className="w-[260px] h-full bg-[#031635] border-r border-[#c5c6cf]/10 flex flex-col flex-shrink-0 z-50">
        <div className="px-6 py-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#0266ff] rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-xl">dataset</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">Fleet Intel</h1>
              <p className="text-[#8293b8] text-xs">Administrative Suite</p>
            </div>
          </div>
        </div>

        {/* Sidebar Options Render Pipeline */}
        <nav className="flex-1 px-4 space-y-1">
          {[
            { name: 'Dashboard', icon: 'grid_view' },
            { name: 'Maintenance Logs', icon: 'build' },
            { name: 'Fleet Health', icon: 'analytics' },
            { name: 'User Management', icon: 'manage_accounts' },
            { name: 'Admin Settings', icon: 'settings' }
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.name 
                  ? 'bg-[#0266ff] text-white shadow-lg shadow-[#0266ff]/20' 
                  : 'text-[#8293b8] hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              <span className="text-sm font-medium">{item.name}</span>
            </button>
          ))}
        </nav>

        {/* Admin Session Workspace Identity */}
        <div className="p-6 mt-auto">
          <div className="bg-white/5 rounded-2xl p-4 flex items-center gap-3 border border-white/10">
            <div className="w-10 h-10 rounded-full border-2 border-[#0266ff] bg-slate-600 flex items-center justify-center text-white font-bold text-sm">
              AR
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate">Alex Rivera</p>
              <p className="text-[#8293b8] text-xs truncate">Senior Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* 🖥️ Component Display Target Window Viewport */}
      <main className="flex-1 flex flex-col min-w-0 h-full">
        {renderActiveScreen()}
      </main>

    </div>
  );
}