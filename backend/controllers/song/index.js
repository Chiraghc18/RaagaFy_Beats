const uploadSong = require("./uploadSong");
const getAllSongs = require("./getAllSongs");
const getSongById = require("./getSongById");
const likeSong = require("./likeSong");
const {searchSongsByTitle} = require("./searchSongsByTitle");

module.exports = {
  uploadSong,
  getAllSongs,
  getSongById,
  searchSongsByTitle,
  likeSong,
};
