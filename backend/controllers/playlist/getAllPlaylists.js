const Playlist = require("../../models/Playlist");

const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find()
      .populate("songs", "title artist url filename")
      .exec();

    res.json(playlists);
  } catch (err) {
    console.error("getAllPlaylists error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = getAllPlaylists;
