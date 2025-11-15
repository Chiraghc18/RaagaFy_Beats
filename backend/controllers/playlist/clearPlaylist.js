const Playlist = require("../../models/Playlist");

const clearPlaylist = async (req, res) => {
  try {
    const { playlistId } = req.body;

    if (!playlistId) {
      return res.status(400).json({ error: "playlistId is required" });
    }

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    // Remove all songs
    playlist.songs = [];
    await playlist.save();

    const populated = await Playlist.findById(playlistId)
      .populate("songs", "title artist url filename");

    res.json({
      message: "Playlist cleared successfully",
      playlist: populated,
    });
  } catch (err) {
    console.error("clearPlaylist error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = clearPlaylist;
