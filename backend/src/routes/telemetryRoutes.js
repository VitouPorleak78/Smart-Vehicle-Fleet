// express
// router
// controller

// router.post
// router.get

// module exports

// const express = require('express');
// const router = express.Router();
// const telemetryController = require('../controllers/telemetryControllers.js');
// const authMiddleware = require('../middleware/authMiddleware.js');

// router.get('/driver/:driverId', authMiddleware, telemetryController.getDriverLogs);
// router.post('/submit', authMiddleware, telemetryController.submitLog);

// module.exports = router;

const express = require('express');
const router = express.Router();

// Import using singular variable name
const telemetryController = require('../controllers/telemetryControllers.js');

// Using singular variable name (telemetryController) to match the import above
router.get('/driver/:driverId', telemetryController.getDriverLogs);
router.post('/submit', telemetryController.submitLog);

module.exports = router;
