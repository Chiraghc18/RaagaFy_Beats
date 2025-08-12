// controllers/photo/getPhotoBySong.js
const Photo = require("../../models/Photo");

const getPhotoBySong = async (req, res) => {
  try {
    const { songId } = req.params;
    const photo = await Photo.findOne({ song: songId });

    if (!photo) {
      return res.status(404).json({ error: "Photo not found for this song" });
    }

    res.json(photo); // returns { _id, song, url, createdAt, updatedAt }
  } catch (err) {
    console.error("getPhotoBySong error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = getPhotoBySong;
