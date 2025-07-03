// src/pages/LaunchMission.tsx
import React, { useState } from 'react';
import axios from 'axios';

const LaunchMission: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const userId = '68668fdd534fc4ead2781a3c'; // Replace with actual userId logic

  const handleLaunch = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:5050/api/missions/launch', {
        userId,
        prompt,
      });
      setResponse(res.data.mission);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🚀 Launch a Mission</h1>
      <textarea
        rows={4}
        placeholder="Enter your mission prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: '100%', padding: '1rem' }}
      />
      <button onClick={handleLaunch} disabled={loading}>
        {loading ? 'Launching...' : 'Launch Mission'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

      {response && (
        <div style={{ marginTop: '2rem' }}>
          <h2>{response.title}</h2>
          <p>{response.description}</p>
        </div>
      )}
    </div>
  );
};

export default LaunchMission;
