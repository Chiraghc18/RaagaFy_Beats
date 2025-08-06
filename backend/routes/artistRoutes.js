// routes/artistRoutes.js
const express = require("express");
const router = express.Router();
const { uploadArtist ,getAllArtists } = require("../controllers/artistController");
// ✅ Correct in CommonJS
const { uploadImage } = require("../middlewares/uploadImage");

const Artist = require("../models/Artist");

// Upload artist
router.post("/upload", uploadImage.single("photo"), uploadArtist);

// Get all artists
router.get("/", getAllArtists);

module.exports = router;
