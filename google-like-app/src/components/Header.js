import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const placeholderTexts = ["astrophysics", "disease prevention", "phytoplankton"];

function Header() {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 150;
  const deletingSpeed = 100;
  const pauseDuration = 1500;

  useEffect(() => {
    const currentText = placeholderTexts[index];
    
    const timer = setTimeout(() => {
      if (isDeleting) {
        // Remove character
        setDisplayText(prev => prev.slice(0, -1));
        
        // When done deleting, move to next word
        if (displayText.length === 1) {
          setIsDeleting(false);
          setIndex((prevIndex) => (prevIndex + 1) % placeholderTexts.length);
        }
      } else {
        // Add character
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          // Word is complete, pause then start deleting
          setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index]);

  return (
    <div className="header">
      <h1 style={{ fontSize: '96px', margin: '20px', color: '#4285F4' }}><span style={{ color: '#EA4335' }}>J</span>u<span style={{ color: '#FBBC04' }}>s</span><span style={{ color: '#EA4335' }}>t</span>V<span style={{ color: '#FBBC04' }}>R</span><span style={{ color: '#EA4335' }}>i</span>t</h1>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          placeholder={displayText}
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
        <Link to="/page">
          <button style={{
            padding: '15px',
            fontSize: '18px',
            backgroundColor: '#4285F4',
            color: 'white',
            border: '2px black solid',
            borderRadius: '0px 50px 50px 0px',
            borderLeftWidth: '0px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}>
            Go
          </button>
        </Link>
      </div>
      
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