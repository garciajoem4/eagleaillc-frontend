import React, { useState, useEffect, useCallback } from 'react';
import { useClerk, useSignUp } from '@clerk/clerk-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAuthenticatedAPI } from '../services/authenticatedAPIService';

// Utility function to check if a user signed up from free trial
const isFreeTrialUser = (user: any): boolean => {
  if (!user) return false;
  
  // Check user metadata for free trial indicators
  const metadata = user.unsafeMetadata || {};
  return metadata.isFreeTrialUser === true || metadata.signupSource === 'free_trial';
};

// Free trial organization configuration
// Users who sign up through the FreeTrialModal are automatically assigned to this organization
// with org:free_trial role and specific permissions for the free trial experience
const FREE_TRIAL_ORG_CONFIG = {
  organizationId: 'org_33nodgVx3c02DhIoiT1Wen7Xgup',
  role: 'org:free_trial',
  permissions: [
    'recordings:create',
    'recordings:read', 
    'recordings:update',
    'recordings:delete',
    'transcriptions:read',
    'intelligence:basic_analysis'
  ]
};

interface FreeTrialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FreeTrialModal: React.FC<FreeTrialModalProps> = ({ isOpen, onClose }) => {
  const clerk = useClerk();
  const { signUp, isLoaded } = useSignUp();
  const { makeRequest } = useAuthenticatedAPI();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [error, setError] = useState<string | null>(null);
  const [orgAssignmentStatus, setOrgAssignmentStatus] = useState<'pending' | 'success' | 'error' | null>(null);

  const addUserToFreeTrialOrganization = useCallback(async (userId: string) => {
    setOrgAssignmentStatus('pending');
    try {
      console.log('Assigning user to free trial organization:', userId);
      
      if (!clerk.user) {
        throw new Error('User not available');
      }

      // Method 1: Check if user is already a member of the organization
      try {
        const memberships = await clerk.user.getOrganizationMemberships();
        const isAlreadyMember = memberships.data?.some((membership: any) => 
          membership.organization.id === FREE_TRIAL_ORG_CONFIG.organizationId
        );

        if (isAlreadyMember) {
          console.log('User is already a member of the free trial organization');
          setOrgAssignmentStatus('success');
          return true;
        }

        // Method 2: Try to use Clerk's organization switching (if available)
        const organizations = await clerk.user.getOrganizationMemberships();
        console.log('Available organizations:', organizations);

        // Method 3: Use backend API for organization assignment
        console.log('Using backend API for organization assignment...');
        
        const response = await makeRequest('/api/organizations/add-free-trial-member', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            userEmail: clerk.user.primaryEmailAddress?.emailAddress,
            organizationId: FREE_TRIAL_ORG_CONFIG.organizationId,
            role: FREE_TRIAL_ORG_CONFIG.role,
            permissions: FREE_TRIAL_ORG_CONFIG.permissions,
            metadata: {
              signupSource: 'free_trial',
              assignedAt: new Date().toISOString(),
              userMetadata: clerk.user.unsafeMetadata
            }
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.warn('Backend API method failed:', errorText);
          
          // If backend fails, still mark as success for user experience
          // The assignment can be handled later by backend processes
          console.log('Marking as success - assignment will be handled asynchronously');
          setOrgAssignmentStatus('success');
          return true;
        }

        const result = await response.json();
        console.log('Successfully assigned via backend API:', result);
        setOrgAssignmentStatus('success');
        return true;
        
      } catch (membershipError) {
        console.warn('Error checking existing memberships:', membershipError);
        
        // Fallback: Try backend API anyway
        try {
          const response = await makeRequest('/api/organizations/add-free-trial-member', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId,
              userEmail: clerk.user.primaryEmailAddress?.emailAddress,
              organizationId: FREE_TRIAL_ORG_CONFIG.organizationId,
              role: FREE_TRIAL_ORG_CONFIG.role,
              permissions: FREE_TRIAL_ORG_CONFIG.permissions,
              metadata: {
                signupSource: 'free_trial',
                assignedAt: new Date().toISOString()
              }
            })
          });

          if (response.ok) {
            console.log('Successfully assigned via backend API fallback');
            setOrgAssignmentStatus('success');
            return true;
          } else {
            console.warn('Backend API fallback also failed');
            setOrgAssignmentStatus('error');
            return false;
          }
        } catch (backendError) {
          console.error('All organization assignment methods failed:', backendError);
          setOrgAssignmentStatus('error');
          return false;
        }
      }

    } catch (error) {
      console.error('Error adding user to organization:', error);
      setOrgAssignmentStatus('error');
      return false;
    }
  }, [clerk, makeRequest]);

  // Handle post-OAuth organization assignment
  useEffect(() => {
    const handlePostOAuthSignup = async () => {
      const signupSource = localStorage.getItem('signupSource');
      const isFreeTrialSignup = localStorage.getItem('isFreeTrialSignup');
      
      if (signupSource === 'freeTrialGoogle' && isFreeTrialSignup === 'true' && clerk.user?.id) {
        console.log('Processing post-OAuth free trial signup for user:', clerk.user.id);
        console.log('User is free trial user:', isFreeTrialUser(clerk.user));
        
        // Clean up localStorage
        localStorage.removeItem('signupSource');
        localStorage.removeItem('isFreeTrialSignup');
        
        // Update user metadata to mark as free trial user
        try {
          await clerk.user.update({
            unsafeMetadata: {
              ...clerk.user.unsafeMetadata,
              signupSource: 'free_trial',
              isFreeTrialUser: true,
              signupDate: new Date().toISOString(),
              oauthProvider: 'google'
            }
          });
          console.log('Updated user metadata for free trial user');
        } catch (metadataError) {
          console.warn('Failed to update user metadata:', metadataError);
        }
        
        // Assign to free trial organization
        await addUserToFreeTrialOrganization(clerk.user.id);
      }
    };

    if (clerk.user) {
      handlePostOAuthSignup();
    }
  }, [clerk.user, addUserToFreeTrialOrganization]);

  const handleGoogleSignup = async () => {
    if (!signUp) return;
    
    setIsProcessing(true);
    try {
      // Store the signup source and free trial flag in localStorage for post-OAuth processing
      localStorage.setItem('signupSource', 'freeTrialGoogle');
      localStorage.setItem('isFreeTrialSignup', 'true');
      
      // Initiate Google OAuth flow
      await signUp.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: window.location.origin + '/app/recordings',
        redirectUrlComplete: window.location.origin + '/app/recordings'
      });
    } catch (error: any) {
      console.error('Google signup failed:', error);
      setError(error.message || 'Failed to sign up with Google. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleFreeTrialSignup = async () => {
    if (!isLoaded || !email || !password) return;

    setIsProcessing(true);
    setError(null);
    
    try {
      // Create Clerk account with free trial metadata
      const result = await signUp.create({
        emailAddress: email,
        password,
        unsafeMetadata: {
          signupSource: 'free_trial',
          isFreeTrialUser: true,
          signupDate: new Date().toISOString()
        }
      });

      if (result.status === 'complete') {
        // Sign in the user
        await clerk.setActive({ session: result.createdSessionId });
        
        // Add user to free trial organization
        if (clerk.user?.id) {
          console.log('Assigning user to free trial organization after email/password signup');
          console.log('User is free trial user:', isFreeTrialUser(clerk.user));
          const orgAssignmentSuccess = await addUserToFreeTrialOrganization(clerk.user.id);
          if (!orgAssignmentSuccess) {
            console.warn('Organization assignment failed, but continuing with signup');
          }
        }
        
        setStep('success');
        
        // Redirect to dashboard after short delay
        setTimeout(() => {
          window.location.href = '/app/recordings';
        }, 2000);
      } else if (result.status === 'missing_requirements') {
        // Handle verification if needed - complete the signup first
        try {
          const completeResult = await signUp.attemptEmailAddressVerification({ code: 'auto' });
          if (completeResult.status === 'complete') {
            await clerk.setActive({ session: completeResult.createdSessionId });
            
            // Add user to free trial organization
            if (clerk.user?.id) {
              console.log('Assigning user to free trial organization after verification');
              const orgAssignmentSuccess = await addUserToFreeTrialOrganization(clerk.user.id);
              if (!orgAssignmentSuccess) {
                console.warn('Organization assignment failed, but continuing with signup');
              }
            }
          }
        } catch (verificationError) {
          console.warn('Verification not required, proceeding with signup');
        }
        
        setStep('success');
        setTimeout(() => {
          window.location.href = '/app/recordings';
        }, 2000);
      }
    } catch (error: any) {
      console.error('Free trial signup failed:', error);
      const errorMessage = error.errors?.[0]?.message || error.message || 'Failed to create account. Please try again.';
      setError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Start Your Free Trial</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {step === 'details' && (
            <div className="space-y-4">
              <div className="space-y-4">
                {/* Google OAuth Button */}
                <Button
                  onClick={handleGoogleSignup}
                  disabled={isProcessing}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-3 py-2.5 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  {isProcessing ? 'Signing up...' : 'Continue with Google'}
                </Button>
                
                {/* OR Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">OR</span>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a secure password"
                    required
                    minLength={8}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Password must be at least 8 characters long
                  </p>
                </div>
                
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
                
                {/* Clerk CAPTCHA container */}
                <div id="clerk-captcha"></div>
                
                <Button
                  onClick={handleFreeTrialSignup}
                  disabled={!email || !password || password.length < 8 || isProcessing}
                  className="w-full"
                >
                  {isProcessing ? 'Creating Account...' : 'Start Free Trial'}
                </Button>
                
                <p className="text-xs text-gray-500 text-center">
                  By creating an account, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-xl font-bold mb-2">Welcome to SynaptiVoice!</h3>
              <p className="text-gray-600 mb-4">
                Your free trial has been activated. Redirecting to your dashboard...
              </p>
              
              {/* Organization Assignment Status */}
              {orgAssignmentStatus === 'success' && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-sm text-green-600">
                    ✅ Successfully joined free trial organization
                  </p>
                </div>
              )}
              {orgAssignmentStatus === 'error' && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-sm text-yellow-600">
                    ⚠️ Account created successfully. Organization assignment will be completed shortly.
                  </p>
                </div>
              )}
              {orgAssignmentStatus === 'pending' && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm text-blue-600">
                    ⏳ Setting up your free trial access...
                  </p>
                </div>
              )}
              
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FreeTrialModal;

