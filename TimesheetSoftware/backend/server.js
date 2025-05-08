require('dotenv').config({ path: './.env' });
console.log('CWD:', process.cwd());
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
const express = require('express');
const cors = require('cors');
const { sql, poolPromise } = require('./config/db');
const authRouter = require('./routes/auth');
const timesheetsRouter = require('./routes/timesheets');
const locationsRouter = require('./routes/locations');
const fieldVisitsRouter = require('./routes/fieldVisits');
const path = require('path');

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Test Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Kashrut Authority API!' });
});

// DB Test Route
app.get('/api/db-test', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT 1 AS test');
    res.json({ success: true, result: result.recordset });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Serve React build static files in production
app.use(express.static(path.join(__dirname, '../frontend/build')));

// TODO: Add other routes for auth, timesheets, etc.
app.use('/api/auth', authRouter);
app.use('/api/timesheets', timesheetsRouter);
app.use('/api/locations', locationsRouter);
app.use('/api/field-visits', fieldVisitsRouter);

// Catch-all: serve React index.html for any non-API route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 5001; // Use port from .env or default to 5001 to avoid conflict with frontend (3000)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
}); 