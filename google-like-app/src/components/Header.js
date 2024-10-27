// src/components/Header.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const placeholderTexts = ["astrophysics", "disease prevention", "phytoplankton"];

function Header() {
  const [displayText, setDisplayText] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 150;
  const deletingSpeed = 100;
  const pauseDuration = 1500;
  const navigate = useNavigate();

  useEffect(() => {
    const currentText = placeholderTexts[index];
    
    const timer = setTimeout(() => {
      if (isDeleting) {
        setDisplayText((prev) => prev.slice(0, -1));
        
        if (displayText.length === 0) {
          setIsDeleting(false);
          setIndex((prevIndex) => (prevIndex + 1) % placeholderTexts.length);
        }
      } else {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);
    
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search/${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const handleNavigation = (modelName) => {
    navigate(`/empty-page/${modelName}`);
  };

  return (
    <div className="header">
      <h1 style={{ fontSize: '96px', margin: '20px', color: '#4285F4' }}>
        <span style={{ color: '#EA4335' }}>J</span>u
        <span style={{ color: '#FBBC04' }}>s</span>
        <span style={{ color: '#EA4335' }}>t</span>V
        <span style={{ color: '#FBBC04' }}>R</span>
        <span style={{ color: '#EA4335' }}>i</span>t
      </h1>
      <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          placeholder={displayText}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{
            padding: '15px',
            width: '500px',
            fontSize: '18px',
            borderRadius: '50px 0px 0px 50px',
            textAlign: 'center',
            border: '2px black solid',
            borderRightWidth: '0px',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '15px',
            fontSize: '18px',
            backgroundColor: '#4285F4',
            color: 'white',
            border: '2px black solid',
            borderRadius: '0px 50px 50px 0px',
            borderLeftWidth: '0px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
        >
          Go
        </button>
      </form>

      <div className="navigation-buttons">
        <button onClick={() => handleNavigation("covid")}>
          COVID-19 Structure
        </button>
        <button onClick={() => handleNavigation("iss")}>
          ISS Space Station Experience
        </button>
        <button onClick={() => handleNavigation("plankton")}>
          3D Coordinate Systems
        </button>
      </div>
    </div>
  );
}

export default Header;