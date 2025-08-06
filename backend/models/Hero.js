const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  photo: { type: String },
});

module.exports = mongoose.model("Hero", heroSchema);
