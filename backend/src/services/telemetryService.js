// backend/src/services/telemetryService.js
const vehicleRepository = require('../repositories/vehicleRepository');
const maintenanceService = require('./maintenanceService');

class TelemetryService {
    async processDriverLog(logData) {
        // 1. Fetch historical baselines from database layer
        const baseline = await vehicleRepository.getVehicleBaseline(logData.vehicleID);
        
        // 2. Run the strategy-switching calculation rules
        const assessment = maintenanceService.evaluateMaintenanceTriggers(logData, baseline);
        
        // 3. Return a unified response package
        return {
            timestamp: new Date().toISOString(),
            receivedData: logData,
            status: assessment
        };
    }
}

module.exports = new TelemetryService();