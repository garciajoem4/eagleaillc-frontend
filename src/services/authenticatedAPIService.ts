// Authenticated API Service
// Handles all API requests with Clerk token authentication

import { useAuth } from '@clerk/clerk-react';
import { useCallback } from 'react';

export interface AuthenticatedRequestOptions extends RequestInit {
  templateName?: string; // JWT template name for custom claims
}

export interface UseAuthenticatedAPIReturn {
  makeRequest: (url: string, options?: AuthenticatedRequestOptions) => Promise<Response>;
  isAuthenticated: boolean;
  userId: string | null | undefined;
}

/**
 * Custom hook for making authenticated API requests with Clerk tokens
 */
export const useAuthenticatedAPI = (): UseAuthenticatedAPIReturn => {
  const { getToken, isSignedIn, userId } = useAuth();

  const makeRequest = useCallback(async (
    url: string, 
    options: AuthenticatedRequestOptions = {}
  ): Promise<Response> => {
    if (!isSignedIn) {
      throw new Error('User not authenticated. Please sign in to continue.');
    }

    const { templateName = 'synaptivoice-api', ...requestOptions } = options;
    
    try {
      // Get authentication token from Clerk
      const token = await getToken({ template: templateName });
      
      if (!token) {
        throw new Error('Failed to get authentication token');
      }

      // Prepare authentication headers
      const authHeaders: Record<string, string> = {
        'Authorization': `Bearer ${token}`,
      };

      // Only add Content-Type if not FormData (browser handles FormData headers)
      if (!(requestOptions.body instanceof FormData)) {
        authHeaders['Content-Type'] = 'application/json';
      }

      // Merge headers
      const headers = {
        ...authHeaders,
        ...requestOptions.headers,
      };

      // Make authenticated request
      const response = await fetch(url, {
        ...requestOptions,
        headers,
      });

      // Handle authentication errors
      if (response.status === 401) {
        throw new Error('Authentication failed. Please sign in again.');
      }

      if (response.status === 403) {
        throw new Error('Access denied. You do not have permission to perform this action.');
      }

      return response;

    } catch (error) {
      console.error('Authenticated API request failed:', error);
      
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error('API request failed. Please try again.');
    }
  }, [getToken, isSignedIn]);

  return {
    makeRequest,
    isAuthenticated: isSignedIn || false,
    userId,
  };
};

/**
 * Authenticated API service class for use outside of React components
 */
export class AuthenticatedAPIService {
  private getToken: (() => Promise<string | null>) | null = null;
  private isAuthenticated = false;

  /**
   * Initialize the service with Clerk auth functions
   */
  initialize(getTokenFn: () => Promise<string | null>, isAuth: boolean) {
    this.getToken = getTokenFn;
    this.isAuthenticated = isAuth;
  }

  /**
   * Make an authenticated request
   */
  async makeRequest(
    url: string, 
    options: AuthenticatedRequestOptions = {}
  ): Promise<Response> {
    if (!this.isAuthenticated || !this.getToken) {
      throw new Error('API service not initialized or user not authenticated');
    }

    const { templateName = 'synaptivoice-api', ...requestOptions } = options;
    
    try {
      // For now, we'll use the default template but keep the parameter for future use
      const token = await this.getToken();
      
      if (!token) {
        throw new Error('Failed to get authentication token');
      }

      const authHeaders: Record<string, string> = {
        'Authorization': `Bearer ${token}`,
      };

      if (!(requestOptions.body instanceof FormData)) {
        authHeaders['Content-Type'] = 'application/json';
      }

      const headers = {
        ...authHeaders,
        ...requestOptions.headers,
      };

      const response = await fetch(url, {
        ...requestOptions,
        headers,
      });

      if (response.status === 401) {
        throw new Error('Authentication failed. Please sign in again.');
      }

      if (response.status === 403) {
        throw new Error('Access denied. You do not have permission to perform this action.');
      }

      return response;

    } catch (error) {
      console.error('Authenticated API request failed:', error);
      throw error instanceof Error ? error : new Error('API request failed');
    }
  }

  /**
   * Helper method for GET requests
   */
  async get(url: string, templateName?: string): Promise<Response> {
    return this.makeRequest(url, {
      method: 'GET',
      templateName,
    });
  }

  /**
   * Helper method for POST requests
   */
  async post(url: string, data?: any, templateName?: string): Promise<Response> {
    const body = data instanceof FormData ? data : JSON.stringify(data);
    
    return this.makeRequest(url, {
      method: 'POST',
      body,
      templateName,
    });
  }

  /**
   * Helper method for PUT requests
   */
  async put(url: string, data?: any, templateName?: string): Promise<Response> {
    return this.makeRequest(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      templateName,
    });
  }

  /**
   * Helper method for DELETE requests
   */
  async delete(url: string, templateName?: string): Promise<Response> {
    return this.makeRequest(url, {
      method: 'DELETE',
      templateName,
    });
  }
}

// Global instance for use in services
export const authenticatedAPIService = new AuthenticatedAPIService();

export default useAuthenticatedAPI;