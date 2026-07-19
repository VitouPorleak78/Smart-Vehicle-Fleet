const jwt = require('jsonwebtoken');
require('dotenv').config();

// 1. The validation middleware your telemetry routes are trying to use
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "Access denied. No token provided." });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_for_dev');
        req.user = verified;
        next(); // Pass control to the controller
    } catch (error) {
        return res.status(403).json({ success: false, message: "Invalid or expired token." });
    }
};

// 2. The existing login logic
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (email === "vitou@cadt.edu.kh" && password === "password123") {
            const token = jwt.sign(
                { id: 1, email: email, role: 'driver' },
                process.env.JWT_SECRET || 'fallback_secret_for_dev',
                { expiresIn: '1d' }
            );

            return res.status(200).json({
                success: true,
                message: "Login successful!",
                token: token
            });
        }

        return res.status(401).json({
            success: false,
            message: "Invalid email or password credentials."
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Export authMiddleware as primary, and attach loginUser to it
module.exports = authMiddleware; 
module.exports.loginUser = loginUser;