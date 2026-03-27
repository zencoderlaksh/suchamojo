const express = require('express');
const {
  createBlog,
  listBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');
const { requireAdminAccess } = require('../middlewares/adminMiddleware');

const router = express.Router();

router.get('/', listBlogs);
router.get('/:slug', getBlogBySlug);

router.post('/', requireAdminAccess, createBlog);
router.put('/:id', requireAdminAccess, updateBlog);
router.delete('/:id', requireAdminAccess, deleteBlog);

module.exports = router;
