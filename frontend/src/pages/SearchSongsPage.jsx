import React, { useState, useEffect } from "react";
import {
  fetchSongsBySearch,
  fetchGenres,
  fetchArtists,
  fetchAlbums,
  fetchMovies,
  fetchHeroes,
  fetchHeroines,
  fetchSingers
} from "../services/songService"; // adjust path if different
import SongList from "../components/SongList";

export default  function SearchSongsPage() {
  const [filters, setFilters] = useState({
    search: "",
    genre: "",
    artist: "",
    album: "",
    movie: "",
    hero: "",
    heroine: "",
    singers: []
  });

  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [movies, setMovies] = useState([]);
  const [heroes, setHeroes] = useState([]);
  const [heroines, setHeroines] = useState([]);
  const [singers, setSingers] = useState([]);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const loadDropdowns = async () => {
      try {
        const [g, a, al, m, he, heo, si] = await Promise.all([
          fetchGenres(),
          fetchArtists(),
          fetchAlbums(),
          fetchMovies(),
          fetchHeroes(),
          fetchHeroines(),
          fetchSingers()
        ]);

        setGenres(Array.isArray(g.data) ? g.data : []);
        setArtists(Array.isArray(a.data) ? a.data : []);
        setAlbums(Array.isArray(al.data) ? al.data : []);
        setMovies(Array.isArray(m.data) ? m.data : []);
        setHeroes(Array.isArray(he.data) ? he.data : []);
        setHeroines(Array.isArray(heo.data) ? heo.data : []);
        setSingers(Array.isArray(si.data) ? si.data : []);
      } catch (err) {
        console.error("Error loading dropdowns", err);
      }
    };

    loadDropdowns();
  }, []);

  const handleSearch = async () => {
    try {
      const res = await fetchSongsBySearch(filters);
      setSongs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Search error", err);
    }
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSingerChange = (e) => {
    const values = Array.from(e.target.selectedOptions, opt => opt.value);
    setFilters({ ...filters, singers: values });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Search Songs</h1>

      <input
        type="text"
        name="search"
        placeholder="Search by name, genre, movie..."
        value={filters.search}
        onChange={handleChange}
      />

      <select name="genre" value={filters.genre} onChange={handleChange}>
        <option value="">All Genres</option>
        {genres.map(g => (
          <option key={g._id} value={g._id}>{g.name}</option>
        ))}
      </select>

      <select name="artist" value={filters.artist} onChange={handleChange}>
        <option value="">All Artists</option>
        {artists.map(a => (
          <option key={a._id} value={a._id}>{a.name}</option>
        ))}
      </select>

      <select name="album" value={filters.album} onChange={handleChange}>
        <option value="">All Albums</option>
        {albums.map(al => (
          <option key={al._id} value={al._id}>{al.name}</option>
        ))}
      </select>

      <select name="movie" value={filters.movie} onChange={handleChange}>
        <option value="">All Movies</option>
        {movies.map(m => (
          <option key={m._id} value={m._id}>{m.name}</option>
        ))}
      </select>

      <select name="hero" value={filters.hero} onChange={handleChange}>
        <option value="">All Heroes</option>
        {heroes.map(h => (
          <option key={h._id} value={h._id}>{h.name}</option>
        ))}
      </select>

      <select name="heroine" value={filters.heroine} onChange={handleChange}>
        <option value="">All Heroines</option>
        {heroines.map(h => (
          <option key={h._id} value={h._id}>{h.name}</option>
        ))}
      </select>

      <select
        multiple
        name="singers"
        value={filters.singers}
        onChange={handleSingerChange}
      >
        {singers.map(s => (
          <option key={s._id} value={s._id}>{s.name}</option>
        ))}
      </select>

      <button onClick={handleSearch}>Search</button>

      <SongList songs={songs} />
    </div>
  );
}
