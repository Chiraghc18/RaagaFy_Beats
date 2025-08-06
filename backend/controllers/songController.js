const Song = require('../models/Song');

// Upload Song
const uploadSong = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const newSong = new Song({
      title: req.file.originalname,
      url: req.file.path,
    });

    await newSong.save();
    res.status(201).json(newSong);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get All Songs
const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uploadSong,
  getAllSongs,
};
