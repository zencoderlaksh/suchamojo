const express = require("express");
const router = express.Router();
const {
  getAuthParams,
  uploadMedia,
  listMedia,
  renameMedia,
  updateMediaDetails,
  deleteMedia,
} = require("../controllers/mediaController");

// Public authentication endpoint for client-side ImageKit upload component
router.get("/auth", getAuthParams);

// Endpoints for media management
router.post("/upload", uploadMedia);
router.get("/list", listMedia);
router.post("/rename", renameMedia);
router.patch("/:fileId", updateMediaDetails);
router.delete("/:fileId", deleteMedia);

module.exports = router;
