// src/components/SearchPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { OpenAI } from 'openai';

// Initialize OpenAI client only once at the top
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

function SearchPage() {
  const { query } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studyMaterials, setStudyMaterials] = useState(null);

  const limitSentences = (text, limit = 5) => {
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
          generateStudyMaterials(limitedContent);  // Call the function to generate study materials
        }
      } catch (err) {
        setError('Failed to fetch Wikipedia content.');
      } finally {
        setLoading(false);
      }
    };

    const generateStudyMaterials = async (text) => {
        try {
          const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
              { role: 'system', content: 'Generate study material.' },
              {
                role: 'user',
                content: `Create two key points about the following topic and provide easy and hard study questions (two of each):\n\n${text}`,
              },
            ],
          });
      
          // Replace newlines with <br /> tags for rendering
          const generatedText = response.choices[0].message.content.replace(/\n/g, '<br />');
          setStudyMaterials(generatedText);
        } catch (err) {
          setError('Failed to generate study materials.');
        }
      };

    fetchWikipediaContent();
  }, [query]);

  return (
    <div className="search-page" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#4285F4' }}>{query}</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: '#EA4335' }}>{error}</p>}
      {content && <p style={{ lineHeight: '1.6' }}>{content}</p>}
      {studyMaterials && (
        <div style={{ marginTop: '20px', lineHeight: '1.6' }}>
          <h2>Study Materials</h2>
          <div dangerouslySetInnerHTML={{ __html: studyMaterials }} />
        </div>
      )}
    </div>
  );
}

export default SearchPage;
