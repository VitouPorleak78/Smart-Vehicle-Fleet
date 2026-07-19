import React from 'react';

const users = [
  {
    initials: 'JD',
    name: 'Jordan Davies',
    email: 'j.davies@fleetintel.com',
    role: 'System Admin',
    state: 'Active Now',
    badgeClass: 'bg-emerald-100 text-emerald-700',
    stateDot: 'bg-emerald-600',
    actions: ['Edit Policies', 'Revoke Access']
  },
  {
    initials: 'SM',
    name: 'Sarah Miller',
    email: 's.miller@fleetintel.com',
    role: 'Fleet Manager',
    state: 'Offline',
    badgeClass: 'bg-slate-100 text-slate-500',
    stateDot: 'bg-slate-400',
    actions: ['Edit Policies', 'Revoke Access']
  }
];

export default function UserManagement() {
  return (
    <div className="h-full overflow-hidden bg-[#f8f9ff] text-[#0b1c30]">
      <div className="flex h-full flex-col gap-6 p-6 xl:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl lg:text-4xl font-semibold">User Management</h1>
            <p className="mt-2 max-w-2xl text-sm text-[#6b7280]">
              Manage system access, role assignments, and authorization controls from a single admin console.
            </p>
          </div>
          <div className="flex flex-col gap-4 rounded-[28px] border border-[#c5c6cf] bg-white px-5 py-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#0266ff]">
                <span className="material-symbols-outlined">groups</span>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-[#6b7280]">Total Operators</p>
                <p className="text-2xl font-bold text-[#031635]">42</p>
              </div>
            </div>
            <div className="flex items-center gap-4 border-t border-[#e5eeff] pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                  <span className="material-symbols-outlined">verified_user</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[#6b7280]">Admin Tiers</p>
                  <p className="text-2xl font-bold text-[#031635]">3</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#0266ff]">
                  <span className="material-symbols-outlined">sensors</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[#6b7280]">Active Connections</p>
                  <p className="text-2xl font-bold text-[#031635]">18</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden rounded-[28px] border border-[#c5c6cf] bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-[#e5eeff] bg-[#f8fafc] px-8 py-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#6b7280] font-semibold">Access Group:</span>
                <select className="rounded-2xl border border-[#c5c6cf] bg-white px-4 py-2 text-sm font-semibold text-[#031635] outline-none focus:border-[#0266ff] focus:ring-2 focus:ring-[#cfe0ff]">
                  <option>All Roles</option>
                  <option>System Admin</option>
                  <option>Fleet Manager</option>
                  <option>Operator</option>
                </select>
              </div>
            </div>
            <button className="flex items-center gap-2 rounded-2xl bg-[#0266ff] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0266ff]/20 hover:bg-[#0057e6] transition">
              <span className="material-symbols-outlined">person_add</span>
              Add New User
            </button>
          </div>

          <div className="h-full overflow-y-auto">
            <table className="min-w-full border-separate" style={{ borderSpacing: 0 }}>
              <thead className="sticky top-0 z-10 bg-[#f8fafc]">
                <tr className="text-left text-[10px] uppercase tracking-[0.28em] text-[#6b7280]">
                  <th className="px-8 py-5">System Identity</th>
                  <th className="px-8 py-5">Access Group Role</th>
                  <th className="px-8 py-5">Connection State</th>
                  <th className="px-8 py-5 text-right">Authorization Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5eeff]">
                {users.map((user) => (
                  <tr key={user.email} className="hover:bg-[#f8f9ff] transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#f1f5ff] flex items-center justify-center text-[#0266ff] font-bold">{user.initials}</div>
                        <div>
                          <p className="font-semibold text-[#031635]">{user.name}</p>
                          <p className="text-xs text-[#6b7280]">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm font-medium text-[#031635]">{user.role}</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] ${user.badgeClass}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.stateDot}`} />
                        {user.state}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="mr-4 text-xs font-bold text-[#0266ff] hover:underline">Edit Policies</button>
                      <button className="text-xs font-bold text-[#ba1a1a] hover:underline">Revoke Access</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-[#e5eeff] bg-[#f8fafc] px-8 py-3 text-sm text-[#6b7280]">
            <p>Showing <span className="font-semibold text-[#031635]">1-2</span> of 42 users</p>
            <div className="flex items-center gap-1">
              <button className="rounded-full p-2 text-[#6b7280] hover:bg-[#eef4ff] transition">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-8 h-8 rounded-full bg-[#0266ff] text-white text-xs font-bold">1</button>
              <button className="w-8 h-8 rounded-full text-[#031635] text-xs font-bold hover:bg-[#eef4ff] transition">2</button>
              <button className="rounded-full p-2 text-[#6b7280] hover:bg-[#eef4ff] transition">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
