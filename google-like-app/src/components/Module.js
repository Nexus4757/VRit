// src/components/Module.js
import React from 'react';
import './Module.css';

const Module = ({ title, iconSrc, description, onClick }) => {
  return (
    <div className="module" onClick={onClick}>
      <img src={iconSrc} alt={title} className="module-icon" />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Module;
