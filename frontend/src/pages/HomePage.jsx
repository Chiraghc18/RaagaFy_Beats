import React, { useState, useEffect } from "react";
import SongList from "../components/SongList";
import fetchSongs from "../services/fetchSongs";
import uploadSong from "../services/uploadSong";
import ProgressBar from "../components/ProgressBar";

const HomePage = () => {
  const [file, setFile] = useState(null);
  const [songs, setSongs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    loadSongs();
  }, []);

  const loadSongs = async () => {
    try {
      const data = await fetchSongs();
      setSongs(data);
    } catch {}
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an MP3 file");
      return;
    }

    try {
      setIsUploading(true);
      setProgress(0);

      await uploadSong(file, (percent) => setProgress(percent));

      alert("Upload successful!");
      setFile(null);
      setProgress(0);
      setIsUploading(false);
      loadSongs();
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
      alert("Upload failed!");
      setProgress(0);
      setIsUploading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>MP3 Upload & Play</h1>
      <input
        type="file"
        accept="audio/mpeg"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload} disabled={isUploading}>
        {isUploading ? "Uploading..." : "Upload"}
      </button>

      <ProgressBar progress={progress} />

      {isUploading && progress === 100 && (
        <p style={{ marginTop: "10px", color: "gray" }}>
          Processing on server...
        </p>
      )}

      <SongList songs={songs} />
    </div>
  );
};

export default HomePage;
