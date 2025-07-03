import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MissionBoard from './pages/MissionBoard';
import ProfileBuilder from './pages/ProfileBuilder';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/missions" element={<MissionBoard />} />
        <Route path="/profile" element={<ProfileBuilder />} />
        <Route path="/dashboard" element={<Dashboard />} />
      
    </Routes>
  );
};

export default App;
