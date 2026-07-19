const express = require('express');
const cors = require('cors');
require('dotenv').config();

const adminRoutes = require('./routes/adminRoutes');
const { connectDB } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = [process.env.CLIENT_URL, 'http://localhost:5173', 'http://localhost:5174'].filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`Origin ${origin} is not allowed by CORS.`));
  }
}));
app.use(express.json());
app.use('/api/v1/admin', adminRoutes);

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({ success: false, message: err.message || 'Internal System Telemetry Fault' });
});

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`[SERVER] Smart-Fleet backend running on port ${PORT}`));
};

startServer();
