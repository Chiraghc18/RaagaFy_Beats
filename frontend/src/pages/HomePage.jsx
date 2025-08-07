import React, { useEffect, useState } from "react";
import FileUploader from "../components/FileUploader";
import SongList from "../components/SongList";
import ProgressBar from "../components/ProgressBar";
import fetchSongs  from "../services/songService/fetchSongs.js";

import {uploadSong} from "../services/songService/uploadSong.js"
export default function HomePage() {
  const [songs, setSongs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => { loadSongs(); }, []);

  async function loadSongs() {
    try {
  const res = await fetchSongs();
  const data = res.data || [];

  // copy + reverse (doesn't mutate original array)
  const reversed = data.slice().reverse(); // or [...data].reverse()
  setSongs(reversed);
} catch (err) {
  console.error("loadSongs error:", err);
}
  }

  const handleUpload = async (file, meta = {}) => {
    try {
      setIsUploading(true);
      setProgress(0);
      await uploadSong(file, meta, (event) => {
        if (!event.total) return;
        setProgress(Math.round((event.loaded * 100) / event.total));
      });
      setIsUploading(false);
      setProgress(0);
      loadSongs();
      alert("Song uploaded");
    } catch (err) {
      console.error("upload error:", err.response?.data || err.message);
      setIsUploading(false);
      setProgress(0);
      alert("Upload failed");
    }
  };

  const handleLike = async (songId) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/songs/${songId}/like`, { method: "POST" });
      loadSongs();
    } catch (err) {
      console.error("like error", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Upload Song</h1>

      <FileUploader onUpload={handleUpload} />

      <ProgressBar progress={progress} />
      {isUploading && progress === 100 && <div>Processing on server...</div>}

      <SongList songs={songs} onLike={handleLike} />
    </div>
  );
}
