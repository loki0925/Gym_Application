const express = require('express');
const cors = require('cors');
const db = require('./db'); // Import the database connection

const app = express();
const PORT = 5001;

// Middleware
app.use(cors()); // Allows your React app to make requests to this server
app.use(express.json()); // Allows parsing of JSON in request bodies

// --- API Routes ---

// GET all members from MySQL database
app.get('/api/members', async (req, res) => {
  console.log('GET /api/members hit');
  try {
    const [rows] = await db.query('SELECT * FROM members ORDER BY joinDate DESC');
    res.json(rows);
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Failed to fetch data from the database.' });
  }
});

// A placeholder for future routes
app.get('/', (req, res) => {
    res.send('GymPro API is running!');
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});