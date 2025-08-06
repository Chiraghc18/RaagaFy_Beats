// src/components/UploadArtist.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function UploadArtist() {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [artists, setArtists] = useState([]);
  const fileInputRef = useRef(null);

  const fetchArtists = async () => {
    try {
      const res = await axios.get("http://localhost:5000/artists");
      setArtists(res.data);
    } catch (err) {
      console.error("Fetch artists error:", err);
    }
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !photo) {
      alert("Please provide name and photo");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("photo", photo);

    try {
      await axios.post("http://localhost:5000/artists/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setName("");
      setPhoto(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchArtists();
    } catch (err) {
      console.error("Upload error:", err);
      alert(err.response?.data?.error || err.response?.data?.message || "Error uploading artist");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload Artist</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Artist Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ margin: "10px 0", padding: "8px" }}
        />
        <br />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
        <br />
        <button type="submit" style={{ marginTop: "10px" }}>
          Upload
        </button>
      </form>

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
              style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }}
            />
            <p>{artist.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
