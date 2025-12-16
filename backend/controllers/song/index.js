const uploadSong = require("./uploadSong");
const getAllSongs = require("./getAllSongs");
const getSongById = require("./getSongById");
const likeSong = require("./likeSong");
const searchSongsByTitle = require("./searchSongsByTitle");
const searchSongsByFilter = require("./searchSongsByFilter");
const updateSong = require("./updateSong");
const browseSongsByCategory = require("./browseSongsByCategory");

module.exports = {
  uploadSong,
  getAllSongs,
  getSongById,
  likeSong,
  searchSongsByTitle,
  searchSongsByFilter,
  updateSong,
  browseSongsByCategory,
};