import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { useAppDispatch } from '../redux/hooks';
import { fetchSubscription } from '../redux';

/**
 * AuthCallback component handles post-login redirect logic.
 * Free trial users are redirected to billings, paid users to recordings.
 */
const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { isSignedIn, getToken, isLoaded } = useAuth();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleRedirect = async () => {
      // Wait for Clerk to be fully loaded
      if (!isLoaded) return;

      // If not signed in, redirect to login
      if (!isSignedIn) {
        navigate('/login', { replace: true });
        return;
      }

      try {
        // Fetch subscription data
        const result = await dispatch(fetchSubscription(getToken)).unwrap();

        // Check if user is on free trial
        const tier = result?.tier?.toLowerCase();
        const isFree = tier === 'free' || tier === 'trial' || result?.status === 'trialing';

        console.log('AuthCallback - Redirecting user:', { tier, isFree, status: result?.status });

        // Redirect based on subscription status
        if (isFree) {
          navigate('/app/billings', { replace: true });
        } else {
          navigate('/app/recordings', { replace: true });
        }
      } catch (err) {
        console.error('AuthCallback - Error checking subscription:', err);
        setError('Failed to check subscription. Redirecting...');
        // Default to recordings on error
        setTimeout(() => {
          navigate('/app/recordings', { replace: true });
        }, 1000);
      }
    };

    handleRedirect();
  }, [isLoaded, isSignedIn, dispatch, getToken, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">
          {error || 'Setting up your account...'}
        </p>
      </div>
    </div>
  );
};

export default AuthCallback;
