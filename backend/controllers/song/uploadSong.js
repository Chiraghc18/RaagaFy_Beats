const Song = require("../../models/Song");

const uploadSong = async (req, res) => {
  try {
    if (!req.file && !req.body.audioUrl) {
      return res.status(400).json({ error: "No audio file uploaded or audioUrl provided" });
    }

    const title = req.body.title || req.file?.originalname || "Untitled";
    const audioUrl = req.file?.path || req.body.audioUrl;
    const songData = { title, audioUrl };

    const optionalFields = [
      "genre", "subgenre", "artist", "album",
      "movie", "hero", "heroine", "photo"
    ];
    optionalFields.forEach((key) => {
      if (req.body[key]) songData[key] = req.body[key];
    });

    if (req.body.singers) {
      if (Array.isArray(req.body.singers)) {
        songData.singers = req.body.singers;
      } else {
        songData.singers = req.body.singers
          .split(",")
          .map(s => s.trim())
          .filter(Boolean);
      }
    }

    const newSong = new Song(songData);
    await newSong.save();

    const populated = await Song.findById(newSong._id)
      .populate("artist", "name")
      .populate("album", "name")
      .populate("genre", "name")
      .populate("singers", "name");

    res.status(201).json(populated);
  } catch (err) {
    console.error("uploadSong error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = uploadSong;
