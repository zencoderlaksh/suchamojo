const express = require("express");
const {
  submitConsultationLead,
  listConsultationLeads,
  testEmailConfiguration,
  deleteConsultationLead,
} = require("../controllers/leadController");

const { protect } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/adminMiddleware");
const { leadRateLimit } = require("../middlewares/rateLimitMiddleware");
const { spamProtection } = require("../middlewares/spamProtectionMiddleware");

const router = express.Router();

router.post(
  "/consultation",
  leadRateLimit,
  spamProtection,
  submitConsultationLead,
);
router.get("/consultation", protect, isAdmin, listConsultationLeads);
router.delete("/consultation/:id", protect, isAdmin, deleteConsultationLead);
router.post("/test-email", protect, isAdmin, testEmailConfiguration);

module.exports = router;
