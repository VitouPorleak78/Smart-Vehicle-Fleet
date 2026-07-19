const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminControllers');

// Injecting 'protect' middleware right in front of endpoints
router.get('/users', protect, adminController.getUsers);
router.post('/users', protect, adminController.createUser);
router.get('/service-summary', protect, adminController.getServiceSummary);

module.exports = router;
