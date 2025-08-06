const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: "Artist" },
});

module.exports = mongoose.model("Album", albumSchema);
