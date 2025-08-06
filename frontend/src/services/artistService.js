// src/services/artistService.js
import axios from "axios";

export const fetchArtists = () => axios.get("http://localhost:5000/artists");

export const uploadArtist = (formData, onUploadProgress) =>
  axios.post("http://localhost:5000/artists/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress,
  });
