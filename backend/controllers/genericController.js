// controllers/genericController.js
function createController(Model) {
  return {
    upload: async (req, res) => {
      try {
        const { name } = req.body;
        const photo = req.file?.path;

        if (!name || !photo) {
          return res.status(400).json({ error: "Name and photo are required" });
        }

        const doc = new Model({ name, photo });
        await doc.save();

        res.status(201).json(doc);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    },

    getAll: async (req, res) => {
      try {
        const docs = await Model.find();
        res.json(docs);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  };
}

module.exports = createController;
