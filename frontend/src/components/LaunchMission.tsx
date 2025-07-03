// src/components/LaunchMission.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LaunchMission: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [launchedMissions, setLaunchedMissions] = useState<any[]>([]);
  const [error, setError] = useState('');
  const userId = '68668fdd534fc4ead2781a3c'; // Replace with dynamic ID if needed

  const handleLaunch = async () => {
    try {
      const res = await axios.post('http://localhost:5050/api/missions/launch', {
        userId,
        prompt,
      });
      setPrompt('');
      fetchLaunchedMissions(); // Refresh after launch
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error launching mission');
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
    <div>
      <h2>Launch a New Mission</h2>
      <textarea
        placeholder="Enter your mission prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        cols={50}
      />
      <br />
      <button onClick={handleLaunch}>Launch</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h3>My Launched Missions</h3>
      <ul>
        {launchedMissions.map((mission) => (
          <li key={mission._id}>
            <strong>{mission.title}</strong>: {mission.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LaunchMission;
