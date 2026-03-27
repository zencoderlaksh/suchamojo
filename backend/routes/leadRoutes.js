const express = require('express');
const {
  submitConsultationLead,
  listConsultationLeads,
} = require('../controllers/leadController');
const { requireAdminAccess } = require('../middlewares/adminMiddleware');
const { leadRateLimit } = require('../middlewares/rateLimitMiddleware');
const { spamProtection } = require('../middlewares/spamProtectionMiddleware');

const router = express.Router();

router.post('/consultation', leadRateLimit, spamProtection, submitConsultationLead);
router.get('/consultation', requireAdminAccess, listConsultationLeads);

module.exports = router;
