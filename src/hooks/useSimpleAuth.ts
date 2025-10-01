// Custom hook for components that need basic Clerk authentication with API calls
// Simple wrapper around useAuth for common patterns

import { useAuth, useUser } from '@clerk/clerk-react';
import { useCallback } from 'react';
import { useAuthenticatedAPI, AuthenticatedRequestOptions } from '../services/authenticatedAPIService';

export interface UseSimpleAuthReturn {
  // Authentication state
  isAuthenticated: boolean;
  isLoading: boolean;
  userId: string | null | undefined;
  userEmail: string | null | undefined;
  
  // API methods
  makeAuthenticatedRequest: (url: string, options?: AuthenticatedRequestOptions) => Promise<Response>;
  
  // Token methods
  getAuthToken: (template?: string) => Promise<string | null>;
  
  // Helper methods
  requireAuth: () => void; // Throws error if not authenticated
}

export const useSimpleAuth = (): UseSimpleAuthReturn => {
  const { isSignedIn, isLoaded, userId, getToken } = useAuth();
  const { user } = useUser();
  const { makeRequest } = useAuthenticatedAPI();

  // Get authentication token
  const getAuthToken = useCallback(async (template = 'synaptivoice-api'): Promise<string | null> => {
    if (!isSignedIn) {
      throw new Error('User not authenticated');
    }
    
    return await getToken({ template });
  }, [isSignedIn, getToken]);

  // Require authentication or throw error
  const requireAuth = useCallback((): void => {
    if (!isSignedIn) {
      throw new Error('Authentication required. Please sign in to continue.');
    }
  }, [isSignedIn]);

  // Get user email
  const userEmail = user?.primaryEmailAddress?.emailAddress || null;

  return {
    // Authentication state
    isAuthenticated: isSignedIn || false,
    isLoading: !isLoaded,
    userId,
    userEmail,
    
    // API methods
    makeAuthenticatedRequest: makeRequest,
    
    // Token methods
    getAuthToken,
    
    // Helper methods
    requireAuth,
  };
};

export default useSimpleAuth;