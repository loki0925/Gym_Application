const express = require('express');
const cors = require('cors');
const { mockMembers } = require('./data');

const app = express();
const PORT = 5001;

// Middleware
app.use(cors()); // Allows your React app to make requests to this server
app.use(express.json()); // Allows parsing of JSON in request bodies

// --- API Routes ---

// GET all members
app.get('/api/members', (req, res) => {
  console.log('GET /api/members hit');
  res.json(mockMembers);
});

// A placeholder for future routes
app.get('/', (req, res) => {
    res.send('GymPro API is running!');
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
