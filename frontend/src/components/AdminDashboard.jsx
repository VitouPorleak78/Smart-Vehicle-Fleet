import React, { useState } from 'react';
import { Truck, AlertCircle, Fuel, ShieldCheck, Activity, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [filterMetric, setFilterMetric] = useState('ALL');
  
  const metrics = [
    { label: 'Active Fleet', value: '42 / 48', subtitle: 'Vehicles dispatched', icon: Truck, trend: '+4 today', type: 'OK' },
    { label: 'System Faults', value: '3 Critical', subtitle: 'Requires attention', icon: AlertCircle, trend: '-2 vs yesterday', type: 'ALERT' },
    { label: 'Fuel Efficiency', value: '8.4 MPG', subtitle: 'Fleet average log', icon: Fuel, trend: '+2.1% improvement', type: 'OK' },
    { label: 'Safety Index', value: '98.2%', subtitle: 'Nominal operational score', icon: ShieldCheck, trend: 'Optimal threshold', type: 'OK' }
  ];

  const alerts = [
    { id: 'ALT-401', unit: 'Truck #08', fault: 'High Coolant Temperature', status: 'CRITICAL', time: '5 mins ago' },
    { id: 'ALT-309', unit: 'Van #22', fault: 'Brake Pad Wear Threshold Exceeded', status: 'WARNING', time: '14 mins ago' },
    { id: 'ALT-102', unit: 'Truck #03', fault: 'Oxygen Sensor Failure', status: 'RESOLVING', time: '1 hr ago' },
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">System Telemetry</h1>
          <p className="text-xs text-slate-500 mt-1">Real-time status analysis across all active operations pipelines.</p>
        </div>
        <div className="flex gap-1.5 bg-slate-200/60 p-1 rounded-lg border border-slate-200">
          {['ALL', 'OK', 'ALERT'].map((mode) => (
            <button
              key={mode}
              onClick={() => setFilterMetric(mode)}
              className={`px-3 py-1.5 text-[10px] font-bold tracking-wider rounded-md uppercase transition-all ${
                filterMetric === mode ? 'bg-white text-sky-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Array Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.filter(m => filterMetric === 'ALL' || m.type === filterMetric).map((metric, i) => {
          const Icon = metric.icon;
          return (
            <div key={i} className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">{metric.label}</span>
                <div className={`p-2 rounded-lg ${metric.type === 'ALERT' ? 'bg-rose-50 text-rose-600' : 'bg-sky-50 text-sky-600'}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">{metric.value}</h3>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">{metric.subtitle}</p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                <TrendingUp className="h-3 w-3" /> {metric.trend}
              </div>
            </div>
          );
        })}
      </div>

      {/* Warnings & Active Alerts Registry */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center gap-2">
          <Activity className="h-4 w-4 text-slate-400" />
          <h2 className="text-xs font-bold text-slate-800 tracking-wide uppercase">Active Incidents Monitor</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {alerts.map((alert) => (
            <div key={alert.id} className="p-4 flex items-center justify-between hover:bg-slate-50/40 text-xs transition-colors">
              <div className="flex items-center gap-4">
                <span className="font-mono text-slate-400 font-bold">{alert.id}</span>
                <div>
                  <h4 className="font-bold text-slate-900">{alert.unit}</h4>
                  <p className="text-slate-500 mt-0.5">{alert.fault}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-400 text-[11px] font-medium">{alert.time}</span>
                <span className={`px-2.5 py-0.5 font-bold rounded-full text-[9px] border ${
                  alert.status === 'CRITICAL' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                  alert.status === 'WARNING' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                  'bg-sky-50 text-sky-700 border-sky-200'
                }`}>
                  {alert.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
