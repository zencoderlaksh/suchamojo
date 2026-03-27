const express = require('express');
const {
  getPublicSettings,
  getAdminSettings,
  updateAdminSettings,
} = require('../controllers/settingsController');
const { requireAdminAccess } = require('../middlewares/adminMiddleware');

const router = express.Router();

router.get('/', getPublicSettings);
router.get('/admin', requireAdminAccess, getAdminSettings);
router.put('/admin', requireAdminAccess, updateAdminSettings);

module.exports = router;
