// backend/src/repositories/vehicleRepository.js
const db = require('../config/db'); 

class VehicleRepository {
    async getVehicleBaseline(vehicleID) {
        return {
            vehicleID: vehicleID,
            last_service_mileage: 12000,
            baseline_ratio: 0.30,
            max_fuel_allowance_threshold: 0.15 
        };
    }

    // DML - Save the data, including notes
    async saveTelemetryLog(logData) {
        // 1. Extract and sanitize values from frontend payload
        const safeDriverId = logData.driverId || logData.driverID || 1; 
        const safeVehicleId = logData.vehicleId || logData.vehicleID || 1;
        const propulsionType = logData.propulsionType || 'ICE';
        const mileage = logData.odometer || 0; 
        const fuelConsumption = logData.fuelConsumption || 0; 
        const evConsumption = logData.evConsumption || 0; 
        const plateNumber = logData.plateNumber || null; 
        const notes = logData.notes || null; 

        // 2. The SQL statement (Column Sequence)
        const query = `
            INSERT INTO \`Logs\` (
                driverID, 
                vehicleID, 
                propulsionType, 
                mileage, 
                fuelConsumption, 
                EVConsumption, 
                plateNumber, 
                logDate, 
                notes
            ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?)
        `;
        
        // 3. The Values Array (MUST match the sequence above exactly)
        const values = [
            safeDriverId,      // maps to driverID
            safeVehicleId,     // maps to vehicleID
            propulsionType,    // maps to propulsionType
            mileage,           // maps to mileage
            fuelConsumption,   // maps to fuelConsumption
            evConsumption,     // maps to EVConsumption
            plateNumber,       // maps to plateNumber
            notes              // maps to notes (CURDATE() handles logDate)
        ];

        // 4. Execute pipeline query
        const [result] = await db.query(query, values);
        return result;
    }

    // DQL - Fetch the recent logs to display in the UI tables
    async getLogsByDriverId(driverId) {
        const query = `
            SELECT 
                logID,
                driverID,
                vehicleID,
                propulsionType,
                mileage AS odometer, -- Safety bridge: maps mileage to frontend odometer key
                fuelConsumption,
                EVConsumption,
                plateNumber,
                logDate,
                notes
            FROM \`Logs\`
            WHERE driverID = ?
            ORDER BY logDate DESC, logID DESC
        `;

        try {
            const [rows] = await db.query(query, [driverId]);
            return rows;
        } catch (error) {
            console.error("Database query failed inside getLogsByDriverId:", error);
            throw error;
        }
    }
}

module.exports = new VehicleRepository();