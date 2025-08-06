const express = require("express");
const router = express.Router();
const { uploadSubgenre, getAllSubgenres } = require("../controllers/subgenreController");

// POST /subgenres/upload
router.post("/upload", uploadSubgenre);

// GET /subgenres
router.get("/", getAllSubgenres);

module.exports = router;
