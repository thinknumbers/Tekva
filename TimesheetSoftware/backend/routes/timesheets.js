const express = require('express');
const authenticateJWT = require('../middleware/auth');
const { poolPromise } = require('../config/db');

const router = express.Router();

// GET /api/timesheets - get all timesheets for the logged-in user
router.get('/', authenticateJWT, async (req, res) => {
  const userId = req.user.id;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('user_id', userId)
      .query('SELECT id, ref, assignment, period, status, expenses, total_days FROM timesheets WHERE user_id = @user_id');
    res.json({ success: true, timesheets: result.recordset });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to fetch timesheets.', error: err.message });
  }
});

router.get('/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', id)
      .input('user_id', userId)
      .query('SELECT * FROM timesheets WHERE id = @id AND user_id = @user_id');
    if (!result.recordset[0]) {
      return res.status(404).json({ success: false, message: 'Timesheet not found.' });
    }
    const ts = result.recordset[0];
    ts.data = ts.data ? JSON.parse(ts.data) : [];
    res.json({ success: true, timesheet: ts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch timesheet.', error: err.message });
  }
});

router.post('/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const { days, expenses, comment } = req.body;
  const userId = req.user.id;

  // Calculate total_days from the days array
  const timeOptions = {
    full: 1,
    three_quarter: 0.75,
    half: 0.5,
    quarter: 0.25
  };
  const total_days = days.reduce((sum, day) => {
    if (day.work === 'worked' && timeOptions[day.time]) {
      return sum + timeOptions[day.time];
    }
    return sum;
  }, 0);

  const expensesNumber = isNaN(Number(expenses)) ? 0 : Number(expenses);

  console.log('Updating timesheet', { id, userId, days, expenses, comment, total_days });

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', id)
      .input('user_id', userId)
      .input('data', JSON.stringify(days))
      .input('expenses', expensesNumber)
      .input('comment', comment)
      .input('status', 'submitted')
      .input('total_days', total_days)
      .query(`
        UPDATE timesheets
        SET data = @data, expenses = @expenses, comment = @comment, status = @status, total_days = @total_days, updated_at = GETDATE()
        WHERE id = @id AND user_id = @user_id
      `);

    console.log('Rows affected:', result.rowsAffected);
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ success: false, message: 'Timesheet not found for this user.' });
    }

    res.json({ success: true, message: 'Timesheet submitted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to submit timesheet.', error: err.message });
  }
});

router.put('/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const { days, expenses, comment } = req.body;
  const userId = req.user.id;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', id)
      .input('user_id', userId)
      .input('data', JSON.stringify(days))
      .input('expenses', expenses)
      .input('comment', comment)
      .input('status', 'pending')
      .query(`
        UPDATE timesheets
        SET data = @data, expenses = @expenses, comment = @comment, status = @status, updated_at = GETDATE()
        WHERE id = @id AND user_id = @user_id
      `);
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ success: false, message: 'Timesheet not found for this user.' });
    }
    res.json({ success: true, message: 'Timesheet saved as draft.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to save timesheet.', error: err.message });
  }
});

module.exports = router; 