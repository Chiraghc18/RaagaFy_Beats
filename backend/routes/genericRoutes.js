// routes/genericRoutes.js
const express = require("express");
const { uploadImage } = require("../middlewares/uploadImage");

function createRoutes(controller) {
  const router = express.Router();

  router.post("/upload", uploadImage.single("photo"), controller.upload);
  router.get("/", controller.getAll);

  return router;
}

module.exports = createRoutes;
