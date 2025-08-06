import React from 'react';

const SongList = ({ songs }) => (
  <div>
    <h2>Uploaded Songs</h2>
    <ul>
      {songs.map((song) => (
        <li key={song._id} style={{ marginBottom: '10px' }}>
          <audio controls src={song.url} />
        </li>
      ))}
    </ul>
  </div>
);

export default SongList;
