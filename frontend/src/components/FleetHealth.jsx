import React from 'react';
import { HeartPulse, CheckCircle, AlertTriangle } from 'lucide-react';

export default function FleetHealth() {
  const statusItems = [
    { name: 'Engine Diagnostics', Status: 'Optimal', type: 'success' },
    { name: 'Braking Systems', Status: 'Optimal', type: 'success' },
    { name: 'Tire Pressure Systems', Status: 'Attention Required', type: 'warning' },
  ];

  return (
    <div className="p-8 space-y-6 bg-[#F1F5F9] min-h-screen text-slate-800">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Fleet Health</h1>
        <p className="text-xs text-slate-500 mt-1">Real-time status configurations and telemetry checks across active chassis units.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4 max-w-3xl">
        <h3 className="text-xs font-bold text-[#1D4487] uppercase tracking-wider">Subsystem Status Ledger</h3>
        
        <div className="divide-y divide-slate-100 border border-slate-200 rounded-md overflow-hidden">
          {statusItems.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-white hover:bg-slate-50/50 transition-colors">
              <span className="text-xs font-semibold text-slate-700">{item.name}</span>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-[10px] font-bold border ${
                item.type === 'success' 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}>
                {item.type === 'success' ? <CheckCircle className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                {item.Status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}