// models/Photo.js
const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  song: { type: mongoose.Schema.Types.ObjectId, ref: "Song", required: true, unique: true }, // one per song
  url: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Photo", photoSchema);
