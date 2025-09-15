import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { user: clerkUser, isLoaded } = useUser();
  const { signOut } = useClerk();

  // Transform Clerk user to our app's User type
  const user: User | null = useMemo(() => {
    if (!isLoaded) {
      return null; // Still loading
    }
    
    if (!clerkUser) {
      return null; // No authenticated user
    }

    return {
      username: clerkUser.username || clerkUser.primaryEmailAddress?.emailAddress || 'User',
      isAuthenticated: true,
      id: clerkUser.id,
      email: clerkUser.primaryEmailAddress?.emailAddress,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      imageUrl: clerkUser.imageUrl
    };
  }, [clerkUser, isLoaded]);

  const isLoading = !isLoaded;

  const logout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
      // Even if signOut fails, we should handle it gracefully
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
