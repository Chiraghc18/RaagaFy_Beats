const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: String,
  url: String,
});

module.exports = mongoose.model('Songs', songSchema);
