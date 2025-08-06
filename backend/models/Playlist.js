const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Songs' }],
  isBuiltIn: { type: Boolean, default: true }, // ✅ lowercase true
  coverImage: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Playlist', PlaylistSchema);
