import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
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

// Import Clerk publishable key
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

console.log('Clerk Key Debug:', {
  key: clerkPubKey,
  keyLength: clerkPubKey?.length,
  keyType: typeof clerkPubKey,
  allEnvVars: Object.keys(process.env).filter(key => key.includes('CLERK'))
});

if (!clerkPubKey) {
  throw new Error("Missing Publishable Key")
}

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();

  console.log('Auth state:', { user, isLoading });

  // Show loading spinner while Clerk is initializing
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={user ? <Navigate to="/app/recordings" /> : <Login />} />
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
    <ClerkProvider publishableKey={clerkPubKey}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ClerkProvider>
  );
};

export default App;
