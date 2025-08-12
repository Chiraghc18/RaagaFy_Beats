// controllers/photo/uploadPhoto.js
const Photo = require("../../models/Photo");

const uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const { songId } = req.body;
    if (!songId) {
      return res.status(400).json({ error: "songId is required" });
    }

    // Replace if exists (only one per song)
    const photo = await Photo.findOneAndUpdate(
      { song: songId },
      { url: req.file.path, song: songId },
      { new: true, upsert: true }
    );

    res.status(201).json(photo);
  } catch (err) {
    console.error("uploadPhoto error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = uploadPhoto;
