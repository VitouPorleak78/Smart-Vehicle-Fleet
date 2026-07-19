const jwt = require('jsonwebtoken');
const db = require('../config/db'); 
require('dotenv').config();

// 1. Verify Request Token
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "Access denied. No token provided." });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_for_dev');
        req.user = verified;
        next(); 
    } catch (error) {
        return res.status(403).json({ success: false, message: "Invalid or expired token." });
    }
};

// 2. Database Connected Login
const loginUser = async (req, res) => {
    const { email, password, role } = req.body; 

    // Match your database ENUM strings ('Driver', 'Operator', 'Admin')
    let dbRole = 'Driver';
    if (role === 'admin') dbRole = 'Admin';
    if (role === 'fleet-manager') dbRole = 'Operator'; 

    try {
        // Query matching your schema columns: userID, password, role
        const [rows] = await db.execute(
            'SELECT * FROM Users WHERE email = ? AND role = ?', 
            [email, dbRole]
        );

        if (rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or role mismatch."
            });
        }

        const user = rows[0];

        // Direct plaintext check matching your setup
        if (password !== user.password) {
            return res.status(401).json({
                success: false,
                message: "Invalid password credentials."
            });
        }

        const token = jwt.sign(
            { id: user.userID, email: user.email, role: user.role }, 
            process.env.JWT_SECRET || 'fallback_secret_for_dev',
            { expiresIn: '1d' }
        );

        return res.status(200).json({
            success: true,
            message: "Connected to database successfully and authenticated!",
            token: token
        });

    } catch (error) {
        console.error('Database query error:', error.message);
        return res.status(500).json({ 
            success: false, 
            message: "Internal Server Database Error" 
        });
    }
};

module.exports = { authMiddleware, loginUser };