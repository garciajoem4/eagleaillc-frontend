import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Subscription Plans
export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  limits: {
    recordings: number | 'unlimited';
    storage: number; // in GB
    exports: number | 'unlimited';
    apiCalls: number | 'unlimited';
  };
  recommended?: boolean;
  stripePriceId: string;
}

// API Response Types for Usage and Limits
export interface SubscriptionUsage {
  files_uploaded: number;
  files_limit: number;
  files_limit_text: string;
  storage_used_bytes: number;
  storage_used_gb: number;
  storage_limit_bytes: number;
  storage_limit_gb: number;
  billing_period_start: string;
  billing_period_end: string;
}

export interface SubscriptionLimits {
  max_file_duration_seconds: number;
  max_file_duration_text: string;
  priority: number;
  priority_text: string;
}

// Current Subscription
export interface Subscription {
  id: string;
  planId: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete' | 'paused';
  currentPeriodStart: string; // ISO date string
  currentPeriodEnd: string; // ISO date string
  cancelAtPeriodEnd: boolean;
  trialEnd?: string; // ISO date string
  stripeSubscriptionId?: string;
  customerId?: string;
  // Additional fields from backend API
  tier?: string;
  tierDisplayName?: string;
  billingCycle?: string;
  trialEndsAt?: string;
  // Properly typed usage and limits from API
  usage?: SubscriptionUsage;
  limits?: SubscriptionLimits;
}

// Payment Method
export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank_account' | 'paypal';
  last4?: string;
  brand?: string; // visa, mastercard, etc.
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
  stripePaymentMethodId: string;
}

// Billing Record/Invoice
export interface BillingRecord {
  id: string;
  date: string; // ISO date string
  description: string;
  amount: number;
  tax: number;
  total: number;
  status: 'paid' | 'pending' | 'overdue' | 'failed' | 'draft';
  invoiceUrl?: string;
  paymentMethodId?: string;
  subscriptionId?: string;
  stripeInvoiceId: string;
}

// Usage Tracking
export interface Usage {
  period: {
    start: string; // ISO date string
    end: string; // ISO date string
  };
  recordings: {
    count: number;
    totalDuration: number; // in minutes
    storageUsed: number; // in bytes
  };
  exports: {
    count: number;
    types: Record<string, number>; // pdf: 5, csv: 3, etc.
  };
  apiCalls: {
    count: number;
    endpoints: Record<string, number>;
  };
  limits: {
    recordings: number | 'unlimited';
    storage: number;
    exports: number | 'unlimited';
    apiCalls: number | 'unlimited';
  };
}

// Billing Preferences
export interface BillingPreferences {
  emailNotifications: {
    invoices: boolean;
    paymentFailures: boolean;
    subscriptionChanges: boolean;
    usageAlerts: boolean;
  };
  autoRenewal: boolean;
  currency: string;
  taxId?: string;
  billingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

// Redux State
interface BillingState {
  // Subscription management
  subscription: Subscription | null;
  availablePlans: SubscriptionPlan[];
  
  // Payment methods
  paymentMethods: PaymentMethod[];
  defaultPaymentMethod: string | null;
  
  // Billing history
  billingRecords: BillingRecord[];
  totalPages: number;
  currentPage: number;
  
  // Usage tracking
  currentUsage: Usage | null;
  usageHistory: Usage[];
  
  // Preferences
  preferences: BillingPreferences | null;
  
  // UI state
  isLoadingSubscription: boolean;
  isLoadingPaymentMethods: boolean;
  isLoadingBillingRecords: boolean;
  isLoadingUsage: boolean;
  isProcessingPayment: boolean;
  
  // Modal states
  showUpgradeModal: boolean;
  showPaymentMethodModal: boolean;
  showCancelSubscriptionModal: boolean;
  
  // Alerts and notifications
  paymentFailures: number;
  upcomingRenewal: string | null; // ISO date string
  usageWarnings: string[];
  
  // Error handling
  error: string | null;
  lastSyncError: string | null;
}

// Initial state
const initialState: BillingState = {
  subscription: null,
  availablePlans: [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: 7,
      interval: 'month',
      features: [
        'Up to 50 recordings per month',
        'Basic transcription',
        'Email support',
        'Standard intelligence analysis',
        '5GB storage'
      ],
      limits: {
        recordings: 50,
        storage: 5,
        exports: 100,
        apiCalls: 1000,
      },
      stripePriceId: 'price_basic_monthly',
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
        '50GB storage'
      ],
      limits: {
        recordings: 'unlimited',
        storage: 50,
        exports: 'unlimited',
        apiCalls: 'unlimited',
      },
      stripePriceId: 'price_professional_monthly',
    },
    {
      id: 'enterprise',
      name: 'Enterprise Plan',
      price: 25,
      interval: 'month',
      features: [
        'Everything in Professional',
        'Custom integrations',
        'Dedicated account manager',
        'SLA guarantee',
        'Custom data retention',
        '500GB storage',
        'White-label options'
      ],
      limits: {
        recordings: 'unlimited',
        storage: 500,
        exports: 'unlimited',
        apiCalls: 'unlimited',
      },
      stripePriceId: 'price_enterprise_monthly',
    },
  ],
  paymentMethods: [],
  defaultPaymentMethod: null,
  billingRecords: [],
  totalPages: 1,
  currentPage: 1,
  currentUsage: null,
  usageHistory: [],
  preferences: null,
  isLoadingSubscription: false,
  isLoadingPaymentMethods: false,
  isLoadingBillingRecords: false,
  isLoadingUsage: false,
  isProcessingPayment: false,
  showUpgradeModal: false,
  showPaymentMethodModal: false,
  showCancelSubscriptionModal: false,
  paymentFailures: 0,
  upcomingRenewal: null,
  usageWarnings: [],
  error: null,
  lastSyncError: null,
};

// Async Thunks
export const fetchSubscription = createAsyncThunk(
  'billing/fetchSubscription',
  async (getToken: (() => Promise<string | null>) | undefined, { rejectWithValue }) => {
    try {
      // Try to fetch from real API if getToken is provided
      if (getToken) {
        const token = await getToken();
        
        if (token) {
          const API_BASE = process.env.REACT_APP_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
          
          const response = await fetch(`${API_BASE}/api/subscriptions/status`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          console.log('response subscription', response);

          if (response.ok) {
            const data = await response.json();
            
            // Transform backend response to match our Subscription interface
            const transformedData: Subscription = {
              id: data.subscription?.id || 'sub_default',
              planId: data.subscription?.tier || 'free',
              status: data.subscription?.status || 'active',
              currentPeriodStart: data.usage?.billing_period_start || new Date().toISOString(),
              currentPeriodEnd: data.subscription?.current_period_end || data.usage?.billing_period_end || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
              cancelAtPeriodEnd: false,
              stripeSubscriptionId: data.subscription?.stripe_subscription_id,
              customerId: data.subscription?.stripe_customer_id,
              // Store additional backend data
              tier: data.subscription?.tier,
              tierDisplayName: data.subscription?.tier_display_name,
              billingCycle: data.subscription?.billing_cycle,
              trialEndsAt: data.subscription?.trial_ends_at,
              usage: data.usage,
              limits: data.limits,
            };
            
            return transformedData;
          }
        }
      }
      
      // Fallback to mock data if API fails or token not available
      console.warn('Using fallback subscription data - API call failed or not authenticated');
      
      const mockSubscription: Subscription = {
        id: 'sub_fallback',
        planId: 'free',
        status: 'active',
        currentPeriodStart: new Date().toISOString(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        cancelAtPeriodEnd: false,
        stripeSubscriptionId: undefined,
        customerId: undefined,
      };
      
      return mockSubscription;
    } catch (error) {
      console.error('Error fetching subscription:', error);
      // Return fallback data instead of rejecting
      return {
        id: 'sub_error_fallback',
        planId: 'free',
        status: 'active',
        currentPeriodStart: new Date().toISOString(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        cancelAtPeriodEnd: false,
      } as Subscription;
    }
  }
);

export const createSubscription = createAsyncThunk(
  'billing/createSubscription',
  async (params: { planId: string; paymentMethodId: string }, { rejectWithValue }) => {
    try {
      // Simulate Stripe subscription creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate potential failure (5% chance)
      if (Math.random() < 0.05) {
        throw new Error('Payment failed. Please try a different payment method.');
      }
      
      const subscription: Subscription = {
        id: `sub_${Date.now()}`,
        planId: params.planId,
        status: 'active',
        currentPeriodStart: new Date().toISOString(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
        cancelAtPeriodEnd: false,
        stripeSubscriptionId: `sub_stripe_${Date.now()}`,
        customerId: 'cus_stripe_456',
      };
      
      return subscription;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create subscription');
    }
  }
);

export const cancelSubscription = createAsyncThunk(
  'billing/cancelSubscription',
  async (params: { immediately: boolean; reason?: string }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { billing: BillingState };
      const subscription = state.billing.subscription;
      
      if (!subscription) {
        throw new Error('No active subscription found');
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedSubscription: Subscription = {
        ...subscription,
        status: params.immediately ? 'canceled' : subscription.status,
        cancelAtPeriodEnd: !params.immediately,
      };
      
      return updatedSubscription;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to cancel subscription');
    }
  }
);

export const fetchPaymentMethods = createAsyncThunk(
  'billing/fetchPaymentMethods',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockPaymentMethods: PaymentMethod[] = [
        {
          id: 'pm_1',
          type: 'card',
          last4: '4242',
          brand: 'visa',
          expiryMonth: 12,
          expiryYear: 2025,
          isDefault: true,
          stripePaymentMethodId: 'pm_stripe_123',
        },
        {
          id: 'pm_2',
          type: 'card',
          last4: '5555',
          brand: 'mastercard',
          expiryMonth: 8,
          expiryYear: 2026,
          isDefault: false,
          stripePaymentMethodId: 'pm_stripe_456',
        },
      ];
      
      return mockPaymentMethods;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch payment methods');
    }
  }
);

export const addPaymentMethod = createAsyncThunk(
  'billing/addPaymentMethod',
  async (params: { stripePaymentMethodId: string; setAsDefault: boolean }, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const paymentMethod: PaymentMethod = {
        id: `pm_${Date.now()}`,
        type: 'card',
        last4: '1234',
        brand: 'visa',
        expiryMonth: 10,
        expiryYear: 2027,
        isDefault: params.setAsDefault,
        stripePaymentMethodId: params.stripePaymentMethodId,
      };
      
      return paymentMethod;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to add payment method');
    }
  }
);

export const fetchBillingRecords = createAsyncThunk(
  'billing/fetchBillingRecords',
  async (params: { page: number; limit: number } = { page: 1, limit: 10 }, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockRecords: BillingRecord[] = Array.from({ length: params.limit }, (_, i) => {
        const recordDate = new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000);
        return {
          id: `inv_${params.page}_${i + 1}`,
          date: recordDate.toISOString(), // Convert to ISO string
          description: `Monthly Subscription - ${recordDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
          amount: 49.99,
          tax: 4.50,
          total: 54.49,
          status: i === 0 && Math.random() < 0.3 ? 'pending' : 'paid',
          invoiceUrl: `https://invoice.stripe.com/inv_${params.page}_${i + 1}`,
          stripeInvoiceId: `in_stripe_${params.page}_${i + 1}`,
        };
      });
      
      return {
        records: mockRecords,
        totalPages: 5,
        currentPage: params.page,
      };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch billing records');
    }
  }
);

export const fetchCurrentUsage = createAsyncThunk(
  'billing/fetchCurrentUsage',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      
      const mockUsage: Usage = {
        period: {
          start: startOfMonth.toISOString(),
          end: endOfMonth.toISOString(),
        },
        recordings: {
          count: Math.floor(Math.random() * 200) + 50,
          totalDuration: Math.floor(Math.random() * 5000) + 1000,
          storageUsed: Math.floor(Math.random() * 10 * 1024 * 1024 * 1024), // Random GB in bytes
        },
        exports: {
          count: Math.floor(Math.random() * 50) + 10,
          types: {
            pdf: Math.floor(Math.random() * 20) + 5,
            csv: Math.floor(Math.random() * 15) + 3,
            json: Math.floor(Math.random() * 10) + 2,
          },
        },
        apiCalls: {
          count: Math.floor(Math.random() * 10000) + 1000,
          endpoints: {
            '/api/transcribe': Math.floor(Math.random() * 500) + 100,
            '/api/analyze': Math.floor(Math.random() * 300) + 50,
            '/api/export': Math.floor(Math.random() * 100) + 20,
          },
        },
        limits: {
          recordings: 'unlimited',
          storage: 50,
          exports: 'unlimited',
          apiCalls: 'unlimited',
        },
      };
      
      return mockUsage;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch usage data');
    }
  }
);

export const updateBillingPreferences = createAsyncThunk(
  'billing/updateBillingPreferences',
  async (preferences: Partial<BillingPreferences>, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      return preferences;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update preferences');
    }
  }
);

// Redux Slice
const billingSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {
    // UI state management
    setShowUpgradeModal: (state, action: PayloadAction<boolean>) => {
      state.showUpgradeModal = action.payload;
    },
    
    setShowPaymentMethodModal: (state, action: PayloadAction<boolean>) => {
      state.showPaymentMethodModal = action.payload;
    },
    
    setShowCancelSubscriptionModal: (state, action: PayloadAction<boolean>) => {
      state.showCancelSubscriptionModal = action.payload;
    },
    
    // Payment method management
    setDefaultPaymentMethod: (state, action: PayloadAction<string>) => {
      const oldDefault = state.paymentMethods.find(pm => pm.isDefault);
      const newDefault = state.paymentMethods.find(pm => pm.id === action.payload);
      
      if (oldDefault) oldDefault.isDefault = false;
      if (newDefault) newDefault.isDefault = true;
      
      state.defaultPaymentMethod = action.payload;
    },
    
    removePaymentMethod: (state, action: PayloadAction<string>) => {
      const removedMethod = state.paymentMethods.find(pm => pm.id === action.payload);
      state.paymentMethods = state.paymentMethods.filter(pm => pm.id !== action.payload);
      
      // If we removed the default, set a new default
      if (removedMethod?.isDefault && state.paymentMethods.length > 0) {
        state.paymentMethods[0].isDefault = true;
        state.defaultPaymentMethod = state.paymentMethods[0].id;
      } else if (state.paymentMethods.length === 0) {
        state.defaultPaymentMethod = null;
      }
    },
    
    // Usage warnings
    addUsageWarning: (state, action: PayloadAction<string>) => {
      if (!state.usageWarnings.includes(action.payload)) {
        state.usageWarnings.push(action.payload);
      }
    },
    
    clearUsageWarnings: (state) => {
      state.usageWarnings = [];
    },
    
    removeUsageWarning: (state, action: PayloadAction<string>) => {
      state.usageWarnings = state.usageWarnings.filter(warning => warning !== action.payload);
    },
    
    // Error handling
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    
    clearError: (state) => {
      state.error = null;
      state.lastSyncError = null;
    },
    
    // Plan selection
    selectPlan: (state, action: PayloadAction<string>) => {
      // This action is mainly for UI state, actual subscription creation happens via thunk
      state.error = null;
    },
    
    // Billing page navigation
    setBillingPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    
    // Reset billing state
    resetBilling: (state) => {
      return { ...initialState, availablePlans: state.availablePlans };
    },
  },
  
  extraReducers: (builder) => {
    builder
      // Fetch subscription
      .addCase(fetchSubscription.pending, (state) => {
        state.isLoadingSubscription = true;
        state.error = null;
      })
      .addCase(fetchSubscription.fulfilled, (state, action) => {
        state.isLoadingSubscription = false;
        state.subscription = action.payload;
        
        // Set upcoming renewal notification
        if (action.payload.status === 'active') {
          state.upcomingRenewal = action.payload.currentPeriodEnd;
        }
      })
      .addCase(fetchSubscription.rejected, (state, action) => {
        state.isLoadingSubscription = false;
        state.error = action.payload as string;
      })
      
      // Create subscription
      .addCase(createSubscription.pending, (state) => {
        state.isProcessingPayment = true;
        state.error = null;
      })
      .addCase(createSubscription.fulfilled, (state, action) => {
        state.isProcessingPayment = false;
        state.subscription = action.payload;
        state.showUpgradeModal = false;
        state.upcomingRenewal = action.payload.currentPeriodEnd;
      })
      .addCase(createSubscription.rejected, (state, action) => {
        state.isProcessingPayment = false;
        state.error = action.payload as string;
      })
      
      // Cancel subscription
      .addCase(cancelSubscription.fulfilled, (state, action) => {
        state.subscription = action.payload;
        state.showCancelSubscriptionModal = false;
      })
      
      // Fetch payment methods
      .addCase(fetchPaymentMethods.pending, (state) => {
        state.isLoadingPaymentMethods = true;
      })
      .addCase(fetchPaymentMethods.fulfilled, (state, action) => {
        state.isLoadingPaymentMethods = false;
        state.paymentMethods = action.payload;
        state.defaultPaymentMethod = action.payload.find(pm => pm.isDefault)?.id || null;
      })
      .addCase(fetchPaymentMethods.rejected, (state, action) => {
        state.isLoadingPaymentMethods = false;
        state.lastSyncError = action.payload as string;
      })
      
      // Add payment method
      .addCase(addPaymentMethod.fulfilled, (state, action) => {
        const newMethod = action.payload;
        
        // If setting as default, unset others
        if (newMethod.isDefault) {
          state.paymentMethods.forEach(pm => { pm.isDefault = false; });
          state.defaultPaymentMethod = newMethod.id;
        }
        
        state.paymentMethods.push(newMethod);
        state.showPaymentMethodModal = false;
      })
      
      // Fetch billing records
      .addCase(fetchBillingRecords.pending, (state) => {
        state.isLoadingBillingRecords = true;
      })
      .addCase(fetchBillingRecords.fulfilled, (state, action) => {
        state.isLoadingBillingRecords = false;
        state.billingRecords = action.payload.records;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        
        // Count payment failures
        state.paymentFailures = action.payload.records.filter(r => r.status === 'failed').length;
      })
      .addCase(fetchBillingRecords.rejected, (state, action) => {
        state.isLoadingBillingRecords = false;
        state.lastSyncError = action.payload as string;
      })
      
      // Fetch current usage
      .addCase(fetchCurrentUsage.pending, (state) => {
        state.isLoadingUsage = true;
      })
      .addCase(fetchCurrentUsage.fulfilled, (state, action) => {
        state.isLoadingUsage = false;
        state.currentUsage = action.payload;
        
        // Check for usage warnings
        const usage = action.payload;
        const warnings: string[] = [];
        
        // Check storage usage (warn at 80%)
        if (typeof usage.limits.storage === 'number') {
          const storageGB = usage.recordings.storageUsed / (1024 * 1024 * 1024);
          const storageLimit = usage.limits.storage;
          
          if (storageGB > storageLimit * 0.8) {
            warnings.push(`Storage usage is at ${Math.round((storageGB / storageLimit) * 100)}% (${storageGB.toFixed(1)}GB / ${storageLimit}GB)`);
          }
        }
        
        // Check recordings limit (warn at 90%)
        if (typeof usage.limits.recordings === 'number') {
          const recordingsLimit = usage.limits.recordings;
          
          if (usage.recordings.count > recordingsLimit * 0.9) {
            warnings.push(`Recording limit usage is at ${Math.round((usage.recordings.count / recordingsLimit) * 100)}% (${usage.recordings.count} / ${recordingsLimit})`);
          }
        }
        
        state.usageWarnings = warnings;
      })
      .addCase(fetchCurrentUsage.rejected, (state, action) => {
        state.isLoadingUsage = false;
        state.lastSyncError = action.payload as string;
      })
      
      // Update preferences
      .addCase(updateBillingPreferences.fulfilled, (state, action) => {
        state.preferences = { ...state.preferences, ...action.payload } as BillingPreferences;
      });
  },
});

// Export actions
export const {
  setShowUpgradeModal,
  setShowPaymentMethodModal,
  setShowCancelSubscriptionModal,
  setDefaultPaymentMethod,
  removePaymentMethod,
  addUsageWarning,
  clearUsageWarnings,
  removeUsageWarning,
  setError,
  clearError,
  selectPlan,
  setBillingPage,
  resetBilling,
} = billingSlice.actions;

// Selectors
export const selectSubscription = (state: { billing: BillingState }) => state.billing.subscription;
export const selectAvailablePlans = (state: { billing: BillingState }) => state.billing.availablePlans;
export const selectCurrentPlan = (state: { billing: BillingState }) => {
  const subscription = state.billing.subscription;
  return subscription ? state.billing.availablePlans.find(plan => plan.id === subscription.planId) : null;
};
export const selectPaymentMethods = (state: { billing: BillingState }) => state.billing.paymentMethods;
export const selectDefaultPaymentMethod = (state: { billing: BillingState }) => 
  state.billing.paymentMethods.find(pm => pm.id === state.billing.defaultPaymentMethod);
export const selectBillingRecords = (state: { billing: BillingState }) => state.billing.billingRecords;
export const selectCurrentUsage = (state: { billing: BillingState }) => state.billing.currentUsage;
export const selectUsageWarnings = (state: { billing: BillingState }) => state.billing.usageWarnings;
export const selectIsLoadingBilling = (state: { billing: BillingState }) => 
  state.billing.isLoadingSubscription || state.billing.isLoadingPaymentMethods || 
  state.billing.isLoadingBillingRecords || state.billing.isLoadingUsage;
export const selectBillingError = (state: { billing: BillingState }) => state.billing.error;
export const selectUpcomingRenewal = (state: { billing: BillingState }) => state.billing.upcomingRenewal;
export const selectPaymentFailures = (state: { billing: BillingState }) => state.billing.paymentFailures;

export default billingSlice.reducer;