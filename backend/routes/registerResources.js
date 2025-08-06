// routes/registerResources.js
const createRoutes = require("./genericRoutes");            // returns a router given a controller
const createController = require("../controllers/genericController");

// import models
const Artist = require("../models/Artist");
const Hero = require("../models/Hero");
const Heroine = require("../models/Heroine");
const Movie = require("../models/Movie");
const Singer = require("../models/Singer");

/**
 * Register resource routes on the provided Express app.
 * Keep this function idempotent and call it once from server.js.
 */
function registerResources(app) {
  app.use("/artists", createRoutes(createController(Artist)));
  app.use("/heroes", createRoutes(createController(Hero)));
  app.use("/heroines", createRoutes(createController(Heroine)));
  app.use("/movies", createRoutes(createController(Movie)));
  app.use("/singers", createRoutes(createController(Singer)));
}

module.exports = registerResources;
