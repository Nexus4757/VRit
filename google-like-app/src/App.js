// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import EmptyPage from './pages/EmptyPage';
import './App.css'; // Add this import for additional styles

function App() {
  const location = useLocation();

  return (
    <div>
      {/* Render Header only on the home page */}
      {location.pathname === '/' && <Header />} 

      {/* Routes */}
      <Routes>
        <Route path="/" element={<div />} /> {/* Home route */}
        <Route path="/page" element={<EmptyPage />} />
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
