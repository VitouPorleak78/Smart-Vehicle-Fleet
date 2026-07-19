import React, { useEffect, useState } from 'react';

// --- Built-in SVG Icons ---
const IconSearch = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const IconBell = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const IconTruck = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 011 1v0m0 0h2a1 1 0 001-1v-4a1 1 0 00-1-1h-2m-3-1V6" />
  </svg>
);

const IconTrendingUp = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const IconWrench = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconAlertTriangle = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const IconArrowRight = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export default function AdminDashboard() {
  const [criticalCount, setCriticalCount] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCriticalCount(prev => (prev === 3 ? 2 : 3));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden bg-[#f8f9ff]">
      <header className="h-20 flex items-center justify-between px-10 shrink-0 bg-white/80 backdrop-blur-md border-b border-[#e5eeff]">
        <div className="relative w-96">
          <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[#75777f]">
            <IconSearch />
          </span>
          <input
            className="w-full bg-transparent border-none pl-8 pr-4 py-2 text-sm focus:ring-0 placeholder:text-[#75777f]/60 outline-none"
            placeholder="Search systems or assets..."
            type="text"
          />
        </div>
        <div className="flex items-center gap-6">
          <button className="relative text-[#6b7280] hover:text-[#031635] transition-colors">
            <IconBell />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#ba1a1a] rounded-full border-2 border-white"></span>
          </button>
          <div className="h-6 w-px bg-[#c5c6cf]" />
          <button className="bg-[#0266ff] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#0057e6] transition-all shadow-sm">
            System Action
          </button>
        </div>
      </header>

      <div className="flex-1 p-10 space-y-10 overflow-hidden flex flex-col">
        <div className="flex items-end justify-between shrink-0">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-[#0b1c30]">Admin Overview</h2>
            <p className="text-[#6b7280] text-sm mt-1">Real-time system diagnostics and resource management.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 text-sm font-semibold text-[#0b1c30] hover:bg-[#f1f5f9] rounded-lg border border-[#c5c6cf] transition-colors">
              Filter View
            </button>
            <button className="px-4 py-2 text-sm font-semibold text-[#0b1c30] hover:bg-[#f1f5f9] rounded-lg border border-[#c5c6cf] transition-colors">
              Export Data
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 shrink-0">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e5eeff]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#75777f] mb-1">Total Fleet Assets</p>
                <h3 className="text-4xl font-semibold text-[#031635]">24</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <IconTruck />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-green-600 text-[13px] font-medium">
              <IconTrendingUp />
              <span>+2 newly commissioned this week</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e5eeff]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#75777f] mb-1">Active Repairs</p>
                <h3 className="text-4xl font-semibold text-[#031635]">8</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                <IconWrench />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[#6b7280] text-[13px]">
              <div className="flex -space-x-2">
                <div className="w-5 h-5 rounded-full border-2 border-white bg-slate-200" />
                <div className="w-5 h-5 rounded-full border-2 border-white bg-slate-300" />
                <div className="w-5 h-5 rounded-full border-2 border-white bg-slate-400" />
              </div>
              <span>Assigned to 12 maintenance staff</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e5eeff] border-l-4 border-l-[#ba1a1a]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#ba1a1a] mb-1">Critical Alerts</p>
                <h3 className="text-4xl font-semibold text-[#ba1a1a]">{criticalCount}</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <IconAlertTriangle />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-red-600 text-[13px] font-bold">
              <span>Awaiting immediate intervention</span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex gap-8 min-h-0">
          <div className="flex-[2] bg-white rounded-2xl flex flex-col overflow-hidden shadow-sm border border-[#e5eeff]">
            <div className="px-8 py-6 border-b border-[#e5eeff] flex items-center justify-between shrink-0">
              <h3 className="text-lg font-semibold">Active Service Management</h3>
              <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.24em]">
                <div className="flex items-center gap-1.5 text-blue-600">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  8 Active
                </div>
                <div className="flex items-center gap-1.5 text-[#6b7280]">
                  <span className="w-2 h-2 rounded-full bg-[#cbd5e1]" />
                  4 Queued
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <table className="w-full text-left">
                <thead className="bg-[#eff4ff]/30 border-b border-[#e5eeff] sticky top-0 z-10">
                  <tr>
                    <th className="pl-8 pr-4 py-4 text-[11px] uppercase tracking-[0.2em] text-[#75777f]">Asset</th>
                    <th className="px-4 py-4 text-[11px] uppercase tracking-[0.2em] text-[#75777f]">Task Description</th>
                    <th className="px-4 py-4 text-[11px] uppercase tracking-[0.2em] text-[#75777f]">Priority</th>
                    <th className="px-4 py-4 text-[11px] uppercase tracking-[0.2em] text-[#75777f]">Assigned</th>
                    <th className="pl-4 pr-8 py-4 text-[11px] uppercase tracking-[0.2em] text-[#75777f] text-right">Progress</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eff4ff]/50">
                  {[
                    { id: '#TRK-8802', task: 'Heavy Brake System Replacement', priority: 'Critical', agent: 'M. Rivera', progress: 65, label: 'MR', badge: 'critical' },
                    { id: '#TRK-4412', task: 'Synthetic Oil & Filter Service', priority: 'Medium', agent: 'P. Chen', progress: 30, label: 'PC', badge: 'medium' },
                    { id: '#TRK-1092', task: 'Tire Rotation & Alignment', priority: 'Routine', agent: 'J. Doe', progress: 90, label: 'JD', badge: 'routine' }
                  ].map((row) => (
                    <tr key={row.id} className="hover:bg-[#f8fbff] transition-colors group">
                      <td className="pl-8 pr-4 py-5 text-sm font-semibold text-[#0266ff]">{row.id}</td>
                      <td className="px-4 py-5 text-sm text-[#0b1c30]">{row.task}</td>
                      <td className="px-4 py-5">
                        <span className={`px-2.5 py-1 text-[10px] font-bold rounded-md border uppercase ${
                          row.badge === 'critical'
                            ? 'bg-red-50 text-red-600 border-red-100'
                            : row.badge === 'medium'
                            ? 'bg-orange-50 text-orange-600 border-orange-100'
                            : 'bg-green-50 text-green-600 border-green-100'
                        }`}>
                          {row.priority}
                        </span>
                      </td>
                      <td className="px-4 py-5">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#f1f5f9] flex items-center justify-center text-[10px] font-bold text-[#334155]">{row.label}</div>
                          <span className="text-sm text-[#0b1c30]">{row.agent}</span>
                        </div>
                      </td>
                      <td className="pl-4 pr-8 py-5">
                        <div className="flex items-center justify-end gap-3">
                          <div className="w-20 h-1 bg-[#eff4ff] rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${
                              row.badge === 'critical'
                                ? 'bg-red-600'
                                : row.badge === 'medium'
                                ? 'bg-orange-500'
                                : 'bg-green-500'
                            }`} style={{ width: `${row.progress}%` }} />
                          </div>
                          <span className="text-[11px] font-medium text-[#6b7280]">{row.progress}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-8 py-4 bg-[#f8fbff] border-t border-[#e5eeff] flex items-center justify-between shrink-0">
              <p className="text-xs text-[#6b7280]">Showing active maintenance queue</p>
              <button className="text-[#0266ff] font-bold text-xs hover:underline flex items-center gap-1.5">
                <span>Open Service Center</span>
                <IconArrowRight />
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-8 min-w-[400px]">
            <div className="bg-white rounded-2xl flex-1 flex flex-col overflow-hidden shadow-sm border border-[#e5eeff]">
              <div className="p-6 shrink-0 z-10 bg-white/60 backdrop-blur-sm border-b border-[#e5eeff]/50">
                <h4 className="text-sm font-bold text-[#031635]">Fleet Distribution</h4>
                <p className="text-[11px] text-[#6b7280] mt-1">Real-time geographical spread</p>
              </div>
              <div className="flex-1 bg-[#f1f5f9] relative overflow-hidden">
                <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                <div className="absolute top-[40%] left-[60%] flex flex-col items-center gap-1 group">
                  <span className="w-4 h-4 bg-[#0266ff] rounded-full ring-4 ring-[#0266ff]/20 shadow-lg" />
                  <span className="hidden group-hover:block bg-[#031635] text-white text-[10px] px-2 py-1 rounded shadow-xl whitespace-nowrap">8 Assets (Main Hub)</span>
                </div>
                <div className="absolute top-[65%] left-[25%]"><span className="block w-2.5 h-2.5 bg-orange-400 rounded-full ring-4 ring-orange-400/20 shadow-md" /></div>
                <div className="absolute top-[30%] left-[15%]"><span className="block w-2.5 h-2.5 bg-[#0266ff] rounded-full ring-4 ring-[#0266ff]/20 shadow-md" /></div>
                <div className="absolute bottom-[20%] right-[30%]"><span className="block w-2.5 h-2.5 bg-[#0266ff] rounded-full ring-4 ring-[#0266ff]/20 shadow-md" /></div>
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-[#e5eeff] shadow-sm">
                  <div className="flex justify-around items-center">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#0266ff]" />
                      <span className="text-[10px] font-bold uppercase text-[#6b7280]">Active (18)</span>
                    </div>
                    <div className="h-4 w-px bg-[#e5eeff]" />
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-400" />
                      <span className="text-[10px] font-bold uppercase text-[#6b7280]">In Transit (6)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 h-[180px] flex flex-col justify-between shadow-sm border border-[#e5eeff]">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-[#031635]">Facility Capacity</h4>
                <span className="text-[11px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">Optimal</span>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[11px] mb-1.5 text-[#6b7280] font-medium">
                    <span>Main Workshop Bays</span>
                    <span>14 / 20 Occupied</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#eff4ff] rounded-full">
                    <div className="h-full bg-[#031635] rounded-full" style={{ width: '70%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-1.5 text-[#6b7280] font-medium">
                    <span>Express Lane</span>
                    <span>2 / 4 Occupied</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#eff4ff] rounded-full">
                    <div className="h-full bg-[#0266ff] rounded-full" style={{ width: '50%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}