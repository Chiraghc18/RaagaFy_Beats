// controllers/song/searchSongsByFilter.js
const Song = require("../../models/Song");

const searchSongsByFilter = async (req, res) => {
  try {
    const {
      genre,        // id
      artist,
      album,
      movie,
      hero,
      heroine,
      subgenre,     // id
      language,     // id
      singer,
      releaseYear,
      name,         // Song title search
      artistName,
      albumName,
      movieName,
      heroName,
      heroineName,
      singerName,
      genreName,    // NEW: text search by genre name
      subgenreName, // NEW
      languageName, // NEW
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
    if (singer) filter.singers = singer;

    // Release Year filter
    if (releaseYear) {
      const year = parseInt(releaseYear, 10);
      if (!isNaN(year)) {
        filter.releaseDate = {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        };
      }
    }

    // Song title search
    if (name) {
      filter.title = { $regex: name, $options: "i" };
    }

    const songs = await Song.find(filter)
      .populate({
        path: "artist",
        match: artistName ? { name: { $regex: artistName, $options: "i" } } : {},
      })
      .populate({
        path: "album",
        match: albumName ? { name: { $regex: albumName, $options: "i" } } : {},
      })
      .populate({
        path: "movie",
        match: movieName ? { name: { $regex: movieName, $options: "i" } } : {},
      })
      .populate({
        path: "hero",
        match: heroName ? { name: { $regex: heroName, $options: "i" } } : {},
      })
      .populate({
        path: "heroine",
        match: heroineName ? { name: { $regex: heroineName, $options: "i" } } : {},
      })
      .populate({
        path: "singers",
        match: singerName ? { name: { $regex: singerName, $options: "i" } } : {},
      })
      .populate({
        path: "genre",
        match: genreName ? { name: { $regex: genreName, $options: "i" } } : {},
      })
      .populate({
        path: "subgenre",
        match: subgenreName ? { name: { $regex: subgenreName, $options: "i" } } : {},
      })
      .populate({
        path: "language",
        match: languageName ? { name: { $regex: languageName, $options: "i" } } : {},
      })
      .sort({ releaseDate: -1, createdAt: -1 });

    // Remove songs where populated fields didn’t match
    const filteredSongs = songs.filter((s) => {
      if (artistName && !s.artist) return false;
      if (albumName && !s.album) return false;
      if (movieName && !s.movie) return false;
      if (heroName && !s.hero) return false;
      if (heroineName && !s.heroine) return false;
      if (singerName && (!s.singers || s.singers.length === 0)) return false;
      if (genreName && !s.genre) return false;
      if (subgenreName && !s.subgenre) return false;
      if (languageName && !s.language) return false;
      return true;
    });

    res.json(filteredSongs);
  } catch (error) {
    console.error("Error in searchSongsByFilter:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = searchSongsByFilter;
