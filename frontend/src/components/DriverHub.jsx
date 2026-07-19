import React, { useState, useEffect } from 'react';

export default function DriverHub() {
    const [currentView, setCurrentView] = useState('dashboard');
    const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);

    const [vehicleID, setVehicleID] = useState('1');
    const [propulsionType, setPropulsionType] = useState('PHEV');
    const [odometer, setOdometer] = useState('');
    const [fuelConsumption, setFuelConsumption] = useState('');
    const [batteryUsage, setBatteryUsage] = useState('');
    const [plateNumber, setPlateNumber] = useState('');
    const [notes, setNotes] = useState('');
    
    const [allLogs, setAllLogs] = useState([]);
    const [loadingLogs, setLoadingLogs] = useState(true);
    const [expandedLogId, setExpandedLogId] = useState(null);

    const showFuel = propulsionType === 'GAS' || propulsionType === 'PHEV';
    const showBattery = propulsionType === 'EV' || propulsionType === 'PHEV';
    const todayLogs = allLogs.filter(log => {
    const rawDate = log.logDate || log.log_date;
    if (!rawDate) return false;
    return new Date(rawDate).toLocaleDateString() === new Date().toLocaleDateString();
});

// Sum or pull max values dynamically
const latestOdometer = todayLogs.reduce((sum, log) => {return sum + (parseFloat(log.odometer ?? log.mileage) || 0);}, 0);
const totalFuelToday = todayLogs.reduce((sum, log) => sum + (parseFloat(log.fuelConsumption ?? log.fuel_consumption) || 0), 0);
const totalBatteryToday = todayLogs.reduce((sum, log) => sum + (parseFloat(log.EVConsumption ?? log.ev_consumption) || 0), 0);

    useEffect(() => {
        fetch('http://localhost:5000/api/telemetry/driver/1')
            .then((res) => res.json())
            .then((data) => {
                setAllLogs(Array.isArray(data) ? data : []);
                setLoadingLogs(false);
            })
            .catch((err) => {
                console.error("Error reading recent logs:", err);
                setLoadingLogs(false);
            });
    }, [currentView]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const platePattern = /^2[A-Z]{2}-\d{4}$/;
        if(!platePattern.test(plateNumber)) {
            alert('Invalid Plate Number Format Please re-enter.');
            return;
        }

        const telemetryPayload = {
            driverId: 1, 
            vehicleId: parseInt(vehicleID),
            propulsionType: propulsionType,
            odometer: parseFloat(odometer) || 0,
            fuelConsumption: showFuel ? parseFloat(fuelConsumption) || 0 : 0,
            evConsumption: showBattery ? parseFloat(batteryUsage) || 0 : 0,
            plateNumber: plateNumber,
            notes: notes
        };

        try {
            const response = await fetch('http://localhost:5000/api/telemetry/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(telemetryPayload)
            });

            const data = await response.json();

            if (response.ok) {
                alert('🎉 Telemetry log submitted successfully to the database!');
                
                const savedEntry = {
                    logDate: new Date(),
                    propulsionType: telemetryPayload.propulsionType,
                    plateNumber: telemetryPayload.plateNumber,
                    vehicleID: telemetryPayload.vehicleId,
                    odometer: telemetryPayload.odometer,
                    fuelConsumption: telemetryPayload.fuelConsumption,
                    EVConsumption: telemetryPayload.evConsumption,
                    notes: telemetryPayload.notes || 'Submitted Successfully'
                };
                setAllLogs([savedEntry, ...allLogs]);

                setOdometer('');
                setFuelConsumption('');
                setBatteryUsage('');
                setPlateNumber('');
                setNotes('');
                setCurrentView('dashboard');
            } else {
                alert(`Submission failed: ${data.error}\nReason: ${data.details || 'Check console details.'}`);
            }

        } catch (error) {
            console.warn('Backend server down. Switching automatically to frontend local memory sync mode.', error);

            const memoryLogFallbackEntry = {
                logDate: new Date(),
                propulsionType: telemetryPayload.propulsionType,
                plateNumber: telemetryPayload.plateNumber,
                vehicleID: telemetryPayload.vehicleId,
                odometer: telemetryPayload.odometer,
                fuelConsumption: telemetryPayload.fuelConsumption,
                EVConsumption: telemetryPayload.evConsumption,
                notes: telemetryPayload.notes || 'Saved Local Sync (Offline)'
            };

            setAllLogs([memoryLogFallbackEntry, ...allLogs]);
            alert('Offline Notice: Server not live. Entry saved locally to dashboard state memory array.');

            setOdometer('');
            setFuelConsumption('');
            setBatteryUsage('');
            setPlateNumber('');
            setNotes('');
            setCurrentView('dashboard');
        }
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

                .sidebar { 
                    width: 260px; 
                    background-color: var(--sidebar-blue); 
                    color: white; 
                    display: flex; 
                    flex-direction: column; 
                    flex-shrink: 0; 
                    transition: transform 0.3s ease; 
                    z-index: 100; 
                }
                .sidebar-header { 
                    padding: 24px; 
                    display: flex; 
                    align-items: center; 
                    gap: 12px; 
                    font-weight: 700; 
                    font-size: 14px; 
                    text-transform: uppercase; 
                    letter-spacing: 0.5px; 
                    border-bottom: 1px solid rgba(255,255,255,0.1); 
                }
                .sidebar-menu { 
                    list-style: none; 
                    margin-top: 16px; 
                    flex-grow: 1; 
                }
                .sidebar-item button { 
                    width: 100%; 
                    text-align: left; 
                    background: none; 
                    border: none; 
                    display: flex; 
                    align-items: center; 
                    gap: 12px; 
                    padding: 14px 24px; 
                    color: rgba(255,255,255,0.7); 
                    font-size: 14px; 
                    font-weight: 500; 
                    transition: all 0.2s; 
                    cursor: pointer; 
                }
                .sidebar-item.active button, 
                .sidebar-item button:hover { 
                    color: white; 
                    background-color: var(--sidebar-active); 
                }
                .sidebar-item.logout { 
                    border-top: 1px solid rgba(255,255,255,0.1); 
                    margin-top: auto; 
                }

                .main-wrapper { 
                    flex-grow: 1; 
                    display: flex; 
                    flex-direction: column; 
                    width: calc(100% - 260px); 
                    min-width: 0; 
                }
                .top-navbar { 
                    background-color: var(--sidebar-blue); 
                    color: white; 
                    padding: 16px 32px; 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                    font-weight: 600; 
                }
                .nav-title { 
                    display: flex; 
                    align-items: center; 
                    gap: 12px; 
                }
                .menu-toggle { 
                    display: none; 
                    cursor: pointer; 
                    font-size: 18px; 
                }
                .user-profile { 
                    display: flex; 
                    align-items: center; 
                    gap: 10px; 
                    font-size: 13px; 
                    font-weight: 400; 
                }
                .avatar { 
                    width: 32px; 
                    height: 32px; 
                    background-color: rgba(255, 255, 255, 0.2); 
                    border-radius: 50%; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    font-weight: 600; 
                    font-size: 12px; 
                }
                .app-view { 
                    display: flex; 
                    flex-direction: column; 
                    gap: 24px; 
                    padding: 32px; 
                    max-width: 1660px; 
                    width: 100%; 
                    margin: 0 auto; 
                    animation: fadeIn 0.2s ease-in-out; 
                }
                .view-header h1, 
                .view-header h2 { 
                    font-size: 28px; 
                    margin-bottom: 4px; 
                    color: #0f172a; 
                }
                .view-header p { 
                    color: var(--text-muted); 
                    font-size: 14px; 
                }

                .card { 
                    background: var(--card-bg); 
                    border-radius: 8px; 
                    padding: 20px; 
                    box-shadow: 0 1px 3px rgba(0,0,0,0.05); 
                    border: 1px solid var(--border-color); 
                }
                .kpi-grid { 
                    display: grid; 
                    grid-template-columns: repeat(4, 1fr); 
                    gap: 20px; 
                }
                .kpi-card .card-title { 
                    font-size: 12px; 
                    color: var(--text-muted); 
                    margin-bottom: 8px; 
                    font-weight: 500; 
                }
                .kpi-card .card-value { 
                    font-size: 32px; 
                    font-weight: 700; 
                }
                .kpi-card .card-value span { 
                    font-size: 16px; 
                    font-weight: 500; 
                    color: var(--text-muted); 
                    margin-left: 4px; 
                }
                .kpi-card.fuel .card-value { 
                    color: var(--green); 
                }
                .kpi-card.alerts { 
                    border-left: 4px solid var(--red); 
                }
                .kpi-card.alerts .card-value { 
                    color: var(--red); 
                    font-size: 20px; 
                    display: flex; 
                    align-items: center; 
                    gap: 8px; 
                    margin-top: 12px; 
                }
                .dashboard-split { 
                    display: grid; 
                    grid-template-columns: 2fr 1fr; 
                    gap: 24px; 
                }
                
                .bottom-split { 
                    display: grid; 
                    grid-template-columns: 2fr 1fr; 
                    gap: 24px; 
                    align-items: stretch;
                }
                .bottom-split .card {
                    background: var(--card-bg);
                    border-radius: 8px;
                    padding: 24px 24px 32px 24px;
                    min-height: 180px;
                    display: flex;
                    flex-direction: column;
                    box-sizing: border-box;
                }

                .chart-header { 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                    margin-bottom: 20px; 
                }
                .chart-legends { 
                    display: flex; 
                    gap: 16px; 
                    font-size: 12px; 
                }
                .legend { 
                    display: flex; 
                    align-items: center; 
                    gap: 6px; 
                }
                .legend-dot { 
                    width: 10px; height: 10px; border-radius: 2px; 
                }
                .legend-mileage { background-color: var(--green); }
                .legend-fuel { background-color: #3b82f6; }
                .mock-chart { 
                    width: 100%; 
                    height: 240px; 
                    background: #fafafa; 
                    border: 1px dashed #cbd5e1; 
                    border-radius: 6px; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    color: var(--text-muted); 
                    font-size: 14px; 
                }

                .btn-primary, 
                .btn-secondary, 
                .btn-full-blue, 
                .view-all-btn { 
                    display: inline-flex; 
                    align-items: center; 
                    justify-content: center; 
                    gap: 8px; 
                    padding: 12px 24px; 
                    border-radius: 6px; 
                    font-weight: 500; 
                    font-size: 13px; 
                    cursor: pointer; 
                    transition: all 0.2s; 
                    border: none; 
                }
                .btn-primary { background-color: #1e40af; color: white; }
                .btn-primary:hover { background-color: #1d4ed8; }
                .btn-secondary { background-color: white; color: #334155; border: 1px solid #d1d5db; }
                .btn-secondary:hover { background-color: #f8fafc; }
                .btn-full-blue { background-color: #2563eb; color: white; width: 100%; padding: 14px; font-size: 14px; }
                .view-all-btn { width: 100%; background-color: #1e3a5f; color: white; margin-top: 16px; }
                .maintenance-alert-box { display: flex; align-items: center; justify-content: space-between; background: #f8fafc; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 4px; margin-top: 12px; }
                .btn-details { background-color: #1e3a5f; color: white; border: none; padding: 8px 16px; border-radius: 4px; font-size: 13px; cursor: pointer; }
                
                .badge { 
                    display: inline-block; 
                    padding: 2px 8px; 
                    border-radius: 4px; 
                    font-size: 11px; 
                    font-weight: 600; 
                    text-transform: capitalize; 
                }
                .badge.completed { background-color: #d1fae5; color: #065f46; }
                .badge.overdue { background-color: #fee2e2; color: #991b1b; }
                .badge.upcoming { background-color: #ffedd5; color: #9a3412; }
                
                .tip-box { 
                    display: flex; 
                    gap: 16px; 
                    align-items: flex-start; 
                    background: #f0f7ff; 
                    border-radius: 8px; 
                    padding: 16px; 
                    margin-top: 12px;
                    flex-grow: 1; 
                }
                .tip-text h4 { font-size: 14px; margin-bottom: 4px; color: #1e3a5f; }
                .tip-text p { font-size: 12px; color: var(--text-muted); line-height: 1.5; }

                .form-card { 
                    background: var(--card-bg); 
                    border-radius: 8px; 
                    padding: 40px; 
                    border: 1px solid var(--border-color); 
                    max-width: 900px; 
                    width: 100%; 
                }
                .form-row { 
                    display: grid; 
                    grid-template-columns: 160px 1fr; 
                    align-items: center; 
                    margin-bottom: 24px; 
                }
                .form-row.split-row { 
                    display: grid; 
                    grid-template-columns: 1fr 1fr; 
                    gap: 24px; 
                }
                .input-group { 
                    display: flex; 
                    flex-direction: column; 
                    gap: 8px; 
                    width: 100%; 
                }
                .form-row label, 
                .input-group label { 
                    font-size: 14px; 
                    font-weight: 600; 
                    color: #334155; 
                }
                .input-wrapper { 
                    position: relative; 
                    display: flex; 
                    align-items: center; 
                    width: 100%; 
                }
                .input-wrapper i { 
                    position: absolute; 
                    left: 14px; 
                    color: #94a3b8; 
                    font-size: 14px; 
                }
                .form-control { 
                    width: 100%; 
                    padding: 12px 14px; 
                    border: 1px solid #cbd5e1; 
                    border-radius: 6px; 
                    font-size: 14px; 
                    color: var(--text-dark); 
                    outline: none; 
                    transition: border-color 0.15s ease; 
                }
                .has-icon .form-control { 
                    padding-left: 40px; 
                }
                .form-control:focus { 
                    border-color: var(--input-focus); 
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); 
                }
                select.form-control { 
                    appearance: none; 
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E"); 
                    background-repeat: no-repeat; 
                    background-position: right 14px center; 
                    background-size: 16px; 
                    background-color: #fff; 
                }
                textarea.form-control { 
                    resize: vertical; 
                    min-height: 110px; 
                }
                .form-actions { 
                    display: flex; 
                    gap: 16px; 
                    margin-top: 32px; 
                }
                .form-tip { 
                    font-size: 12px; 
                    color: var(--text-muted); 
                    font-style: italic; 
                    margin-top: 16px; 
                }

                .my-logs-card { 
                    background: var(--card-bg); 
                    border: 1px solid var(--border-color); 
                    border-radius: 6px; 
                    padding: 0; 
                    overflow: hidden; 
                }
                .logs-table, 
                .master-table { 
                    width: 100%; 
                    border-collapse: collapse; 
                    text-align: left; 
                    font-size: 13px; 
                }
                .logs-table th, 
                .master-table th { 
                    color: var(--text-muted); 
                    font-weight: 600; 
                    padding-bottom: 12px; 
                    text-transform: uppercase; 
                    font-size: 11px; 
                    border-bottom: 1px solid var(--border-color); 
                }
                .master-table th { 
                    padding: 16px 24px; 
                    background-color: #f8fafc; 
                }
                .logs-table td, 
                .master-table td { 
                    padding: 16px 0; 
                    border-bottom: 1px solid #f1f5f9; 
                }
                .master-table td { 
                    padding: 16px 24px; 
                }
                .logs-table td.bold-data { 
                    font-weight: 700; 
                }
                .master-table tr:hover { 
                    background-color: #f8fafc; 
                }
                
                .history-split { 
                    display: grid; 
                    grid-template-columns: 1fr; 
                    gap: 24px; 
                    align-items: start; 
                }
                .service-records-list { 
                    display: flex; 
                    flex-direction: column; 
                    gap: 8px; 
                    margin-bottom: 24px; 
                }
                .timeline-item { 
                    position: relative; 
                    padding: 16px 16px 16px 40px; 
                    border-bottom: 1px solid #f1f5f9; 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: flex-start; 
                }
                .timeline-item:last-child { 
                    border-bottom: none; 
                }
                .timeline-icon { 
                    position: absolute; 
                    left: 8px; 
                    top: 20px; 
                    width: 18px; 
                    height: 18px; 
                    border-radius: 50%; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    font-size: 10px; 
                    color: white; 
                    z-index: 2; 
                }
                .timeline-icon.completed { background-color: var(--green); }
                .timeline-icon.overdue { background-color: var(--red); }
                .timeline-icon.upcoming { background-color: var(--orange); }
                .timeline-item::before { content: ''; position: absolute; left: 16px; top: 0; bottom: 0; width: 2px; background-color: #e2e8f0; z-index: 1; }
                .timeline-item:first-child::before { top: 24px; }
                .timeline-item:last-child::before { height: 20px; }
                
                .record-info h4 { 
                    font-size: 15px; 
                    font-weight: 600; 
                    color: #0f172a; 
                    margin-bottom: 4px; 
                }
                .record-status { 
                    font-size: 12px; 
                    color: var(--text-muted); 
                    display: flex; 
                    align-items: center;  
                    gap: 6px; 
                }

                .settings-grid { 
                    display: grid; 
                    grid-template-columns: 1fr; 
                    gap: 24px; 
                    max-width: 1000px; 
                    width: 100%; 
                }
                .settings-box-title { 
                    font-size: 14px; 
                    font-weight: 600; 
                    color: #1e3a5f; 
                    margin-bottom: 20px; 
                    padding-bottom: 8px; 
                    border-bottom: 1px solid var(--border-color); 
                }

                @media (max-width: 1200px) {
                    .kpi-grid { grid-template-columns: repeat(2, 1fr); }
                    .dashboard-split, 
                    .bottom-split, 
                    .settings-split-row, 
                    .history-split { 
                        grid-template-columns: 1fr; 
                    }
                }
                @media (max-width: 992px) {
                    .sidebar { position: fixed; left: 0; top: 0; bottom: 0; transform: translateX(-100%); }
                    .sidebar.mobile-open { transform: translateX(0); }
                    .main-wrapper { width: 100%; }
                    .menu-toggle { display: block; }
                    .app-view { padding: 24px 16px; }
                }
                @media (max-width: 768px) {
                    .form-row, 
                    .form-row.split-row { 
                        grid-template-columns: 1fr; 
                        gap: 20px; 
                    }
                    .form-card { padding: 24px; }
                    .kpi-grid { grid-template-columns: 1fr; }
                    .top-navbar { padding: 16px; }
                    .my-logs-card { overflow-x: auto; }
                }
            `}</style>

            <aside className={`sidebar ${sidebarMobileOpen ? 'mobile-open' : ''}`} id="sidebar">
                <div className="sidebar-header">
                    <i className="fa-solid fa-truck-monster"></i>
                    <span>Fleet Management</span>
                </div>
                <ul className="sidebar-menu">
                    <li className={`sidebar-item ${currentView === 'dashboard' ? 'active' : ''}`} onClick={() => { setCurrentView('dashboard'); setSidebarMobileOpen(false); }}>
                        <button><i className="fa-solid fa-chart-pie"></i> Dashboard</button>
                    </li>
                    <li className={`sidebar-item ${currentView === 'add-log' ? 'active' : ''}`} onClick={() => { setCurrentView('add-log'); setSidebarMobileOpen(false); }}>
                        <button><i className="fa-solid fa-plus"></i> Add Daily Log</button>
                    </li>
                    <li className={`sidebar-item ${currentView === 'my-logs' ? 'active' : ''}`} onClick={() => { setCurrentView('my-logs'); setSidebarMobileOpen(false); }}>
                        <button><i className="fa-solid fa-file-invoice"></i> My Logs</button>
                    </li>
                    <li className={`sidebar-item ${currentView === 'maintenance' ? 'active' : ''}`} onClick={() => { setCurrentView('maintenance'); setSidebarMobileOpen(false); }}>
                        <button><i className="fa-solid fa-history"></i> Maintenance History</button>
                    </li>
                    <li className={`sidebar-item ${currentView === 'settings' ? 'active' : ''}`} onClick={() => { setCurrentView('settings'); setSidebarMobileOpen(false); }}>
                        <button><i className="fa-solid fa-gear"></i> Settings</button>
                    </li>
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
                        Welcome, Driver <div className="avatar">D</div>
                    </div>
                </nav>

                {currentView === 'dashboard' && (
                    <div id="view-dashboard" className="app-view">
                        <section className="view-header">
                            <h1>Welcome Back!</h1>
                            <p>Assigned Vehicle Telemetry Monitor</p>
                        </section>

                        <section className="kpi-grid">
                            <div className="card kpi-card">
                                <div className="card-title">Today's Mileage</div>
                                <div className="card-value">{Number(latestOdometer).toLocaleString()}<span>km</span></div>
                            </div>
                            <div className="card kpi-card fuel">
                                <div className="card-title">Fuel Used Today</div>
                                <div className="card-value">{totalFuelToday.toFixed(1)}<span>L</span></div>
                            </div>
                            <div className="card kpi-card">
                                <div className="card-title">Battery Used Today</div>
                                <div className="card-value" style={{ color: '#3b82f6' }}>{totalBatteryToday.toFixed(1)}<span>kWh</span></div>
                            </div>
                            
                            {/* CLICKABLE OVERDUE MAINTENANCE ALERTS CARD */}
                            <div 
                                className="card kpi-card alerts" 
                                onClick={() => {
                                    setCurrentView('maintenance');
                                    alert("⚠️ CRITICAL MAINTENANCE ALERT:\n\nVehicle ID: #1 (Ford Territory)\nIssue: Oil Change & Filter Replacement\nStatus: OVERDUE by 3 Days\n\nPlease schedule service immediately.");
                                }} 
                                style={{ cursor: 'pointer', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                                }}
                            >
                                <div className="card-title">Maintenance Alerts</div>
                                <div className="card-value">
                                    <i className="fa-solid fa-circle-exclamation"></i> 1 Overdue
                                </div>
                            </div>
                        </section>

                        <section className="dashboard-split">
                            <div className="card">
                                <div className="chart-header">
                                    <h3>Fuel & Battery Realtime Profile</h3>
                                    <div className="chart-legends">
                                        <div className="legend"><span className="legend-dot legend-mileage"></span> Fuel (L)</div>
                                        <div className="legend"><span className="legend-dot legend-fuel"></span> Battery (kWh)</div>
                                    </div>
                                </div>
                                <div className="mock-chart">[ Dynamic Telemetry Graph Canvas ]</div>
                            </div>

                            <div className="card logs-card" style={{ overflowX: 'auto' }}>
                                <h3>Recent Logs</h3>
                                <table className="logs-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr>
                                            <th style={{ padding: '8px' }}>Date</th>
                                            <th style={{ padding: '8px' }}>Plate Number</th>
                                            <th style={{ padding: '8px' }}>km</th>
                                            <th style={{ padding: '8px' }}>Fuel (L)</th>
                                            <th style={{ padding: '8px' }}>EV (kWh)</th>
                                            <th style={{ padding: '8px' }}>Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loadingLogs ? (
                                            <tr>
                                                <td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '16px' }}>Loading...</td>
                                            </tr>
                                        ) : allLogs.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" style={{ textAlign: 'center', fontStyle: 'italic', color: 'var(--text-muted)', padding: '16px' }}>No recent logs found.</td>
                                            </tr>
                                        ) : (
                                            allLogs.slice(0, 5).map((log, index) => {
                                                const rawDate = log.logDate || log.log_date;
                                                const displayDate = rawDate ? new Date(rawDate).toLocaleString() : 'N/A';
                                                
                                                return (
                                                    <tr key={index}>
                                                        <td style={{ padding: '12px 8px', whiteSpace: 'nowrap' }}>{displayDate}</td>
                                                        <td style={{ padding: '12px 8px', fontWeight: 500, whiteSpace: 'nowrap' }}>
                                                            {log.plateNumber || log.plate_number || 'N/A'}
                                                        </td>
                                                        <td className="bold-data" style={{ padding: '12px 8px', whiteSpace: 'nowrap' }}>
                                                            {log.odometer ?? log.mileage ?? 0} km
                                                        </td>
                                                        <td className="bold-data" style={{ padding: '12px 8px', whiteSpace: 'nowrap' }}>
                                                            {log.fuelConsumption ?? log.fuel_consumption ?? 0} L
                                                        </td>
                                                        <td className="bold-data" style={{ padding: '12px 8px', whiteSpace: 'nowrap' }}>
                                                            {(log.propulsionType || log.propulsion_type) !== 'ICE' 
                                                                ? `${log.EVConsumption ?? log.ev_consumption ?? '0.00'} kWh` 
                                                                : '-'}
                                                        </td>
                                                        <td style={{ padding: '12px 8px' }}>
                                                            <div
                                                                title={log.notes}
                                                                style={{
                                                                    maxWidth: '150px',
                                                                    overflow: 'hidden',
                                                                    textOverflow: 'ellipsis',
                                                                    whiteSpace: 'nowrap',
                                                                    cursor: 'pointer',
                                                                    fontStyle: log.notes ? 'normal' : 'italic',
                                                                    color: log.notes ? 'inherit' : 'var(--text-muted)'
                                                                }}
                                                                onClick={() => log.notes && alert(`Full Note:\n\n${log.notes}`)}
                                                            >
                                                                {log.notes || 'No notes'}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        )}
                                    </tbody>
                                </table>
                                <button className="view-all-btn" onClick={() => setCurrentView('my-logs')}>View All Logs <i className="fa-solid fa-chevron-down"></i></button>
                            </div>
                        </section>

                        <section className="bottom-split">
                            <div className="card">
                                <h3>Upcoming Maintenance</h3>
                                <div className="maintenance-alert-box">
                                    <div className="maintenance-info">Oil Change - Due in 3 Days</div>
                                    <button className="btn-details" onClick={() => setCurrentView('maintenance')}>View Details</button>
                                </div>
                            </div>
                            
                            <div className="card">
                                <h3>Driver Tips</h3>
                                <div className="tip-box">
                                    <div className="tip-icon">
                                        <i className="fa-solid fa-circle-check" style={{ color: 'var(--sidebar-blue)' }}></i>
                                    </div>
                                    <div className="tip-text">
                                        <h4>Check Tire Pressure</h4>
                                        <p>Maintain proper tire pressure for better fuel efficiency and safety.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                {currentView === 'add-log' && (
                    <div id="view-add-log" className="app-view">
                        <section className="view-header">
                            <h2>Enter Daily Log Details</h2>
                        </section>

                        <form className="form-card" onSubmit={handleFormSubmit}>
                            <div className="form-row">
                                <label htmlFor="plate_number">License Plate Number</label>
                                <div className="input-wrapper has-icon">
                                    <i className="fa-solid fa-rectangle-ad"></i>
                                    <input type="text" id="plate_number" className="form-control" placeholder="e.g. 2CA-8687" value={plateNumber} onChange={(e) => setPlateNumber(e.target.value.toUpperCase())} required />
                                </div>
                            </div>

                            <div className="form-row">
                                <label htmlFor="vehicle">Select Vehicle ID</label>
                                <div className="input-wrapper has-icon">
                                    <i className="fa-solid fa-truck-pickup"></i>
                                    <select id="vehicle" className="form-control" value={vehicleID} onChange={(e) => setVehicleID(e.target.value)}>
                                        <option value="1">Ford Territory</option>
                                        <option value="2">Mazda CX-60</option>
                                        <option value="3">Changan Nevo Q07</option>
                                        <option value="4">Aion LX</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <label htmlFor="propulsion">Propulsion Type</label>
                                <div className="input-wrapper has-icon">
                                    <i className="fa-solid fa-engine"></i>
                                    <select id="propulsion" className="form-control" value={propulsionType} onChange={(e) => setPropulsionType(e.target.value)}>
                                        <option value="PHEV">PHEV (Electric Usage and Fuel Consumption)</option>
                                        <option value="EV">EV (Battery Usage)</option>
                                        <option value="GAS">GAS (ICE) (Fuel Consumption)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <label htmlFor="distance">Current Odometer (km)</label>
                                <div className="input-wrapper has-icon">
                                    <i className="fa-solid fa-gauge"></i>
                                    <input type="number" step="any" id="distance" className="form-control" placeholder="Enter kilometers" value={odometer} onChange={(e) => setOdometer(e.target.value)} required />
                                </div>
                            </div>

                            <div className="form-row split-row">
                                {showFuel && (
                                    <div className="input-group">
                                        <label htmlFor="fuel_used">Fuel Consumption (Liters)</label>
                                        <input type="number" step="any" id="fuel_used" className="form-control" placeholder="Enter liters" value={fuelConsumption} onChange={(e) => setFuelConsumption(e.target.value)} required={showFuel} />
                                    </div>
                                )}
                                {showBattery && (
                                    <div className="input-group">
                                        <label htmlFor="battery_discharge">Electric Usage (kWh)</label>
                                        <input type="number" step="any" id="battery_discharge" className="form-control" placeholder="Enter kWh consumed" value={batteryUsage} onChange={(e) => setBatteryUsage(e.target.value)} required={showBattery} />
                                    </div>
                                )}
                            </div>

                            <div className="input-group" style={{ marginTop: '12px' }}>
                                <label htmlFor="notes">Maintenance Notes</label>
                                <textarea id="notes" className="form-control" placeholder="Describe any technical updates or issues..." value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="btn btn-primary"><i className="fa-regular fa-square-check"></i> Save Telemetry Log</button>
                                <button type="reset" className="btn btn-secondary" onClick={() => { setPlateNumber(''); setOdometer(''); setFuelConsumption(''); setBatteryUsage(''); setNotes(''); }}><i className="fa-solid fa-xmark"></i> Clear Form</button>
                            </div>
                        </form>
                        <p className="form-tip">Tip: Ensure fuel metrics are input precisely before dispatch saving.</p>
                    </div>
                )}

                {currentView === 'my-logs' && (
                    <div id="view-my-logs" className="app-view">
                        <section className="view-header">
                            <h2>My Logs</h2>
                            <p>Manage and track daily fleet activities.</p>
                        </section>

                        <div className="my-logs-card">
                            <table className="master-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Vehicle ID</th>
                                        <th>Plate Number</th>
                                        <th>km</th>
                                        <th>Fuel Level</th>
                                        <th>EV Consumption</th>
                                        <th>Notes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allLogs.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" style={{ textAlign: 'center', fontStyle: 'italic', color: 'var(--text-muted)', padding: '24px' }}>No records found in database.</td>
                                        </tr>
                                    ) : (
                                        allLogs.map((log, idx) => {
                                            const rawDate = log.logDate || log.log_date;
                                            const displayDate = rawDate ? new Date(rawDate).toLocaleString() : 'N/A';
                                            const isExpanded = expandedLogId === idx;

                                            return (
                                                <tr key={idx}>
                                                    <td style={{ fontWeight: 600, whiteSpace: 'nowrap'}}>{displayDate}</td>
                                                    <td style={{ fontWeight: 500, whiteSpace: 'nowrap', color: 'var(--text-muted)' }}>
                                                        #{log.vehicleID || log.vehicleId || log.vehicle_id || 'N/A'}
                                                    </td>
                                                    <td style={{ fontWeight: 500, whiteSpace: 'nowrap'}}>
                                                        {log.plateNumber || log.plate_number || 'N/A'}
                                                    </td>
                                                    <td style={{ whiteSpace: 'nowrap'}}>
                                                        {log.odometer ?? log.mileage ?? 0} km
                                                    </td>
                                                    <td style={{ whiteSpace: 'nowrap'}}>
                                                        {log.fuelConsumption ?? log.fuel_consumption ?? 0} L
                                                    </td>
                                                    <td style={{ whiteSpace: 'nowrap'}}>
                                                        {(log.propulsionType || log.propulsion_type) !== 'ICE' 
                                                            ? `${log.EVConsumption ?? log.ev_consumption ?? '0.00'} kWh` 
                                                            : '-'}
                                                    </td>
                                                    <td>
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                            <div
                                                                title={log.notes}
                                                                style={{
                                                                    maxWidth: '250px',
                                                                    overflow: 'hidden',
                                                                    textOverflow: isExpanded ? 'clip' : 'ellipsis',
                                                                    whiteSpace: isExpanded ? 'normal' : 'nowrap',
                                                                    wordBreak: 'break-word',
                                                                    cursor: 'pointer',
                                                                    fontStyle: log.notes ? 'normal' : 'italic',
                                                                    color: log.notes ? 'inherit' : 'var(--text-muted)'
                                                                }}
                                                            >
                                                                {log.notes || 'No notes'}
                                                            </div>
                                                            {log.notes && log.notes.length > 20 && (
                                                                <span 
                                                                    style={{ 
                                                                        color: '#2563eb', 
                                                                        cursor: 'pointer', 
                                                                        fontSize: '11px', 
                                                                        fontWeight: '600',
                                                                        width: 'fit-content',
                                                                        userSelect: 'none',
                                                                        marginTop: '2px'
                                                                    }}
                                                                    onClick={() => setExpandedLogId(isExpanded ? null : idx)}
                                                                >
                                                                    {isExpanded ? 'See Less ▲' : 'See More ▼'}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* DETAILED MAINTENANCE HISTORY SECTION */}
                {currentView === 'maintenance' && (
                    <div id="view-maintenance" className="app-view">
                        <section className="view-header">
                            <h2>Service Records & Alerts</h2>
                            <p>Review real-time mechanical notifications and pending fleet service schedules.</p>
                        </section>

                        <div className="history-split">
                            <div className="card">
                                <h3>Active Maintenance Logs</h3>
                                <div className="service-records-list" style={{ marginTop: '16px' }}>
                                    
                                    {/* DETAILED CRITICAL OVERDUE TIMELINE ITEM */}
                                    <div className="timeline-item" style={{ borderLeft: '4px solid var(--red)', paddingLeft: '16px', marginBottom: '16px', background: '#fff5f5' }}>
                                        <div className="record-info">
                                            <h4 style={{ color: 'var(--red)', margin: 0 }}>⚠️ Engine Oil & Filter Replacement</h4>
                                            <p style={{ margin: '4px 0', fontSize: '13px' }}><strong>Vehicle:</strong> Ford Territory (Plate: 2CA-8687)</p>
                                            <p style={{ margin: '4px 0', fontSize: '13px', color: 'var(--text-muted)' }}>
                                                <strong>Description:</strong> Engine runtime has surpassed the standard baseline operating limit threshold. Requires immediate lubrication swap.
                                            </p>
                                            <div className="record-status" style={{ marginTop: '8px' }}>
                                                <span className="badge overdue" style={{ background: '#fee2e2', color: '#991b1b', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                                                    CRITICAL OVERDUE (3 Days)
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* STANDARD SYSTEM DIAGNOSTIC COMPLETED ITEM */}
                                    <div className="timeline-item" style={{ borderLeft: '4px solid var(--green)', paddingLeft: '16px' }}>
                                        <div className="record-info">
                                            <h4>System Diagnostics Validation</h4>
                                            <p style={{ margin: '4px 0', fontSize: '13px', color: 'var(--text-muted)' }}>
                                                All onboard ECU modules, propulsion safety sensors, and battery core metrics cleared checks.
                                            </p>
                                            <div className="record-status" style={{ marginTop: '8px' }}>
                                                <span className="badge completed" style={{ background: '#d1fae5', color: '#065f46', padding: '4px 8px', borderRadius: '4px' }}>
                                                    Completed
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {currentView === 'settings' && (
                    <div id="view-settings" className="app-view">
                        <section className="view-header">
                            <h2>Driver Settings</h2>
                            <p>Manage your driver profile configurations and regional interface preferences.</p>
                        </section>

                        <div className="settings-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', maxWidth: '800px' }}>
                            <div className="card" style={{ padding: '24px' }}>
                                <div className="settings-box-title" style={{ fontSize: '16px', fontWeight: '600', color: '#1e3a5f', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                                    <i className="fa-solid fa-user-gear" style={{ marginRight: '8px' }}></i> Profile Information
                                </div>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                        <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>Full Name</label>
                                        <input type="text" className="form-control" defaultValue="Porleak Vitou" style={{ backgroundColor: '#f8fafc' }} />
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                        <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>Email Address</label>
                                        <input type="email" className="form-control" defaultValue="driver@fleet.com" />
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                        <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>License Number</label>
                                        <input type="text" className="form-control" value="DL-12345678" disabled style={{ backgroundColor: '#f1f5f9', cursor: 'not-allowed', color: '#64748b' }} />
                                    </div>
                                </div>
                            </div>

                            <div className="card" style={{ padding: '24px' }}>
                                <div className="settings-box-title" style={{ fontSize: '16px', fontWeight: '600', color: '#1e3a5f', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                                    <i className="fa-solid fa-earth-asia" style={{ marginRight: '8px' }}></i> Regional & Telemetry Metrics
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <div style={{ fontWeight: '600', fontSize: '14px', color: '#1e293b' }}>Telemetry Measurement Units</div>
                                            <div style={{ fontSize: '12px', color: '#64748b' }}>Choose between standard metric or imperial distance calculations.</div>
                                        </div>
                                        <select className="form-control" style={{ width: '150px' }} defaultValue="KM">
                                            <option value="KM">Kilometers (km)</option>
                                            <option value="MI">Miles (mi)</option>
                                        </select>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                                        <div>
                                            <div style={{ fontWeight: '600', fontSize: '14px', color: '#1e293b' }}>Local Offline Syncing</div>
                                            <div style={{ fontSize: '12px', color: '#64748b' }}>Cache new log entries locally if backend pipeline breaks down.</div>
                                        </div>
                                        <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                                <button type="button" className="btn btn-secondary" onClick={() => setCurrentView('dashboard')}>Cancel</button>
                                <button type="button" className="btn btn-primary" onClick={() => alert('🎉 Driver settings changes saved successfully!')}>Save Configurations</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}