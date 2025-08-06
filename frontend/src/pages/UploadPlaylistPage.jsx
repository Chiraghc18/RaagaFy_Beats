// src/pages/UploadPlaylistPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  fetchPlaylists,
  createPlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
} from "../services/playlistService";
import ProgressBar from "../components/ProgressBar";

export default function UploadPlaylistPage() {
  const [name, setName] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [songs, setSongs] = useState([]); // all songs available
  const [selectedSongs, setSelectedSongs] = useState([]); // selected while creating
  const [playlists, setPlaylists] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_SONGS = ( "http://localhost:5000") + "/songs";

  useEffect(() => {
    fetchSongs();
    loadPlaylists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchSongs() {
    try {
      const res = await axios.get(API_SONGS);
      setSongs(res.data || []);
    } catch (err) {
      console.error("fetchSongs error:", err);
      setSongs([]);
    }
  }

  async function loadPlaylists() {
    try {
      setLoading(true);
      const res = await fetchPlaylists();
      setPlaylists(res.data || []);
    } catch (err) {
      console.error("loadPlaylists error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleSongToggle = (songId) => {
    setSelectedSongs((prev) => (prev.includes(songId) ? prev.filter((id) => id !== songId) : [...prev, songId]));
  };

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    if (!name) return alert("Playlist name is required");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("isBuiltIn", false);
    selectedSongs.forEach((id) => formData.append("songs", id)); // repeated keys
    if (coverImage) formData.append("coverImage", coverImage);

    try {
      setIsUploading(true);
      setProgress(0);

      await createPlaylist(formData, (event) => {
        if (!event.total) return;
        const percent = Math.round((event.loaded * 100) / event.total);
        setProgress(percent);
      });

      // success
      setName("");
      setCoverImage(null);
      setSelectedSongs([]);
      setProgress(0);
      setIsUploading(false);
      loadPlaylists();
      alert("Playlist created");
    } catch (err) {
      console.error("createPlaylist error:", err.response?.data || err.message);
      alert("Error creating playlist: " + (err.response?.data?.error || err.message));
      setIsUploading(false);
      setProgress(0);
    }
  };

  const handleAddSong = async (playlistId, songId) => {
    try {
      await addSongToPlaylist(playlistId, songId);
      loadPlaylists();
    } catch (err) {
      console.error("addSong error:", err.response?.data || err.message);
      alert("Error adding song");
    }
  };

  const handleRemoveSong = async (playlistId, songId) => {
    try {
      await removeSongFromPlaylist(playlistId, songId);
      loadPlaylists();
    } catch (err) {
      console.error("removeSong error:", err.response?.data || err.message);
      alert("Error removing song");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 1100, margin: "0 auto" }}>
      <h2>Create Playlist</h2>

      <form onSubmit={handleCreatePlaylist} style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 8 }}>
          <input
            type="text"
            placeholder="Playlist Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: 8, width: 320 }}
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label style={{ display: "block", marginBottom: 6 }}>Cover Image (optional)</label>
          <input type="file" accept="image/*" onChange={(e) => setCoverImage(e.target.files[0] || null)} />
        </div>

        <div style={{ marginBottom: 12 }}>
          <strong>Select Songs</strong>
          <div style={{ maxHeight: 200, overflowY: "auto", border: "1px solid #ddd", padding: 10, marginTop: 8 }}>
            {songs.length === 0 && <div>No songs available</div>}
            {songs.map((s) => (
              <label key={s._id} style={{ display: "block", marginBottom: 6 }}>
                <input
                  type="checkbox"
                  checked={selectedSongs.includes(s._id)}
                  onChange={() => handleSongToggle(s._id)}
                />
                <span style={{ marginLeft: 8 }}>{s.title || s.filename || s._id}</span>
              </label>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button type="submit" disabled={isUploading} style={{ padding: "8px 12px" }}>
            {isUploading ? "Creating..." : "Create Playlist"}
          </button>
          <ProgressBar progress={progress} />
        </div>
      </form>

      <h3>Playlists</h3>
      {loading ? (
        <p>Loading playlists...</p>
      ) : playlists.length === 0 ? (
        <p>No playlists yet.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
          {playlists.map((pl) => (
            <div
              key={pl._id}
              style={{
                border: "1px solid #ddd",
                padding: 12,
                borderRadius: 8,
                background: "#fff",
                display: "flex",
                flexDirection: "column",
                minHeight: 300,
              }}
            >
              {/* Clickable area: cover + title link to details page */}
              <Link to={`/playlists/${pl._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{ cursor: "pointer" }}>
                  <div style={{ height: 140, marginBottom: 8 }}>
                    {pl.coverImage ? (
                      <img src={pl.coverImage} alt={pl.name} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 6 }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", background: "#f2f2f2", display: "flex", alignItems: "center", justifyContent: "center", color: "#888", borderRadius: 6 }}>
                        No cover
                      </div>
                    )}
                  </div>

                  <div style={{ marginBottom: 8 }}>
                    <strong>{pl.name}</strong>
                  </div>
                </div>
              </Link>

              <div style={{ marginTop: "auto" }}>
                <ul style={{ paddingLeft: 18, margin: "8px 0" }}>
                  {(pl.songs || []).length === 0 && <li style={{ color: "#666" }}>No songs</li>}
                  {(pl.songs || []).slice(0, 3).map((s) => (
                    <li key={s._id} style={{ color: "#333" }}>{s.title || s.filename || s._id}</li>
                  ))}
                  {(pl.songs || []).length > 3 && <li style={{ color: "#666" }}>+{(pl.songs || []).length - 3} more</li>}
                </ul>

                <AddSongToPlaylistBlock songs={songs} playlist={pl} onAdd={handleAddSong} onRemove={handleRemoveSong} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Small sub-component to add/remove songs from a playlist.
 * - songs: global songs list
 * - playlist: playlist object
 * - onAdd(playlistId, songId)
 * - onRemove(playlistId, songId)
 */
function AddSongToPlaylistBlock({ songs, playlist, onAdd, onRemove }) {
  const [selected, setSelected] = useState("");
  useEffect(() => setSelected(""), [playlist._id]);

  const available = songs.filter((s) => !playlist.songs?.some((ps) => ps._id === s._id));

  return (
    <div style={{ marginTop: 10 }}>
      {available.length === 0 ? (
        <div style={{ color: "#666", fontSize: 13 }}>No songs to add</div>
      ) : (
        <>
          <select value={selected} onChange={(e) => setSelected(e.target.value)} style={{ width: "100%", padding: 6 }}>
            <option value="">Add song...</option>
            {available.map((s) => (
              <option key={s._id} value={s._id}>
                {s.title || s.filename || s._id}
              </option>
            ))}
          </select>
          <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
            <button
              onClick={() => {
                if (!selected) return alert("Select a song to add");
                onAdd(playlist._id, selected);
                setSelected("");
              }}
              style={{ padding: "6px 8px" }}
            >
              Add
            </button>
            {/* quick remove buttons for the first few songs */}
            <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
              {(playlist.songs || []).slice(0, 2).map((s) => (
                <button
                  key={s._id}
                  onClick={() => {
                    if (!window.confirm(`Remove "${s.title || s.filename || s._id}" from "${playlist.name}"?`)) return;
                    onRemove(playlist._id, s._id);
                  }}
                  style={{ padding: "4px 6px" }}
                  title="Remove song"
                >
                  −
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
