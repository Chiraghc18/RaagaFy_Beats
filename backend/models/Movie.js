const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  photo: { type: String },
});

module.exports = mongoose.model("Movie", movieSchema);
