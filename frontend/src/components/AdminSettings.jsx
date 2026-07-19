import React, { useState } from 'react';
import { Save, ShieldAlert, Cpu, HardDrive, CheckCircle2, Shield, Edit2, X, FileText, Trash2 } from 'lucide-react';

export default function AdminSettings() {
  // 1. Admin Profile State (Now Editable!)
  const [adminInfo, setAdminInfo] = useState({
    name: 'Marcus Thorne',
    email: 'm.thorne@fleetmanagement.com',
    clearance: 'Super Admin',
    status: 'Active'
  });
  
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempProfileData, setTempProfileData] = useState({ ...adminInfo });

  // 2. Settings configurations memory
  const [settings, setSettings] = useState({
    serverRefreshRate: '30',
    encryptionTier: 'AES-256-GCM',
    enableGlobalTelemetry: true
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [profileSavedSuccess, setProfileSavedSuccess] = useState(false);

  // Handle Profile Update Submission
  const handleProfileSave = (e) => {
    e.preventDefault();
    setAdminInfo({ ...tempProfileData });
    setIsEditingProfile(false);
    setProfileSavedSuccess(true);
    setTimeout(() => setProfileSavedSuccess(false), 3000);
  };

  // Handle Core Settings Save
  const handleSettingsSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Helper actions for the "More Features" section
  const triggerLogDownload = () => alert('Generating full encrypted telematics system log package... Download starting.');
  const clearSystemCache = () => alert('Application local cache purged successfully. Refreshing connection tokens.');

  return (
    <div className="p-8 space-y-6 max-w-2xl">
      {/* Page Title */}
      <div>
        <h1 className="text-xl font-black text-slate-900 tracking-tight">System Settings</h1>
        <p className="text-xs text-slate-500 mt-1">Review active operator credentials and manage application data behavior.</p>
      </div>

      {/* ─── INTERACTIVE ADMIN PROFILE CARD WITH EDIT FUNCTION ─── */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-2xs relative">
        {/* Profile Success Message */}
        {profileSavedSuccess && (
          <div className="absolute top-3 right-3 bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 text-[10px] px-2 py-1 rounded-md flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Profile Updated
          </div>
        )}

        {!isEditingProfile ? (
          // View Mode Layout
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden bg-sky-200 text-sky-800 rounded-full flex items-center justify-center font-bold text-sm shadow-xs">
                <span>{adminInfo.name.split(' ').map(n => n[0]).join('')}</span>
                <img
                  src="/admin-avatar.jpg"
                  alt={adminInfo.name}
                  onError={(event) => { event.currentTarget.style.display = 'none'; }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  {adminInfo.name} 
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-sky-50 text-sky-600 text-[10px] font-bold border border-sky-100">
                    <Shield className="h-2.5 w-2.5" /> {adminInfo.clearance}
                  </span>
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">{adminInfo.email}</p>
              </div>
            </div>
            <button 
              onClick={() => { setTempProfileData({ ...adminInfo }); setIsEditingProfile(true); }}
              className="px-2.5 py-1.5 border border-slate-200 rounded-lg text-slate-600 font-bold text-[11px] bg-white hover:bg-slate-50 shadow-2xs flex items-center gap-1.5 transition-all"
            >
              <Edit2 className="h-3 w-3" /> Edit Profile
            </button>
          </div>
        ) : (
          // Interactive Edit Mode Form
          <form onSubmit={handleProfileSave} className="space-y-4">
            <h4 className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">Modify Account Context</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Admin Name</label>
                <input 
                  type="text" 
                  required
                  value={tempProfileData.name}
                  onChange={(e) => setTempProfileData({ ...tempProfileData, name: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:border-sky-400"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Contact Email</label>
                <input 
                  type="email" 
                  required
                  value={tempProfileData.email}
                  onChange={(e) => setTempProfileData({ ...tempProfileData, email: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:border-sky-400"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button 
                type="button" 
                onClick={() => setIsEditingProfile(false)}
                className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-500 font-semibold text-xs bg-white hover:bg-slate-50"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-3 py-1.5 bg-sky-400 text-sky-950 font-bold text-xs rounded-lg hover:bg-sky-500 shadow-2xs"
              >
                Apply Details
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Settings Card Panel */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <form onSubmit={handleSettingsSave} className="p-6 space-y-6">
          
          {/* Setting 1: Refresh Rate */}
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-sky-50 border border-sky-100 rounded-lg text-sky-600">
              <Cpu className="h-4 w-4" />
            </div>
            <div className="flex-1 space-y-1">
              <label className="text-xs font-bold text-slate-900 block">Update Frequency (in seconds)</label>
              <input 
                type="number" 
                min="1"
                max="300"
                value={settings.serverRefreshRate}
                onChange={(e) => setSettings({...settings, serverRefreshRate: e.target.value})}
                className="w-full sm:w-32 bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:border-sky-400"
              />
              <p className="text-[11px] text-slate-400">How often the vehicles send live data updates back to this screen.</p>
            </div>
          </div>

          <div className="h-[1px] bg-slate-100" />

          {/* Setting 2: Security Type */}
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-sky-50 border border-sky-100 rounded-lg text-sky-600">
              <HardDrive className="h-4 w-4" />
            </div>
            <div className="flex-1 space-y-1">
              <label className="text-xs font-bold text-slate-900 block">Security Lock Level</label>
              <select 
                value={settings.encryptionTier}
                onChange={(e) => setSettings({...settings, encryptionTier: e.target.value})}
                className="w-full sm:w-64 bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:border-sky-400"
              >
                <option value="AES-256-GCM">High Security (Standard Vault)</option>
                <option value="ChaCha20-Poly1305">Balanced Security (Low Battery Usage)</option>
              </select>
              <p className="text-[11px] text-slate-400">The method used to lock and encrypt all incoming fleet network data packets.</p>
            </div>
          </div>

          <div className="h-[1px] bg-slate-100" />

          {/* Setting 3: Master Tracking Switch */}
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-sky-50 border border-sky-100 rounded-lg text-sky-600">
              <ShieldAlert className="h-4 w-4" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-900 cursor-pointer select-none" htmlFor="telemetry-toggle">
                  Enable Live Vehicle Tracking
                </label>
                <input 
                  id="telemetry-toggle"
                  type="checkbox" 
                  checked={settings.enableGlobalTelemetry}
                  onChange={(e) => setSettings({...settings, enableGlobalTelemetry: e.target.checked})}
                  className="h-4 w-4 text-sky-500 rounded border-slate-300 focus:ring-sky-400 cursor-pointer"
                />
              </div>
              <p className="text-[11px] text-slate-400">Master toggle switch. Turn off to stop recording telemetry parameters instantly.</p>
            </div>
          </div>

          {/* Bottom Control Action Bar */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between h-12">
            <div>
              {savedSuccess && (
                <span className="inline-flex items-center gap-1.5 text-emerald-700 text-xs font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 animate-fadeIn">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Changes Saved!
                </span>
              )}
            </div>
            <button 
              type="submit"
              className="px-4 py-2 bg-sky-400 hover:bg-sky-500 text-sky-950 rounded-lg font-bold text-xs shadow-sm transition-all flex items-center gap-2"
            >
              <Save className="h-3.5 w-3.5" /> Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* ─── NEW FEATURE: SYSTEM SHORTCUT UTILITIES ─── */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-xs font-bold text-slate-900 tracking-wide uppercase">Advanced Quick Actions</h2>
          <p className="text-[11px] text-slate-400 mt-0.5">Quick maintenance commands for immediate app cleanup.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button 
            onClick={triggerLogDownload}
            className="p-3 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-lg text-left text-xs font-bold text-slate-700 flex items-center gap-3 transition-colors"
          >
            <div className="p-1.5 bg-white border border-slate-200 rounded-md text-slate-500"><FileText className="h-4 w-4" /></div>
            <div>
              <span>Download Logs</span>
              <span className="text-[10px] text-slate-400 block font-normal mt-0.5">Export live data spreadsheet text.</span>
            </div>
          </button>

          <button 
            onClick={clearSystemCache}
            className="p-3 bg-rose-50/40 hover:bg-rose-50 border border-rose-100 rounded-lg text-left text-xs font-bold text-rose-800 flex items-center gap-3 transition-colors"
          >
            <div className="p-1.5 bg-white border border-rose-200 rounded-md text-rose-500"><Trash2 className="h-4 w-4 text-rose-500" /></div>
            <div>
              <span>Wipe Data Cache</span>
              <span className="text-[10px] text-rose-600/70 block font-normal mt-0.5">Force flush system memories.</span>
            </div>
          </button>
        </div>
      </div>

    </div>
  );
}
