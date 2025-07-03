// src/routes.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LaunchMission from './components/LaunchMission';
import AcceptedMissions from './components/AcceptedMissions';
import Home from './components/Home'; // Optional: a landing/home component

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/launch" element={<LaunchMission />} />
        <Route path="/accepted/:userId" element={<AcceptedMissions />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
