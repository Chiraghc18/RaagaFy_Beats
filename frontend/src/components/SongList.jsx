import React from "react";

export default function SongList({ songs = [], onLike }) {
  return (
    <div>
      <h2>Uploaded Songs</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {songs.map(s => (
          <li key={s._id} style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 600 }}>{s.title}</div>
            <div style={{ color: "#666", fontSize: 13 }}>
              {s.artist?.name || ""}
              {s.album?.name ? ` — ${s.album.name}` : ""}
              {s.genre?.name ? ` — ${s.genre.name}` : ""}
              {s.singers?.length ? ` — ${s.singers.map(x=>x.name).join(", ")}` : ""}
            </div>
            <div style={{ marginTop: 8 }}>
              <audio controls  src={s.audioUrl} style={{ width: "100%" }} />
            </div>
            <div style={{ marginTop: 8 }}>
              <span>Likes: {s.likes ?? 0}</span>
              {onLike && <button style={{ marginLeft: 8 }} onClick={() => onLike(s._id)}>Like</button>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
