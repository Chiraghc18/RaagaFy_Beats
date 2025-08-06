const express = require("express");
const router = express.Router();
const {
  createPlaylist,
  getAllPlaylists,
  addSongToPlaylist,
  removeSongFromPlaylist,
} = require("../controllers/playlistController");

// uploadImage middleware should handle 'coverImage' file field.
// Replace with your middleware import/path if different.
const { uploadImage } = require("../middlewares/uploadImage");

// If you want to accept coverImage file:
router.post("/create", uploadImage.single("coverImage"), createPlaylist);

// If you don't want cover images, you can use router.post("/create", createPlaylist);

router.get("/", getAllPlaylists);
router.post("/add-song", addSongToPlaylist);
router.post("/remove-song", removeSongFromPlaylist);

module.exports = router;
