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
  try {
    const [rows] = await db.query('SELECT * FROM members ORDER BY name ASC');
    res.json(rows);
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Failed to fetch data from the database.' });
  }
});

// POST a new member
app.post('/api/members', async (req, res) => {
    const { name, email, membershipStatus } = req.body;
    const id = `mem_${Date.now()}`; // A simple unique ID
    const joinDate = new Date().toISOString().split('T')[0];
    const avatarUrl = `https://picsum.photos/seed/${id}/200`;

    if (!name || !email || !membershipStatus) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const query = 'INSERT INTO members (id, name, email, joinDate, membershipStatus, avatarUrl) VALUES (?, ?, ?, ?, ?, ?)';
        await db.query(query, [id, name, email, joinDate, membershipStatus, avatarUrl]);
        res.status(201).json({ id, name, email, joinDate, membershipStatus, avatarUrl });
    } catch (err) {
        console.error('Database insert error:', err);
        res.status(500).json({ error: 'Failed to add new member.' });
    }
});

// PUT (update) an existing member
app.put('/api/members/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, membershipStatus } = req.body;
    
    if (!name || !email || !membershipStatus) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const query = 'UPDATE members SET name = ?, email = ?, membershipStatus = ? WHERE id = ?';
        const [result] = await db.query(query, [name, email, membershipStatus, id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Member not found' });
        }
        res.json({ message: 'Member updated successfully' });
    } catch (err) {
        console.error('Database update error:', err);
        res.status(500).json({ error: 'Failed to update member.' });
    }
});

// DELETE a member
app.delete('/api/members/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'DELETE FROM members WHERE id = ?';
        const [result] = await db.query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Member not found' });
        }
        res.status(204).send(); // 204 No Content for successful deletion
    } catch (err) {
        console.error('Database delete error:', err);
        res.status(500).json({ error: 'Failed to delete member.' });
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
