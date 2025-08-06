const express = require("express");
const router = express.Router();
const upload = require("../uploads/cloudinaryStorage"); // your multer/cloudinary setup
const { uploadSong, getAllSongs, getSongById, likeSong } = require("../controllers/songController");

// Upload audio file under field 'audio'
router.post("/upload", upload.single("audio"), uploadSong);

// Get all songs
router.get("/", getAllSongs);

// Get single song
router.get("/:id", getSongById);

// Like song
router.post("/:id/like", likeSong);

module.exports = router;
