// controllers/songController.js
const Song = require("../models/Song");

// Upload a song with metadata
const uploadSong = async (req, res) => {
  try {
    // audio file from middleware (upload.single('audio'))
    if (!req.file && !req.body.audioUrl) {
      return res.status(400).json({ error: "No audio file uploaded or audioUrl provided" });
    }

    const title = req.body.title || req.file?.originalname || "Untitled";
    const audioUrl = req.file?.path || req.body.audioUrl;

    // Build song data object
    const songData = { title, audioUrl };

    // assign optional single-value refs
    const optSingle = ["genre","subgenre","artist","album","movie","hero","heroine","photo"];
    optSingle.forEach((k) => {
      if (req.body[k]) songData[k] = req.body[k];
    });

    // singers can be repeated fields or comma-separated string
    if (req.body.singers) {
      if (Array.isArray(req.body.singers)) {
        songData.singers = req.body.singers;
      } else if (typeof req.body.singers === "string") {
        // allow "id1,id2" or single id
        songData.singers = req.body.singers.split(",").map((s) => s.trim()).filter(Boolean);
      }
    }

    const newSong = new Song(songData);
    await newSong.save();

    // Populate some refs for immediate response
    const populated = await Song.findById(newSong._id)
      .populate("artist", "name")
      .populate("album", "name")
      .populate("genre", "name")
      .populate("singers", "name")
      .exec();

    res.status(201).json(populated);
  } catch (err) {
    console.error("uploadSong error:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};

const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find()
      .populate("artist", "name")
      .populate("album", "name")
      .populate("genre", "name")
      .populate("singers", "name")
      .exec();
    res.json(songs);
  } catch (err) {
    console.error("getAllSongs error:", err);
    res.status(500).json({ error: err.message });
  }
};

const getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id)
      .populate("artist", "name")
      .populate("album", "name")
      .populate("genre", "name")
      .populate("singers", "name")
      .exec();
    if (!song) return res.status(404).json({ error: "Song not found" });
    res.json(song);
  } catch (err) {
    console.error("getSongById error:", err);
    res.status(500).json({ error: err.message });
  }
};

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

module.exports = {
  uploadSong,
  getAllSongs,
  getSongById,
  likeSong,
};
