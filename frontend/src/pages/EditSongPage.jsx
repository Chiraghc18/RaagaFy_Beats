import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchSongById,
  updateSongDetails,
  fetchGenres, fetchArtists, fetchAlbums, fetchMovies,
  fetchHeroes, fetchHeroines, fetchSingers, fetchLanguages,
} from "../services/songService/songService";

export default function EditSongPage() {
  const { id } = useParams(); // Get song ID from URL
  const navigate = useNavigate();

  // Form States
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [subgenre, setSubgenre] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [movie, setMovie] = useState("");
  const [hero, setHero] = useState("");
  const [heroine, setHeroine] = useState("");
  const [language, setLanguage] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [selectedSingers, setSelectedSingers] = useState([]);

  // Dropdown Data States
  const [genres, setGenres] = useState([]);
  const [subgenres, setSubgenres] = useState([]);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [movies, setMovies] = useState([]);
  const [heroes, setHeroes] = useState([]);
  const [heroines, setHeroines] = useState([]);
  const [singersList, setSingersList] = useState([]);
  const [languages, setLanguages] = useState([]);

  // Load all dropdown data
  useEffect(() => {
    fetchGenres().then(r => setGenres(r.data || [])).catch(console.error);
    fetchArtists().then(r => setArtists(r.data || [])).catch(console.error);
    fetchAlbums().then(r => setAlbums(r.data || [])).catch(console.error);
    fetchMovies().then(r => setMovies(r.data || [])).catch(console.error);
    fetchHeroes().then(r => setHeroes(r.data || [])).catch(console.error);
    fetchHeroines().then(r => setHeroines(r.data || [])).catch(console.error);
    fetchSingers().then(r => setSingersList(r.data || [])).catch(console.error);
    fetchLanguages().then(r => setLanguages(r.data || [])).catch(console.error);
  }, []);

  // Load the specific song data
  useEffect(() => {
    if (!id) return;
    fetchSongById(id).then((res) => {
      const song = res.data;
      setTitle(song.title || "");
      // Check if populated object or just ID
      setGenre(song.genre?._id || song.genre || "");
      setSubgenre(song.subgenre?._id || song.subgenre || "");
      setArtist(song.artist?._id || song.artist || "");
      setAlbum(song.album?._id || song.album || "");
      setMovie(song.movie?._id || song.movie || "");
      setHero(song.hero?._id || song.hero || "");
      setHeroine(song.heroine?._id || song.heroine || "");
      setLanguage(song.language?._id || song.language || "");

      // Format Date for Input
      if (song.releaseDate) {
        setReleaseDate(new Date(song.releaseDate).toISOString().split("T")[0]);
      }

      // Handle Singers Array
      if (song.singers && song.singers.length > 0) {
        setSelectedSingers(song.singers.map(s => s._id || s));
      }
    }).catch(err => console.error("Error loading song:", err));
  }, [id]);

  const toggleSinger = (singerId) => {
    setSelectedSingers(prev =>
      prev.includes(singerId) ? prev.filter(s => s !== singerId) : [...prev, singerId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updates = {
      title, genre, subgenre, artist, album, movie,
      hero, heroine, language, releaseDate,
      singers: selectedSingers
    };

    try {
      await updateSongDetails(id, updates);
      alert("Song updated successfully!");
      navigate("/"); // Redirect to Home after save
    } catch (err) {
      console.error(err);
      alert("Failed to update song.");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>
      <h2>Edit Song Details</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Title */}
        <div style={styles.field}>
          <label>Title:</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required style={styles.input}/>
        </div>

        {/* Release Date */}
        <div style={styles.field}>
          <label>Release Date:</label>
          <input type="date" value={releaseDate} onChange={e => setReleaseDate(e.target.value)} style={styles.input}/>
        </div>

        {/* Genre */}
        <div style={styles.field}>
          <label>Genre:</label>
          <select value={genre} onChange={e => setGenre(e.target.value)} style={styles.input}>
            <option value="">Select Genre</option>
            {genres.map(g => <option key={g._id} value={g._id}>{g.name}</option>)}
          </select>
        </div>

        {/* Artist */}
        <div style={styles.field}>
          <label>Artist (Music Director):</label>
          <select value={artist} onChange={e => setArtist(e.target.value)} style={styles.input}>
            <option value="">Select Artist</option>
            {artists.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
          </select>
        </div>

        {/* Album */}
        <div style={styles.field}>
          <label>Album:</label>
          <select value={album} onChange={e => setAlbum(e.target.value)} style={styles.input}>
            <option value="">Select Album</option>
            {albums.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
          </select>
        </div>

        {/* Movie */}
        <div style={styles.field}>
          <label>Movie:</label>
          <select value={movie} onChange={e => setMovie(e.target.value)} style={styles.input}>
            <option value="">Select Movie</option>
            {movies.map(m => <option key={m._id} value={m._id}>{m.name || m.title}</option>)}
          </select>
        </div>

        {/* Hero */}
        <div style={styles.field}>
          <label>Hero:</label>
          <select value={hero} onChange={e => setHero(e.target.value)} style={styles.input}>
            <option value="">Select Hero</option>
            {heroes.map(h => <option key={h._id} value={h._id}>{h.name}</option>)}
          </select>
        </div>

        {/* Heroine */}
        <div style={styles.field}>
          <label>Heroine:</label>
          <select value={heroine} onChange={e => setHeroine(e.target.value)} style={styles.input}>
            <option value="">Select Heroine</option>
            {heroines.map(h => <option key={h._id} value={h._id}>{h.name}</option>)}
          </select>
        </div>

        {/* Language */}
        <div style={styles.field}>
          <label>Language:</label>
          <select value={language} onChange={e => setLanguage(e.target.value)} style={styles.input}>
            <option value="">Select Language</option>
            {languages.map(l => <option key={l._id} value={l._id}>{l.name}</option>)}
          </select>
        </div>

        {/* Singers (Multi-select) */}
        <div style={styles.field}>
          <label>Singers:</label>
          <div style={{ maxHeight: 150, overflowY: "auto", border: "1px solid #ccc", padding: 5 }}>
            {singersList.map(s => (
              <div key={s._id}>
                <label>
                  <input 
                    type="checkbox" 
                    checked={selectedSingers.includes(s._id)} 
                    onChange={() => toggleSinger(s._id)}
                  /> {s.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>Save Changes</button>
        <button type="button" onClick={() => navigate("/")} style={{ marginLeft: 10 }}>Cancel</button>
      </form>
    </div>
  );
}

const styles = {
  field: { marginBottom: 15 },
  input: { width: "100%", padding: 8, marginTop: 5 }
};