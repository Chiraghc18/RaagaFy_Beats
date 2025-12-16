const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const registerResources = require("./routes/registerResources");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Register routes
app.use("/songs", require("./routes/songRoutes"));
app.use("/playlists", require("./routes/playlistRoutes"));
app.use("/albums", require("./routes/albumRoutes"));
app.use("/subgenres", require("./routes/subgenreRoutes"));

// Register generic resources (artists, heroes, heroines, etc.)
registerResources(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));