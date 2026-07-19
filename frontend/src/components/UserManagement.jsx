import React, { useState, useEffect } from 'react';
import { UserPlus, Shield, CheckCircle, AlertTriangle, Loader2, X, Search } from 'lucide-react';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  
  // Interactive Panel States
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUserData, setNewUserData] = useState({ name: '', email: '', role: 'DRIVER', status: 'Active' });

  // Fetch directory list from running backend server
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/admin/users', {
          headers: {
            'Authorization': 'Bearer super_secret_fleet_intel_token_signature_key_2026'
          }
        });
        
        if (!response.ok) throw new Error('Failed to stream live directory matrix.');
        
        const resData = await response.json();
        setUsers(resData.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Live client-side search query filtering
  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Persist a new profile in the directory database.
  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!newUserData.name || !newUserData.email) return alert('Please fill out all required fields.');

    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/v1/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer super_secret_fleet_intel_token_signature_key_2026'
        },
        body: JSON.stringify(newUserData)
      });
      const resData = await response.json();

      if (!response.ok) throw new Error(resData.message || 'Unable to provision the user.');

      setUsers((currentUsers) => [...currentUsers, resData.data]);
      setNewUserData({ name: '', email: '', role: 'DRIVER', status: 'Active' });
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-12 text-slate-500 gap-2">
      <Loader2 className="h-6 w-6 animate-spin text-sky-500" />
      <span className="text-xs font-semibold tracking-wide uppercase">Syncing Fleet Directory...</span>
    </div>
  );

  if (error) return (
    <div className="m-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 text-xs font-medium">
      <AlertTriangle className="h-5 w-5 shrink-0 text-red-500" />
      <span>Telemetry Fault: {error} (Check backend server port status)</span>
    </div>
  );

  return (
    <div className="p-8 space-y-6 relative">
      {/* Title Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">User Directory</h1>
          <p className="text-xs text-slate-500 mt-1">Manage system personnel privileges and clearance configurations.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-sky-400 hover:bg-sky-500 text-sky-950 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
        >
          <UserPlus className="h-4 w-4" /> Provision User
        </button>
      </div>

      {/* Interactive Search Field */}
      <div className="w-80 relative">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
          <Search className="h-3.5 w-3.5" />
        </span>
        <input 
          type="text"
          placeholder="Filter personnel by name, email, or role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-sky-400 shadow-xs"
        />
      </div>

      {/* Roster Data Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-200 text-[10px] font-bold text-slate-400 tracking-wider uppercase">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Access Level</th>
              <th className="p-4">Telemetry Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/40 transition-colors">
                  <td className="p-4 font-bold text-slate-900">{user.name}</td>
                  <td className="p-4 text-slate-500">{user.email}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-semibold text-[11px] border border-slate-200">
                      <Shield className="h-3 w-3 text-slate-400" /> {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      user.status === 'Active' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {user.status === 'Active' && <CheckCircle className="h-3 w-3 text-emerald-500" />}
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-8 text-center text-slate-400 italic">No personnel profiles match your query search criteria.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Creation Popup Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white rounded-xl border border-slate-200 w-full max-w-md p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-sm tracking-tight">Provision New System Profile</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wide block">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Alexander Pierce"
                  value={newUserData.name}
                  onChange={(e) => setNewUserData({...newUserData, name: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:border-sky-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wide block">Corporate Email</label>
                <input 
                  type="email" 
                  required
                  placeholder="e.g. a.pierce@fleetmanagement.com"
                  value={newUserData.email}
                  onChange={(e) => setNewUserData({...newUserData, email: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:border-sky-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wide block">Clearance Level</label>
                  <select 
                    value={newUserData.role}
                    onChange={(e) => setNewUserData({...newUserData, role: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:border-sky-400"
                  >
                    <option value="DRIVER">Driver</option>
                    <option value="TECHNICIAN">Technician</option>
                    <option value="FLEET_MANAGER">Fleet Manager</option>
                    <option value="DISPATCHER">Dispatcher</option>
                    <option value="SAFETY_INSPECTOR">Safety Inspector</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wide block">Initial Status</label>
                  <select 
                    value={newUserData.status}
                    onChange={(e) => setNewUserData({...newUserData, status: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:border-sky-400"
                  >
                    <option value="Active">Active</option>
                    <option value="In Workshop">In Workshop</option>
                    <option value="On Route">On Route</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-semibold text-xs hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 bg-sky-400 hover:bg-sky-500 text-sky-950 rounded-lg font-bold text-xs shadow-sm transition-all"
                >
                  {isSaving ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
