import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const API_URL = "https://ragafy-backend.onrender.com";

export default function SongManager() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Option 1: Load generic songs on mount (Optional)
  useEffect(() => {
    fetchRecentSongs();
  }, []);

  const fetchRecentSongs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/songs`); // Fetches all/recent
      setResults(res.data.slice(0, 10)); // Show top 10 recent
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return fetchRecentSongs();

    try {
      setLoading(true);
      setMessage("");
      // Using your existing search route
      const res = await axios.get(`${API_URL}/songs/search/title?title=${query}`);
      setResults(res.data);
      
      if (res.data.length === 0) setMessage("No songs found.");
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      setMessage("Error searching songs.");
    }
  };

  return (
    <div className="manager-container">
      <div className="manager-header">
        <h1>Song Manager</h1>
        <p>Search for a song to update its details.</p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="manager-search-box">
        <input
          type="text"
          placeholder="Search by song title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Results List */}
      <div className="manager-results">
        {loading ? (
          <div className="loading-spinner">Searching...</div>
        ) : (
          <>
            {message && <p className="no-results">{message}</p>}
            
            {results.map((song) => (
              <div key={song._id} className="manager-card">
                <div className="manager-card-info">
                  <h3>{song.title}</h3>
                  <span className="meta-info">
                    {song.album?.name || "Single"} • {song.language?.name || "Unknown Language"}
                  </span>
                </div>
                
                <div className="manager-card-actions">
                  <Link to={`/edit-song/${song._id}`} className="edit-btn">
                    Edit ✏️
                  </Link>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}