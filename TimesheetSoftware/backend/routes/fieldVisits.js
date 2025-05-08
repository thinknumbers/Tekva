const express = require('express');
const authenticateJWT = require('../middleware/auth');
const { poolPromise } = require('../config/db');
const { BlobServiceClient } = require('@azure/storage-blob');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const AZURE_STORAGE_CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER_NAME;

const router = express.Router();

// POST /api/field-visits - submit a new field visit report with multiple images
router.post('/', authenticateJWT, upload.array('photos', 10), async (req, res) => {
  console.log('Received field visit POST:', req.body, req.files);
  const { location_id, date, inspector, cleanliness, signage, stockSeparation, comments } = req.body;
  const userId = req.user.id;
  let photo_urls = [];

  // Upload each photo to Azure Blob Storage if present
  if (req.files && req.files.length > 0) {
    try {
      const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
      const containerClient = blobServiceClient.getContainerClient(AZURE_STORAGE_CONTAINER_NAME);
      for (const file of req.files) {
        const blobName = `field-visits/${Date.now()}_${file.originalname}`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.uploadData(file.buffer, {
          blobHTTPHeaders: { blobContentType: file.mimetype }
        });
        photo_urls.push(blockBlobClient.url);
      }
    } catch (err) {
      console.error('Photo upload failed:', err);
      return res.status(500).json({ success: false, message: 'Photo upload failed', error: err.message });
    }
  }

  try {
    const pool = await poolPromise;
    await pool.request()
      .input('location_id', location_id)
      .input('date', date)
      .input('inspector', inspector)
      .input('cleanliness', cleanliness)
      .input('signage', signage)
      .input('stock_separation', stockSeparation)
      .input('comments', comments)
      .input('user_id', userId)
      .input('photo_urls', JSON.stringify(photo_urls))
      .query(`INSERT INTO field_visits (location_id, date, inspector, cleanliness, signage, stock_separation, comments, user_id, photo_urls)
              VALUES (@location_id, @date, @inspector, @cleanliness, @signage, @stock_separation, @comments, @user_id, @photo_urls)`);
    res.json({ success: true, message: 'Field visit report submitted.' });
  } catch (err) {
    console.error('Failed to submit field visit report:', err);
    res.status(500).json({ success: false, message: 'Failed to submit field visit report.', error: err.message });
  }
});

// GET /api/field-visits - get all field visit reports for the logged-in user
router.get('/', authenticateJWT, async (req, res) => {
  const userId = req.user.id;
  const { locationId, startDate, endDate, sortBy, sortOrder } = req.query;
  let whereClauses = ['fv.user_id = @user_id'];
  let params = [
    { name: 'user_id', value: userId }
  ];
  if (locationId) {
    whereClauses.push('fv.location_id = @location_id');
    params.push({ name: 'location_id', value: locationId });
  }
  if (startDate) {
    whereClauses.push('fv.date >= @start_date');
    params.push({ name: 'start_date', value: startDate });
  }
  if (endDate) {
    whereClauses.push('fv.date <= @end_date');
    params.push({ name: 'end_date', value: endDate });
  }
  let orderClause = 'fv.date DESC, fv.id DESC';
  if (sortBy === 'date') {
    orderClause = `fv.date ${sortOrder === 'asc' ? 'ASC' : 'DESC'}, fv.id DESC`;
  }
  const whereSql = whereClauses.length ? 'WHERE ' + whereClauses.join(' AND ') : '';
  try {
    const pool = await poolPromise;
    let request = pool.request();
    params.forEach(p => request = request.input(p.name, p.value));
    const result = await request.query(`
      SELECT fv.id, fv.date, fv.inspector, fv.cleanliness, fv.signage, fv.stock_separation, fv.comments, fv.photo_url, fv.photo_urls,
             l.name AS location_name, l.address AS location_address
      FROM field_visits fv
      JOIN locations l ON fv.location_id = l.id
      ${whereSql}
      ORDER BY ${orderClause}
    `);
    // Parse photo_urls JSON for each report
    const reports = (result.recordset || []).map(r => ({
      ...r,
      photo_urls: r.photo_urls ? JSON.parse(r.photo_urls) : (r.photo_url ? [r.photo_url] : [])
    }));
    res.json({ success: true, reports });
  } catch (err) {
    console.error('Failed to fetch field visit reports:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch field visit reports.', error: err.message });
  }
});

module.exports = router; 