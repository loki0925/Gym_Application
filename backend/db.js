const mysql = require('mysql2/promise');
require('dotenv').config(); // Load environment variables from .env file

// Create a connection pool. Using a pool is more efficient than creating a new
// connection for every query. It manages multiple connections automatically.
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'gympro',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection
pool.getConnection()
  .then(connection => {
    console.log('Successfully connected to the MySQL database.');
    connection.release(); // Return the connection to the pool
  })
  .catch(err => {
    console.error('Error connecting to the MySQL database:');
    console.error(err.message);
  });

// Export the pool so you can use it in your API routes
module.exports = pool;
