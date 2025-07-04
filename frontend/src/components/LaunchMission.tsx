// src/components/LaunchMission.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LaunchMission.css';

const LaunchMission: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [launchedMissions, setLaunchedMissions] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem('userId') || '68668fdd534fc4ead2781a3c'; // fallback if not logged in

  const handleLaunch = async () => {
    if (!prompt.trim()) {
      setError('Mission prompt cannot be empty.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await axios.post('http://localhost:5050/api/missions/launch', {
        userId,
        prompt,
      });
      setPrompt('');
      fetchLaunchedMissions();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error launching mission');
    } finally {
      setLoading(false);
    }
  };

  const fetchLaunchedMissions = async () => {
    try {
      const res = await axios.get(`http://localhost:5050/api/missions/accepted/${userId}`);
      setLaunchedMissions(res.data);
    } catch (err) {
      console.error('Error fetching launched missions:', err);
    }
  };

  useEffect(() => {
    fetchLaunchedMissions();
  }, []);

  return (
    <div className="launch-container">
      <h1>🚀 Launch a New Mission</h1>

      <textarea
        placeholder="Enter your mission prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={5}
      />

      <button onClick={handleLaunch} disabled={loading}>
        {loading ? 'Launching...' : 'Launch'}
      </button>

      {error && <div className="error">{error}</div>}

      {launchedMissions.length > 0 && (
        <div className="response">
          <h2>🛰️ Your Launched Missions</h2>
          {launchedMissions.map((mission) => (
            <div key={mission._id} style={{ marginBottom: '1.2rem' }}>
              <p>
                <strong>{mission.title}</strong>: {mission.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LaunchMission;
