// backend/src/controllers/telemetryControllers.js
const telemetryService = require('../services/telemetryService');

class TelemetryController {
    async submitLog(req, res) {
        try {
            const logData = req.body;
            
            // Pass execution to the service workflow core
            const result = await telemetryService.processDriverLog(logData);
            
            return res.status(200).json({
                message: "Telemetry data processed successfully.",
                ...result
            });
        } catch (error) {
            return res.status(500).json({ 
                error: "Internal control execution handling failure." 
            });
        }
    }
}

module.exports = new TelemetryController();