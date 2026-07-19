import React, { useState } from 'react';
import { Wrench, CheckCircle2, Clock, CalendarDays } from 'lucide-react';

export default function MaintenanceLogs() {
  const [logs, setLogs] = useState([
    { id: 'MNT-881', unit: 'Truck #08', service: 'Full Synthetic Oil Change & Filter Renewal', date: '2026-07-15', engineer: 'Sarah Jenkins', status: 'Completed' },
    { id: 'MNT-879', unit: 'Van #14', service: 'Tire Pressure Calibration & Wheel Alignment', date: '2026-07-12', engineer: 'David Vance', status: 'Completed' },
    { id: 'MNT-890', unit: 'Truck #11', service: 'Brake Master Cylinder Replacement', date: '2026-07-18', engineer: 'David Vance', status: 'Pending Approval' }
  ]);

  // Toggle log status inline
  const toggleStatus = (id) => {
    setLogs(logs.map(log => 
      log.id === id 
        ? { ...log, status: log.status === 'Completed' ? 'Pending Approval' : 'Completed' }
        : log
    ));
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-xl font-black text-slate-900 tracking-tight">Maintenance Logs</h1>
        <p className="text-xs text-slate-500 mt-1">Historical ledger of all structural engineering adjustments and mechanical repairs.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-200 text-[10px] font-bold text-slate-400 tracking-wider uppercase">
              <th className="p-4">Ticket ID</th>
              <th className="p-4">Asset</th>
              <th className="p-4">Service Event Details</th>
              <th className="p-4">Assigned Crew</th>
              <th className="p-4">Timestamp</th>
              <th className="p-4 text-right">Status Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50/30 transition-colors">
                <td className="p-4 font-mono font-bold text-slate-400">{log.id}</td>
                <td className="p-4 font-bold text-slate-900">{log.unit}</td>
                <td className="p-4 max-w-xs truncate text-slate-600 font-medium">{log.service}</td>
                <td className="p-4 text-slate-500">{log.engineer}</td>
                <td className="p-4 text-slate-400">
                  <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" /> {log.date}</span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => toggleStatus(log.id)}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-[10px] font-bold border transition-all ${
                      log.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100/60'
                        : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100/60'
                    }`}
                  >
                    {log.status === 'Completed' ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                    {log.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}