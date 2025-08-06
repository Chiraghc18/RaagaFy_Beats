const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'mp3-upload',
    resource_type: 'auto', // Still needed for audio files
    format: 'mp3',         // Force Cloudinary to store as mp3
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'audio/mpeg') {
      cb(null, true);
    } else {
      cb(new Error('Only MP3 files are allowed!'), false);
    }
  }
});

module.exports = upload;
