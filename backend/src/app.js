const express = require('express');
const cors = require('cors');
const app = express();
const telemetryRoutes = require('./routes/telemetryRoutes');

// Enable Cross-Origin requests for your Vite development server
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Mount your clean router endpoints (/api/telemetry/submit and /api/telemetry/driver/:driverId)
app.use('/api/telemetry', telemetryRoutes);

app.listen(5000, () => console.log('Backend listening on port 5000'));