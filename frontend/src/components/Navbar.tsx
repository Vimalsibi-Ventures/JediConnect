import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#f0f4ff' }}>
      <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none' }}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/missions">Mission Board</Link></li>
        <li><Link to="/profile">Profile Builder</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
