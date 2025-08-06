import axios from 'axios';
import { API_URL } from '../config';

export const fetchSongs = () => axios.get(`${API_URL}/songs`);

export const uploadSong = (formData, onUploadProgress) =>
  axios.post(`${API_URL}/songs/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress,
  });
