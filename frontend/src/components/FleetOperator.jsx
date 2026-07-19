import React, { useState, useEffect, useMemo } from 'react';

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function pad(value) {
  return String(value).padStart(2, '0');
}

function formatDate(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function getInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0] || '')
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

const defaultDrivers = [
  { id: '1', name: 'Marcus Chen', vehicle: 'FLT-8829', status: 'Active', phone: '+1 555-0922' },
  { id: '2', name: 'Sarah Jenkins', vehicle: 'FLT-4130', status: 'Idle', phone: '+1 555-4567' },
  { id: '3', name: 'Priya Singh', vehicle: 'FLT-2092', status: 'Maintenance', phone: '+1 555-7810' },
];

const defaultMaintenance = [
  { id: 'm1', title: 'Brake Inspection', vehicle: 'FLT-5568', driver: 'Priya Singh', date: '2026-07-24', status: 'Upcoming', notes: 'Inspect front and rear brake lines.' },
  { id: 'm2', title: 'Oil Change', vehicle: 'FLT-3341', driver: 'Marcus Chen', date: '2026-07-22', status: 'Scheduled', notes: 'Replace synthetic oil and confirm filter change.' },
];

export default function FleetOperator() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);
  const [drivers, setDrivers] = useState(defaultDrivers);
  const [maintenanceItems, setMaintenanceItems] = useState(defaultMaintenance);
  const [calendarMonth, setCalendarMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [maintenanceTitle, setMaintenanceTitle] = useState('');
  const [maintenanceVehicle, setMaintenanceVehicle] = useState('');
  const [maintenanceDriver, setMaintenanceDriver] = useState('');
  const [maintenanceDate, setMaintenanceDate] = useState(formatDate(new Date()));
  const [maintenanceStatus, setMaintenanceStatus] = useState('Scheduled');
  const [maintenanceNotes, setMaintenanceNotes] = useState('');

  const [newDriverFirst, setNewDriverFirst] = useState('');
  const [newDriverLast, setNewDriverLast] = useState('');
  const [newDriverEmail, setNewDriverEmail] = useState('');
  const [newDriverPhone, setNewDriverPhone] = useState('');
  const [newDriverDob, setNewDriverDob] = useState('');
  const [newDriverLicense, setNewDriverLicense] = useState('');
  const [newDriverLicenseExpiry, setNewDriverLicenseExpiry] = useState('');
  const [newDriverVehicle, setNewDriverVehicle] = useState('');
  const [newDriverEmergencyName, setNewDriverEmergencyName] = useState('');
  const [newDriverEmergencyPhone, setNewDriverEmergencyPhone] = useState('');
  const [newDriverPhoto, setNewDriverPhoto] = useState('');
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200');
  const [profileName, setProfileName] = useState('Alex Thompson');
  const [profileEmail, setProfileEmail] = useState('a.thompson@fleet.io');
  const [profilePhone, setProfilePhone] = useState('+1 (555) 092-4822');
  const [profileCompany, setProfileCompany] = useState('Global Logistics Inc.');
  const [profileDept, setProfileDept] = useState('Operations');

  const handleProfileImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setProfileImage(reader.result.toString());
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = (event) => {
    event.preventDefault();
    alert('Profile updated successfully.');
  };

  const handleDriverPhotoUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setNewDriverPhoto(reader.result.toString());
      }
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const rawDrivers = window.localStorage.getItem('drivers');
      if (rawDrivers) {
        const storedDrivers = JSON.parse(rawDrivers);
        if (Array.isArray(storedDrivers) && storedDrivers.length > 0) {
          setDrivers(storedDrivers.map((driver, index) => ({
            id: driver.id || `driver-${index}`,
            name: driver.name || `${driver.first || ''} ${driver.last || ''}`.trim() || 'Unknown Driver',
            vehicle: driver.vehicle || 'Unassigned',
            status: driver.status || 'Active',
            phone: driver.phone || 'N/A',
            photo: driver.photo || '',
          })));
        }
      }
    } catch (error) {
      console.warn('Unable to load shared driver roster from localStorage.', error);
    }

    try {
      const rawMaintenance = window.localStorage.getItem('fleetMaintenance');
      if (rawMaintenance) {
        const savedMaintenance = JSON.parse(rawMaintenance);
        if (Array.isArray(savedMaintenance) && savedMaintenance.length > 0) {
          setMaintenanceItems(savedMaintenance);
        }
      }
    } catch (error) {
      console.warn('Unable to load saved maintenance schedule from localStorage.', error);
    }

    try {
      const rawProfile = window.localStorage.getItem('fleetProfile');
      if (rawProfile) {
        const savedProfile = JSON.parse(rawProfile);
        setProfileName(savedProfile.name || profileName);
        setProfileEmail(savedProfile.email || profileEmail);
        setProfilePhone(savedProfile.phone || profilePhone);
        setProfileCompany(savedProfile.company || profileCompany);
        setProfileDept(savedProfile.department || profileDept);
        setProfileImage(savedProfile.image || profileImage);
      }
    } catch (error) {
      console.warn('Unable to load profile settings from localStorage.', error);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem('drivers', JSON.stringify(drivers));
    } catch (error) {
      console.warn('Unable to persist driver roster to localStorage.', error);
    }
  }, [drivers]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem('fleetProfile', JSON.stringify({
        name: profileName,
        email: profileEmail,
        phone: profilePhone,
        company: profileCompany,
        department: profileDept,
        image: profileImage,
      }));
    } catch (error) {
      console.warn('Unable to persist profile settings to localStorage.', error);
    }
  }, [profileName, profileEmail, profilePhone, profileCompany, profileDept, profileImage]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem('fleetMaintenance', JSON.stringify(maintenanceItems));
    } catch (error) {
      console.warn('Unable to persist maintenance schedule.', error);
    }
  }, [maintenanceItems]);

  useEffect(() => {
    if (!maintenanceDate) return;
    const parsedDate = new Date(maintenanceDate);
    if (!Number.isNaN(parsedDate.getTime())) {
      setSelectedDate(parsedDate);
    }
  }, [maintenanceDate]);

  const driversOnDuty = drivers.length;
  const vehiclesInService = Math.max(0, driversOnDuty - 1);
  const maintenanceDue = maintenanceItems.filter((item) => ['Scheduled', 'Upcoming'].includes(item.status)).length;

  const fleetStatus = useMemo(
    () => ({
      activeVehicles: 24,
      vehiclesInService,
      driversOnDuty,
      openAlerts: maintenanceItems.filter((item) => item.status === 'Overdue').length,
      maintenanceDue,
    }),
    [vehiclesInService, driversOnDuty, maintenanceItems, maintenanceDue]
  );

  const upcomingServices = useMemo(
    () => maintenanceItems
      .filter((item) => ['Scheduled', 'Upcoming'].includes(item.status))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5),
    [maintenanceItems]
  );

  const selectedDayItems = useMemo(
    () => maintenanceItems.filter((item) => item.date === formatDate(selectedDate)),
    [maintenanceItems, selectedDate]
  );

  const calendarDays = useMemo(() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysCount = new Date(year, month + 1, 0).getDate();
    return [
      ...Array(firstDayIndex).fill(null),
      ...Array.from({ length: daysCount }, (_, idx) => idx + 1),
    ];
  }, [calendarMonth]);

  const goToPreviousMonth = () => setCalendarMonth((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1));
  const goToNextMonth = () => setCalendarMonth((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1));

  const clearMaintenanceForm = () => {
    setMaintenanceTitle('');
    setMaintenanceVehicle('');
    setMaintenanceDriver('');
    setMaintenanceDate(formatDate(new Date()));
    setMaintenanceStatus('Scheduled');
    setMaintenanceNotes('');
  };

  const handleAddMaintenance = (event) => {
    event.preventDefault();
    if (!maintenanceTitle || !maintenanceVehicle || !maintenanceDriver || !maintenanceDate) {
      alert('Please fill in title, vehicle, driver, and date before adding maintenance.');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: maintenanceTitle,
      vehicle: maintenanceVehicle,
      driver: maintenanceDriver,
      date: maintenanceDate,
      status: maintenanceStatus,
      notes: maintenanceNotes,
    };

    setMaintenanceItems((prev) => [newTask, ...prev]);
    setSelectedDate(new Date(maintenanceDate));
    clearMaintenanceForm();
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f0f4f8', width: '100%' }}>
      <style>{`
        :root {
          --bg-main: #f0f4f8;
          --sidebar-blue: #0b3c7b;
          --sidebar-active: #0d52a1;
          --text-dark: #1e293b;
          --text-muted: #64748b;
          --card-bg: #ffffff;
          --border-color: #e2e8f0;
          --input-focus: #3b82f6;
          --green: #10b981;
          --red: #ef4444;
          --orange: #f97316;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .sidebar { width: 260px; background-color: var(--sidebar-blue); color: white; display: flex; flex-direction: column; flex-shrink: 0; transition: transform 0.3s ease; z-index: 100; }
        .sidebar-header { padding: 24px; display: flex; align-items: center; gap: 12px; font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .sidebar-menu { list-style: none; margin-top: 16px; flex-grow: 1; }
        .sidebar-item button { width: 100%; text-align: left; background: none; border: none; display: flex; align-items: center; gap: 12px; padding: 14px 24px; color: rgba(255,255,255,0.7); font-size: 14px; font-weight: 500; transition: all 0.2s; cursor: pointer; }
        .sidebar-item.active button, .sidebar-item button:hover { color: white; background-color: var(--sidebar-active); }
        .sidebar-item.logout { border-top: 1px solid rgba(255,255,255,0.1); margin-top: auto; }
        .main-wrapper { flex-grow: 1; display: flex; flex-direction: column; width: calc(100% - 260px); min-width: 0; }
        .top-navbar { background-color: var(--sidebar-blue); color: white; padding: 16px 32px; display: flex; justify-content: space-between; align-items: center; font-weight: 600; }
        .nav-title { display: flex; align-items: center; gap: 12px; }
        .user-profile { display: flex; align-items: center; gap: 10px; font-size: 13px; font-weight: 400; }
        .avatar { width: 40px; height: 40px; background-color: rgba(255, 255, 255, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 12px; overflow: hidden; }
        .avatar img { width: 100%; height: 100%; object-fit: cover; }
        .app-view { display: flex; flex-direction: column; gap: 24px; padding: 32px; max-width: 1660px; width: 100%; margin: 0 auto; animation: fadeIn 0.2s ease-in-out; }
        .view-header h1, .view-header h2 { font-size: 28px; margin-bottom: 4px; color: #0f172a; }
        .view-header p { color: var(--text-muted); font-size: 14px; }
        .card { background: var(--card-bg); border-radius: 8px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); border: 1px solid var(--border-color); }
        .info-strip { background: #ffffff; border: 1px solid #dbeafe; color: #1e40af; padding: 16px 24px; border-radius: 6px; font-weight: 500; font-size: 14px; }
        .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .kpi-card .card-title { font-size: 12px; color: var(--text-muted); margin-bottom: 8px; font-weight: 500; }
        .kpi-card .card-value { font-size: 32px; font-weight: 700; }
        .kpi-card .card-value span { font-size: 16px; font-weight: 500; color: var(--text-muted); margin-left: 4px; }
        .kpi-card.fuel .card-value { color: var(--green); }
        .kpi-card.alerts { border-left: 4px solid #ef4444; }
        .dashboard-split { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; }
        .timeline { display: grid; gap: 16px; }
        .timeline-item { background: #f8fafc; padding: 16px; border-radius: 10px; border: 1px solid #e2e8f0; }
        .timeline-title { font-weight: 700; color: #0f172a; }
        .compact-table { width: 100%; border-collapse: collapse; }
        .compact-table th, .compact-table td { padding: 14px 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; }
        .compact-table th { background: #f8fafc; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.02em; }
        .btn { border: none; border-radius: 8px; padding: 12px 18px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .btn-primary { background-color: #2563eb; color: #fff; }
        .btn-primary:hover { background-color: #1d4ed8; }
        .btn-secondary { background-color: #f8fafc; color: #1e293b; }
        .btn-secondary:hover { background-color: #e2e8f0; }
        .label-pill { display: inline-flex; align-items: center; justify-content: center; padding: 6px 12px; border-radius: 9999px; font-size: 11px; font-weight: 700; }
        .label-success { background: #d1fae5; color: #065f46; }
        .label-warning { background: #fef3c7; color: #92400e; }
        .label-danger { background: #fee2e2; color: #991b1c; }
        .view-all-btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 20px; background: #1e3a5f; color: white; border-radius: 8px; cursor: pointer; border: none; }
        .calendar-layout { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; }
        .calendar-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
        .calendar-grid { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 10px; }
        .calendar-day-label { text-align: center; font-size: 11px; text-transform: uppercase; color: #64748b; letter-spacing: 0.1em; }
        .calendar-day { min-height: 82px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 12px; cursor: pointer; display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.2s, box-shadow 0.2s; }
        .calendar-day:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08); }
        .calendar-day.selected { border-color: #2563eb; background: #eff6ff; }
        .calendar-day .day-number { font-size: 14px; font-weight: 700; color: #0f172a; }
        .calendar-day .task-count { margin-top: 10px; font-size: 11px; color: #475569; }
        .calendar-day.has-tasks { border-color: #60a5fa; }
        .maintenance-sidebar { display: flex; flex-direction: column; gap: 16px; }
        .maintenance-summary { background: #f8fafc; border-radius: 16px; padding: 20px; border: 1px solid #e2e8f0; }
        .maintenance-list { display: grid; gap: 14px; margin-top: 16px; }
        .maintenance-item { background: white; border: 1px solid #e2e8f0; padding: 16px; border-radius: 14px; }
        .maintenance-item-title { font-weight: 700; margin-bottom: 6px; }
        .maintenance-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
        .tag-pill { font-size: 11px; padding: 6px 10px; border-radius: 9999px; background: #e0f2fe; color: #0369a1; display: inline-flex; align-items: center; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .form-field { display: flex; flex-direction: column; gap: 8px; }
        .form-field label { font-size: 13px; font-weight: 600; color: #334155; }
        .form-field input, .form-field select, .form-field textarea { width: 100%; border: 1px solid #cbd5e1; border-radius: 12px; padding: 13px 14px; font-size: 14px; color: #0f172a; background: #fff; }
        .form-field textarea { min-height: 120px; resize: vertical; }
        .date-button { width: 100%; border: 1px solid #cbd5e1; border-radius: 12px; padding: 13px 16px; background: #fff; text-align: left; }
        .calendar-nav button { border: 1px solid #cbd5e1; border-radius: 12px; padding: 10px 14px; background: #fff; color: #334155; cursor: pointer; }
        .calendar-nav button:hover { background: #f8fafc; }
        .form-card { background: var(--card-bg); border-radius: 8px; padding: 40px; border: 1px solid var(--border-color); width: 100%; }
        .form-actions { display: flex; gap: 16px; margin-top: 24px; }
        @media (max-width: 1200px) { .kpi-grid { grid-template-columns: repeat(2, 1fr); } .dashboard-split { grid-template-columns: 1fr; } .calendar-layout { grid-template-columns: 1fr; } }
        @media (max-width: 992px) { .sidebar { position: fixed; left: 0; top: 0; bottom: 0; transform: translateX(-100%); } .sidebar.mobile-open { transform: translateX(0); } .main-wrapper { width: 100%; } .top-navbar { padding: 16px; } }
        @media (max-width: 768px) { .kpi-grid { grid-template-columns: 1fr; } .top-navbar { flex-direction: column; align-items: flex-start; gap: 16px; } }
      `}</style>

      <aside className={`sidebar ${sidebarMobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <i className="fa-solid fa-truck-monster"></i>
          <span>Fleet Operator</span>
        </div>
        <ul className="sidebar-menu">
          {['dashboard', 'drivers', 'maintenance', 'add-driver', 'settings'].map((id) => {
            const labels = {
              dashboard: 'Dashboard',
              drivers: 'Driver Roster',
              maintenance: 'Maintenance',
              'add-driver': 'Add Driver',
              settings: 'Settings',
            };
            const icons = {
              dashboard: 'fa-chart-pie',
              drivers: 'fa-users',
              maintenance: 'fa-calendar-days',
              'add-driver': 'fa-user-plus',
              settings: 'fa-gear',
            };
            return (
              <li key={id} className={`sidebar-item ${currentView === id ? 'active' : ''}`} onClick={() => { setCurrentView(id); setSidebarMobileOpen(false); }}>
                <button><i className={`fa-solid ${icons[id]}`}></i> {labels[id]}</button>
              </li>
            );
          })}
          <li className="sidebar-item logout">
            <button><i className="fa-solid fa-right-from-bracket"></i> Logout</button>
          </li>
        </ul>
      </aside>

      <div className="main-wrapper">
        <nav className="top-navbar">
          <div className="nav-title">
            <i className="fa-solid fa-bars menu-toggle" onClick={() => setSidebarMobileOpen(!sidebarMobileOpen)}></i>
            <span id="nav-header-text" style={{ textTransform: 'capitalize' }}>{currentView.replace('-', ' ')}</span>
          </div>
          <div className="user-profile">
            <span>Welcome, {profileName.split(' ')[0] || 'Operator'}</span>
            <div className="avatar">
              <img src={profileImage} alt={profileName} />
            </div>
          </div>
        </nav>

        {currentView === 'dashboard' && (
          <div id="view-dashboard" className="app-view">
            <section className="view-header">
              <h1>Fleet Operator Dashboard</h1>
              <p>Monitor vehicle health, driver roster, and operational alerts.</p>
            </section>

            <section className="kpi-grid">
              <div className="card kpi-card">
                <div className="card-title">Active Vehicles</div>
                <div className="card-value">24<span>units</span></div>
              </div>
              <div className="card kpi-card fuel">
                <div className="card-title">Service Fleet</div>
                <div className="card-value">{fleetStatus.vehiclesInService}<span>units</span></div>
              </div>
              <div className="card kpi-card">
                <div className="card-title">Drivers On Duty</div>
                <div className="card-value">{fleetStatus.driversOnDuty}<span>people</span></div>
              </div>
              <div className="card kpi-card alerts">
                <div className="card-title">Maintenance Due</div>
                <div className="card-value"><i className="fa-solid fa-calendar-days"></i> {fleetStatus.maintenanceDue}<span>tasks</span></div>
              </div>
            </section>

            <section className="dashboard-split">
              <div className="card">
                <h3>Driver Roster Snapshot</h3>
                <table className="compact-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Vehicle</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {drivers.slice(0, 3).map((driver) => (
                      <tr key={driver.id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center text-slate-500 text-sm font-bold">
                              {driver.photo ? <img src={driver.photo} alt={driver.name} className="w-full h-full object-cover" /> : getInitials(driver.name)}
                            </div>
                            <span>{driver.name}</span>
                          </div>
                        </td>
                        <td>{driver.vehicle}</td>
                        <td>{driver.status}</td>
                      </tr>
                    ))}
                    {drivers.length === 0 && (
                      <tr>
                        <td colSpan="3" className="text-slate-500 text-center py-8">No drivers found. Add drivers through the driver page first.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <button className="btn btn-secondary" onClick={() => setCurrentView('drivers')}>View Full Roster</button>
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Upcoming Services</h3>
                    <p className="text-xs text-slate-500 mt-1">Planned maintenance and service windows for your highest-priority vehicles.</p>
                  </div>
                  <span className="text-xs text-blue-600 bg-blue-50 font-bold px-3 py-1 rounded-full">{upcomingServices.length} planned</span>
                </div>
                <div className="bg-slate-100 rounded-2xl border border-slate-200 p-5 space-y-4">
                  {upcomingServices.length > 0 ? upcomingServices.map((item) => (
                    <div key={item.id} className="rounded-2xl bg-white p-4 border border-slate-200 shadow-sm">
                      <p className="font-bold text-slate-900">{item.vehicle}</p>
                      <p className="text-xs text-slate-500 mt-1">{item.title} • {new Date(item.date).toLocaleDateString()} • {item.notes || 'No time specified'}</p>
                    </div>
                  )) : (
                    <div className="text-slate-500">No upcoming maintenance services are currently scheduled.</div>
                  )}
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 text-base">Recent System Activity</h3>
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl flex items-start gap-3">
                    <i className="fa-solid fa-circle-check text-emerald-500 mt-0.5"></i>
                    <div>
                      <p className="font-bold text-slate-800">Route #9402 Completed</p>
                      <p className="text-slate-400 text-[10px]">Driver: Marcus Chen • 12 mins ago</p>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl flex items-start gap-3">
                    <i className="fa-solid fa-triangle-exclamation text-amber-500 mt-0.5"></i>
                    <div>
                      <p className="font-bold text-slate-800">Low Tire Pressure Warning</p>
                      <p className="text-slate-400 text-[10px]">Vehicle FLT-3341 • 45 mins ago</p>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl flex items-start gap-3">
                    <i className="fa-solid fa-file-invoice text-blue-500 mt-0.5"></i>
                    <div>
                      <p className="font-bold text-slate-800">New Fuel Expense Submitted</p>
                      <p className="text-slate-400 text-[10px]">Amount: $142.50 • 2 hrs ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'drivers' && (
          <div id="view-drivers" className="app-view">
            <section className="view-header">
              <h2>Driver Roster</h2>
              <p>Manage all fleet drivers and assigned vehicles.</p>
            </section>
            <div className="card">
              <table className="compact-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Vehicle</th>
                    <th>Phone</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {drivers.map((driver) => {
                    return (
                      <tr key={driver.id}>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center text-slate-500 text-sm font-bold">
                              {driver.photo ? <img src={driver.photo} alt={driver.name} className="w-full h-full object-cover" /> : getInitials(driver.name)}
                            </div>
                            <span>{driver.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-slate-500">{driver.vehicle}</td>
                        <td className="py-4 px-4 text-slate-500">{driver.phone}</td>
                        <td className="py-4 px-4"><span className={`label-pill ${driver.status === 'Active' ? 'label-success' : driver.status === 'Maintenance' ? 'label-warning' : 'label-danger'}`}>{driver.status}</span></td>
                      </tr>
                    );
                  })}
                  {drivers.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-slate-500 text-center py-8">No drivers found. Add drivers through the driver page first.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {currentView === 'add-driver' && (
          <div id="view-add-driver" className="app-view">
            <section className="view-header">
              <h2>Add New Driver</h2>
              <p>Register a driver and maintain the current roster in the fleet system.</p>
            </section>

            <div className="card">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-80 bg-slate-100 p-6 rounded-2xl border border-slate-200">
                  <div className="w-28 h-28 rounded-full bg-slate-200 flex items-center justify-center mb-5 text-slate-500 text-3xl">+</div>
                  <p className="text-sm text-slate-500">Upload driver profile photo and capture basic identity details.</p>
                </div>

                <form className="flex-1 space-y-6" onSubmit={(event) => {
                  event.preventDefault();
                  const first = newDriverFirst.trim();
                  const last = newDriverLast.trim();
                  if (!first || !last || !newDriverPhone || !newDriverVehicle) {
                    alert('Please enter first name, last name, phone, and vehicle.');
                    return;
                  }
                  const newDriver = {
                    id: Date.now().toString(),
                    name: `${first} ${last}`,
                    vehicle: newDriverVehicle,
                    status: 'Active',
                    phone: newDriverPhone,
                    email: newDriverEmail,
                    dob: newDriverDob,
                    license: newDriverLicense,
                    licenseExpiry: newDriverLicenseExpiry,
                    emergencyName: newDriverEmergencyName,
                    emergencyPhone: newDriverEmergencyPhone,
                    photo: newDriverPhoto,
                  };
                  setDrivers((prev) => [newDriver, ...prev]);
                  setNewDriverFirst('');
                  setNewDriverLast('');
                  setNewDriverEmail('');
                  setNewDriverPhone('');
                  setNewDriverDob('');
                  setNewDriverLicense('');
                  setNewDriverLicenseExpiry('');
                  setNewDriverVehicle('');
                  setNewDriverEmergencyName('');
                  setNewDriverEmergencyPhone('');
                  setNewDriverPhoto('');
                }}>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-2">First Name</label>
                      <input type="text" value={newDriverFirst} onChange={(e) => setNewDriverFirst(e.target.value)} className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-2">Last Name</label>
                      <input type="text" value={newDriverLast} onChange={(e) => setNewDriverLast(e.target.value)} className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-2">Email Address</label>
                      <input type="email" value={newDriverEmail} onChange={(e) => setNewDriverEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-2">Phone Number</label>
                      <input type="text" value={newDriverPhone} onChange={(e) => setNewDriverPhone(e.target.value)} className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-2">Date of Birth</label>
                      <input type="date" value={newDriverDob} onChange={(e) => setNewDriverDob(e.target.value)} className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-2">Assigned Vehicle</label>
                      <input type="text" value={newDriverVehicle} onChange={(e) => setNewDriverVehicle(e.target.value)} className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg" placeholder="FLT-xxxx" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-2">Driver's License Number</label>
                      <input type="text" value={newDriverLicense} onChange={(e) => setNewDriverLicense(e.target.value)} className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-2">License Expiry Date</label>
                      <input type="date" value={newDriverLicenseExpiry} onChange={(e) => setNewDriverLicenseExpiry(e.target.value)} className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-2">Emergency Contact Name</label>
                      <input type="text" value={newDriverEmergencyName} onChange={(e) => setNewDriverEmergencyName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-2">Emergency Phone Number</label>
                      <input type="text" value={newDriverEmergencyPhone} onChange={(e) => setNewDriverEmergencyPhone(e.target.value)} className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg" />
                    </div>
                    <div className="lg:col-span-3">
                      <label className="block text-xs font-semibold text-slate-500 mb-2">Driver Profile Photo</label>
                      <input type="file" accept="image/*" onChange={handleDriverPhotoUpload} className="w-full text-sm" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg">Save Driver</button>
                    <button type="button" onClick={() => {
                      setNewDriverFirst('');
                      setNewDriverLast('');
                      setNewDriverEmail('');
                      setNewDriverPhone('');
                      setNewDriverDob('');
                      setNewDriverLicense('');
                      setNewDriverLicenseExpiry('');
                      setNewDriverVehicle('');
                      setNewDriverEmergencyName('');
                      setNewDriverEmergencyPhone('');
                      setNewDriverPhoto('');
                    }} className="bg-slate-100 text-slate-700 font-semibold px-4 py-2 rounded-lg">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {currentView === 'maintenance' && (
          <div id="view-maintenance" className="app-view">
            <section className="view-header">
              <h2>Maintenance Schedule</h2>
              <p>Click a day to review assigned maintenance and add new tasks to the calendar.</p>
            </section>
            <div className="calendar-layout">
              <div className="card">
                <div className="calendar-head">
                  <div>
                    <p className="text-sm font-semibold text-slate-500">{calendarMonth.toLocaleString('default', { month: 'long' })} {calendarMonth.getFullYear()}</p>
                    <h3 className="text-2xl font-bold text-slate-900">Calendar</h3>
                  </div>
                  <div className="calendar-nav">
                    <button type="button" onClick={goToPreviousMonth}>Prev</button>
                    <button type="button" onClick={goToNextMonth}>Next</button>
                  </div>
                </div>
                <div className="calendar-grid">
                  {dayNames.map((label) => {
                    return <div key={label} className="calendar-day-label">{label}</div>;
                  })}
                  {calendarDays.map((day, idx) => {
                    if (day === null) {
                      return <div key={`blank-${idx}`} />;
                    }
                    const dateKey = formatDate(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), day));
                    const tasksForDay = maintenanceItems.filter((item) => item.date === dateKey);
                    const isSelected = formatDate(selectedDate) === dateKey;
                    return (
                      <button
                        key={dateKey}
                        type="button"
                        className={`calendar-day ${tasksForDay.length > 0 ? 'has-tasks' : ''} ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          const clicked = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), day);
                          setSelectedDate(clicked);
                          setMaintenanceDate(formatDate(clicked));
                        }}
                      >
                        <span className="day-number">{day}</span>
                        <span className="task-count">{tasksForDay.length} task{tasksForDay.length === 1 ? '' : 's'}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <aside className="maintenance-sidebar">
                <div className="maintenance-summary card">
                  <h3>Selected Date</h3>
                  <p className="text-slate-500">{selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  <p className="mt-4">{selectedDayItems.length > 0 ? `You have ${selectedDayItems.length} scheduled task${selectedDayItems.length === 1 ? '' : 's'}.` : 'No maintenance tasks are scheduled for this day.'}</p>
                </div>
                <div className="maintenance-summary card">
                  <h3>Tasks for the Day</h3>
                  <div className="maintenance-list">
                    {selectedDayItems.length === 0 ? (
                      <div className="text-slate-500">Select a day to view maintenance tasks.</div>
                    ) : (
                      selectedDayItems.map((item) => {
                        return (
                          <div key={item.id} className="maintenance-item">
                            <div className="maintenance-item-title">{item.title}</div>
                            <div className="text-sm text-slate-600">{item.vehicle} · {item.driver}</div>
                            <div className="maintenance-tags">
                              <span className="tag-pill">{item.status}</span>
                              <span className="tag-pill">{item.date}</span>
                            </div>
                            {item.notes && <p className="text-slate-500 text-sm mt-2">{item.notes}</p>}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </aside>
            </div>

            <div className="card">
              <div className="view-header">
                <h3>Add New Maintenance Task</h3>
                <p>Schedule a vehicle service and attach it to your fleet drivers.</p>
              </div>
              <form className="form-card" onSubmit={handleAddMaintenance}>
                <div className="form-grid">
                  <div className="form-field">
                    <label htmlFor="maintenance-title">Task Title</label>
                    <input id="maintenance-title" value={maintenanceTitle} onChange={(e) => setMaintenanceTitle(e.target.value)} placeholder="Brake inspection" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="maintenance-date">Date</label>
                    <input id="maintenance-date" type="date" value={maintenanceDate} onChange={(e) => setMaintenanceDate(e.target.value)} className="date-button" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="maintenance-vehicle">Vehicle</label>
                    <input id="maintenance-vehicle" value={maintenanceVehicle} onChange={(e) => setMaintenanceVehicle(e.target.value)} placeholder="FLT-8829" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="maintenance-driver">Assign Driver</label>
                    <select id="maintenance-driver" value={maintenanceDriver} onChange={(e) => setMaintenanceDriver(e.target.value)}>
                      <option value="">Select Driver</option>
                      {drivers.map((driver) => {
                        return <option key={driver.id} value={driver.name}>{driver.name}</option>;
                      })}
                    </select>
                  </div>
                  <div className="form-field">
                    <label htmlFor="maintenance-status">Status</label>
                    <select id="maintenance-status" value={maintenanceStatus} onChange={(e) => setMaintenanceStatus(e.target.value)}>
                      <option value="Scheduled">Scheduled</option>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Overdue">Overdue</option>
                    </select>
                  </div>
                  <div className="form-field" style={{ gridColumn: 'span 2' }}>
                    <label htmlFor="maintenance-notes">Notes</label>
                    <textarea id="maintenance-notes" value={maintenanceNotes} onChange={(e) => setMaintenanceNotes(e.target.value)} placeholder="Describe the maintenance requirements or priority." />
                  </div>
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">Add Maintenance</button>
                  <button type="button" className="btn btn-secondary" onClick={clearMaintenanceForm}>Clear Form</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {currentView === 'settings' && (
          <div id="view-settings" className="app-view">
            <section className="view-header">
              <h2>Profile Settings</h2>
              <p>Update your operator profile and sync the top-right avatar.</p>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center gap-4">
                <div className="relative">
                  <img src={profileImage} alt={profileName} className="w-28 h-28 rounded-full object-cover border-2 border-white shadow-md" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-xl">{profileName}</h3>
                <span className="bg-blue-50 text-blue-600 font-semibold text-xs tracking-wider uppercase px-4 py-2 rounded-full">Fleet Director</span>

                <div className="w-full mt-4 space-y-3 text-sm border-t border-slate-100 pt-6 text-left">
                  <div className="flex justify-between items-center"><span className="text-slate-500 font-semibold">Email</span><span className="font-bold text-slate-800">{profileEmail}</span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-500 font-semibold">Phone</span><span className="font-bold text-slate-800">{profilePhone}</span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-500 font-semibold">Company</span><span className="font-bold text-slate-800">{profileCompany}</span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-500 font-semibold">Department</span><span className="font-bold text-slate-800">{profileDept}</span></div>
                </div>
              </div>

              <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="text-slate-900 font-bold text-xl mb-4">Edit Profile</h3>
                <form className="space-y-5" onSubmit={handleSaveProfile}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="form-field">
                      <label className="text-sm font-semibold text-slate-600">Full Name</label>
                      <input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm" />
                    </div>
                    <div className="form-field">
                      <label className="text-sm font-semibold text-slate-600">Email Address</label>
                      <input type="email" value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm" />
                    </div>
                    <div className="form-field">
                      <label className="text-sm font-semibold text-slate-600">Phone Number</label>
                      <input type="text" value={profilePhone} onChange={(e) => setProfilePhone(e.target.value)} className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm" />
                    </div>
                    <div className="form-field">
                      <label className="text-sm font-semibold text-slate-600">Company</label>
                      <input type="text" value={profileCompany} onChange={(e) => setProfileCompany(e.target.value)} className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm" />
                    </div>
                    <div className="form-field md:col-span-2">
                      <label className="text-sm font-semibold text-slate-600">Department</label>
                      <input type="text" value={profileDept} onChange={(e) => setProfileDept(e.target.value)} className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm" />
                    </div>
                    <div className="form-field md:col-span-2">
                      <label className="text-sm font-semibold text-slate-600">Profile Photo</label>
                      <input type="file" accept="image/*" onChange={handleProfileImageUpload} className="w-full text-sm" />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-2">
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                    <button type="button" className="btn btn-secondary" onClick={() => window.location.reload()}>Reset</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
