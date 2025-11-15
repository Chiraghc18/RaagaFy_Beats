const express = require("express");
const router = express.Router();

const {
  createPlaylist,
  getAllPlaylists,
  getPlaylistById,
  addSongToPlaylist,
  removeSongFromPlaylist,
  clearPlaylist, // ✅ Add this
} = require("../controllers/playlist");

const { uploadImage } = require("../middlewares/uploadImage");

router.post("/create", uploadImage.single("coverImage"), createPlaylist);
router.get("/", getAllPlaylists);
router.get("/:id", getPlaylistById);
router.post("/add-song", addSongToPlaylist);
router.post("/remove-song", removeSongFromPlaylist);
router.post("/clear", clearPlaylist); // ✅ POST /playlist/clear

module.exports = router;
