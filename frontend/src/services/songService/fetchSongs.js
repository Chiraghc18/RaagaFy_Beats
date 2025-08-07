// src/services/fetchSongs.jsx
import axios from "axios";

export default async function fetchSongs() {
  try {
    const response = await axios.get("http://localhost:5000/songs");
    return response// return data to caller
  } catch (err) {
    console.error("Failed to fetch songs:", err);
    throw err; // let caller handle errors
  }
}
