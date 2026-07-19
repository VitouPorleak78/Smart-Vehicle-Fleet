const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 8889, // Targeted port reading for MAMP environment setups
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'smart_vehicle_fleet',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const connectDB = async () => {
  try {
    console.log('🔄 [DATABASE]: Initializing MySQL connection handshake...');
    const connection = await pool.getConnection();
    console.log(`📡 [DATABASE]: Connected safely to MAMP MySQL instance [${process.env.DB_NAME}].`);
    connection.release();
  } catch (error) {
    console.error(`❌ [DATABASE ERROR]: Connection mapping failed: ${error.message}`);
    process.exit(1); 
  }
};

module.exports = { connectDB, pool };