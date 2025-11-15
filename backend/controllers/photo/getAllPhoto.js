// controllers/photo/getAllPhotos.js
const Photo = require("../../models/Photo");

const getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.find();
    // Always return array
    res.json(photos);
  } catch (err) {
    console.error("getAllPhotos error:", err);
    res.status(500).json({ error: "Server error while fetching photos" });
  }
};

module.exports = getAllPhotos;
