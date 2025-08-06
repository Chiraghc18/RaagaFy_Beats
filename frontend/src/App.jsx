// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";

import UploadResourcePage from "./pages/UploadResourcePage";

import UploadAlbumPage from "./pages/UploadAlbumPage";

import UploadSubgenrePage from "./components/UploadSubgenrePage";
export default function App() {
  return (
    <Router>
      <Routes>
        {/* Main music upload/player page */}
        <Route path="/" element={<HomePage />} />

        <Route path="/artists" element={<UploadResourcePage resource="artists" title="Artists" />} />
        <Route path="/heroes" element={<UploadResourcePage resource="heroes" title="Heroes" />} />
        <Route path="/heroines" element={<UploadResourcePage resource="heroines" title="Heroines" />} />
        <Route path="/movies" element={<UploadResourcePage resource="movies" title="Movies" />} />
        <Route path="/genres" element={<UploadResourcePage resource="genres" title="genres" />} />

        <Route path="/albums" element={<UploadAlbumPage/>} />
        <Route path="/subgenre" element={<UploadSubgenrePage/>} />
        {/* 404 fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
