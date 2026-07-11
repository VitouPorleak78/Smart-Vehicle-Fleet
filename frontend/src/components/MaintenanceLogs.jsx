import React from 'react';

export default function MaintenanceLogs() {
  return (
    <div className="flex-1 h-full overflow-hidden bg-[#f8f9ff]">
      <div className="p-8 space-y-6 max-w-[1600px] mx-auto h-full flex flex-col max-h-[calc(100vh-64px)]">
        <div className="flex items-center justify-between">
          <div>
            <nav className="flex items-center gap-2 text-sm text-[#6b7280] mb-2">
              <span>Admin Console</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              <span className="text-[#0b1c30] font-medium">Maintenance Oversight</span>
            </nav>
            <h2 className="text-4xl font-semibold text-[#031635]">Maintenance Oversight</h2>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center bg-white border border-[#c5c6cf] rounded-lg px-4 py-2 text-sm text-[#0b1c30]">
              <span className="material-symbols-outlined text-[#0b1c30] mr-2">filter_list</span>
              <span className="font-medium">Filter Views</span>
            </div>
            <button className="bg-[#0266ff] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-3 hover:bg-[#0057e6] transition-all shadow-lg shadow-[#0266ff]/20">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
              Add Maintenance Record
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          <StatCard icon="analytics" title="Monthly Totals" value="142 Logs" accent="text-[#0266ff]" />
          <StatCard icon="warning" title="Critical Alerts" value="08 Pending" accent="text-[#ba1a1a]" grayBg />
          <StatCard icon="engineering" title="In Workshop" value="14 Active" accent="text-[#0b1c30]" />
          <StatCard icon="payments" title="Avg. Cost" value="$412.50" accent="text-[#0b1c30]" grayBg secondary />
        </div>

        <div className="flex-1 min-h-0 grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-white rounded-2xl border border-[#c5c6cf] shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-[#c5c6cf] flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#031635]">All Maintenance Logs</h3>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280] text-[18px]">search</span>
                  <input className="bg-[#f1f5f9] rounded-lg pl-11 pr-3 py-2 text-sm w-64 border border-[#e5eeff]" placeholder="Filter logs..." type="text" />
                </div>
                <button className="p-2 hover:bg-[#f1f5f9] rounded-lg text-[#6b7280] transition-colors">
                  <span className="material-symbols-outlined">download</span>
                </button>
                <button className="p-2 hover:bg-[#f1f5f9] rounded-lg text-[#6b7280] transition-colors">
                  <span className="material-symbols-outlined">print</span>
                </button>
              </div>
            </div>
            <div className="overflow-y-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 z-10 bg-[#f8f9ff]/95 backdrop-blur-sm">
                  <tr>
                    <th className="px-6 py-4 text-[11px] uppercase tracking-[0.2em] text-[#6b7280]">Vehicle ID</th>
                    <th className="px-6 py-4 text-[11px] uppercase tracking-[0.2em] text-[#6b7280]">Maintenance Type</th>
                    <th className="px-6 py-4 text-[11px] uppercase tracking-[0.2em] text-[#6b7280]">Technician</th>
                    <th className="px-6 py-4 text-[11px] uppercase tracking-[0.2em] text-[#6b7280]">Date</th>
                    <th className="px-6 py-4 text-[11px] uppercase tracking-[0.2em] text-[#6b7280]">Status</th>
                    <th className="px-6 py-4 text-[11px] uppercase tracking-[0.2em] text-[#6b7280] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c5c6cf]">
                  {rows.map((row) => (
                    <tr key={row.id} className="hover:bg-[#f8fbff] transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded bg-[#eef4ff] flex items-center justify-center text-[#0266ff]">
                            <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                          </div>
                          <span className="font-semibold text-[#0266ff]">{row.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <p className="font-medium text-[#0b1c30]">{row.task}</p>
                        <p className="text-sm text-[#6b7280]">{row.detail}</p>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          {row.tech && (
                            <>
                              <div className="w-7 h-7 rounded-full bg-[#eef4ff] flex items-center justify-center text-[11px] font-bold text-[#0266ff]">{row.techInitials}</div>
                              <span className="text-sm text-[#0b1c30]">{row.tech}</span>
                            </>
                          )}
                          {!row.tech && <span className="text-sm italic text-[#6b7280]">Unassigned</span>}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-sm text-[#0b1c30]">{row.date}</p>
                        {row.next && <p className="text-[11px] text-[#6b7280]">Next: {row.next}</p>}
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase flex items-center gap-2 ${statusClasses[row.status]}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusDotClasses[row.status]}`} />
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button className="p-2 hover:bg-[#f1f5f9] rounded-lg transition-all text-[#6b7280]">
                          <span className="material-symbols-outlined">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-[#f8fbff] border-t border-[#e5eeff] flex items-center justify-between">
              <p className="text-sm text-[#6b7280]">Showing <span className="font-semibold text-[#0b1c30]">1 - 4</span> of 142 entries</p>
              <div className="flex items-center gap-2 text-sm">
                <button className="p-2 rounded border border-[#c5c6cf] text-[#6b7280] bg-[#f8f9ff] disabled:opacity-50" disabled>
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="w-9 h-9 rounded bg-[#0266ff] text-white font-semibold">1</button>
                <button className="w-9 h-9 rounded hover:bg-[#f1f5f9] text-[#0b1c30]">2</button>
                <button className="w-9 h-9 rounded hover:bg-[#f1f5f9] text-[#0b1c30]">3</button>
                <button className="p-2 rounded border border-[#c5c6cf] text-[#6b7280] hover:bg-[#f1f5f9]">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 h-full">
            <div className="flex-1 bg-[#f8fbff] rounded-2xl border border-[#c5c6cf] shadow-sm p-6 flex flex-col min-h-0">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-sm font-semibold text-[#031635]">Maintenance Timeline</h3>
                  <p className="text-sm text-[#6b7280] mt-1">Completed jobs per day</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#eff4ff] text-[11px] font-semibold text-[#6b7280]">Last 7 Days</span>
              </div>
              <div className="flex-1 flex items-end gap-3 px-2 pb-2">
                {timelineData.map((item) => (
                  <div key={item.label} className="flex-1 flex flex-col items-center gap-2">
                    <div className={`w-full rounded-t-md group relative ${item.active ? 'bg-[#0266ff]' : 'bg-[#dbeafe]'}`} style={{ height: item.height }}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#031635] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                        {item.labelJobs} Jobs
                      </div>
                    </div>
                    <span className={`text-[10px] uppercase ${item.active ? 'text-[#031635] font-bold' : 'text-[#6b7280]'}`}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 bg-[#f8fbff] rounded-2xl border border-[#c5c6cf] shadow-sm p-6 flex flex-col items-center justify-center text-center">
              <h3 className="text-sm font-semibold text-[#031635] mb-6 w-full text-left">Workshop Efficiency</h3>
              <div className="relative w-44 h-44 flex items-center justify-center mb-6">
                <svg className="w-full h-full -rotate-90">
                  <circle className="text-[#eff4ff]" cx="88" cy="88" fill="transparent" r="80" stroke="currentColor" strokeWidth="14" />
                  <circle className="text-[#0266ff]" cx="88" cy="88" fill="transparent" r="80" stroke="currentColor" strokeWidth="14" strokeDasharray="502.4" strokeDashoffset="75.3" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-[#031635]">85%</span>
                  <span className="text-[11px] uppercase text-[#6b7280]">Uptime</span>
                </div>
              </div>
              <p className="text-sm text-[#6b7280] max-w-[240px] mb-6">Efficiency is trending upward. <span className="text-[#16a34a] font-semibold">+4.2%</span> since last reporting period.</p>
              <button className="text-[#0266ff] font-semibold hover:underline flex items-center gap-2 group">
                Detailed Analytics Report
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const StatCard = ({ icon, title, value, accent, grayBg, secondary }) => (
  <div className={`p-6 rounded-xl border shadow-sm flex items-center gap-6 ${grayBg ? 'bg-[#f8f9ff] border-[#e5eeff]' : 'bg-white border-[#e5eeff]'}`}>
    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${secondary ? 'bg-[#d8e2ff] text-[#031635]' : 'bg-[#eff4ff]'}`}>
      <span className={`material-symbols-outlined text-[32px] ${accent}`}>{icon}</span>
    </div>
    <div>
      <p className="text-[11px] uppercase tracking-[0.2em] text-[#6b7280] mb-1">{title}</p>
      <p className="text-3xl font-bold text-[#0b1c30]">{value}</p>
    </div>
  </div>
);

const statusClasses = {
  Completed: 'bg-green-100 text-green-700 border border-green-100',
  'In Progress': 'bg-[#eff4ff] text-[#0b1c30] border border-[#dbeafe]',
  Scheduled: 'bg-[#f8fafc] text-[#6b7280] border border-[#dbeafe]',
  Critical: 'bg-red-100 text-red-600 border border-red-100'
};

const statusDotClasses = {
  Completed: 'bg-green-600',
  'In Progress': 'bg-[#2563eb]',
  Scheduled: 'bg-[#6b7280]',
  Critical: 'bg-red-600'
};

const rows = [
  {
    id: 'VX-4092',
    task: 'Engine Oil & Filter',
    detail: 'Routine 50k Checkup',
    tech: 'Marcus Chen',
    techInitials: 'MC',
    date: 'Oct 24, 2023',
    next: 'Jan 24, 2024',
    status: 'Completed'
  },
  {
    id: 'VX-8821',
    task: 'Brake Pad Replacement',
    detail: 'Safety Inspection Alert',
    tech: 'Sarah Lopez',
    techInitials: 'SL',
    date: 'Oct 26, 2023',
    status: 'In Progress'
  },
  {
    id: 'VX-1104',
    task: 'Transmission Flush',
    detail: 'Scheduled Quarterly',
    tech: null,
    techInitials: '',
    date: 'Nov 02, 2023',
    status: 'Scheduled'
  },
  {
    id: 'VX-2290',
    task: 'Annual Inspection',
    detail: 'Regulatory Compliance',
    tech: 'David Kim',
    techInitials: 'DK',
    date: 'Oct 20, 2023',
    status: 'Completed'
  }
];

const timelineData = [
  { label: 'Mon', height: '40%', labelJobs: 12 },
  { label: 'Tue', height: '65%', labelJobs: 18 },
  { label: 'Wed', height: '95%', labelJobs: 22, active: true },
  { label: 'Thu', height: '35%', labelJobs: 9 },
  { label: 'Fri', height: '55%', labelJobs: 15 },
  { label: 'Sat', height: '45%', labelJobs: 11 },
  { label: 'Sun', height: '85%', labelJobs: 19 }
];
