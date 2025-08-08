// controllers/song/searchSongsByFilter.js
const Song = require("../../models/Song");

const searchSongsByFilter = async (req, res) => {
  try {
    const {
      genre,
      artist,
      album,
      movie,
      hero,
      heroine,
      subgenre,
      language,
      singer
    } = req.query;

    const filter = {};

    if (genre) filter.genre = genre;
    if (artist) filter.artist = artist;
    if (album) filter.album = album;
    if (movie) filter.movie = movie;
    if (hero) filter.hero = hero;
    if (heroine) filter.heroine = heroine;
    if (subgenre) filter.subgenre = subgenre;
    if (language) filter.language = language;
    if (singer) filter.singers = singer; // handles one singer ID; use `$in` for array

    const songs = await Song.find(filter)
      .populate("genre subgenre artist album movie singers hero heroine language");

    res.json(songs);
  } catch (error) {
    console.error("Error in searchSongsByFilter:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = searchSongsByFilter;
