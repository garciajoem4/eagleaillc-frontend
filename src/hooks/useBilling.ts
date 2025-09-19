import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  fetchSubscription,
  createSubscription,
  cancelSubscription,
  fetchPaymentMethods,
  addPaymentMethod,
  fetchBillingRecords,
  fetchCurrentUsage,
  updateBillingPreferences,
  setShowUpgradeModal,
  setShowPaymentMethodModal,
  setShowCancelSubscriptionModal,
  setDefaultPaymentMethod,
  removePaymentMethod,
  clearUsageWarnings,
  removeUsageWarning,
  clearBillingError,
  setBillingPage,
  selectSubscription,
  selectAvailablePlans,
  selectCurrentPlan,
  selectPaymentMethods,
  selectDefaultPaymentMethod,
  selectBillingRecords,
  selectCurrentUsage,
  selectUsageWarnings,
  selectIsLoadingBilling,
  selectBillingError,
  selectUpcomingRenewal,
  selectPaymentFailures,
} from '../redux';
import { BillingPreferences } from '../redux/slices/billingSlice';

interface UseBillingOptions {
  autoFetch?: boolean; // Automatically fetch data on mount
  refreshInterval?: number; // Auto-refresh interval in ms (0 = disabled)
}

export const useBilling = (options: UseBillingOptions = {}) => {
  const dispatch = useAppDispatch();
  const {
    autoFetch = true,
    refreshInterval = 0,
  } = options;

  // Redux state selectors
  const subscription = useAppSelector(selectSubscription);
  const availablePlans = useAppSelector(selectAvailablePlans);
  const currentPlan = useAppSelector(selectCurrentPlan);
  const paymentMethods = useAppSelector(selectPaymentMethods);
  const defaultPaymentMethod = useAppSelector(selectDefaultPaymentMethod);
  const billingRecords = useAppSelector(selectBillingRecords);
  const currentUsage = useAppSelector(selectCurrentUsage);
  const usageWarnings = useAppSelector(selectUsageWarnings);
  const isLoading = useAppSelector(selectIsLoadingBilling);
  const error = useAppSelector(selectBillingError);
  const upcomingRenewal = useAppSelector(selectUpcomingRenewal);
  const paymentFailures = useAppSelector(selectPaymentFailures);

  // UI state
  const { showUpgradeModal, showPaymentMethodModal, showCancelSubscriptionModal } = useAppSelector((state) => ({
    showUpgradeModal: state.billing.showUpgradeModal,
    showPaymentMethodModal: state.billing.showPaymentMethodModal,
    showCancelSubscriptionModal: state.billing.showCancelSubscriptionModal,
  }));

  // Subscription management
  const upgradeSubscription = useCallback(async (planId: string, paymentMethodId?: string) => {
    try {
      const paymentMethod = paymentMethodId || defaultPaymentMethod?.id;
      if (!paymentMethod) {
        throw new Error('No payment method available. Please add a payment method first.');
      }

      const result = await dispatch(createSubscription({ planId, paymentMethodId: paymentMethod }));
      
      if (createSubscription.fulfilled.match(result)) {
        // Refresh related data after successful subscription
        dispatch(fetchCurrentUsage());
        return result.payload;
      } else {
        throw new Error(result.payload as string);
      }
    } catch (error) {
      throw error;
    }
  }, [dispatch, defaultPaymentMethod?.id]);

  const cancelCurrentSubscription = useCallback(async (immediately: boolean = false, reason?: string) => {
    try {
      const result = await dispatch(cancelSubscription({ immediately, reason }));
      
      if (cancelSubscription.fulfilled.match(result)) {
        return result.payload;
      } else {
        throw new Error(result.payload as string);
      }
    } catch (error) {
      throw error;
    }
  }, [dispatch]);

  // Payment method management
  const addNewPaymentMethod = useCallback(async (stripePaymentMethodId: string, setAsDefault: boolean = false) => {
    try {
      const result = await dispatch(addPaymentMethod({ stripePaymentMethodId, setAsDefault }));
      
      if (addPaymentMethod.fulfilled.match(result)) {
        return result.payload;
      } else {
        throw new Error(result.payload as string);
      }
    } catch (error) {
      throw error;
    }
  }, [dispatch]);

  const setDefaultPayment = useCallback((paymentMethodId: string) => {
    dispatch(setDefaultPaymentMethod(paymentMethodId));
  }, [dispatch]);

  const deletePaymentMethod = useCallback((paymentMethodId: string) => {
    if (paymentMethods.length <= 1) {
      throw new Error('Cannot remove the only payment method. Please add another payment method first.');
    }
    dispatch(removePaymentMethod(paymentMethodId));
  }, [dispatch, paymentMethods.length]);

  // Data fetching
  const refreshBillingData = useCallback(async () => {
    try {
      await Promise.all([
        dispatch(fetchSubscription()),
        dispatch(fetchPaymentMethods()),
        dispatch(fetchCurrentUsage()),
      ]);
    } catch (error) {
      console.error('Failed to refresh billing data:', error);
    }
  }, [dispatch]);

  const refreshBillingHistory = useCallback((page: number = 1, limit: number = 10) => {
    dispatch(setBillingPage(page));
    return dispatch(fetchBillingRecords({ page, limit }));
  }, [dispatch]);

  // Preferences management
  const updatePreferences = useCallback(async (preferences: Partial<BillingPreferences>) => {
    try {
      const result = await dispatch(updateBillingPreferences(preferences));
      
      if (updateBillingPreferences.fulfilled.match(result)) {
        return result.payload;
      } else {
        throw new Error(result.payload as string);
      }
    } catch (error) {
      throw error;
    }
  }, [dispatch]);

  // UI state management
  const openUpgradeModal = useCallback(() => {
    dispatch(setShowUpgradeModal(true));
  }, [dispatch]);

  const closeUpgradeModal = useCallback(() => {
    dispatch(setShowUpgradeModal(false));
  }, [dispatch]);

  const openPaymentMethodModal = useCallback(() => {
    dispatch(setShowPaymentMethodModal(true));
  }, [dispatch]);

  const closePaymentMethodModal = useCallback(() => {
    dispatch(setShowPaymentMethodModal(false));
  }, [dispatch]);

  const openCancelSubscriptionModal = useCallback(() => {
    dispatch(setShowCancelSubscriptionModal(true));
  }, [dispatch]);

  const closeCancelSubscriptionModal = useCallback(() => {
    dispatch(setShowCancelSubscriptionModal(false));
  }, [dispatch]);

  // Usage monitoring
  const dismissUsageWarning = useCallback((warning: string) => {
    dispatch(removeUsageWarning(warning));
  }, [dispatch]);

  const clearAllUsageWarnings = useCallback(() => {
    dispatch(clearUsageWarnings());
  }, [dispatch]);

  // Error handling
  const clearError = useCallback(() => {
    dispatch(clearBillingError());
  }, [dispatch]);

  // Utility functions
  const formatCurrency = useCallback((amount: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  }, []);

  const formatUsage = useCallback((usage: typeof currentUsage) => {
    if (!usage) return null;

    const formatBytes = (bytes: number): string => {
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      if (bytes === 0) return '0 Bytes';
      const i = Math.floor(Math.log(bytes) / Math.log(1024));
      return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    };

    const formatDuration = (minutes: number): string => {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    return {
      recordings: {
        count: usage.recordings.count,
        duration: formatDuration(usage.recordings.totalDuration),
        storage: formatBytes(usage.recordings.storageUsed),
      },
      exports: usage.exports.count,
      apiCalls: usage.apiCalls.count,
    };
  }, []);

  const getUsagePercentages = useCallback(() => {
    if (!currentUsage || !currentPlan) return null;

    const limits = currentPlan.limits;
    const usage = currentUsage;

    return {
      recordings: typeof limits.recordings === 'number' 
        ? Math.round((usage.recordings.count / limits.recordings) * 100)
        : 0,
      storage: typeof limits.storage === 'number' 
        ? Math.round((usage.recordings.storageUsed / (1024 * 1024 * 1024)) / limits.storage * 100)
        : 0,
      exports: typeof limits.exports === 'number' 
        ? Math.round((usage.exports.count / limits.exports) * 100)
        : 0,
      apiCalls: typeof limits.apiCalls === 'number' 
        ? Math.round((usage.apiCalls.count / limits.apiCalls) * 100)
        : 0,
    };
  }, [currentUsage, currentPlan]);

  const isNearLimit = useCallback((type: 'recordings' | 'storage' | 'exports' | 'apiCalls', threshold: number = 80) => {
    const percentages = getUsagePercentages();
    return percentages ? percentages[type] >= threshold : false;
  }, [getUsagePercentages]);

  const canUpgrade = useCallback((targetPlanId: string): boolean => {
    if (!currentPlan) return true;
    
    const targetPlan = availablePlans.find(plan => plan.id === targetPlanId);
    if (!targetPlan) return false;
    
    return targetPlan.price > currentPlan.price;
  }, [currentPlan, availablePlans]);

  const canDowngrade = useCallback((targetPlanId: string): boolean => {
    if (!currentPlan) return false;
    
    const targetPlan = availablePlans.find(plan => plan.id === targetPlanId);
    if (!targetPlan) return false;
    
    return targetPlan.price < currentPlan.price;
  }, [currentPlan, availablePlans]);

  // Auto-fetch and refresh logic
  useEffect(() => {
    if (autoFetch) {
      refreshBillingData();
    }
  }, [autoFetch, refreshBillingData]);

  useEffect(() => {
    if (refreshInterval > 0) {
      const interval = setInterval(() => {
        refreshBillingData();
      }, refreshInterval);

      return () => clearInterval(interval);
    }
  }, [refreshInterval, refreshBillingData]);

  return {
    // State
    subscription,
    availablePlans,
    currentPlan,
    paymentMethods,
    defaultPaymentMethod,
    billingRecords,
    currentUsage,
    usageWarnings,
    isLoading,
    error,
    upcomingRenewal,
    paymentFailures,

    // UI state
    showUpgradeModal,
    showPaymentMethodModal,
    showCancelSubscriptionModal,

    // Subscription actions
    upgradeSubscription,
    cancelCurrentSubscription,

    // Payment method actions
    addNewPaymentMethod,
    setDefaultPayment,
    deletePaymentMethod,

    // Data fetching
    refreshBillingData,
    refreshBillingHistory,

    // Preferences
    updatePreferences,

    // UI actions
    openUpgradeModal,
    closeUpgradeModal,
    openPaymentMethodModal,
    closePaymentMethodModal,
    openCancelSubscriptionModal,
    closeCancelSubscriptionModal,

    // Usage monitoring
    dismissUsageWarning,
    clearAllUsageWarnings,

    // Error handling
    clearError,

    // Utility functions
    formatCurrency,
    formatUsage,
    getUsagePercentages,
    isNearLimit,
    canUpgrade,
    canDowngrade,
  };
};

export default useBilling;