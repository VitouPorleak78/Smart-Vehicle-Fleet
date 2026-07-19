const mysql = require('mysql2');

// 1. Create the database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 8889, // MAMP default port
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'smart_vehicle_fleet',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise(); // Enable promises safely

// 2. Define the connection test function
const connectDB = async () => {
  try {
    console.log('🔄 [DATABASE]: Initializing MySQL connection handshake...');
    const connection = await pool.getConnection();
    console.log(`📡 [DATABASE]: Connected safely to MAMP MySQL instance.`);
    connection.release();
  } catch (error) {
    console.error(`❌ [DATABASE ERROR]: ${error.message}`);
    process.exit(1);
  }
};

// 3. Export both the function and the pool
module.exports = { connectDB, pool };