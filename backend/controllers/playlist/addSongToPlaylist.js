const Playlist = require("../../models/Playlist");

const addSongToPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.body;

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) return res.status(404).json({ error: "Playlist not found" });

    if (!playlist.songs.includes(songId)) {
      playlist.songs.push(songId);
      await playlist.save();
    }

    const populated = await Playlist.findById(playlist._id)
      .populate("songs", "title artist url filename");

    res.json(populated);
  } catch (err) {
    console.error("addSongToPlaylist error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = addSongToPlaylist;
