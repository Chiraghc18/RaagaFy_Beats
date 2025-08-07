const Song = require("../../models/Song");

const getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id)
      .populate("artist", "name")
      .populate("album", "name")
      .populate("genre", "name")
      .populate("singers", "name");

    if (!song) return res.status(404).json({ error: "Song not found" });

    res.json(song);
  } catch (err) {
    console.error("getSongById error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = getSongById;
