import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AcceptedMissions: React.FC = () => {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const res = await axios.get('http://localhost:5050/api/missions/accepted/68668fdd534fc4ead2781a3c'); // replace with dynamic userId if available
        setMissions(res.data);
      } catch (err) {
        console.error('Error fetching accepted missions:', err);
      }
    };

    fetchMissions();
  }, []);

  return (
    <div>
      <h2>Accepted Missions</h2>
      <ul>
        {missions.map((mission: any) => (
          <li key={mission._id}>
            <strong>{mission.title}</strong>: {mission.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AcceptedMissions;
