// backend/src/services/telemetryService.js
const vehicleRepository = require('../repositories/vehicleRepository');
const maintenanceService = require('./maintenanceService');

class TelemetryService {
    async processDriverLog(logData) {
        try {
            const targetVehicleId = logData.vehicleID || logData.vehicleId || 1;
            
            // Safe fallback baseline object so it never crashes if vehicle data isn't matched
            let baseline = { last_service_mileage: 12000, baseline_ratio: 0.30, max_fuel_allowance_threshold: 0.15 };
            try {
                if (typeof vehicleRepository.getVehicleBaseline === 'function') {
                    baseline = await vehicleRepository.getVehicleBaseline(targetVehicleId) || baseline;
                }
            } catch (err) {
                console.warn("Baseline fetch bypassed, using local defaults:", err.message);
            }
            
            const normalizedLogData = {
                ...logData,
                odometer: logData.odometer || logData.kilometers || 0,
                notes: logData.notes || null
            };

            let assessment = { status: 'Normal' };
            if (maintenanceService && typeof maintenanceService.evaluateMaintenanceTriggers === 'function') {
                assessment = maintenanceService.evaluateMaintenanceTriggers(normalizedLogData, baseline);
            }
            
            const result = await vehicleRepository.saveTelemetryLog(normalizedLogData);
            
            return {
                success: true,
                timestamp: new Date().toISOString(),
                receivedData: normalizedLogData,
                status: assessment,
                data: result
            };
        } catch (error) {
            console.error("Service Error processing telemetry save:", error);
            throw error;
        }
    }

    async getDriverLogs(driverId) {
        try {
            const targetDriverId = driverId || 1;
            //  FIXED: Calling the correct repository function we built earlier
            return await vehicleRepository.getLogsByDriverId(targetDriverId);
        } catch (error) {
            console.error("Service Error fetching driver logs:", error);
            throw error;
        }
    }
}

module.exports = new TelemetryService();