// backend/src/services/maintenanceService.js

/**
 * Evaluates vehicle telemetry data based on its specific powertrain strategy.
 * @param {Object} logData - Current log submitted by the driver (includes current_mileage, propulsionType, etc.)
 * @param {Object} vehicleBaseline - Baseline metrics pulled from the database
 */
function evaluateMaintenanceTriggers(logData, vehicleBaseline) {
    const MILEAGE_INTERVAL = 5000; // Standard 5,000 km checkup
    const mileageSinceLastService = logData.current_mileage - vehicleBaseline.last_service_mileage;

    // Rule 1: Global Odometer Limit Check
    if (mileageSinceLastService >= MILEAGE_INTERVAL) {
        return {
            triggerService: true,
            reason: `Automated Alert: Vehicle exceeded standard service interval by ${mileageSinceLastService} km.`
        };
    }

    // Rule 2: Powertrain Specific Rules Based on the Frontend Card Selection
    switch (logData.propulsionType) {
        
        case 'ICE': // Pure Fuel Vehicles (e.g., Ford Ranger)
            // Example: Flag if fuel consumed per trip is exceptionally high
            if (logData.fuelUsage > 60) { 
                return { triggerService: true, reason: "ICE Alert: Fuel consumption spike detected. Inspect fuel filter." };
            }
            break;

        case 'EV': // Full Electric Vehicles
            // Example: Flag if battery discharge rate is abnormally deep
            if (logData.batteryDischarge > 90) {
                return { triggerService: true, reason: "EV Alert: Deep battery discharge cycle detected. Thermal inspection recommended." };
            }
            break;

        case 'PHEV': // Plug-in Hybrids (e.g., Jetour T1)
            const CRITICAL_EFFICIENCY_DROP = 0.35;
            if (logData.fuel_to_electric_ratio > (vehicleBaseline.baseline_ratio + CRITICAL_EFFICIENCY_DROP)) {
                return { triggerService: true, reason: "PHEV Predictive Alert: High fuel utilization anomaly detected. Battery optimization recommended." };
            }
            break;
            
        default:
            break;
    }

    return { triggerService: false, reason: "Vehicle operations stable. Inside safe powertrain limits." };
}

module.exports = { evaluateMaintenanceTriggers };