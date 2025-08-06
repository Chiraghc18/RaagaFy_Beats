// controllers/playlistController.js
const Playlist = require("../models/Playlist");
const Song = require("../models/Song");

const createPlaylist = async (req, res) => {
  try {
    const { name, isBuiltIn } = req.body;
    let songs = req.body.songs || [];
    if (typeof songs === "string") songs = [songs];

    if (!name) return res.status(400).json({ error: "Playlist name is required" });

    if (songs.length > 0) {
      const existing = await Song.find({ _id: { $in: songs } }).select("_id");
      if (existing.length !== songs.length) {
        return res.status(400).json({ error: "Some song IDs are invalid" });
      }
    }

    let coverImageUrl = req.body.coverImage || undefined;
    if (req.file) {
      coverImageUrl = req.file.path || req.file.secure_url || req.file.url;
    }

    const playlist = new Playlist({
      name,
      songs,
      isBuiltIn: isBuiltIn === "false" ? false : (isBuiltIn === "true" ? true : !!isBuiltIn),
      coverImage: coverImageUrl,
    });

    await playlist.save();

    const populated = await Playlist.findById(playlist._id).populate("songs", "title artist url filename");
    res.status(201).json(populated);
  } catch (err) {
    console.error("createPlaylist error:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};

const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find().populate("songs", "title artist url filename").exec();
    res.json(playlists);
  } catch (err) {
    console.error("getAllPlaylists error:", err);
    res.status(500).json({ error: err.message });
  }
};

// --- NEW: get single playlist by id (populated) ---
const getPlaylistById = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate("songs", "title artist url filename").exec();
    if (!playlist) return res.status(404).json({ error: "Playlist not found" });
    res.json(playlist);
  } catch (err) {
    console.error("getPlaylistById error:", err);
    res.status(500).json({ error: err.message });
  }
};
// --- end new function ---

const addSongToPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.body;
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) return res.status(404).json({ error: "Playlist not found" });
    if (!playlist.songs.includes(songId)) {
      playlist.songs.push(songId);
      await playlist.save();
    }
    const populated = await Playlist.findById(playlist._id).populate("songs", "title artist url filename");
    res.json(populated);
  } catch (err) {
    console.error("addSongToPlaylist error:", err);
    res.status(500).json({ error: err.message });
  }
};

const removeSongFromPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.body;
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) return res.status(404).json({ error: "Playlist not found" });
    playlist.songs = playlist.songs.filter((id) => id.toString() !== songId);
    await playlist.save();
    const populated = await Playlist.findById(playlist._id).populate("songs", "title artist url filename");
    res.json(populated);
  } catch (err) {
    console.error("removeSongFromPlaylist error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createPlaylist,
  getAllPlaylists,
  getPlaylistById,        // <- exported here
  addSongToPlaylist,
  removeSongFromPlaylist,
};
