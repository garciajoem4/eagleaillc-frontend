import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useUser, useAuth } from '@clerk/clerk-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { BILLING_ENDPOINTS, buildUrl } from '../endpoints';
import { PricingTier } from '../hooks/useHomepage';

interface PlanUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTier: PricingTier | null;
  currentPlanId: string | null;
  isAnnualBilling: boolean;
  onSuccess?: () => void;
}

const PlanUpgradeModal: React.FC<PlanUpgradeModalProps> = ({
  isOpen,
  onClose,
  selectedTier,
  currentPlanId,
  isAnnualBilling,
  onSuccess
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useUser();
  const { getToken } = useAuth();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'confirm' | 'payment' | 'success'>('confirm');

  if (!isOpen || !selectedTier) return null;

  const isUpgrade = currentPlanId ? selectedTier.id !== currentPlanId : true;
  const isDowngrade = currentPlanId && 
    ['business', 'professional', 'starter'].indexOf(currentPlanId) > 
    ['business', 'professional', 'starter'].indexOf(selectedTier.id);

  const price = isAnnualBilling ? selectedTier.annualPrice : selectedTier.monthlyPrice;
  const displayPrice = price === 'Free' || price === 'Custom' ? price : `$${price}`;
  const billingPeriod = isAnnualBilling ? 'year' : 'month';

  const handleConfirm = () => {
    if (selectedTier.id === 'free') {
      // Free plan - just close and refresh
      handleFreePlan();
    } else {
      setStep('payment');
    }
  };

  const handleFreePlan = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      const token = await getToken();
      const response = await fetch(buildUrl(BILLING_ENDPOINTS.SUBSCRIPTION), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          planId: 'free',
          action: currentPlanId ? 'downgrade' : 'create',
        }),
      });

      if (response.ok) {
        setStep('success');
        setTimeout(() => {
          onSuccess?.();
          onClose();
        }, 2000);
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update subscription');
      }
    } catch (err) {
      console.error('Free plan switch failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to switch to free plan');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !selectedTier) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        throw new Error('Card element not found');
      }

      // Create payment method
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: user?.fullName || user?.firstName || 'Customer',
          email: user?.primaryEmailAddress?.emailAddress || undefined,
        },
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      // Send to backend to create/update subscription
      const token = await getToken();
      const response = await fetch(buildUrl(BILLING_ENDPOINTS.CREATE_CHECKOUT), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          planId: selectedTier.id,
          paymentMethodId: paymentMethod.id,
          billingCycle: isAnnualBilling ? 'annual' : 'monthly',
          action: currentPlanId ? (isDowngrade ? 'downgrade' : 'upgrade') : 'create',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Subscription creation failed');
      }

      // Handle 3D Secure if required
      if (data.requiresAction && data.clientSecret) {
        const { error: confirmError } = await stripe.confirmCardPayment(data.clientSecret);
        if (confirmError) {
          throw new Error(confirmError.message);
        }
      }

      setStep('success');
      setTimeout(() => {
        onSuccess?.();
        onClose();
        window.location.reload(); // Refresh to get updated subscription
      }, 2000);

    } catch (err) {
      console.error('Payment failed:', err);
      setError(err instanceof Error ? err.message : 'Payment processing failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setStep('confirm');
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 !mt-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold">
                {step === 'success' ? 'Success!' : 
                 step === 'payment' ? 'Payment Details' :
                 isDowngrade ? 'Downgrade Plan' : 
                 currentPlanId ? 'Upgrade Plan' : 'Subscribe to Plan'}
              </h2>
              <p className="text-blue-100 text-sm mt-1">
                {step === 'success' ? 'Your subscription has been updated' :
                 step === 'payment' ? 'Enter your payment information' :
                 `${selectedTier.name} - ${displayPrice}/${billingPeriod}`}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-white/80 hover:text-white text-2xl leading-none"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'confirm' && (
            <div className="space-y-6">
              {/* Plan Summary */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-gray-900">{selectedTier.name}</span>
                  {selectedTier.recommended && (
                    <Badge className="bg-blue-100 text-blue-700">Recommended</Badge>
                  )}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {displayPrice}
                  {displayPrice !== 'Free' && displayPrice !== 'Custom' && (
                    <span className="text-base font-normal text-gray-500">/{billingPeriod}</span>
                  )}
                </div>
                {isAnnualBilling && displayPrice !== 'Free' && displayPrice !== 'Custom' && (
                  <p className="text-sm text-green-600 font-medium">Save 20% with annual billing</p>
                )}
              </div>

              {/* Features */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">What's included:</h4>
                <ul className="space-y-2">
                  {selectedTier.features.slice(0, 5).map((feature, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                  <li className="flex items-start text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {selectedTier.audioFileUploads} uploads • {selectedTier.storagePerUser} storage
                  </li>
                </ul>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <Button
                onClick={handleConfirm}
                disabled={isProcessing}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  selectedTier.id === 'free' ? 'Switch to Free Plan' : 'Continue to Payment'
                )}
              </Button>

              {selectedTier.id !== 'free' && (
                <p className="text-xs text-gray-500 text-center">
                  {selectedTier.trialDuration} free trial • Cancel anytime
                </p>
              )}
            </div>
          )}

          {step === 'payment' && (
            <form onSubmit={handlePayment} className="space-y-6">
              {/* Plan Summary */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">{selectedTier.name}</span>
                  <span className="text-xl font-bold text-blue-600">
                    {displayPrice}/{billingPeriod}
                  </span>
                </div>
              </div>

              {/* Card Element */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Information
                </label>
                <div className="p-4 border-2 border-gray-200 rounded-xl focus-within:border-blue-500 transition-colors">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: '16px',
                          color: '#1f2937',
                          fontFamily: 'system-ui, -apple-system, sans-serif',
                          '::placeholder': {
                            color: '#9ca3af',
                          },
                        },
                        invalid: {
                          color: '#ef4444',
                        },
                      },
                    }}
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div className="space-y-3">
                <Button
                  type="submit"
                  disabled={!stripe || isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing Payment...
                    </span>
                  ) : (
                    `Subscribe for ${displayPrice}/${billingPeriod}`
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep('confirm')}
                  disabled={isProcessing}
                  className="w-full"
                >
                  Back
                </Button>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secured by Stripe • Your payment info is encrypted
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Welcome to {selectedTier.name}!
              </h3>
              <p className="text-gray-600 mb-6">
                Your subscription has been activated successfully.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <svg className="animate-spin h-4 w-4 text-blue-600" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Refreshing your dashboard...
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanUpgradeModal;

