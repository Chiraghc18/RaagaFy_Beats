const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/songs', require('./routes/songRoutes'));
// Add other routes like playlists, genres, etc.


const Artist = require("./models/Artist");
const Hero = require("./models/Hero");
const Heroine = require("./models/Heroine");
const Movie = require("./models/Movie")

const genericRoutes = require("./routes/genericRoutes")
const genericController = require("./controllers/genericController")
app.use("/artists", genericRoutes(genericController(Artist)));
app.use("/heroes", genericRoutes(genericController(Hero)));
app.use("/heroines", genericRoutes(genericController(Heroine)));
app.use("/movies", genericRoutes(genericController(Movie)));
// app.use("/heroes", genericRoutes(genericController(Hero)));
// app.use("/heroines", genericRoutes(genericController(Heroine)));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
