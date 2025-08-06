const createPlaylist = require('./createPlaylist');
const getAllPlaylists = require('./getAllPlaylists');
const getPlaylistById = require('./getPlaylistById');
const addSongToPlaylist = require('./addSongToPlaylist');
const removeSongFromPlaylist = require('./removeSongFromPlaylist');

module.exports = {
  createPlaylist,
  getAllPlaylists,
  getPlaylistById,
  addSongToPlaylist,
  removeSongFromPlaylist,
};
