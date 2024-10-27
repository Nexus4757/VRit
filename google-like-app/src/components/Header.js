// src/components/Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure this is imported
import './Header.css';

function Header() {
  const navigate = useNavigate(); // Correctly initialize useNavigate

  const handleNavigation = (modelName) => {
    // Navigate to the corresponding empty page
    navigate(`/empty-page/${modelName}`);
  };

  return (
    <div className="header">
      <h1 style={{ fontSize: '48px', margin: '0', color: '#333' }}>JustVRit</h1>
      
      <input
        type="text"
        placeholder="Search..."
        style={{
          padding: '10px',
          width: '60%',
          fontSize: '16px',
          textAlign: 'center',
          marginTop: '20px',
        }}
      />

      {/* Navigation Buttons */}
      <div className="navigation-buttons">
        <button onClick={() => handleNavigation("covid")}>
          COVID-19 Structure
        </button>
        <button onClick={() => handleNavigation("iss")}>
          ISS Space Station Experience
        </button>
        <button onClick={() => handleNavigation("Phytoplankton")}>
          Phytoplankton
        </button>
      </div>
    </div>
  );
}

export default Header;
