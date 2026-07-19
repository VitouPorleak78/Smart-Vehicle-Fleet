// backend/src/controllers/telemetryControllers.js
const telemetryService = require('../services/telemetryService');

class TelemetryController {
    // 1. Handles GET /api/telemetry/driver/:driverId
    async getDriverLogs(req, res) {
        try {
            const { driverId } = req.params;
            const logs = await telemetryService.getDriverLogs(driverId);
            return res.status(200).json(logs);
        } catch (error) {
            console.error("Controller Error fetching logs:", error);
            return res.status(500).json({ 
                error: "Internal control execution handling failure during fetch.",
                details: error.message
            });
        }
    }

    // 2. Handles POST /api/telemetry/submit
    async submitLog(req, res) {
        try {
            const logData = req.body;
            const result = await telemetryService.processDriverLog(logData);
            return res.status(200).json({
                message: "Telemetry data processed successfully.",
                ...result
            });
        } catch (error) {
            console.error("Controller Error submitting log:", error);
            return res.status(500).json({ 
                error: "Internal control execution handling failure during submission.",
                details: error.message
            });
        }
    }
}

module.exports = new TelemetryController();