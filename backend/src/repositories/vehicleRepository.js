// backend/src/repositories/vehicleRepository.js

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
}

module.exports = new VehicleRepository();