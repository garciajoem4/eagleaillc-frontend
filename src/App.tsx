import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import TrialRestriction from './components/TrialRestriction';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Billings from './pages/Billings';
import Dashboard from './pages/Dashboard';
import FreeTrial from './pages/FreeTrial';
import Homepage from './pages/Homepage';
import RecordingDetail from './pages/RecordingDetail';
import Recordings from './pages/Recordings';
import Settings from './pages/Settings';

const AppContent: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/trial" element={<FreeTrial />} />
        
        {/* Trial restriction routes - for users trying to access protected features without login */}
        <Route path="/trial-recordings" element={
          <TrialRestriction 
            feature="Recordings" 
            description="Access to saved recordings and file management is only available to registered users." 
          />
        } />
        <Route path="/trial-analytics" element={
          <TrialRestriction 
            feature="Analytics Dashboard" 
            description="Advanced analytics and reporting features are only available to registered users." 
          />
        } />
        <Route path="/trial-billings" element={
          <TrialRestriction 
            feature="Billing" 
            description="Billing and subscription management is only available to registered users." 
          />
        } />
        <Route path="/trial-settings" element={
          <TrialRestriction 
            feature="Settings" 
            description="User settings and preferences are only available to registered users." 
          />
        } />
        
        {/* Protected routes */}
        {user ? (
          <Route path="/app" element={<Layout />}>
            <Route index element={<Navigate to="/app/recordings" />} />
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
