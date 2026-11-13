const express = require("express");
const {
  listSeoPages,
  getSeoBySlug,
  upsertSeoBySlug,
  deleteSeoBySlug,
} = require("../controllers/seoController");
const { requireAdminAccess } = require("../middlewares/adminMiddleware");

const router = express.Router();

router.get("/", listSeoPages);
router.get("/:slug", getSeoBySlug);
router.put("/:slug", upsertSeoBySlug);
router.delete("/:slug", deleteSeoBySlug);

module.exports = router;
