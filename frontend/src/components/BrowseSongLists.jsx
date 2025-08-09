import React from "react";

export default function BrowseSongLists({ songs }) {
  return (
    <div className="browse-song-list">
      {songs.map((song) => (
        <div key={song._id} className="song-card">
          <h6 className="song-title">{song.title}</h6>
          <audio controls src={song.audioUrl} className="song-audio" />
        </div>
      ))}
    </div>
  );
}
