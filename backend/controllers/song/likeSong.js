const Song = require("../../models/Song");

const likeSong = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ error: "Song not found" });

    song.likes = (song.likes || 0) + 1;
    await song.save();

    res.json({ likes: song.likes });
  } catch (err) {
    console.error("likeSong error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = likeSong;
