const Song = require("../../models/Song");

const updateSong = async (req, res) => {
  try {
    const { id } = req.params;
    // Create a copy of the body
    const updates = { ...req.body };

    // --- CRITICAL FIX: Remove empty strings ---
    // If a dropdown sends "", delete that key so we don't overwrite with invalid data
    Object.keys(updates).forEach((key) => {
      if (updates[key] === "" || updates[key] === null) {
        delete updates[key];
      }
    });

    // Handle singers: ensure it's an array if it exists
    if (updates.singers && typeof updates.singers === 'string') {
       updates.singers = updates.singers.split(",").map(s => s.trim()).filter(Boolean);
    }

    const updatedSong = await Song.findByIdAndUpdate(
      id, 
      { $set: updates }, 
      { new: true, runValidators: true } 
    );

    if (!updatedSong) {
      return res.status(404).json({ error: "Song not found" });
    }

    res.json(updatedSong);
  } catch (err) {
    console.error("updateSong error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = updateSong;