const mysql = require('mysql2/promise');

// Create a connection pool. Using a pool is more efficient than creating a new
// connection for every query. It manages multiple connections automatically.
const pool = mysql.createPool({
  host: 'localhost', // Or your database host
  user: 'root',      // Your MySQL username
  password: '', // <-- IMPORTANT: Replace with your actual MySQL password
  database: 'gympro',  // The database name you created
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