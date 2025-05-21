import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import TimesheetList from './components/TimesheetList';
import TimesheetEdit from './components/TimesheetEdit';
import MainLayout from './components/MainLayout';
import FieldVisits from './components/FieldVisits';
import FieldVisitDetail from './components/FieldVisitDetail';
import Onboarding from './components/Onboarding';
import ManageRoster from './components/ManageRoster';
import AttendanceReport from './components/AttendanceReport';
import Courses from './components/Courses';
import Documents from './components/Documents';
import HelpCenter from './components/HelpCenter';
import Terms from './components/Terms';
import Profile from './components/Profile';
import Tasks from './components/Tasks';
// import Timesheets from './components/Timesheets'; // To be created later

function App() {
  // For now, assume no authentication
  const isAuthenticated = !!localStorage.getItem('ka_jwt');

  const handleLogout = () => {
    localStorage.removeItem('ka_jwt');
    localStorage.removeItem('ka_user');
    window.location.href = '/login';
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<MainLayout onLogout={handleLogout} />}>
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/timesheets" element={
          <ProtectedRoute>
            <TimesheetList />
          </ProtectedRoute>
        } />
        <Route path="/timesheets/:id" element={
          <ProtectedRoute>
            <TimesheetEdit />
          </ProtectedRoute>
        } />
        <Route path="/field-visits" element={
          <ProtectedRoute>
            <FieldVisits />
          </ProtectedRoute>
        } />
        <Route path="/field-visits/:id" element={
          <ProtectedRoute>
            <FieldVisitDetail />
          </ProtectedRoute>
        } />
        <Route path="/onboarding" element={
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        } />
        <Route path="/manage-roster" element={
          <ProtectedRoute>
            <ManageRoster />
          </ProtectedRoute>
        } />
        <Route path="/attendance-report" element={
          <ProtectedRoute>
            <AttendanceReport />
          </ProtectedRoute>
        } />
        <Route path="/courses" element={
          <ProtectedRoute>
            <Courses />
          </ProtectedRoute>
        } />
        <Route path="/documents" element={
          <ProtectedRoute>
            <Documents />
          </ProtectedRoute>
        } />
        <Route path="/help-center" element={
          <ProtectedRoute>
            <HelpCenter />
          </ProtectedRoute>
        } />
        <Route path="/terms" element={
          <ProtectedRoute>
            <Terms />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/tasks" element={
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        } />
        {/* 
          Example of protected routes to be added later:
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          /> 
        */}
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App; 