import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h1>🛰 Welcome to Mission Control</h1>
      <p>Where prompts turn into futuristic missions.</p>

      <Link to="/launch">
        <button>Launch Mission</button>
      </Link>
      <Link to="/accepted">
        <button>View Accepted Missions</button>
      </Link>
    </div>
  );
};

export default Home;
