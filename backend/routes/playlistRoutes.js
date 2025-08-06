// routes/playlistRoutes.js
const express = require("express");
const router = express.Router();
const {
  createPlaylist,
  getAllPlaylists,
  getPlaylistById,
  addSongToPlaylist,
  removeSongFromPlaylist,
} = require("../controllers/playlistController");

const { uploadImage } = require("../middlewares/uploadImage");

router.post("/create", uploadImage.single("coverImage"), createPlaylist);

// GET all playlists
router.get("/", getAllPlaylists);

// GET single playlist (this is required for the details page)
router.get("/:id", getPlaylistById);

// Add / remove songs
router.post("/add-song", addSongToPlaylist);
router.post("/remove-song", removeSongFromPlaylist);

module.exports = router;
