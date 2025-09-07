import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Layout from './components/Layout';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import Recordings from './pages/Recordings';
import RecordingDetail from './pages/RecordingDetail';
import Billings from './pages/Billings';
import Settings from './pages/Settings';

const AppContent: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes */}
        {user ? (
          <Route path="/app" element={<Layout />}>
            <Route index element={<Navigate to="/app/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="recordings" element={<Recordings />} />
            <Route path="recordings/:id" element={<RecordingDetail />} />
            <Route path="billings" element={<Billings />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        ) : (
          <Route path="/app/*" element={<Navigate to="/login" />} />
        )}
        
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
