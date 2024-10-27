// src/pages/EmptyPage.js
import React from 'react';

function EmptyPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
      <div style={{ width: '45%', height: '200px', border: '1px solid #ddd' }}></div>
      <div style={{ width: '45%', height: '200px', border: '1px solid #ddd' }}></div>
    </div>
  );
}

export default EmptyPage;
