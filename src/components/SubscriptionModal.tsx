import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useClerk, useSignUp } from '@clerk/clerk-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  recommended?: boolean;
}

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: SubscriptionPlan | null;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose, plan }) => {
  const stripe = useStripe();
  const elements = useElements();
  const clerk = useClerk();
  const { signUp, isLoaded } = useSignUp();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [error, setError] = useState<string | null>(null);

  // Handle post-OAuth subscription flow
  useEffect(() => {
    const handlePostOAuthSignup = () => {
      const signupSource = localStorage.getItem('signupSource');
      if (signupSource === 'subscriptionGoogle' && clerk.user?.id) {
        localStorage.removeItem('signupSource');
        const savedPlan = localStorage.getItem('selectedPlan');
        if (savedPlan) {
          localStorage.removeItem('selectedPlan');
          setStep('payment');
        }
      }
    };

    if (clerk.user) {
      handlePostOAuthSignup();
    }
  }, [clerk.user]);

  const handleGoogleSignup = async () => {
    if (!signUp) return;
    
    setIsProcessing(true);
    try {
      // Store the signup source in localStorage so we can handle subscription after OAuth
      localStorage.setItem('signupSource', 'subscriptionGoogle');
      if (plan) {
        localStorage.setItem('selectedPlan', JSON.stringify(plan));
      }
      
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

  const handleAccountCreation = async () => {
    if (!isLoaded || !email || !password) return;

    setIsProcessing(true);
    setError(null);
    
    try {
      // Create Clerk account (only email and password are accepted)
      const result = await signUp.create({
        emailAddress: email,
        password,
      });

      if (result.status === 'complete') {
        setStep('payment');
      } else if (result.status === 'missing_requirements') {
        // Try to update with additional information
        try {
          await signUp.update({});
        } catch (updateError) {
          console.warn('Could not update names, proceeding anyway:', updateError);
        }
        setStep('payment');
      } else {
        // Handle email verification if needed
        await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
        setStep('payment'); // For demo, skip verification
      }
    } catch (error: any) {
      console.error('Account creation failed:', error);
      const errorMessage = error.errors?.[0]?.message || error.message || 'Failed to create account. Please try again.';
      setError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements || !plan) return;

    setIsProcessing(true);
    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) return;

      // Create payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        elements,
        params: {
          billing_details: {
            email: email,
          },
        },
      });

      if (error) {
        console.error('Payment method creation failed:', error);
        alert(`Payment failed: ${error.message}`);
        return;
      }

      // Simulate successful subscription creation
      console.log('Subscription created:', {
        paymentMethodId: paymentMethod.id,
        planId: plan.id,
        userEmail: email,
      });

      // Complete Clerk sign up and sign in
      if (signUp && signUp.status !== 'complete') {
        await signUp.attemptEmailAddressVerification({ code: 'skip_verification' });
      }

      // Sign in the user automatically
      await clerk.setActive({ session: signUp?.createdSessionId });

      setStep('success');
      
      // Redirect to dashboard after short delay
      setTimeout(() => {
        window.location.href = '/app/recordings';
      }, 2000);

    } catch (error) {
      console.error('Payment processing failed:', error);
      alert('Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen || !plan) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Subscribe to {plan.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {step === 'details' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Create Your Account</h3>
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
                  onClick={handleAccountCreation}
                  disabled={!email || !password || password.length < 8 || isProcessing}
                  className="w-full"
                >
                  {isProcessing ? 'Creating Account...' : 'Continue to Payment'}
                </Button>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <form onSubmit={handlePayment} className="space-y-4">
              <h3 className="text-lg font-semibold">Payment Information</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{plan.name}</span>
                  <span className="text-xl font-bold text-blue-600">
                    ${plan.price}/{plan.interval}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Billed monthly. Cancel anytime.</p>
              </div>
              
              <div>
                <Label>Card Information</Label>
                <div className="p-3 border rounded-md mt-1">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: '16px',
                          color: '#424770',
                          '::placeholder': {
                            color: '#aab7c4',
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={!stripe || isProcessing}
                className="w-full"
              >
                {isProcessing ? 'Processing...' : `Subscribe for $${plan.price}/${plan.interval}`}
              </Button>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-xl font-bold mb-2">Welcome to SynaptiVoice!</h3>
              <p className="text-gray-600 mb-4">
                Your subscription has been activated. Redirecting to your dashboard...
              </p>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;

