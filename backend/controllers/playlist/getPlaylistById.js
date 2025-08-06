const Playlist = require("../../models/Playlist");

const getPlaylistById = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id)
      .populate("songs", "title artist url filename")
      .exec();

    if (!playlist) return res.status(404).json({ error: "Playlist not found" });

    res.json(playlist);
  } catch (err) {
    console.error("getPlaylistById error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = getPlaylistById;
