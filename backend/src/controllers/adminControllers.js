const db = require('../config/db');

class AdminController {
  
  // 📈 1. EXECUTIVE DASHBOARD: Summary metrics
  async getDashboardMetrics(req, res) {
    try {
      const [totalAssets] = await db.execute(`SELECT COUNT(*) as count FROM FleetVehicles`);
      const [activeTrips] = await db.execute(`SELECT COUNT(*) as count FROM FleetVehicles WHERE telemetry_status = 'In Transit'`);
      const [criticalAlerts] = await db.execute(`SELECT COUNT(*) as count FROM FleetVehicles WHERE health_score < 70 OR telemetry_status = 'Critical Error'`);
      
      return res.status(200).json({
        totalAssets: totalAssets[0].count || 0,
        activeTrips: activeTrips[0].count || 0,
        criticalAlerts: criticalAlerts[0].count || 0
      });
    } catch (error) {
      return res.status(500).json({ error: "Failed to load dashboard metrics." });
    }
  }

  // 🛠️ 2. MAINTENANCE LOGS: History lists
  async getMaintenanceLogs(req, res) {
    try {
      const [logs] = await db.execute(`
        SELECT m.id, m.vehicle_id as vehicleId, m.maintenance_type as type, 
               u.full_name as technician, m.log_date as date, m.status, m.cost
        FROM MaintenanceLogs m
        LEFT JOIN SystemUsers u ON m.technician_id = u.id
        ORDER BY m.log_date DESC
      `);
      return res.status(200).json(logs);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch maintenance data." });
    }
  }

  // 🏥 3. FLEET HEALTH: Live health grid indicators
  async getFleetHealthData(req, res) {
    try {
      const [vehicles] = await db.execute(`
        SELECT id, make, model, telemetry_status as status, health_score as healthScore, 
               fuel_level_percent as fuel, coolant_temp_f as coolantTemp 
        FROM FleetVehicles
        ORDER BY health_score ASC
      `);
      return res.status(200).json(vehicles);
    } catch (error) {
      return res.status(500).json({ error: "Failed to gather real-time status details." });
    }
  }

  // 👥 4. USER MANAGEMENT: Populates the exact screen you designed
  async getUsers(req, res) {
    try {
      const search = req.query.search ? `%${req.query.search}%` : '%';
      const role = req.query.role || 'All Roles';
      
      let query = `SELECT id, full_name as name, email, role, status FROM SystemUsers WHERE (full_name LIKE ? OR email LIKE ?)`;
      const params = [search, search];

      if (role !== 'All Roles') {
        query += ` AND role = ?`;
        params.push(role);
      }

      const [users] = await db.execute(query, params);
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: "Failed to search operational credentials." });
    }
  }

  // ⚙️ 5. ADMIN SETTINGS: Saves administrative settings 
  async updateAdminProfile(req, res) {
    try {
      const { fullName, phone, email } = req.body;
      const adminId = req.user?.id || 1; // Fallback to Alex Rivera default

      await db.execute(
        `UPDATE SystemUsers SET full_name = ?, phone = ?, email = ? WHERE id = ?`,
        [fullName, phone, email, adminId]
      );
      
      return res.status(200).json({ message: "Administrative core updates saved safely." });
    } catch (error) {
      return res.status(500).json({ error: "System settings synchronization error." });
    }
  }
}

module.exports = new AdminController();
