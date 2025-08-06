const Artist = require('../models/Artist');

const uploadArtist = async (req, res) => {
  try {
    const { name } = req.body;
    const photo = req.file?.path; // Cloudinary gives you a direct URL

    if (!name || !photo) {
      return res.status(400).json({ error: 'Name and photo are required' });
    }

    const artist = new Artist({ name, photo });
    await artist.save();

    res.status(201).json(artist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find();
    res.json(artists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { uploadArtist,getAllArtists};
