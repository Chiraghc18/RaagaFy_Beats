// src/services/uploadSong.js
import axios from "axios";

export default async function uploadSong(file, onProgress) {
  if (!file) throw new Error("No file provided");

  const formData = new FormData();
  formData.append("audio", file);

  return axios.post("http://localhost:5000/songs/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(percent);
      }
    },
  });
}
