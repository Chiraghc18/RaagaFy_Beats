const mongoose = require("mongoose");

const subgenreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: mongoose.Schema.Types.ObjectId, ref: "Genre", required: true }
});

module.exports = mongoose.model("Subgenre", subgenreSchema);
