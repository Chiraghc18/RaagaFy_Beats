// src/pages/BrowseByCategoryPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

const categoryApiMap = {
  genre: "/genres",
  subgenre: "/subgenres",
  artist: "/artists",
  album: "/albums",
  movie: "/movies",
  hero: "/heroes",
  heroine: "/heroines",
  language: "/languages",
  singer: "/singers",
};

export default function BrowseByCategoryPage() {
  const [category, setCategory] = useState("");
  const [items, setItems] = useState([]);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all items for the selected category
  useEffect(() => {
    if (!category) return;
    setSongs([]); // clear songs
    axios.get(`${BASE_URL}${categoryApiMap[category]}`)
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
  }, [category]);

  // Fetch songs under selected item
  const handleItemClick = async (itemId) => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/songs/browse/${category}/${itemId}`);
      setSongs(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Browse Songs by Category</h1>

      {/* Step 1: Select category */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border px-3 py-2 rounded mb-4"
      >
        <option value="">-- Select Category --</option>
        {Object.keys(categoryApiMap).map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Step 2: Show items */}
      {category && items.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {items.map(item => (
            <button
              key={item._id}
              onClick={() => handleItemClick(item._id)}
              className="border p-3 rounded shadow hover:bg-gray-100 cursor-pointer"
            >
              {item.name}
            </button>
          ))}
        </div>
      )}

      {/* Step 3: Show songs */}
      {loading && <p>Loading songs...</p>}
      {songs.length > 0 && (
        <div className="space-y-4">
          {songs.map(song => (
            <div key={song._id} className="border p-4 rounded shadow">
              <h3 className="font-bold">{song.title}</h3>
              <audio controls src={song.audioUrl} className="w-full mt-2" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
