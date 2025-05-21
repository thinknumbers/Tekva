console.log('Starting backend server.js...');
console.log('CWD:', process.cwd());
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_DATABASE:', process.env.DB_DATABASE);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '***set***' : '***not set***');

require('dotenv').config({ path: './.env' });

const express = require('express');
const cors = require('cors');
const { sql, poolPromise } = require('./config/db');
const authRouter = require('./routes/auth');
const timesheetsRouter = require('./routes/timesheets');
const locationsRouter = require('./routes/locations');
const fieldVisitsRouter = require('./routes/fieldVisits');
const rostersRouter = require('./routes/rosters');
const attendanceRouter = require('./routes/attendance');
const rosterTemplatesRouter = require('./routes/rosterTemplates');
const path = require('path');

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

console.log('Registering test route /');
// Test Route
// app.get('/', (req, res) => {
//   res.json({ message: 'Welcome to Kashrut Authority API!' });
// });

console.log('Registering DB test route /api/db-test');
// DB Test Route
app.get('/api/db-test', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT 1 AS test');
    res.json({ success: true, result: result.recordset });
  } catch (err) {
    console.error('DB test route error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

console.log('Serving static files from:', path.join(__dirname, 'frontend/build'));
// Serve React build static files in production
app.use(express.static(path.join(__dirname, 'frontend/build')));

console.log('Registering API routes');
// TODO: Add other routes for auth, timesheets, etc.
app.use('/api/auth', authRouter);
app.use('/api/timesheets', timesheetsRouter);
app.use('/api/locations', locationsRouter);
app.use('/api/field-visits', fieldVisitsRouter);
app.use('/api/rosters', rostersRouter);
app.use('/api/attendance', attendanceRouter);
app.use('/api/roster-templates', rosterTemplatesRouter);

console.log('Registering catch-all route for React app');
// Catch-all: serve React index.html for any non-API route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 5001; // Use port from .env or default to 5001 to avoid conflict with frontend (3000)

console.log('About to start server on port', PORT);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
}); 