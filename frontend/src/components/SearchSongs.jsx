// src/components/SearchSongs.jsx

import React, { useState } from "react";
import { searchSongsByTitle } from "../services/songService/searchSongsByTitle";

export default function SearchSongs() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const data = await searchSongsByTitle(query);
      setResults(data);
    } catch (err) {
      alert("Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="Search by song title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border px-3 py-2 rounded-md w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
      </form>

      {loading && <p className="mt-4">Searching...</p>}

      <div className="mt-6 space-y-4">
        {results.map((song) => (
          <div key={song._id} className="border p-4 rounded-md shadow">
            <h3 className="text-lg font-bold">{song.title}</h3>
            <audio controls src={song.audioUrl} className="w-full mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
