import axios from "axios";
const API =  "http://localhost:5000";

export const fetchSongs = () => axios.get(`${API}/songs`);
export const uploadSong = (file, meta = {}, onUploadProgress) => {
  const formData = new FormData();
  formData.append("audio", file);
  Object.entries(meta || {}).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    if (Array.isArray(v)) {
      v.forEach(val => formData.append(k, val));
    } else {
      formData.append(k, v);
    }
  });
  return axios.post(`${API}/songs/upload`, formData, { onUploadProgress });
};

// fetch helpers for selects
export const fetchGenres = () => axios.get(`${API}/genres`);
export const fetchArtists = () => axios.get(`${API}/artists`);
export const fetchAlbums = () => axios.get(`${API}/albums`);
export const fetchMovies = () => axios.get(`${API}/movies`);
export const fetchHeroes = () => axios.get(`${API}/heroes`);
export const fetchHeroines = () => axios.get(`${API}/heroines`);
export const fetchSingers = () => axios.get(`${API}/singers`);
