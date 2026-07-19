import React, { useState } from 'react';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [fullName, setFullName] = useState('Marcus Thorne');
  const [role] = useState('Fleet Administrator');
  const [email, setEmail] = useState('admin.thorne@fleetintel.com');
  const [phone, setPhone] = useState('+1 (555) 234-8800');
  const [bio, setBio] = useState('Dedicated fleet management professional with over 8 years of experience in logistics optimization and system administration.');

  function handleSaveProfile(e) {
    e.preventDefault();
    console.log('Save profile', { fullName, email, phone, bio });
    alert('Admin details saved (demo)');
  }

  function handleSaveNotifications(e) {
    e.preventDefault();
    alert('Notification preferences saved (demo)');
  }

  function handleUpdatePassword(e) {
    e.preventDefault();
    alert('Password updated (demo)');
  }

  return (
    <div className="p-8 h-full overflow-auto">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-6">
          <h2 className="text-4xl font-semibold">Admin Settings</h2>
          <p className="text-slate-600 mt-2">Manage administrative profile, system permissions, and organization preferences</p>
        </div>

        <div className="border-b border-slate-200 flex gap-10 mb-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`relative py-4 px-2 text-lg ${activeTab === 'profile' ? 'text-secondary' : 'text-slate-600'}`}
          >
            Admin Profile
            <div className={`active-tab-indicator ${activeTab === 'profile' ? '' : 'hidden'}`} />
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`relative py-4 px-2 text-lg ${activeTab === 'notifications' ? 'text-secondary' : 'text-slate-600'}`}
          >
            System Notifications
            <div className={`active-tab-indicator ${activeTab === 'notifications' ? '' : 'hidden'}`} />
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`relative py-4 px-2 text-lg ${activeTab === 'password' ? 'text-secondary' : 'text-slate-600'}`}
          >
            Security
            <div className={`active-tab-indicator ${activeTab === 'password' ? '' : 'hidden'}`} />
          </button>
        </div>

        <div className="grid grid-cols-12 gap-10">
          {activeTab === 'profile' && (
            <>
              <div className="col-span-4">
                <div className="bg-white rounded-xl p-8 border shadow-sm text-center sticky top-6">
                  <div className="relative inline-block mb-6">
                    <img alt="Admin Portrait" className="w-48 h-48 rounded-full mx-auto object-cover border-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYkGYnqWYqMzSkS7TAzb0ZYoX-dCtdxmdKhrdkh4ND71pOeNLjNwZwllecmczC1lvedaZW2DpQnzIre3nTClYA0EVbP7vPtZwcxW5wk3IVs-_laoTQiQjEIImnnqCZ7jppVVRChaW9HkMEtphBxVTo_YqSVAo1DvsCwV6QBYM0TaI8EO8HslI-VzwY2SvjAJLw7YDoHdgVutiPFOgCR28HO0r0tC9j-6YB6tBj6un2txVmIrjKDec5lWtzQo49msaEorOK7mmQH8xB" />
                    <button className="absolute bottom-2 right-2 bg-secondary text-white p-2.5 rounded-full">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                  </div>
                  <h3 className="text-2xl font-semibold">{fullName}</h3>
                  <p className="text-sm text-secondary mt-1">{role}</p>
                  <div className="mt-6 text-left border-t pt-6 space-y-4">
                    <div className="flex items-center gap-3 text-slate-600">
                      <span className="material-symbols-outlined">admin_panel_settings</span>
                      <span>Level: Super Admin</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <span className="material-symbols-outlined">calendar_today</span>
                      <span>Managed since Oct 2021</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <span className="material-symbols-outlined">verified_user</span>
                      <span>Identity Verified</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-8">
                <div className="bg-white rounded-xl p-8 border shadow-sm h-full flex flex-col">
                  <h4 className="text-2xl mb-6 flex items-center gap-2"><span className="material-symbols-outlined">person</span> Admin Information</h4>
                  <form className="grid grid-cols-2 gap-6 flex-1" onSubmit={handleSaveProfile}>
                    <div>
                      <label className="block text-sm font-semibold text-slate-600">Full Name</label>
                      <input className="w-full rounded-lg p-3 border mt-2" value={fullName} onChange={e => setFullName(e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-600">Role</label>
                      <input className="w-full rounded-lg p-3 border mt-2 bg-slate-50" value={role} readOnly />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-600">Admin Email</label>
                      <input className="w-full rounded-lg p-3 border mt-2" value={email} onChange={e => setEmail(e.target.value)} type="email" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-600">Direct Line</label>
                      <input className="w-full rounded-lg p-3 border mt-2" value={phone} onChange={e => setPhone(e.target.value)} />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-slate-600">Professional Bio</label>
                      <textarea className="w-full rounded-lg p-3 border mt-2 min-h-[120px]" value={bio} onChange={e => setBio(e.target.value)} />
                    </div>
                    <div className="col-span-2 flex justify-end mt-4">
                      <button className="bg-secondary text-white px-6 py-3 rounded-lg" type="submit">Save Admin Details</button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}

          {activeTab === 'notifications' && (
            <div className="col-span-12">
              <div className="bg-white rounded-xl p-8 border shadow-sm">
                <h4 className="text-2xl mb-4">System Notification Preferences</h4>
                <p className="text-slate-600 mb-6">Choose how you want to be alerted about critical fleet management and system-wide activities.</p>
                <form onSubmit={handleSaveNotifications} className="grid grid-cols-2 gap-6">
                  {[
                    { title: 'Fleet Downtime Alerts', desc: 'Get notified when more than 5% of the fleet is inactive', checked: true },
                    { title: 'Staff Requests', desc: 'Alerts for new technician access requests', checked: true },
                    { title: 'Budget Overages', desc: 'Monthly forecast notifications', checked: false },
                    { title: 'Security Patch Updates', desc: 'Critical system software notices', checked: true }
                  ].map(item => (
                    <div key={item.title} className="flex items-center justify-between p-6 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-slate-500">{item.desc}</p>
                      </div>
                      <label className="inline-flex items-center">
                        <input defaultChecked={item.checked} type="checkbox" className="mr-2" />
                      </label>
                    </div>
                  ))}
                  <div className="col-span-2 flex justify-end mt-4">
                    <button className="bg-secondary text-white px-6 py-3 rounded-lg">Save System Preferences</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'password' && (
            <div className="col-span-12">
              <div className="bg-white rounded-xl p-8 border shadow-sm max-w-2xl mx-auto">
                <h4 className="text-2xl mb-4">Admin Security</h4>
                <p className="text-slate-600 mb-6">Ensure your administrative account is secured with multi-factor authentication and a strong password.</p>
                <form onSubmit={handleUpdatePassword} className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-600">Current Admin Password</label>
                    <div className="relative mt-2">
                      <input type="password" placeholder="••••••••" className="w-full rounded-lg p-3 border" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-600">New Admin Password</label>
                    <div className="relative mt-2">
                      <input type="password" placeholder="••••••••" className="w-full rounded-lg p-3 border" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-600">Confirm New Password</label>
                    <div className="relative mt-2">
                      <input type="password" placeholder="••••••••" className="w-full rounded-lg p-3 border" />
                    </div>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-lg">
                    <p className="font-semibold mb-3">Security Requirements</p>
                    <ul className="list-none space-y-2 text-sm text-slate-600">
                      <li>Minimum 12 characters for Admin accounts</li>
                      <li>At least one special character and number</li>
                      <li>2FA must be enabled (Recommended)</li>
                      <li>Hardware security key support</li>
                    </ul>
                  </div>
                  <div className="col-span-2 flex justify-end mt-2">
                    <button className="bg-secondary text-white px-6 py-3 rounded-lg">Update Admin Password</button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
