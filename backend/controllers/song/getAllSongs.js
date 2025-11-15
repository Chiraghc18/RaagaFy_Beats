const Song = require("../../models/Song");

const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find()
      .populate("hero", "name")
      .populate("heroine", "name")
      .populate("movie", "name")
      .populate("language", "name")
      .populate("genre", "name")
      .populate("subgenre", "name")
      .populate("singers", "name")
      .populate("album", "name")
      .populate("artist", "name")
      .sort({ releaseDate: -1, createdAt: -1 }); // 👈 Sort newest → oldest

    res.json(songs);
  } catch (err) {
    console.error("getAllSongs error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = getAllSongs;
