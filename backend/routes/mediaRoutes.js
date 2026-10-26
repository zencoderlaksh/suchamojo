const express = require("express");
const router = express.Router();
const {
  getAuthParams,
  uploadMedia,
  listMedia,
  deleteMedia,
} = require("../controllers/mediaController");

// Public authentication endpoint for client-side ImageKit upload component
router.get("/auth", getAuthParams);

// Endpoints for media management
router.post("/upload", uploadMedia);
router.get("/list", listMedia);
router.delete("/:fileId", deleteMedia);

module.exports = router;
