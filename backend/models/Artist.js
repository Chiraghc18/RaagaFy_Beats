const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  photo: { type: String }
});

module.exports = mongoose.model("Artist", artistSchema);
