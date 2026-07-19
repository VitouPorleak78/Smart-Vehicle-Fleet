import React from 'react';
import { Users, Shield } from 'lucide-react';

export default function UserManagement() {
  const users = [
    { id: 'USR-01', name: 'Alex Johnson', role: 'Administrator', email: 'alex.johnson@email.com' },
    { id: 'USR-02', name: 'Sarah Smith', role: 'Dispatcher', email: 'sarah.s@email.com' },
  ];

  return (
    <div className="p-8 space-y-6 bg-[#F1F5F9] min-h-screen text-slate-800">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">User Management</h1>
        <p className="text-xs text-slate-500 mt-1">Manage system personnel profiles, access controls, and administrative privileges.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <th className="p-4">User ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email Address</th>
              <th className="p-4">Access Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-700">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-mono text-slate-400">{user.id}</td>
                <td className="p-4 font-bold text-slate-900">{user.name}</td>
                <td className="p-4 text-slate-600">{user.email}</td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 border border-slate-200 font-medium text-[10px] uppercase">
                    <Shield className="h-3 w-3 text-slate-400" />
                    {user.role}
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