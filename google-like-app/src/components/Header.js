// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Importing the CSS file

function Header() {
  return (
    <div className="header">
      <h1 style={{ fontSize: '48px', margin: '0', color: '#333' }}>JustVRit</h1> {/* Large Text */}
      <input
        type="text"
        placeholder="Search..."
        style={{
          padding: '10px',
          width: '60%',
          fontSize: '16px',
          textAlign: 'center',
          marginTop: '20px', // Space between the title and the search bar
        }}
      />
      
      {/* Three Boxes Below the Search Bar */}
      <div className="box-container">
        <Link to="/page" className="box">
          Box 1
        </Link>
        <Link to="/page" className="box">
          Box 2
        </Link>
        <Link to="/page" className="box">
          Box 3
        </Link>
      </div>
    </div>
  );
}

export default Header;
