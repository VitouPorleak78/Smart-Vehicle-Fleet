import React, { useState, useEffect, useMemo } from 'react';

const API_BASE_URL = 'http://localhost:5000/api';

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

export default function FleetOperator() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [maintenanceItems, setMaintenanceItems] = useState([]);
  const [loading, setLoading] = useState(true);
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

  // Fetch drivers from database
  const fetchDrivers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/drivers`);
      if (response.ok) {
        const data = await response.json();
        setDrivers(data.map((driver) => ({
          id: driver.id,
          name: driver.name,
          vehicle: driver.vehicle,
          status: driver.status,
          phone: driver.phone,
          email: driver.email,
          dob: driver.dob,
          license: driver.license,
          licenseExpiry: driver.licenseExpiry,
          emergencyName: driver.emergencyName,
          emergencyPhone: driver.emergencyPhone,
          photo: driver.photo,
        })));
      }
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  // Fetch maintenance from database
  const fetchMaintenance = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/maintenance`);
      if (response.ok) {
        const data = await response.json();
        setMaintenanceItems(data);
      }
    } catch (error) {
      console.error('Error fetching maintenance:', error);
    }
  };

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchDrivers(), fetchMaintenance()]);
      setLoading(false);
    };
    loadData();
  }, []);

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

  const handleAddMaintenance = async (event) => {
    event.preventDefault();
    if (!maintenanceTitle || !maintenanceVehicle || !maintenanceDriver || !maintenanceDate) {
      alert('Please fill in title, vehicle, driver, and date before adding maintenance.');
      return;
    }

    try {
      const driverId = drivers.find((d) => d.name === maintenanceDriver)?.id || null;
      const response = await fetch(`${API_BASE_URL}/maintenance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: maintenanceTitle,
          vehicle: maintenanceVehicle,
          driverId,
          date: maintenanceDate,
          status: maintenanceStatus,
          notes: maintenanceNotes,
        }),
      });

      if (response.ok) {
        alert('Maintenance task added successfully!');
        await fetchMaintenance();
        setSelectedDate(new Date(maintenanceDate));
        clearMaintenanceForm();
      } else {
        alert('Error adding maintenance task.');
      }
    } catch (error) {
      console.error('Error adding maintenance:', error);
      alert('Error adding maintenance task.');
    }
  };

  const handleDeleteDriver = async (driverId) => {
    if (!window.confirm('Are you sure you want to delete this driver?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/drivers/${driverId}`, { method: 'DELETE' });
      if (response.ok) {
        alert('Driver deleted successfully!');
        await fetchDrivers();
      } else {
        alert('Error deleting driver.');
      }
    } catch (error) {
      console.error('Error deleting driver:', error);
      alert('Error deleting driver.');
    }
  };

  const handleDeleteMaintenance = async (maintenanceId) => {
    if (!window.confirm('Are you sure you want to delete this maintenance task?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/maintenance/${maintenanceId}`, { method: 'DELETE' });
      if (response.ok) {
        alert('Maintenance task deleted successfully!');
        await fetchMaintenance();
      } else {
        alert('Error deleting maintenance task.');
      }
    } catch (error) {
      console.error('Error deleting maintenance:', error);
      alert('Error deleting maintenance task.');
    }
  };

  const handleAddDriver = async (event) => {
    event.preventDefault();
    const first = newDriverFirst.trim();
    const last = newDriverLast.trim();
    if (!first || !last || !newDriverPhone || !newDriverVehicle) {
      alert('Please enter first name, last name, phone, and vehicle.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/drivers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first,
          last,
          email: newDriverEmail,
          phone: newDriverPhone,
          dob: newDriverDob,
          license: newDriverLicense,
          licenseExpiry: newDriverLicenseExpiry,
          vehicle: newDriverVehicle,
          status: 'Active',
          emergencyName: newDriverEmergencyName,
          emergencyPhone: newDriverEmergencyPhone,
          photo: newDriverPhoto,
        }),
      });

      if (response.ok) {
        alert('Driver added successfully!');
        await fetchDrivers();
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
        setCurrentView('drivers');
      } else {
        alert('Error adding driver.');
      }
    } catch (error) {
      console.error('Error adding driver:', error);
      alert('Error adding driver.');
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f0f4f8', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: '18px', color: '#64748b' }}>Loading fleet data...</p>
      </div>
    );
  }

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
        .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .kpi-card .card-title { font-size: 12px; color: var(--text-muted); margin-bottom: 8px; font-weight: 500; }
        .kpi-card .card-value { font-size: 32px; font-weight: 700; }
        .kpi-card .card-value span { font-size: 16px; font-weight: 500; color: var(--text-muted); margin-left: 4px; }
        .kpi-card.fuel .card-value { color: var(--green); }
        .kpi-card.alerts { border-left: 4px solid #ef4444; }
        .dashboard-split { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; }
        .compact-table { width: 100%; border-collapse: collapse; }
        .compact-table th, .compact-table td { padding: 14px 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; text-align: left; }
        .compact-table th { background: #f8fafc; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.02em; font-weight: 600; }
        .compact-table tbody tr:hover { background-color: #f8fafc; }
        .btn { border: none; border-radius: 8px; padding: 12px 18px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .btn-primary { background-color: #2563eb; color: #fff; }
        .btn-primary:hover { background-color: #1d4ed8; }
        .btn-secondary { background-color: #f8fafc; color: #1e293b; }
        .btn-secondary:hover { background-color: #e2e8f0; }
        .btn-danger { background-color: #ef4444; color: #fff; padding: 6px 12px; font-size: 12px; }
        .btn-danger:hover { background-color: #dc2626; }
        .label-pill { display: inline-flex; align-items: center; justify-content: center; padding: 6px 12px; border-radius: 9999px; font-size: 11px; font-weight: 700; }
        .label-success { background: #d1fae5; color: #065f46; }
        .label-warning { background: #fef3c7; color: #92400e; }
        .label-danger { background: #fee2e2; color: #991b1c; }
        .calendar-layout { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; }
        .calendar-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
        .calendar-grid { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 10px; }
        .calendar-day-label { text-align: center; font-size: 11px; text-transform: uppercase; color: #64748b; letter-spacing: 0.1em; }
        .calendar-day { min-height: 82px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 12px; cursor: pointer; display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.2s, box-shadow 0.2s; }
        .calendar-day:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08); }
        .calendar-day.selected { border-color: #2563eb; background: #eff6ff; }
        .calendar-day .day-number { font-size: 14px; font-weight: 700; color: #0f172a; }
        .calendar-day .task-count { margin-top: 10px; font-size: 11px; color: #475569; }
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
        .form-card { background: var(--card-bg); border-radius: 8px; padding: 40px; border: 1px solid var(--border-color); width: 100%; }
        .form-actions { display: flex; gap: 16px; margin-top: 24px; }
        .action-buttons { display: flex; gap: 8px; }
        .calendar-nav button { border: 1px solid #cbd5e1; border-radius: 12px; padding: 10px 14px; background: #fff; color: #334155; cursor: pointer; }
        .calendar-nav button:hover { background: #f8fafc; }
        @media (max-width: 1200px) { .kpi-grid { grid-template-columns: repeat(2, 1fr); } .dashboard-split { grid-template-columns: 1fr; } .calendar-layout { grid-template-columns: 1fr; } }
        @media (max-width: 992px) { .sidebar { position: fixed; left: 0; top: 0; bottom: 0; transform: translateX(-100%); } .sidebar.mobile-open { transform: translateX(0); } .main-wrapper { width: 100%; } }
        @media (max-width: 768px) { .kpi-grid { grid-template-columns: 1fr; } .form-grid { grid-template-columns: 1fr; } }
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
            <i className="fa-solid fa-bars menu-toggle" onClick={() => setSidebarMobileOpen(!sidebarMobileOpen)} style={{ cursor: 'pointer' }}></i>
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
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', overflow: 'hidden' }}>
                              {driver.photo ? <img src={driver.photo} alt={driver.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : getInitials(driver.name)}
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
                        <td colSpan="3" style={{ color: '#64748b', textAlign: 'center', padding: '32px 16px' }}>No drivers found. Add drivers through the driver page first.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <button className="btn btn-secondary" onClick={() => setCurrentView('drivers')} style={{ marginTop: '16px' }}>View Full Roster</button>
              </div>
            </section>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '18px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '12px' }}>Upcoming Services</h3>
                <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '16px' }}>Planned maintenance and service windows for your highest-priority vehicles.</p>
                <div style={{ backgroundColor: '#f1f5f9', borderRadius: '18px', border: '1px solid #cbd5e1', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {upcomingServices.length > 0 ? upcomingServices.map((item) => (
                    <div key={item.id} style={{ backgroundColor: 'white', padding: '16px', borderRadius: '18px', border: '1px solid #cbd5e1' }}>
                      <p style={{ fontWeight: 'bold', color: '#0f172a' }}>{item.vehicle}</p>
                      <p style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>{item.title} • {new Date(item.date).toLocaleDateString()} • {item.notes || 'No time specified'}</p>
                    </div>
                  )) : (
                    <div style={{ color: '#64748b' }}>No upcoming maintenance services are currently scheduled.</div>
                  )}
                </div>
              </div>

              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '18px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '12px' }}>Recent System Activity</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px' }}>
                  <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '12px', display: 'flex', gap: '12px' }}>
                    <i className="fa-solid fa-circle-check" style={{ color: '#10b981', marginTop: '4px' }}></i>
                    <div>
                      <p style={{ fontWeight: 'bold', color: '#1e293b' }}>Route #9402 Completed</p>
                      <p style={{ fontSize: '10px', color: '#94a3b8' }}>Driver: Marcus Chen • 12 mins ago</p>
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {drivers.map((driver) => {
                    return (
                      <tr key={driver.id}>
                        <td style={{ padding: '16px 12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', overflow: 'hidden' }}>
                              {driver.photo ? <img src={driver.photo} alt={driver.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : getInitials(driver.name)}
                            </div>
                            <span>{driver.name}</span>
                          </div>
                        </td>
                        <td style={{ padding: '16px 12px', color: '#64748b' }}>{driver.vehicle}</td>
                        <td style={{ padding: '16px 12px', color: '#64748b' }}>{driver.phone}</td>
                        <td style={{ padding: '16px 12px' }}><span className={`label-pill ${driver.status === 'Active' ? 'label-success' : driver.status === 'Maintenance' ? 'label-warning' : 'label-danger'}`}>{driver.status}</span></td>
                        <td style={{ padding: '16px 12px' }}>
                          <button className="btn btn-danger" onClick={() => handleDeleteDriver(driver.id)}>Delete</button>
                        </td>
                      </tr>
                    );
                  })}
                  {drivers.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{ color: '#64748b', textAlign: 'center', padding: '32px 16px' }}>No drivers found. Add drivers through the add driver page.</td>
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
              <div style={{ display: 'flex', flexDirection: 'row', gap: '24px' }}>
                <div style={{ width: '100%', maxWidth: '320px', backgroundColor: '#f1f5f9', padding: '24px', borderRadius: '18px', border: '1px solid #cbd5e1' }}>
                  <div style={{ width: '112px', height: '112px', borderRadius: '50%', backgroundColor: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#64748b', fontSize: '24px' }}>+</div>
                  <p style={{ fontSize: '14px', color: '#64748b' }}>Upload driver profile photo and capture basic identity details.</p>
                </div>

                <form style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }} onSubmit={handleAddDriver}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                    <div className="form-field">
                      <label>First Name</label>
                      <input type="text" value={newDriverFirst} onChange={(e) => setNewDriverFirst(e.target.value)} />
                    </div>
                    <div className="form-field">
                      <label>Last Name</label>
                      <input type="text" value={newDriverLast} onChange={(e) => setNewDriverLast(e.target.value)} />
                    </div>
                    <div className="form-field">
                      <label>Email Address</label>
                      <input type="email" value={newDriverEmail} onChange={(e) => setNewDriverEmail(e.target.value)} />
                    </div>
                    <div className="form-field">
                      <label>Phone Number</label>
                      <input type="text" value={newDriverPhone} onChange={(e) => setNewDriverPhone(e.target.value)} />
                    </div>
                    <div className="form-field">
                      <label>Date of Birth</label>
                      <input type="date" value={newDriverDob} onChange={(e) => setNewDriverDob(e.target.value)} />
                    </div>
                    <div className="form-field">
                      <label>Assigned Vehicle</label>
                      <input type="text" value={newDriverVehicle} onChange={(e) => setNewDriverVehicle(e.target.value)} placeholder="FLT-xxxx" />
                    </div>
                    <div className="form-field">
                      <label>Driver's License Number</label>
                      <input type="text" value={newDriverLicense} onChange={(e) => setNewDriverLicense(e.target.value)} />
                    </div>
                    <div className="form-field">
                      <label>License Expiry Date</label>
                      <input type="date" value={newDriverLicenseExpiry} onChange={(e) => setNewDriverLicenseExpiry(e.target.value)} />
                    </div>
                    <div className="form-field">
                      <label>Emergency Contact Name</label>
                      <input type="text" value={newDriverEmergencyName} onChange={(e) => setNewDriverEmergencyName(e.target.value)} />
                    </div>
                    <div className="form-field">
                      <label>Emergency Phone Number</label>
                      <input type="text" value={newDriverEmergencyPhone} onChange={(e) => setNewDriverEmergencyPhone(e.target.value)} />
                    </div>
                    <div style={{ gridColumn: 'span 3' }} className="form-field">
                      <label>Driver Profile Photo</label>
                      <input type="file" accept="image/*" onChange={handleDriverPhotoUpload} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button type="submit" className="btn btn-primary">Save Driver</button>
                    <button type="button" className="btn btn-secondary" onClick={() => {
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
                    }}>Cancel</button>
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
                    <p style={{ fontSize: '14px', color: '#64748b', fontWeight: '600' }}>{calendarMonth.toLocaleString('default', { month: 'long' })} {calendarMonth.getFullYear()}</p>
                    <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a' }}>Calendar</h3>
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
                  <p style={{ color: '#64748b' }}>{selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  <p style={{ marginTop: '16px' }}>{selectedDayItems.length > 0 ? `You have ${selectedDayItems.length} scheduled task${selectedDayItems.length === 1 ? '' : 's'}.` : 'No maintenance tasks are scheduled for this day.'}</p>
                </div>
                <div className="maintenance-summary card">
                  <h3>Tasks for the Day</h3>
                  <div className="maintenance-list">
                    {selectedDayItems.length === 0 ? (
                      <div style={{ color: '#64748b' }}>Select a day to view maintenance tasks.</div>
                    ) : (
                      selectedDayItems.map((item) => {
                        return (
                          <div key={item.id} className="maintenance-item" style={{ position: 'relative' }}>
                            <button className="btn btn-danger" onClick={() => handleDeleteMaintenance(item.id)} style={{ position: 'absolute', top: '8px', right: '8px' }}>×</button>
                            <div className="maintenance-item-title">{item.title}</div>
                            <div style={{ fontSize: '14px', color: '#475569' }}>{item.vehicle} · {item.driver}</div>
                            <div className="maintenance-tags">
                              <span className="tag-pill">{item.status}</span>
                              <span className="tag-pill">{item.date}</span>
                            </div>
                            {item.notes && <p style={{ color: '#64748b', fontSize: '14px', marginTop: '8px' }}>{item.notes}</p>}
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
                    <label>Task Title</label>
                    <input value={maintenanceTitle} onChange={(e) => setMaintenanceTitle(e.target.value)} placeholder="Brake inspection" />
                  </div>
                  <div className="form-field">
                    <label>Date</label>
                    <input type="date" value={maintenanceDate} onChange={(e) => setMaintenanceDate(e.target.value)} />
                  </div>
                  <div className="form-field">
                    <label>Vehicle</label>
                    <input value={maintenanceVehicle} onChange={(e) => setMaintenanceVehicle(e.target.value)} placeholder="FLT-8829" />
                  </div>
                  <div className="form-field">
                    <label>Assign Driver</label>
                    <select value={maintenanceDriver} onChange={(e) => setMaintenanceDriver(e.target.value)}>
                      <option value="">Select Driver</option>
                      {drivers.map((driver) => {
                        return <option key={driver.id} value={driver.name}>{driver.name}</option>;
                      })}
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Status</label>
                    <select value={maintenanceStatus} onChange={(e) => setMaintenanceStatus(e.target.value)}>
                      <option value="Scheduled">Scheduled</option>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Overdue">Overdue</option>
                    </select>
                  </div>
                  <div className="form-field" style={{ gridColumn: 'span 2' }}>
                    <label>Notes</label>
                    <textarea value={maintenanceNotes} onChange={(e) => setMaintenanceNotes(e.target.value)} placeholder="Describe the maintenance requirements or priority." />
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
              <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '18px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px' }}>
                <img src={profileImage} alt={profileName} style={{ width: '112px', height: '112px', borderRadius: '50%', objectFit: 'cover', border: '2px solid white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <h3 style={{ fontWeight: 'bold', color: '#0f172a', fontSize: '20px' }}>{profileName}</h3>
                <span style={{ backgroundColor: '#eff6ff', color: '#1e40af', fontWeight: 'bold', fontSize: '12px', letterSpacing: '0.05em', textTransform: 'uppercase', padding: '8px 16px', borderRadius: '9999px' }}>Fleet Director</span>

                <div style={{ width: '100%', marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid #e2e8f0', paddingTop: '24px', textAlign: 'left', fontSize: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ color: '#64748b', fontWeight: '600' }}>Email</span><span style={{ fontWeight: 'bold', color: '#1e293b' }}>{profileEmail}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ color: '#64748b', fontWeight: '600' }}>Phone</span><span style={{ fontWeight: 'bold', color: '#1e293b' }}>{profilePhone}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ color: '#64748b', fontWeight: '600' }}>Company</span><span style={{ fontWeight: 'bold', color: '#1e293b' }}>{profileCompany}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ color: '#64748b', fontWeight: '600' }}>Department</span><span style={{ fontWeight: 'bold', color: '#1e293b' }}>{profileDept}</span></div>
                </div>
              </div>

              <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '18px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <h3 style={{ color: '#0f172a', fontWeight: 'bold', fontSize: '20px', marginBottom: '16px' }}>Edit Profile</h3>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={handleSaveProfile}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="form-field">
                      <label>Full Name</label>
                      <input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} />
                    </div>
                    <div className="form-field">
                      <label>Email Address</label>
                      <input type="email" value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} />
                    </div>
                    <div className="form-field">
                      <label>Phone Number</label>
                      <input type="text" value={profilePhone} onChange={(e) => setProfilePhone(e.target.value)} />
                    </div>
                    <div className="form-field">
                      <label>Company</label>
                      <input type="text" value={profileCompany} onChange={(e) => setProfileCompany(e.target.value)} />
                    </div>
                    <div className="form-field" style={{ gridColumn: 'span 2' }}>
                      <label>Department</label>
                      <input type="text" value={profileDept} onChange={(e) => setProfileDept(e.target.value)} />
                    </div>
                    <div className="form-field" style={{ gridColumn: 'span 2' }}>
                      <label>Profile Photo</label>
                      <input type="file" accept="image/*" onChange={handleProfileImageUpload} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
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
