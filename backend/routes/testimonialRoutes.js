const express = require("express");
const {
  createTestimonial,
  listTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonialController");
const { protect } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/adminMiddleware");

const router = express.Router();

router.get("/", listTestimonials);
router.get("/:id", getTestimonialById);

router.post("/", protect, isAdmin, createTestimonial);
router.put("/:id", protect, isAdmin, updateTestimonial);
router.delete("/:id", protect, isAdmin, deleteTestimonial);

module.exports = router;
