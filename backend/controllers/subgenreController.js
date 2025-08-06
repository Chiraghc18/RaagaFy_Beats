const Subgenre = require("../models/SubGenre");

const uploadSubgenre = async (req, res) => {
  try {
    const { name, genre } = req.body;

    if (!name || !genre) {
      return res.status(400).json({ error: "Name and genre are required" });
    }

    const subgenre = new Subgenre({ name, genre });
    await subgenre.save();

    res.status(201).json(subgenre);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllSubgenres = async (req, res) => {
  try {
    const subgenres = await Subgenre.find()
      .populate("genre", "name") // show only genre name in response
      .exec();
    res.json(subgenres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { uploadSubgenre, getAllSubgenres };
