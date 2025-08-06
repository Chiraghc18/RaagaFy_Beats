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

const artistRoutes = require('./routes/artistRoutes');
app.use('/artists', artistRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
