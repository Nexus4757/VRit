// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import EmptyPage from './pages/EmptyPage';
import './App.css'; // Add this import for additional styles
import CovidPage from './pages/CovidPage'; // New page for COVID content
import PlanktonPage from './pages/PlanktonPage'; // New page for Plankton content
import IssPage from './pages/IssPage'; // New page for ISS content
// src/App.js update
import SearchPage from './components/SearchPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/search/:query" element={<SearchPage />} />
        <Route path="/empty-page/:modelName" element={<EmptyPage />} />
        <Route path="/empty-page/covid" element={<CovidPage />} />
        <Route path="/empty-page/plankton" element={<PlanktonPage />} />
        <Route path="/empty-page/iss" element={<IssPage />} />
      </Routes>
    </Router>
  );
}

export default App;
