const express = require("express");
const {
  getPublicSettings,
  getAdminSettings,
  updateAdminSettings,
} = require("../controllers/settingsController");
const { requireAdminAccess } = require("../middlewares/adminMiddleware");

const router = express.Router();

router.get("/", getPublicSettings);
router.get("/admin", getAdminSettings);
router.put("/admin", updateAdminSettings);

module.exports = router;
