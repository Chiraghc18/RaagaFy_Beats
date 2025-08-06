const mongoose = require("mongoose");

const singerSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  photo: { type: String },
});

module.exports = mongoose.model("Singer", singerSchema);
