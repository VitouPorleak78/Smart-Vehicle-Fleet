// backend/src/services/maintenanceService.js

/**
 * Evaluates vehicle telemetry data based on its specific powertrain strategy.
 * @param {Object} logData - Current log submitted by the driver (includes odometer, propulsionType, etc.)
 * @param {Object} vehicleBaseline - Baseline metrics pulled from the database
 */
function evaluateMaintenanceTriggers(logData, vehicleBaseline) {
    const MILEAGE_INTERVAL = 5000; // Standard 5,000 km checkup
    
    // Aligned incoming telemetry inputs to handle naming properties cleanly
    const currentOdometer = logData.odometer || 0;
    const mileageSinceLastService = currentOdometer - (vehicleBaseline.last_service_mileage || 0);
    const fuelUsed = logData.fuelConsumption || 0;
    const electricUsed = logData.evConsumption || 0;
    
    // Normalize powertrain casing logic ("GAS" vs "ICE")
    let activePowertrain = logData.propulsionType ? logData.propulsionType.toUpperCase() : '';
    if (activePowertrain === 'GAS') activePowertrain = 'ICE';

    // Rule 1: Global Odometer Limit Check
if (mileageSinceLastService >= MILEAGE_INTERVAL) {
    return {
        triggerService: true,
        title: "Odometer Checkup",
        status: "overdue",
        reason: `Automated Alert: Vehicle exceeded standard service interval by ${mileageSinceLastService} km.`
    };
}

    // Rule 2: Powertrain Specific Rules Based on the Frontend Card Selection
    switch (activePowertrain) {
        
        case 'ICE': // Pure Fuel Vehicles
            if (fuelUsed > 60) { 
                return { triggerService: true, reason: "ICE Alert: Fuel consumption spike detected. Inspect fuel filter." };
            }
            break;

        case 'EV': // Full Electric Vehicles
            if (electricUsed > 90) {
                return { triggerService: true, reason: "EV Alert: Deep battery discharge cycle detected. Thermal inspection recommended." };
            }
            break;

        case 'PHEV': // Plug-in Hybrids
            const CRITICAL_EFFICIENCY_DROP = 0.35;
            // Safe ratio assessment strategy avoiding division-by-zero checks
            const dynamicRatio = electricUsed > 0 ? (fuelUsed / electricUsed) : 0;
            
            if (dynamicRatio > ((vehicleBaseline.baseline_ratio || 0.30) + CRITICAL_EFFICIENCY_DROP)) {
                return { triggerService: true, reason: "PHEV Predictive Alert: High fuel utilization anomaly detected. Battery optimization recommended." };
            }
            break;
            
        default:
            break;
    }

    return { triggerService: false, reason: "Vehicle operations stable. Inside safe powertrain limits." };
}

module.exports = { 
    evaluateMaintenanceTriggers 
};