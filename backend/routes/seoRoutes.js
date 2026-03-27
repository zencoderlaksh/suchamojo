const express = require('express');
const {
  listSeoPages,
  getSeoBySlug,
  upsertSeoBySlug,
} = require('../controllers/seoController');
const { requireAdminAccess } = require('../middlewares/adminMiddleware');

const router = express.Router();

router.get('/', listSeoPages);
router.get('/:slug', getSeoBySlug);
router.put('/:slug', requireAdminAccess, upsertSeoBySlug);

module.exports = router;
