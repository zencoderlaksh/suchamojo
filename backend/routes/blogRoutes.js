const express = require("express");
const {
  createBlog,
  listBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const { protect } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/adminMiddleware");

const router = express.Router();

router.get("/", listBlogs);
router.get("/:slug", getBlogBySlug);

router.post("/", protect, isAdmin, createBlog);
router.put("/:id", protect, isAdmin, updateBlog);
router.delete("/:id", protect, isAdmin, deleteBlog);

module.exports = router;
