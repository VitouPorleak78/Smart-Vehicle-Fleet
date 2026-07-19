const express = require('express');
const router = express.Router(); 
const db = require('../config/db'); 

const { authMiddleware, loginUser } = require('../middleware/authMiddleware');

// Public Authentication Endpoint
router.post('/login', loginUser);

// Protected Telemetry Endpoints

// 1. Submit telemetry log to the 'Logs' table
router.post('/submit', authMiddleware, async (req, res) => {
    const { driverId, vehicleId, propulsionType, odometer, fuelConsumption, evConsumption, plateNumber, notes } = req.body;
    
    try {
        const query = `
            INSERT INTO Logs (driverID, vehicleID, propulsionType, mileage, fuelConsumption, EVConsumption, plateNumber, notes, logDate) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
        `;
        
        await db.execute(query, [
            driverId || 1, 
            vehicleId, 
            propulsionType, 
            odometer, 
            fuelConsumption, 
            evConsumption, 
            plateNumber,
            notes || null,
        ]);
        
        return res.status(200).json({ 
            success: true, 
            message: "Telemetry metrics captured successfully." 
        });
    } catch (error) {
        console.error("Submission DB Error:", error.message);
        return res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
});

// 2. Fetch logs from the 'Logs' table for the UI display
router.get('/driver/:driverId', authMiddleware, async (req, res) => {
    const { driverId } = req.params;
    try {
        const [rows] = await db.execute(
            'SELECT * FROM Logs WHERE driverID = ? ORDER BY logDate DESC', 
            [driverId]
        );
        
        // Returns the clean array that DriverHub expects
        return res.status(200).json(rows);
    } catch (error) {
        console.error("Fetch Logs DB Error:", error.message);
        return res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
});

module.exports = router;