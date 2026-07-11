const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminControllers');

// Define specific routes mapping directly to your five frontend panel sections
router.get('/dashboard/metrics', adminController.getDashboardMetrics);
router.get('/maintenance/logs', adminController.getMaintenanceLogs);
router.get('/fleet/health', adminController.getFleetHealthData);
router.get('/users', adminController.getUsers);
router.put('/settings', adminController.updateAdminProfile);

module.exports = router;
