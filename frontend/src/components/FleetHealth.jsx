import React from 'react';

const vehicleRows = [
  {
    asset: 'Long-Haul Gen 4',
    id: 'TRK-4092-B',
    stats: [
      { icon: 'thermostat', value: '195°F', label: 'Engine' },
      { icon: 'oil_barrel', value: '45 PSI', label: 'Oil' },
      { icon: 'battery_charging_full', value: '14.2V', label: 'Battery' }
    ],
    status: 'Online',
    statusClass: 'bg-emerald-100 text-emerald-700'
  },
  {
    asset: 'Heavy Duty Spec',
    id: 'TRK-8812-A',
    stats: [
      { icon: 'thermostat', value: '228°F', label: 'Engine' },
      { icon: 'oil_barrel', value: '22 PSI', label: 'Oil' },
      { icon: 'battery_charging_full', value: '12.8V', label: 'Battery' }
    ],
    status: 'Warning',
    statusClass: 'bg-rose-100 text-rose-700 border border-rose-200'
  },
  {
    asset: 'Delivery Van',
    id: 'VAN-1102-C',
    stats: [
      { icon: 'thermostat', value: '182°F', label: 'Engine' },
      { icon: 'oil_barrel', value: '52 PSI', label: 'Oil' },
      { icon: 'battery_charging_full', value: '13.9V', label: 'Battery' }
    ],
    status: 'Standby',
    statusClass: 'bg-slate-100 text-slate-500'
  },
  {
    asset: 'Logistics Plus',
    id: 'TRK-5523-S',
    stats: [
      { icon: 'thermostat', value: '201°F', label: 'Engine' },
      { icon: 'oil_barrel', value: '48 PSI', label: 'Oil' },
      { icon: 'battery_charging_full', value: '14.1V', label: 'Battery' }
    ],
    status: 'Online',
    statusClass: 'bg-emerald-100 text-emerald-700'
  }
];

const alerts = [
  {
    code: 'P0300',
    severity: 'CRITICAL',
    message: 'Multiple Cylinder Misfire Detected in Asset TRK-8812-A',
    asset: 'TRK-8812-A',
    time: '2m ago',
    color: 'bg-rose-500/20 text-rose-200',
    badge: 'bg-rose-500/10 text-rose-500'
  },
  {
    code: 'P0128',
    severity: 'MODERATE',
    message: 'Thermostat Temp Below Threshold',
    asset: 'TRK-4092-B',
    time: '15m ago',
    color: 'bg-white/5 text-slate-200',
    badge: 'bg-white/10 text-slate-200'
  },
  {
    code: 'P0442',
    severity: 'MINOR',
    message: 'Emission System Small Leak',
    asset: 'TRK-5523-S',
    time: '1h ago',
    color: 'bg-white/5 text-slate-200',
    badge: 'bg-white/10 text-slate-200'
  }
];

export default function FleetHealth() {
  return (
    <div className="h-full overflow-hidden bg-[#f8f9ff] text-[#0b1c30]">
      <div className="h-full flex flex-col gap-6 p-6 xl:p-8 overflow-hidden">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl lg:text-4xl font-semibold">Fleet Health Diagnostics</h1>
            <p className="mt-2 text-sm text-[#6b7280] max-w-2xl">
              Monitor vehicle vitals, active alerts, and fleet connectivity from the diagnostics center.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]">search</span>
              <input
                type="text"
                placeholder="Search vehicle ID..."
                className="w-full rounded-2xl border border-[#c5c6cf] bg-white py-3 pl-11 pr-4 text-sm text-[#0b1c30] shadow-sm outline-none focus:border-[#0266ff] focus:ring-2 focus:ring-[#cfe0ff]"
              />
            </div>
            <div className="flex items-center gap-3 text-sm text-[#0b1c30]">
              <button className="rounded-2xl border border-[#c5c6cf] bg-white px-4 py-3 hover:bg-[#f8f9ff] transition">Refresh Fleet</button>
              <button className="rounded-2xl bg-[#0266ff] px-4 py-3 text-white hover:bg-[#0057e6] transition">Export Data</button>
            </div>
          </div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <MetricCard title="Total Vehicles" value="1,248" detail="Fleet-wide assets" />
          <MetricCard title="Health Index" value="94.8%" detail="Stable" badgeText="Stable" badgeClass="bg-emerald-100 text-emerald-700" />
          <MetricCard title="Critical Faults" value="42" detail="Needs attention" badgeText="Critical" badgeClass="bg-rose-100 text-rose-700" accent="border-rose-200 bg-rose-50/80" />
          <MetricCard title="Recent Resolutions" value="88%" detail="Issue recovery rate" />
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 flex-1 min-h-0 overflow-hidden">
          <section className="xl:col-span-9 bg-white rounded-[28px] border border-[#c5c6cf] shadow-sm flex flex-col overflow-hidden">
            <div className="flex items-center justify-between gap-4 border-b border-[#e5eeff] bg-[#f8f9ff] px-6 py-5 sticky top-0 z-10">
              <h2 className="text-base font-semibold">Active Fleet Status</h2>
              <div className="flex items-center gap-2">
                <button className="rounded-2xl bg-white px-4 py-2 text-xs font-semibold text-[#0b1c30] shadow-sm hover:bg-[#f1f5f9] transition">Export Data</button>
                <button className="rounded-2xl bg-[#0266ff] px-4 py-2 text-xs font-semibold text-white shadow-lg hover:bg-[#0057e6] transition">Refresh Fleet</button>
              </div>
            </div>
            <div className="overflow-y-auto flex-1">
              <table className="min-w-full border-separate" style={{ borderSpacing: 0 }}>
                <thead className="bg-[#f8fafc]">
                  <tr>
                    <th className="px-6 py-4 text-left text-[11px] uppercase tracking-[0.2em] text-[#6b7280]">Asset</th>
                    <th className="px-6 py-4 text-left text-[11px] uppercase tracking-[0.2em] text-[#6b7280]">ID / VIN</th>
                    <th className="px-6 py-4 text-center text-[11px] uppercase tracking-[0.2em] text-[#6b7280]">Vital Stats</th>
                    <th className="px-6 py-4 text-right text-[11px] uppercase tracking-[0.2em] text-[#6b7280]">Connectivity</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicleRows.map((row) => (
                    <tr key={row.id} className={`group transition-colors ${row.status === 'Warning' ? 'bg-[#fff1f3] hover:bg-[#ffe3e8]' : 'hover:bg-[#f8f9ff]'}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-8 rounded-lg bg-[#e5efff] flex items-center justify-center text-[#0266ff]">
                            <span className="material-symbols-outlined">local_shipping</span>
                          </div>
                          <span className={`font-semibold text-sm ${row.status === 'Warning' ? 'text-rose-700' : 'text-[#0b1c30]'}`}>{row.asset}</span>
                        </div>
                      </td>
                      <td className={`px-6 py-4 text-xs font-medium ${row.status === 'Warning' ? 'text-rose-700' : 'text-[#6b7280]'}`}>{row.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-4">
                          {row.stats.map((stat) => (
                            <div key={stat.label} className="flex flex-col items-center text-[10px] text-[#6b7280] gap-1">
                              <span className="material-symbols-outlined text-sm text-current">{stat.icon}</span>
                              <span className={`font-semibold ${row.status === 'Warning' ? 'text-rose-700' : 'text-[#0b1c30]'}`}>{stat.value}</span>
                              <span>{stat.label}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] ${row.statusClass}`}>{row.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <aside className="xl:col-span-3 flex flex-col gap-4 min-h-0">
            <div className="bg-[#031635] rounded-[28px] overflow-hidden shadow-sm text-white flex flex-col h-full">
              <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-[11px] uppercase tracking-[0.24em] font-semibold">Active Alerts</h3>
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.code} className={`rounded-2xl border border-white/10 p-4 ${alert.color} hover:bg-white/10 transition cursor-pointer`}>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.25em]">{alert.code}</span>
                      <span className={`rounded-full px-2 py-1 text-[8px] font-bold uppercase tracking-[0.2em] ${alert.badge}`}>{alert.severity}</span>
                    </div>
                    <p className="text-sm text-white/90 leading-tight mb-3">{alert.message}</p>
                    <div className="flex items-center justify-between text-[10px] text-white/50">
                      <span>{alert.asset}</span>
                      <span>{alert.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="m-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-white hover:bg-white/10 transition">
                Full Incident Log
              </button>
            </div>
          </aside>
        </div>

        <section className="bg-white rounded-[28px] border border-[#c5c6cf] shadow-sm p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <span className="material-symbols-outlined">monitoring</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#031635]">Focused Insight: TRK-8812-A</p>
                <p className="text-sm text-[#6b7280]">Live telemetry stream for priority incident</p>
              </div>
            </div>
            <button className="rounded-2xl bg-[#0266ff] px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[#0057e6] transition">
              Initiate Remote Diagnostics
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatBlock label="Engine Thermal" value="228°F" status="Critical" statusClass="text-rose-700 bg-rose-100" />
            <StatBlock label="Utilization" value="2,158 RPM" status="Stable" statusClass="text-[#0b1c30] bg-[#f1f5ff]" />
            <StatBlock label="Load Balance" value="64%" status="Optimal" statusClass="text-emerald-700 bg-emerald-100" />
            <StatBlock label="Bus Voltage" value="12.8V" status="Stable" statusClass="text-[#0b1c30] bg-[#f1f5ff]" />
          </div>

          <div className="mt-8 bg-[#f8fafc] rounded-full h-3 overflow-hidden">
            <div className="h-full bg-rose-500" style={{ width: '85%' }} />
            <div className="h-full bg-[#0266ff]" style={{ width: '45%' }} />
            <div className="h-full bg-emerald-500" style={{ width: '64%' }} />
            <div className="h-full bg-[#0266ff]" style={{ width: '78%' }} />
          </div>
        </section>
      </div>
    </div>
  );
}

function MetricCard({ title, value, detail, badgeText, badgeClass, accent }) {
  return (
    <div className={`rounded-3xl border p-5 shadow-sm ${accent ?? 'bg-white border-[#c5c6cf]'}`}>
      <div className="flex items-center justify-between gap-4 mb-3">
        <p className="text-[11px] uppercase tracking-[0.24em] text-[#6b7280]">{title}</p>
        {badgeText && <span className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${badgeClass}`}>{badgeText}</span>}
      </div>
      <h2 className="text-3xl font-semibold text-[#031635]">{value}</h2>
      <p className="mt-2 text-sm text-[#6b7280]">{detail}</p>
    </div>
  );
}

function StatBlock({ label, value, status, statusClass }) {
  return (
    <div className="rounded-3xl border border-[#e5eeff] bg-[#f8f9ff] p-5">
      <p className="text-[10px] uppercase tracking-[0.24em] text-[#6b7280] mb-3">{label}</p>
      <p className="text-2xl font-semibold text-[#031635]">{value}</p>
      <p className={`mt-2 text-[10px] font-semibold uppercase tracking-[0.24em] ${statusClass}`}>{status}</p>
    </div>
  );
}
