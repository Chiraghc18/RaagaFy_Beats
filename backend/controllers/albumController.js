const Album = require("../models/Album");

const uploadAlbum = async (req, res) => {
  try {
    const { name, artist } = req.body;

    if (!name || !artist) {
      return res.status(400).json({ error: "Name and artist are required" });
    }

    const album = new Album({ name, artist });
    await album.save();

    res.status(201).json(album);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find().populate("artist", "name photo");
    res.json(albums);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { uploadAlbum, getAllAlbums };
