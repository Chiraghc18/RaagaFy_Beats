const express = require("express");
const router = express.Router();
const upload = require("../middlewares/cloudinaryStorage"); // your multer/cloudinary setup
const { uploadSong, getAllSongs, getSongById, likeSong,searchSongsByTitle} = require("../controllers/song");

// Upload audio file under field 'audio'
router.post("/upload", upload.single("audio"), uploadSong);

const searchSongsByFilter = require("../controllers/song/searchSongsByFilter");

// Get all songs
router.get("/", getAllSongs);

// Get single song
router.get("/:id", getSongById);

// Search songs by title
router.get("/search/title", searchSongsByTitle);

router.get("/search/filter", searchSongsByFilter);

// routes/songRoutes.js
const browseSongsByCategory = require("../controllers/song/browseSongsByCategory");

router.get("/browse/:category/:id", browseSongsByCategory);

// Like song
router.post("/:id/like", likeSong);



module.exports = router;
