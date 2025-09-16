import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useUser } from '@clerk/clerk-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

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
    price: 1,
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
    price: 2,
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
  }
  // {
  //   id: 'enterprise',
  //   name: 'Enterprise Plan',
  //   price: 3,
  //   interval: 'month',
  //   features: [
  //     'All Professional features',
  //     'Custom integrations',
  //     'API access',
  //     'Dedicated account manager',
  //     'Custom branding',
  //     'Advanced security features',
  //     'SLA guarantee',
  //   ],
  // },
];

const SubscriptionPayment: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useUser();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !selectedPlan) {
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setIsProcessing(false);
      return;
    }

    try {
      // Create payment method using elements
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        elements,
        params: {
          billing_details: {
            name: user?.fullName || user?.firstName || 'Anonymous',
            email: user?.primaryEmailAddress?.emailAddress || undefined,
          },
        },
      });

      if (error) {
        console.error('Payment method creation failed:', error);
        alert(`Payment failed: ${error.message}`);
        setIsProcessing(false);
        return;
      }

      // In a real application, you would send the payment method to your backend
      // to create a subscription with Stripe's subscription API
      console.log('Payment method created:', paymentMethod);

      // Simulate API call to backend for demo purposes
      console.log('Creating subscription with:', {
        paymentMethodId: paymentMethod.id,
        planId: selectedPlan,
        customerId: user?.id,
      });

      // Add a small delay to simulate API processing
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate successful response
      const response = { ok: true };

      if (response.ok) {
        setPaymentSuccess(true);
      } else {
        throw new Error('Subscription creation failed');
      }
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment processing failed. This is a demo implementation.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  if (paymentSuccess) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="text-center p-8">
          <CardTitle className="mb-2">Subscription Activated!</CardTitle>
          <CardDescription>
            Your subscription has been successfully activated. Welcome to SynaptiVoice Professional!
          </CardDescription>
          <Button 
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Continue to Dashboard
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Plan Selection */}
      <Card className="mx-auto">
        <CardContent className="text-center p-6">
          <CardTitle className="mb-4">Choose Your Plan</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`cursor-pointer transition-all ${
                  selectedPlan === plan.id 
                    ? 'ring-2 ring-blue-500 shadow-lg' 
                    : 'hover:shadow-md'
                } ${plan.recommended ? 'border-blue-500' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <CardHeader className="text-center">
                  {plan.recommended && (
                    <Badge className="mb-2 self-center">Recommended</Badge>
                  )}
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-blue-600">
                    {formatPrice(plan.price)}
                    <span className="text-sm text-gray-600">/{plan.interval}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Form */}
      {selectedPlan && (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Complete Your Subscription</CardTitle>
            <CardDescription>
              You've selected the {plans.find(p => p.id === selectedPlan)?.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Information
                </label>
                <div className="p-3 border rounded-md">
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

              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total:</span>
                  <span className="text-xl font-bold text-blue-600">
                    {formatPrice(plans.find(p => p.id === selectedPlan)?.price || 0)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Billed monthly. Cancel anytime.
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={!stripe || isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Subscribe Now'}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                By subscribing, you agree to our Terms of Service and Privacy Policy.
                Your payment information is securely processed by Stripe.
              </p>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SubscriptionPayment;
