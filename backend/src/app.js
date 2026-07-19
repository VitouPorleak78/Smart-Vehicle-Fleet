const express = require('express');
const cors = require('cors');
const app = express();

// 1. Enable Cross-Origin requests for your Vite frontend
app.use(cors({ 
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true 
}));

app.use(express.json());

// 2. Mount Telemetry Routes
try {
    const telemetryRoutes = require('./routes/telemetryRoutes');
    app.use('/api/telemetry', telemetryRoutes);
} catch (err) {
    console.warn('⚠️ Telemetry routes module not found or failed to load:', err.message);
}

// 3. Mount Auth Routes Safely
let authLoaded = false;
const potentialAuthPaths = ['./routes/telemetryRoutes', './routes/authRoutes', './routes/auth'];

for (const routePath of potentialAuthPaths) {
    try {
        const authRoutes = require(routePath);
        app.use('/api/auth', authRoutes);
        authLoaded = true;
        break;
    } catch (e) {
        // Skip path if missing
    }
}

if (!authLoaded) {
    console.log('ℹ️ Auth routes not found separately; handling via main API endpoints.');
}

// 4. Healthcheck Route
app.get('/', (req, res) => {
    res.send('Fleet Management API Server Running');
});

// 5. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend listening on port ${PORT}`);
});