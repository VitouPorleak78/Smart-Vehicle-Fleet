import React from 'react';
import { BarChart3, TrendingUp, AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
  const cards = [
    { title: 'Total Active Fleet', value: '42 Vehicles', change: '+3 this month', icon: BarChart3 },
    { title: 'Operational Capacity', value: '94.2%', change: 'Optimal threshold', icon: TrendingUp },
    { title: 'Open Incidents', value: '2 Alerts', change: 'Requires review', icon: AlertCircle },
  ];

  return (
    <div className="p-8 space-y-6 bg-[#F1F5F9] min-h-screen text-slate-800">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Dashboard</h1>
        <p className="text-xs text-slate-500 mt-1">Real-time metrics overview and active fleet performance analytics.</p>
      </div>

      {/* Grid Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="bg-white border border-slate-200 p-6 rounded-lg shadow-xs flex justify-between items-start">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-[#1D4487] uppercase tracking-wide block">{card.title}</span>
                <span className="text-xl font-extrabold text-slate-900 block">{card.value}</span>
                <span className="text-[11px] text-slate-400 block">{card.change}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-[#1D4487]">
                <Icon className="h-4 w-4" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6 text-center text-xs text-slate-400 italic">
        Select another panel tab on the left navigation suite to view deeper diagnostic tables.
      </div>
    </div>
  );
}