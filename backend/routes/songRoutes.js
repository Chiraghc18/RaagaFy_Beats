const express = require("express");
const router = express.Router();
const upload = require("../middlewares/cloudinaryStorage");
const { uploadImage } = require("../middlewares/uploadImage");
const {
  uploadSong,
  getAllSongs,
  getSongById,
  likeSong,
  searchSongsByTitle,
  searchSongsByFilter,
  updateSong,
  browseSongsByCategory,
} = require("../controllers/song");

const uploadPhoto = require("../controllers/photo/uploadPhoto");
const getPhotoBySong = require("../controllers/photo/getPhotoBySong");
// Check what the actual file name is and update accordingly:
const getAllPhotos = require("../controllers/photo/getAllPhoto"); // or getAllPhotos

// Upload routes
router.post("/upload", upload.single("audio"), uploadSong);
router.post("/upload-photo", uploadImage.single("photo"), uploadPhoto);

// Get routes
router.get("/", getAllSongs);
router.get("/:id", getSongById);
router.get("/:songId/photo", getPhotoBySong);
router.get("/photos/all", getAllPhotos);

// Search routes
router.get("/search/title", searchSongsByTitle);
router.get("/search/filter", searchSongsByFilter);
router.get("/browse/:category/:id", browseSongsByCategory);

// Action routes
router.post("/:id/like", likeSong);
router.put("/:id", updateSong);

module.exports = router;