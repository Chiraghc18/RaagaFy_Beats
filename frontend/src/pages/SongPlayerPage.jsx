import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function SongPlayerPage() {
  const location = useLocation();
  const { songs = [], startIndex = 0 } = location.state || {};
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const audioRef = useRef(null);

  const currentSong = songs[currentIndex];

  const handleSongEnd = () => {
    if (currentIndex < songs.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < songs.length - 1 ? prev + 1 : 0));
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : songs.length - 1));
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        console.log("Autoplay blocked");
      });
    }
  }, [currentIndex]);

  if (!songs.length) return <p>No songs provided</p>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-2">{currentSong.title}</h2>
      <p><strong>Artist:</strong> {currentSong.artist?.name || "Unknown"}</p>
      <p><strong>Album:</strong> {currentSong.album?.name || "Unknown"}</p>
      <p><strong>Genre:</strong> {currentSong.genre?.name || "Unknown"}</p>
      <p><strong>Singers:</strong> {currentSong.singers?.map(s => s.name).join(", ") || "N/A"}</p>

      {/* Audio Player */}
      <audio
        ref={audioRef}
        src={currentSong.audioUrl}
        controls
        autoPlay
        onEnded={handleSongEnd}
        className="w-full mt-4"
      />

      {/* Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevious}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          ◀ Previous
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next ▶
        </button>
      </div>

      {/* Song List */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Playlist</h3>
        {songs.map((song, idx) => (
          <button
            key={song._id}
            onClick={() => setCurrentIndex(idx)}
            className={`block w-full text-left p-2 rounded ${
              idx === currentIndex
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {song.title}
          </button>
        ))}
      </div>
    </div>
  );
}
