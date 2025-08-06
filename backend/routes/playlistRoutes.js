// routes/playlistRoutes.js

const express = require("express");
const router = express.Router();

const {
  createPlaylist,
  getAllPlaylists,
  getPlaylistById,
  addSongToPlaylist,
  removeSongFromPlaylist,
} = require("../controllers/playlist");  // ✅ Updated path

const { uploadImage } = require("../middlewares/uploadImage");

// Create a new playlist with optional cover image
router.post("/create", uploadImage.single("coverImage"), createPlaylist);

// Get all playlists
router.get("/", getAllPlaylists);

// Get a single playlist by ID
router.get("/:id", getPlaylistById);

// Add a song to a playlist
router.post("/add-song", addSongToPlaylist);

// Remove a song from a playlist
router.post("/remove-song", removeSongFromPlaylist);

module.exports = router;
