import React from 'react';
import { CheckCircle2, Clock } from 'lucide-react';

export default function MaintenanceLogs() {
  const logs = [
    { id: 'MNT-88', vehicle: 'Truck-04', type: 'Brake Calibration', status: 'Completed', date: '2026-07-15' },
    { id: 'MNT-89', vehicle: 'Van-12', type: 'Engine Oil Flush', status: 'Pending', date: '2026-07-18' },
  ];

  return (
    <div className="p-8 space-y-6 bg-[#F1F5F9] min-h-screen text-slate-800">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Maintenance Logs</h1>
        <p className="text-xs text-slate-500 mt-1">Track schedules, component modifications, and workshop work-orders.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <th className="p-4">Log ID</th>
              <th className="p-4">Vehicle Reference</th>
              <th className="p-4">Service Action Type</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-700">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-mono text-slate-400">{log.id}</td>
                <td className="p-4 font-bold text-slate-900">{log.vehicle}</td>
                <td className="p-4 text-slate-600">{log.type}</td>
                <td className="p-4 text-slate-400">{log.date}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-sm text-[10px] font-bold border ${
                    log.status === 'Completed' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {log.status === 'Completed' ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}