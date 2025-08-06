const express = require('express');
const router = express.Router();
const upload = require('../uploads/cloudinaryStorage');
const { uploadSong, getAllSongs } = require('../controllers/songController');

router.post('/upload', upload.single('audio'), uploadSong);
router.get('/', getAllSongs);

module.exports = router;
