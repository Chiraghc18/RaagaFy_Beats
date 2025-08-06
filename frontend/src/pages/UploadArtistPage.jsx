// src/pages/UploadArtistPage.jsx
import React, { useState, useEffect } from "react";
import ProgressBar from "../components/ProgressBar";
import { fetchArtists, uploadArtist } from "../services/artistService";
import useUpload from "../hooks/useUpload";

export default function UploadArtistPage() {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [artists, setArtists] = useState([]);

  const loadArtists = async () => {
    try {
      const res = await fetchArtists();
      setArtists(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadArtists();
  }, []);

  const { progress, isUploading, handleUpload } = useUpload(uploadArtist, loadArtists);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !photo) return alert("Please provide name and photo");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("photo", photo);
    handleUpload(formData);
    setName("");
    setPhoto(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload Artist</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Artist Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ margin: "10px 0", padding: "8px" }}
        />
        <br />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
        <br />
        <button type="submit" style={{ marginTop: "10px" }} disabled={isUploading}>
          Upload
        </button>
      </form>

      <ProgressBar progress={progress} />
      {isUploading && progress === 100 && <p>Processing on server...</p>}

      <h3 style={{ marginTop: "20px" }}>Artists</h3>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {artists.map((artist) => (
          <div
            key={artist._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "5px",
              textAlign: "center",
            }}
          >
            <img
              src={artist.photo}
              alt={artist.name}
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
            <p>{artist.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
