// src/components/AcceptedMissions.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AcceptedMissions: React.FC = () => {
  const [missions, setMissions] = useState<any[]>([]);
  const userId = '68668fdd534fc4ead2781a3c'; // Replace dynamically later if needed

  const fetchMissions = async () => {
    try {
      const res = await axios.get(`http://localhost:5050/api/missions/accepted/${userId}`);
      setMissions(res.data);
    } catch (err) {
      console.error('❌ Error fetching accepted missions:', err);
    }
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  return (
    <div>
      <h2>Accepted Missions</h2>
      {missions.length === 0 ? (
        <p>No accepted missions yet.</p>
      ) : (
        <ul>
          {missions.map((mission) => (
            <li key={mission._id}>
              <strong>{mission.title}</strong>: {mission.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AcceptedMissions;
