const express = require('express');
const authenticateJWT = require('../middleware/auth');
const { poolPromise } = require('../config/db');
const { BlobServiceClient } = require('@azure/storage-blob');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const AZURE_STORAGE_CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER_NAME;

const router = express.Router();

// POST /api/onboarding - create or update application
router.post('/', authenticateJWT, async (req, res) => {
  const { business_name, contact_person, address, business_type } = req.body;
  const userId = req.user.id;
  try {
    const pool = await poolPromise;
    // Upsert: if user already has an application, update it; else insert new
    const existing = await pool.request()
      .input('business_name', business_name)
      .input('contact_person', contact_person)
      .input('address', address)
      .input('business_type', business_type)
      .query('SELECT TOP 1 * FROM onboarding_applications WHERE business_name = @business_name AND contact_person = @contact_person');
    let appId;
    if (existing.recordset.length > 0) {
      appId = existing.recordset[0].id;
      await pool.request()
        .input('id', appId)
        .input('business_name', business_name)
        .input('contact_person', contact_person)
        .input('address', address)
        .input('business_type', business_type)
        .query('UPDATE onboarding_applications SET business_name=@business_name, contact_person=@contact_person, address=@address, business_type=@business_type, updated_at=GETDATE() WHERE id=@id');
    } else {
      const result = await pool.request()
        .input('business_name', business_name)
        .input('contact_person', contact_person)
        .input('address', address)
        .input('business_type', business_type)
        .query('INSERT INTO onboarding_applications (business_name, contact_person, address, business_type, status) OUTPUT INSERTED.id VALUES (@business_name, @contact_person, @address, @business_type, \'draft\')');
      appId = result.recordset[0].id;
    }
    res.json({ success: true, application_id: appId });
  } catch (err) {
    console.error('Onboarding application error:', err);
    res.status(500).json({ success: false, message: 'Failed to save application', error: err.message });
  }
});

// POST /api/onboarding/:id/documents - upload documents
router.post('/:id/documents', authenticateJWT, upload.array('documents', 10), async (req, res) => {
  const { id } = req.params;
  const { file_type } = req.body; // file_type can be sent per file if needed
  let fileUrls = [];
  try {
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(AZURE_STORAGE_CONTAINER_NAME);
    for (const file of req.files) {
      const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
      const blobName = `onboarding/${Date.now()}_${safeName}`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      await blockBlobClient.uploadData(file.buffer, { blobHTTPHeaders: { blobContentType: file.mimetype } });
      fileUrls.push(blockBlobClient.url);
      // Save to DB
      const pool = await poolPromise;
      await pool.request()
        .input('application_id', id)
        .input('file_url', blockBlobClient.url)
        .input('file_type', file_type || 'other')
        .query('INSERT INTO onboarding_documents (application_id, file_url, file_type) VALUES (@application_id, @file_url, @file_type)');
    }
    res.json({ success: true, file_urls: fileUrls });
  } catch (err) {
    console.error('Onboarding document upload error:', err);
    res.status(500).json({ success: false, message: 'Failed to upload documents', error: err.message });
  }
});

// GET /api/onboarding/:id - get application details and status
router.get('/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    const app = await pool.request().input('id', id).query('SELECT * FROM onboarding_applications WHERE id=@id');
    const docs = await pool.request().input('id', id).query('SELECT * FROM onboarding_documents WHERE application_id=@id');
    const inspections = await pool.request().input('id', id).query('SELECT * FROM onboarding_inspections WHERE application_id=@id');
    const remediations = await pool.request().input('id', id).query('SELECT * FROM onboarding_remediations WHERE application_id=@id');
    res.json({
      success: true,
      application: app.recordset[0],
      documents: docs.recordset,
      inspections: inspections.recordset,
      remediations: remediations.recordset
    });
  } catch (err) {
    console.error('Onboarding get error:', err);
    res.status(500).json({ success: false, message: 'Failed to get onboarding details', error: err.message });
  }
});

// POST /api/onboarding/:id/inspection - schedule/upload inspection report
router.post('/:id/inspection', authenticateJWT, upload.single('report'), async (req, res) => {
  const { id } = req.params;
  const { scheduled_date, inspector_comments, status } = req.body;
  let report_url = null;
  try {
    if (req.file) {
      const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
      const containerClient = blobServiceClient.getContainerClient(AZURE_STORAGE_CONTAINER_NAME);
      const safeName = req.file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
      const blobName = `onboarding/inspection_${Date.now()}_${safeName}`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      await blockBlobClient.uploadData(req.file.buffer, { blobHTTPHeaders: { blobContentType: req.file.mimetype } });
      report_url = blockBlobClient.url;
    }
    const pool = await poolPromise;
    await pool.request()
      .input('application_id', id)
      .input('scheduled_date', scheduled_date)
      .input('report_url', report_url)
      .input('status', status || 'pending')
      .input('inspector_comments', inspector_comments)
      .query('INSERT INTO onboarding_inspections (application_id, scheduled_date, report_url, status, inspector_comments) VALUES (@application_id, @scheduled_date, @report_url, @status, @inspector_comments)');
    res.json({ success: true, report_url });
  } catch (err) {
    console.error('Onboarding inspection error:', err);
    res.status(500).json({ success: false, message: 'Failed to save inspection', error: err.message });
  }
});

// POST /api/onboarding/:id/remediation - upload remediation evidence
router.post('/:id/remediation', authenticateJWT, upload.single('evidence'), async (req, res) => {
  const { id } = req.params;
  const { comments } = req.body;
  let evidence_url = null;
  try {
    if (req.file) {
      const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
      const containerClient = blobServiceClient.getContainerClient(AZURE_STORAGE_CONTAINER_NAME);
      const safeName = req.file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
      const blobName = `onboarding/remediation_${Date.now()}_${safeName}`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      await blockBlobClient.uploadData(req.file.buffer, { blobHTTPHeaders: { blobContentType: req.file.mimetype } });
      evidence_url = blockBlobClient.url;
    }
    const pool = await poolPromise;
    await pool.request()
      .input('application_id', id)
      .input('evidence_url', evidence_url)
      .input('comments', comments)
      .query('INSERT INTO onboarding_remediations (application_id, evidence_url, comments) VALUES (@application_id, @evidence_url, @comments)');
    res.json({ success: true, evidence_url });
  } catch (err) {
    console.error('Onboarding remediation error:', err);
    res.status(500).json({ success: false, message: 'Failed to save remediation', error: err.message });
  }
});

// GET /api/onboarding/:id/certificate - stub for certificate download
router.get('/:id/certificate', authenticateJWT, async (req, res) => {
  // TODO: Generate and return PDF certificate
  res.json({ success: true, message: 'Certificate generation not implemented yet.' });
});

module.exports = router; 