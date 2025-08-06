const Playlist = require("../../models/Playlist");

const removeSongFromPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.body;

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) return res.status(404).json({ error: "Playlist not found" });

    playlist.songs = playlist.songs.filter((id) => id.toString() !== songId);
    await playlist.save();

    const populated = await Playlist.findById(playlist._id)
      .populate("songs", "title artist url filename");

    res.json(populated);
  } catch (err) {
    console.error("removeSongFromPlaylist error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = removeSongFromPlaylist;
