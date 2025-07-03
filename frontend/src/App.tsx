import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MissionBoard from './pages/MissionBoard';
import ProfileBuilder from './pages/ProfileBuilder';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import OTPVerification from './pages/OTPVerification';
import ProfileCompletion from './pages/profileCompletion'; // Adjust if path differs
import LaunchMission from './pages/LaunchMission';
import AcceptedMissions from './pages/AcceptedMissions';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/missions" element={<MissionBoard />} />
        <Route path="/profile" element={<ProfileBuilder />} />
        <Route path="/verify-otp" element={<OTPVerification />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/launch" element={<LaunchMission />} />
        <Route path="/missions" element={<AcceptedMissions />} />
      
    </Routes>
  );
};

export default App;
