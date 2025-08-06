const mongoose = require("mongoose");

const heroineSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  photo: { type: String },
});

module.exports = mongoose.model("Heroine", heroineSchema);
