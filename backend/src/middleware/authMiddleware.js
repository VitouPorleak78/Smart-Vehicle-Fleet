const jwt = require('jsonwebtoken');
require('dotenv').config();

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Simple verification for development (Switch to database check later)
        if (email === "vitou@cadt.edu.kh" && password === "password123") {
            const token = jwt.sign(
                { id: 1, email: email, role: 'driver' },
                process.env.JWT_SECRET,
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

module.exports = { loginUser };