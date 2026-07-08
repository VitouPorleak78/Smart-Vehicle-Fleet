// backend/src/repositories/vehicleRepository.js
const db = require('../config/db'); 
/**
 * Repository layer to talk directly with the database
 */
class VehicleRepository {
    async getVehicleBaseline(vehicleID) {
        // Simulating a fast database query to Munyreach's table
        // Later this will be: await db.query("SELECT ... WHERE id = ?", [vehicleID])
        return {
            vehicleID: vehicleID,
            last_service_mileage: 12000,
            baseline_ratio: 0.30,
            max_fuel_allowance_threshold: 0.15 // example constraint threshold
        };
    }
    async saveTelemetryLog(logData) {
        const { driverID, vehicleID, propulsionType, odometer, fuelConsumption, evConsumption, logDate} = logData;
        const query = `
            INSERT INTO telemetry_logs (driver_id, vehicle_id, propulsion_type, odometer, fuelConsumption, evConsumption, log_date)
            VALUES (?, ?, ?, ?, ?, ?, CURDATE())
        `;
        const values = [driverID, vehicleID, propulsionType, odometer, fuelConsumption, evConsumption];

        const [result] = await db.query(query, values);
        return result;
    }
}

module.exports = new VehicleRepository();