const express = require('express');
const bcrypt = require('bcryptjs');
const { poolPromise } = require('../config/db');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Register a new user (admin or regular)
router.post('/register', async (req, res) => {
  const { email, password, first_name, last_name, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ success: false, message: 'Email, password, and role are required.' });
  }
  try {
    const pool = await poolPromise;
    // Check if user already exists
    const check = await pool.request()
      .input('email', email)
      .query('SELECT id FROM users WHERE email = @email');
    if (check.recordset.length > 0) {
      return res.status(409).json({ success: false, message: 'User already exists.' });
    }
    // Hash password
    const password_hash = await bcrypt.hash(password, 10);
    // Insert user
    await pool.request()
      .input('email', email)
      .input('password_hash', password_hash)
      .input('first_name', first_name || null)
      .input('last_name', last_name || null)
      .input('role', role)
      .query(`INSERT INTO users (email, password_hash, first_name, last_name, role) VALUES (@email, @password_hash, @first_name, @last_name, @role)`);
    res.json({ success: true, message: 'User registered successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Registration failed.', error: err.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('email', email)
      .query('SELECT * FROM users WHERE email = @email');
    if (result.recordset.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }
    const user = result.recordset[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }
    // Create JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Login failed.', error: err.message });
  }
});

module.exports = router; 