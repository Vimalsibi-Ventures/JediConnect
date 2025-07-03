import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MissionBoard from './pages/MissionBoard';
import ProfileBuilder from './pages/ProfileBuilder';
import Dashboard from './pages/Dashboard';


const App: React.FC = () => {
  return (
    <Routes>
      
        <Route path="/" element={<LandingPage />} />
        <Route path="/missions" element={<MissionBoard />} />
        <Route path="/profile" element={<ProfileBuilder />} />
        <Route path="/dashboard" element={<Dashboard />} />
      
    </Routes>
  );
};

export default App;
