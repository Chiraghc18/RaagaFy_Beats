import axios from "axios";
const API = "http://localhost:5000";


export const fetchSongById = (id) => axios.get(`${API}/songs/${id}`);

// fetch helpers for selects
export const fetchGenres = () => axios.get(`${API}/genres`);
export const fetchArtists = () => axios.get(`${API}/artists`);
export const fetchAlbums = () => axios.get(`${API}/albums`);
export const fetchMovies = () => axios.get(`${API}/movies`);
export const fetchHeroes = () => axios.get(`${API}/heroes`);
export const fetchHeroines = () => axios.get(`${API}/heroines`);
export const fetchSingers = () => axios.get(`${API}/singers`);


