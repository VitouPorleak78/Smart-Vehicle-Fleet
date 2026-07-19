// backend/server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. Configure CORS to match your client URL variable
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173'
}));
app.use(express.json());

// 2. Create the MAMP MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // This will correctly capture port 8889
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test MAMP connection on startup
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ MAMP MySQL connection critical failure:', err.message);
    process.exit(1);
  }
  console.log('🚀 Successfully connected to the MAMP MySQL database server on port', process.env.DB_PORT);
  connection.release();
});

module.exports = pool;