import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useClerk, useSignUp } from '@clerk/clerk-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import StripeProvider from '../components/StripeProvider';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  recommended?: boolean;
}

const plans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 7,
    interval: 'month',
    features: [
      'Up to 10 recordings per month',
      'Basic transcription',
      'Email support',
      'Standard intelligence analysis',
    ],
  },
  {
    id: 'professional',
    name: 'Professional Plan',
    price: 15,
    interval: 'month',
    recommended: true,
    features: [
      'Unlimited recordings',
      'Advanced Smart transcription',
      'Intelligence analytics',
      'Export options (PDF, CSV, JSON)',
      'Priority support',
      'Advanced search & filtering',
    ],
  },
];

const SubscriptionModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  plan: SubscriptionPlan | null;
}> = ({ isOpen, onClose, plan }) => {
  const stripe = useStripe();
  const elements = useElements();
  const clerk = useClerk();
  const { signUp, isLoaded } = useSignUp();
  
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [error, setError] = useState<string | null>(null);

  const handleAccountCreation = async () => {
    if (!isLoaded || !email || !firstName || !lastName || !password) return;

    setIsProcessing(true);
    setError(null);
    
    try {
      // Create Clerk account (only email and password are accepted)
      const result = await signUp.create({
        emailAddress: email,
        password,
        unsafeMetadata: {
          firstName,
          lastName,
        },
      });

      if (result.status === 'complete') {
        setStep('payment');
      } else if (result.status === 'missing_requirements') {
        // Try to update with additional information
        try {
          await signUp.update({
            firstName,
            lastName,
          });
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
            name: `${firstName} ${lastName}`,
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
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
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
                  disabled={!email || !firstName || !lastName || !password || password.length < 8 || isProcessing}
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

const Homepage: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [subscriptionModal, setSubscriptionModal] = useState<{
    isOpen: boolean;
    plan: SubscriptionPlan | null;
  }>({
    isOpen: false,
    plan: null,
  });

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleSubscribe = (plan: SubscriptionPlan) => {
    setSubscriptionModal({
      isOpen: true,
      plan: plan,
    });
  };

  const closeSubscriptionModal = () => {
    setSubscriptionModal({
      isOpen: false,
      plan: null,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-[#4e69fd]/20 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#4e69fd] to-[#7c3aed] bg-clip-text text-transparent">
                  SynaptiVoice
                </h1>
              </div>
              <div className="hidden md:block ml-10">
                <div className="flex items-baseline space-x-8">
                  <a href="#pricing" className="text-gray-900 hover:text-[#4e69fd] px-3 py-2 text-sm font-medium transition-colors duration-200">
                    Pricing
                  </a>
                  <a href="#resources" className="text-gray-900 hover:text-[#4e69fd] px-3 py-2 text-sm font-medium transition-colors duration-200">
                    Resources
                  </a>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline" size="sm" className="border-[#4e69fd] text-[#4e69fd] hover:bg-[#4e69fd] hover:text-white transition-all duration-200">
                  Log In
                </Button>
              </Link>
              <Link to="/login">
                <Button size="sm" className="bg-[#4e69fd] hover:bg-[#3d54e6] text-white transition-all duration-200">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#4e69fd] via-[#6366f1] to-[#7c3aed] py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Moving gradient orbs */}
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-white/10 to-[#8b5cf6]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-[#06b6d4]/20 to-white/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-[#f472b6]/20 to-white/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          
          {/* Moving particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 8}s`,
                  animationDuration: `${8 + Math.random() * 4}s`
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Sound Wave Animation */}
        

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-2xl md:text-5xl font-bold text-white mb-6">
              Transform Your Meetings with 
              <span className="pb-4 block bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent animate-gradient-x"> Powered Intelligence</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto opacity-90 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              Automatically transcribe, analyze, and extract actionable insights from your recordings. 
              Turn every conversation into valuable business intelligence.
            </p>
          </div>
          <div className="h-[85px] flex items-center justify-center opacity-50">
            <div className="flex items-end space-x-1">
              {[...Array(50)].map((_, i) => {
                // Create frequency distribution that mimics human voice
                const centerDistance = Math.abs(i - 25);
                const frequencyWeight = Math.exp(-Math.pow(centerDistance, 2) / 200); // Gaussian distribution
                
                // Calculate speech characteristics
                const baseHeight = 15 + frequencyWeight * 65; // Voice frequency range
                const speechCycle = Math.floor(i / 8); // Group into speech segments
                const isCoreSpeech = centerDistance < 15; // Core speech frequencies
                
                // Determine animation type based on position and speech cycle
                let animationClass = 'animate-sound-wave-pause';
                let animationDelay = i * 0.08;
                let animationDuration = '2s';
                
                if (isCoreSpeech) {
                  // Core speech frequencies - most active
                  if (speechCycle % 3 === 0) {
                    animationClass = 'animate-sound-wave-speaking';
                    animationDuration = '1.2s';
                    animationDelay = (i * 0.05) + (speechCycle * 0.3);
                  } else if (speechCycle % 3 === 1) {
                    animationClass = 'animate-sound-wave-syllable';
                    animationDuration = '0.8s';
                    animationDelay = (i * 0.06) + (speechCycle * 0.2);
                  }
                } else {
                  // Harmonic frequencies - less active
                  if (speechCycle % 4 === 0) {
                    animationClass = 'animate-sound-wave-syllable';
                    animationDuration = '1.5s';
                    animationDelay = (i * 0.1) + (speechCycle * 0.4);
                  }
                }
                
                return (
                  <div
                    key={i}
                    className={`bg-white/40 rounded-full ${animationClass}`}
                    style={{
                      width: '5px',
                      height: `${baseHeight}px`,
                      animationDelay: `${animationDelay}s`,
                      animationDuration: animationDuration,
                      transform: `scaleY(${0.6 + frequencyWeight * 0.4})` // Height variation based on frequency
                    }}
                  ></div>
                );
              })}
            </div>
          </div>
          {/* Transcription Animation */}
          <div className="mt-8 animate-fade-in-up" style={{animationDelay: '1.2s'}}>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto border border-white/20">
              <div className="text-left">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-2"></div>
                  <span className="text-sm text-blue-100">Live Transcription</span>
                </div>
                <div className="space-y-2 text-white/90 text-sm">
                  <div className="animate-typing">
                    <span className="opacity-60">[00:23]</span> "Let's discuss the quarterly targets for our sales team..."
                  </div>
                  <div className="animate-typing" style={{animationDelay: '2s'}}>
                    <span className="opacity-60">[00:31]</span> "I think we should focus on customer retention this quarter."
                  </div>
                  <div className="animate-typing" style={{animationDelay: '4s'}}>
                    <span className="opacity-60">[00:45]</span> "Great point! Let's add that as an action item."
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 animate-fade-in-up" style={{animationDelay: '1.6s'}}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <Link to="/trial">
                <Button size="lg" className="px-8 py-3 text-lg bg-white text-[#4e69fd] hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-xl">
                  Start Free Trial
                </Button>
              </Link>
              {/* <Button variant="outline" size="lg" className="px-8 py-3 text-lg border-white text-white hover:bg-white hover:text-[#4e69fd] hover:scale-105 transition-all duration-300">
                Watch Demo
              </Button> */}
            </div>
            <p className="text-sm text-blue-100 mt-4 opacity-80 animate-fade-in-up" style={{animationDelay: '0.9s'}}>No credit card required • 14-day free trial</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Every Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to capture, analyze, and act on your meeting insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* AI Transcription */}
            <Card className="border-2 hover:border-[#4e69fd]/30 transition-all duration-300 p-6 hover:shadow-lg hover:shadow-[#4e69fd]/10">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#4e69fd] to-[#7c3aed] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Transcription</h3>
                  <p className="text-gray-600 mb-4">
                    Accurate, real-time transcription with speaker identification and timestamp precision
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 99%+ accuracy rate</li>
                    <li>• Multi-language support</li>
                    <li>• Speaker identification</li>
                    <li>• Real-time processing</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Smart Intelligence */}
            <Card className="border-2 hover:border-[#4e69fd]/30 transition-all duration-300 p-6 hover:shadow-lg hover:shadow-[#4e69fd]/10">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#4e69fd] to-[#7c3aed] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Intelligence Analysis</h3>
                  <p className="text-gray-600 mb-4">
                    Automatically extract action items, decisions, issues, and questions from conversations
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Action item detection</li>
                    <li>• Decision tracking</li>
                    <li>• Issue identification</li>
                    <li>• Question extraction</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Advanced Search */}
            <Card className="border-2 hover:border-[#4e69fd]/30 transition-all duration-300 p-6 hover:shadow-lg hover:shadow-[#4e69fd]/10">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#4e69fd] to-[#7c3aed] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Advanced Search & Filter</h3>
                  <p className="text-gray-600 mb-4">
                    Find any moment in your recordings with powerful search and time-based filtering
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Full-text search</li>
                    <li>• Time range filtering</li>
                    <li>• Content categorization</li>
                    <li>• Instant results</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Audio Playback */}
            <Card className="border-2 hover:border-[#4e69fd]/30 transition-all duration-300 p-6 hover:shadow-lg hover:shadow-[#4e69fd]/10">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#4e69fd] to-[#7c3aed] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10V9a1 1 0 011-1h1m4 1h1a1 1 0 011 1v1m-4 3v1a1 1 0 01-1 1H9.586a1 1 0 01-.707-.293L6.465 13.293A1 1 0 016 12.586V11a1 1 0 011-1h1" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Integrated Audio Playback</h3>
                  <p className="text-gray-600 mb-4">
                    Listen to original recordings with synchronized transcript highlighting
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• High-quality playback</li>
                    <li>• Sync with transcript</li>
                    <li>• Speed controls</li>
                    <li>• Bookmark moments</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Export Options */}
            <Card className="border-2 hover:border-[#4e69fd]/30 transition-all duration-300 p-6 hover:shadow-lg hover:shadow-[#4e69fd]/10">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#4e69fd] to-[#7c3aed] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Flexible Export Options</h3>
                  <p className="text-gray-600 mb-4">
                    Export your data in multiple formats for seamless integration with your workflow
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• PDF reports</li>
                    <li>• Word documents</li>
                    <li>• JSON data</li>
                    <li>• Plain text</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Security & Privacy */}
            <Card className="border-2 hover:border-[#4e69fd]/30 transition-all duration-300 p-6 hover:shadow-lg hover:shadow-[#4e69fd]/10">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#4e69fd] to-[#7c3aed] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Enterprise Security</h3>
                  <p className="text-gray-600 mb-4">
                    Bank-level security with end-to-end encryption and compliance certifications
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• End-to-end encryption</li>
                    <li>• SOC 2 compliance</li>
                    <li>• GDPR compliant</li>
                    <li>• Private cloud options</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start with our free trial, then choose the plan that best fits your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative transition-all hover:shadow-lg ${
                  plan.recommended ? 'border-[#4e69fd] shadow-md' : ''
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-[#4e69fd] text-white">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-[#4e69fd] mt-2">
                    {formatPrice(plan.price)}
                    <span className="text-lg text-gray-600 font-normal">/{plan.interval}</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.recommended ? 'bg-[#4e69fd] hover:bg-[#3d54e6]' : ''}`}
                    variant={plan.recommended ? 'default' : 'outline'}
                    onClick={() => handleSubscribe(plan)}
                  >
                    Get Started with {plan.name}
                  </Button>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    14-day free trial • No credit card required • Cancel anytime
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">All plans include:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <span className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                End-to-end encryption
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                SOC 2 compliance
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                24/7 support
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Cancel anytime
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="resources" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about SynaptiVoice
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "How secure is SynaptiVoice?",
                answer: "Absolutely. SynaptiVoice is designed with security, privacy, and control at its core. We follow industry best practices, including end-to-end encryption and continuous monitoring. SynaptiVoice is fully compliant with SOC 2, HIPAA, and GDPR standards. You also get granular, customizable controls to ensure meeting data is only accessible to the intended participants."
              },
              {
                question: "How do I get started with SynaptiVoice?",
                answer: "Getting started with SynaptiVoice is quick and free. You can try it out for yourself, your team, or your entire organization. Enjoy 14 days of complimentary access to the SynaptiVoice Pro plan, including AI recording credits for testing. After your trial, you’ll be automatically moved to the free plan — which stays free forever."
              },
              {
                question: "Who has access to my meeting recordings and notes?",
                answer: "By default, only internal meeting attendees can access your notes and recordings — so private conversations like 1-on-1s or leadership meetings stay confidential. If needed, you can share recordings with others by creating custom recording channels, which can be limited to specific users or opened up to your entire workspace. The choice is yours."
              },
              {
                question: "How does SynaptiVoice capture meeting notes?",
                answer: "SynaptiVoice joins your virtual meetings as a participant and requests permission to join — making it clear to everyone that the meeting will be recorded. You can set SynaptiVoice to join meetings automatically or manually invite it via your conferencing platform."
              },
              {
                question: "Who can use SynaptiVoice for meeting recording and transcription?",
                answer: "Anyone running remote meetings can use SynaptiVoice to capture conversations accurately. Record internal and external calls, 1-on-1s, team check-ins, and all-hands meetings using one secure AI-powered note-taking platform. Flying solo? SynaptiVoice’s individual plan is perfect for keeping your meeting notes and recordings organized and accessible."
              }
            ].map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  <div className="flex-shrink-0">
                    <svg
                      className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                        openFAQ === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#4e69fd] to-[#7c3aed]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Meetings?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands  of teams already using SynaptiVoice to unlock insights from their conversations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/trial">
              <Button size="lg" variant="secondary" className="px-8 py-3 text-lg bg-white text-[#4e69fd] hover:bg-gray-50 hover:scale-105 transition-all duration-300">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SynaptiVoice</h3>
              <p className="text-gray-400 text-sm">
                Transforming conversations into actionable insights with Smart intelligence.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#integrations" className="hover:text-white">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button className="hover:text-white text-left">About</button></li>
                <li><button className="hover:text-white text-left">Blog</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button className="hover:text-white text-left">Help Center</button></li>
                <li><button className="hover:text-white text-left">Documentation</button></li>
                <li><button className="hover:text-white text-left">Contact Support</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 SynaptiVoice. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={subscriptionModal.isOpen}
        onClose={closeSubscriptionModal}
        plan={subscriptionModal.plan}
      />
    </div>
  );
};

const WrappedHomepage: React.FC = () => {
  return (
    <StripeProvider>
      <Homepage />
    </StripeProvider>
  );
};

export default WrappedHomepage;
