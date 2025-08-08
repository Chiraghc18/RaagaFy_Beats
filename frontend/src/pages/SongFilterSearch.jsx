// src/pages/SongFilterSearchPage.jsx
import React, { useEffect, useState } from "react";
import SongFilterSearch from "../components/SongFilterSearch";
import { fetchAllFilters, fetchFilteredSongs } from "../services/songService/songFilterService";

export default function SongFilterSearchPage() {
  const [filters, setFilters] = useState({
    genre: "", artist: "", album: "", movie: "", hero: "",
    heroine: "", subgenre: "", language: "", singer: "",
  });

  const [options, setOptions] = useState({
    genres: [], artists: [], albums: [], movies: [],
    heroes: [], heroines: [], singers: [], languages: [],
  });

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadOptions = async () => {
      const data = await fetchAllFilters();
      setOptions(data);
    };
    loadOptions();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await fetchFilteredSongs(filters);
      setSongs(data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Filter Songs</h2>

      <SongFilterSearch filters={filters} options={options} handleChange={handleChange} />

      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Results:</h3>

        {loading ? (
          <p>Loading...</p>
        ) : songs.length === 0 ? (
          <p>No songs found</p>
        ) : (
          <ul className="space-y-4">
            {songs.map((song) => (
              <li
                key={song._id}
                className="border p-4 rounded shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div>
                  <h4 className="text-lg font-bold">{song.title}</h4>
                  <p className="text-sm text-gray-600">
                    Genre: {song.genre?.name}, Artist: {song.artist?.name}
                  </p>
                </div>
                <audio controls src={song.audioUrl} className="w-full md:w-72" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
