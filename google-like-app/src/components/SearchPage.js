// src/components/Header.js
// [Previous Header.js code remains exactly the same]

// src/components/SearchPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SearchPage() {
  const { query } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const limitSentences = (text, limit = 5) => {
    // Match sentences that end with period, exclamation mark, or question mark
    // followed by a space or end of string
    const sentences = text.match(/[^.!?]+[.!?](?:\s|$)/g) || [];
    return sentences.slice(0, limit).join('').trim();
  };

  useEffect(() => {
    const fetchWikipediaContent = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://en.wikipedia.org/w/api.php?` +
          `action=query&format=json&prop=extracts&exintro=true&explaintext=true&` +
          `titles=${encodeURIComponent(query)}&origin=*`
        );

        const data = await response.json();
        const pages = data.query.pages;
        const pageContent = Object.values(pages)[0];

        if (pageContent.missing) {
          setError('No Wikipedia article found for this topic.');
        } else {
          const limitedContent = limitSentences(pageContent.extract);
          setContent(limitedContent);
        }
      } catch (err) {
        setError('Failed to fetch Wikipedia content.');
      } finally {
        setLoading(false);
      }
    };

    fetchWikipediaContent();
  }, [query]);

  return (
    <div className="search-page" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
      <h1 style={{ color: '#4285F4' }}>{query}</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: '#EA4335' }}>{error}</p>}
      {content && <p style={{ lineHeight: '1.6' }}>{content}</p>}
    </div>
  );
}

export default SearchPage;

// src/App.js
// [Previous App.js code remains exactly the same]