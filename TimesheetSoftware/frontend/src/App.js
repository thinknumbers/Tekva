import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
// import Dashboard from './components/Dashboard'; // To be created later
// import Onboarding from './components/Onboarding'; // To be created later
// import Timesheets from './components/Timesheets'; // To be created later

function App() {
  // For now, assume no authentication
  const isAuthenticated = false; // This will be replaced with actual auth logic

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      {/* 
        Example of protected routes to be added later:
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        /> 
      */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App; 