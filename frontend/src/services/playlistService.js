// src/services/playlistService.js
import axios from "axios";

const API_BASE ="http://localhost:5000";
const BASE = `${API_BASE}/playlists`;

export const fetchPlaylists = () => axios.get(BASE);

export const createPlaylist = (formData, onUploadProgress) =>
  axios.post(`${BASE}/create`, formData, {
    onUploadProgress,
    // DO NOT set Content-Type manually — let axios set the boundary
  });

export const addSongToPlaylist = (playlistId, songId) =>
  axios.post(`${BASE}/add-song`, { playlistId, songId });

export const removeSongFromPlaylist = (playlistId, songId) =>
  axios.post(`${BASE}/remove-song`, { playlistId, songId });
