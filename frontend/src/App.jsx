// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UploadArtistPage from "./pages/UploadArtistPage";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Main music upload/player page */}
        <Route path="/" element={<HomePage />} />

        {/* Artist upload page */}
        <Route path="/artists" element={<UploadArtistPage />} />

        {/* 404 fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
