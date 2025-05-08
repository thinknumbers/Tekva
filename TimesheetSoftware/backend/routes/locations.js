const express = require('express');
const authenticateJWT = require('../middleware/auth');
const { poolPromise } = require('../config/db');

const router = express.Router();

// GET /api/locations - get all active locations
router.get('/', authenticateJWT, async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query('SELECT id, name, address, type FROM locations WHERE active = 1 ORDER BY name');
    res.json({ success: true, locations: result.recordset });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to fetch locations.', error: err.message });
  }
});

module.exports = router; 