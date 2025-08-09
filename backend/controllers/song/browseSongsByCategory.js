// controllers/song/browseSongsByCategory.js
const Song = require("../../models/Song");

const browseSongsByCategory = async (req, res) => {
  try {
    const { category, id } = req.params;

    // Map category to Song schema field name
    const categoryFieldMap = {
      genre: "genre",
      subgenre: "subgenre",
      artist: "artist",
      album: "album",
      movie: "movie",
      hero: "hero",
      heroine: "heroine",
      language: "language",
      singer: "singers", // plural for array
    };

    const field = categoryFieldMap[category];
    if (!field) {
      return res.status(400).json({ error: "Invalid category" });
    }

    const filter = {};
    if (field === "singers") {
      filter[field] = id; // match in array
    } else {
      filter[field] = id; // match single ref
    }

    const songs = await Song.find(filter)
      .populate("genre subgenre artist album movie singers hero heroine language");

    res.json(songs);
  } catch (err) {
    console.error("browseSongsByCategory error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = browseSongsByCategory;
