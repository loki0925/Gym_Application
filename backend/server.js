const express = require('express');
const cors = require('cors');
const db = require('./db'); // Import the database connection

const app = express();
// Reverted to a fixed port for local development consistency.
const PORT = 5001;

// Middleware
app.use(cors()); // Allows your React app to make requests to this server
app.use(express.json()); // Allows parsing of JSON in request bodies

// --- API Routes ---

// GET all members from MySQL database
app.get('/api/members', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM members ORDER BY joinDate DESC');
    res.json(rows);
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Failed to fetch data from the database.' });
  }
});

// POST a new member
app.post('/api/members', async (req, res) => {
    const { name, email, membershipStatus, assignedAdminId, assignedMealPlanId } = req.body;
    const id = `m_${Date.now()}`; // A simple unique ID
    const joinDate = new Date().toISOString().split('T')[0];
    const avatarUrl = `https://picsum.photos/seed/${id}/200`;

    if (!name || !email || !membershipStatus || !assignedAdminId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const query = 'INSERT INTO members (id, name, email, joinDate, membershipStatus, avatarUrl, assignedAdminId, assignedMealPlanId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        await db.query(query, [id, name, email, joinDate, membershipStatus, avatarUrl, assignedAdminId, assignedMealPlanId || null]);
        const [newMember] = await db.query('SELECT * FROM members WHERE id = ?', [id]);
        res.status(201).json(newMember[0]);
    } catch (err) {
        console.error('Database insert error:', err);
        res.status(500).json({ error: 'Failed to add new member.' });
    }
});

// PUT (update) an existing member
app.put('/api/members/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, membershipStatus, assignedMealPlanId } = req.body;
    
    if (!name || !email || !membershipStatus) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const query = 'UPDATE members SET name = ?, email = ?, membershipStatus = ?, assignedMealPlanId = ? WHERE id = ?';
        const [result] = await db.query(query, [name, email, membershipStatus, assignedMealPlanId || null, id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Member not found' });
        }
        const [updatedMember] = await db.query('SELECT * FROM members WHERE id = ?', [id]);
        res.json(updatedMember[0]);
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

// --- Users ---
app.get('/api/users/admins', async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, name, email, role FROM users WHERE role = 'Admin'");
    res.json(rows);
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Failed to fetch admins.' });
  }
});

// --- Meal Plans ---
app.get('/api/meal-plans', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM meal_plans');
    res.json(rows);
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Failed to fetch meal plans.' });
  }
});

// GET a single meal plan with its full schedule
app.get('/api/meal-plans/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [planRows] = await db.query('SELECT * FROM meal_plans WHERE id = ?', [id]);
        if (planRows.length === 0) {
            return res.status(404).json({ error: 'Meal plan not found' });
        }
        const plan = planRows[0];
        
        const [scheduleRows] = await db.query('SELECT * FROM meal_plan_schedule WHERE meal_plan_id = ?', [id]);
        
        const schedule = {};
        for (const row of scheduleRows) {
            if (!schedule[row.day]) {
                schedule[row.day] = {};
            }
            schedule[row.day][row.meal_type] = {
                name: row.meal_name,
                calories: row.calories
            };
        }
        plan.schedule = schedule;
        
        res.json(plan);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ error: 'Failed to fetch meal plan details.' });
    }
});

// --- Gym Classes ---
app.get('/api/classes', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT *, TIME_FORMAT(time, "%H:%i") AS time FROM gym_classes ORDER BY FIELD(day, "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"), time');
        res.json(rows);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ error: 'Failed to fetch classes.' });
    }
});

// --- Payments ---
app.get('/api/payments', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM payments ORDER BY date DESC');
        res.json(rows);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ error: 'Failed to fetch payments.' });
    }
});

// --- Member Growth ---
app.get('/api/member-growth', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT month_name as name, new_members as newMembers FROM member_growth');
        res.json(rows);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ error: 'Failed to fetch member growth data.' });
    }
});

// --- Activity Log ---
app.get('/api/activity-log', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM activity_log ORDER BY date DESC');
        res.json(rows);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ error: 'Failed to fetch activity log.' });
    }
});

app.post('/api/activity-log', async (req, res) => {
    const { type, duration, caloriesBurned } = req.body;
    if (type === undefined || duration === undefined || caloriesBurned === undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const id = `a_${Date.now()}`;
    const date = new Date();
    try {
        const query = 'INSERT INTO activity_log (id, date, type, duration, caloriesBurned) VALUES (?, ?, ?, ?, ?)';
        await db.query(query, [id, date, type, duration, caloriesBurned]);
        const [newActivity] = await db.query('SELECT * FROM activity_log WHERE id = ?', [id]);
        res.status(201).json(newActivity[0]);
    } catch (err) {
        console.error('Database insert error:', err);
        res.status(500).json({ error: 'Failed to add new activity.' });
    }
});

// --- Weight History ---
app.get('/api/weight-history', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT date, weight FROM weight_history ORDER BY date ASC');
        const formattedRows = rows.map(row => ({
            ...row,
            date: new Date(row.date).toISOString().split('T')[0]
        }));
        res.json(formattedRows);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ error: 'Failed to fetch weight history.' });
    }
});

app.post('/api/weight-history', async (req, res) => {
    const { date, weight } = req.body;
    if (!date || !weight) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        const query = 'INSERT INTO weight_history (date, weight) VALUES (?, ?)';
        await db.query(query, [date, weight]);
        res.status(201).json({ date, weight });
    } catch (err) {
        console.error('Database insert error:', err);
        res.status(500).json({ error: 'Failed to log weight.' });
    }
});

// --- Exercises ---
app.get('/api/exercises', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM exercises');
        res.json(rows);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ error: 'Failed to fetch exercises.' });
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