// src/pages/PlaylistDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPlaylistById } from "../services/playlistService";

export default function PlaylistDetails() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetchPlaylistById(id);
        setPlaylist(res.data);
      } catch (e) {
        console.error("fetch playlist error:", e.response?.data || e.message);
        setErr(e.response?.data?.error || e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <div style={{ padding: 20 }}>Loading playlist...</div>;
  if (err) return <div style={{ padding: 20, color: "red" }}>Error: {err}</div>;
  if (!playlist) return <div style={{ padding: 20 }}>Playlist not found.</div>;

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <div style={{ marginBottom: 12 }}>
        <Link to="/playlists">&larr; Back to Playlists</Link>
      </div>

      <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 12 }}>
        <div style={{ width: 160, height: 160 }}>
          {playlist.coverImage ? (
            <img src={playlist.coverImage} alt={playlist.name} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
          ) : (
            <div style={{ width: "100%", height: "100%", background: "#f2f2f2", display: "flex", alignItems: "center", justifyContent: "center" }}>
              No cover
            </div>
          )}
        </div>
        <div>
          <h2 style={{ margin: 0 }}>{playlist.name}</h2>
          <div style={{ color: "#666", marginTop: 6 }}>{playlist.songs?.length || 0} song{playlist.songs?.length === 1 ? "" : "s"}</div>
        </div>
      </div>

      <div>
        {(!playlist.songs || playlist.songs.length === 0) ? (
          <p>No songs in this playlist.</p>
        ) : (
          <ol style={{ paddingLeft: 18 }}>
            {playlist.songs.map((s) => (
              <li key={s._id} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{s.title || s.filename || "Untitled"}</div>
                    <div style={{ color: "#666", fontSize: 13 }}>{s.artist || ""}</div>
                  </div>
                  <div style={{ minWidth: 260 }}>
                    <audio controls preload="none" src={s.url || s.audio || s.path} style={{ width: "100%" }} />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
