import Song from "../../models/Song.js"
export const searchSongsByTitle = async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ error: "Title query parameter is required" });
    }

    const regex = new RegExp(title, "i"); // case-insensitive regex
    const songs = await Song.find({ title: regex })
      .populate("genre subgenre artist album movie singers hero heroine language");

    res.json(songs);
  } catch (error) {
    console.error("Error searching songs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
