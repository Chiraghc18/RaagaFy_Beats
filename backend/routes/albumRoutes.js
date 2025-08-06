const express = require("express");
const router = express.Router();
const { uploadAlbum, getAllAlbums } = require("../controllers/albumController");

// POST /albums
router.post("/upload", uploadAlbum);

// GET /albums
router.get("/", getAllAlbums);

module.exports = router;
