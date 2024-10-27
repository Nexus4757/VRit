// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import EmptyPage from './pages/EmptyPage';
import './App.css'; // Add this import for additional styles
import CovidPage from './pages/CovidPage'; // New page for COVID content
import CoordinateSystemPage from './pages/PlanktonPage'; // New page for Plankton content
import IssPage from './pages/IssPage'; // New page for ISS content

function App() {
  const location = useLocation();

  return (
    <div>
      {/* Render Header only on the home page */}
      {location.pathname === '/' && <Header />} 

      {/* Routes */}
      <Routes>
        <Route path="/" element={<div />} /> {/* Home route */}
        <Route path="/empty-page" element={<EmptyPage />} />
        <Route path="/empty-page/covid" element={<CovidPage />} />
        <Route path="/empty-page/coordinate" element={<CoordinateSystemPage />} />
        <Route path="/empty-page/iss" element={<IssPage />} />
      </Routes>
    </div>
  );
}

// Wrap App in Router
const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
