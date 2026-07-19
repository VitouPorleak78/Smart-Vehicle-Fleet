const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminControllers');

// Only the route to fetch the user list
router.get('/users', adminController.getUsers);

module.exports = router;