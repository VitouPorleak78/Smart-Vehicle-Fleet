const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'SVFSMS',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
    // ssl: { rejectUnauthorized: false } <-- Double check that this remains deleted/commented out
});

pool.getConnection()
    .then(connection => {
        console.log('Connected to MYSQL database successfully!');
        connection.release();
    })
    .catch(err => {
        console.error('Error connecting to MYSQL database:', err.message);
    });

module.exports = pool;