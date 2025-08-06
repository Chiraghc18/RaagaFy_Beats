// models/Song.js
const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: mongoose.Schema.Types.ObjectId, ref: "Genre", required: true },
  subgenre: { type: mongoose.Schema.Types.ObjectId, ref: "Subgenre" },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: "Artist", required: true },
  album: { type: mongoose.Schema.Types.ObjectId, ref: "Album" },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
  singers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Singer" }],
  hero: { type: mongoose.Schema.Types.ObjectId, ref: "Hero" },
  heroine: { type: mongoose.Schema.Types.ObjectId, ref: "Heroine" },
  photo: { type: String },
  audioUrl: { type: String, required: true },
  likes: { type: Number, default: 0 }
}, {
  timestamps: true
});

module.exports = mongoose.model("Songs", songSchema);
