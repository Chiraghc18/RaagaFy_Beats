// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const registerResources = require("./routes/registerResources");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// existing routes
app.use("/songs", require("./routes/songRoutes"));

// register generic resources
registerResources(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
