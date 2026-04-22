const express = require("express");
const {
  createBlog,
  listBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
// Removed requireAdminAccess - use isAdmin in index.js

const router = express.Router();

router.get("/", listBlogs);
router.get("/:slug", getBlogBySlug);

router.post("/", createBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

module.exports = router;
