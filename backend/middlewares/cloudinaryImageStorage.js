const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary'); // Make sure this exports a configured Cloudinary instance

// Create Cloudinary Storage for images
const storage_Img = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'img-upload',
    resource_type: 'image', // or 'auto' if unsure
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});

// Setup multer with Cloudinary storage
const uploadImage = multer({ storage: storage_Img });

module.exports = {uploadImage}
