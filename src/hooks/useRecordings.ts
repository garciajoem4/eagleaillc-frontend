import { useEffect, useMemo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/clerk-react';
import { Recording } from '../types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  fetchRecordings,
  setFilters,
  clearFilters,
  toggleSort,
  openUploadModal,
  closeUploadModal,
  selectSortedRecordings,
  deleteRecording,
  setApiFilters,
  clearApiFilters,
  setOffset,
  selectSubscription,
  fetchSubscription,
} from '../redux';

export const useRecordings = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user: clerkUser } = useUser();
  const { getToken } = useAuth();
  
  // Redux state selectors
  const { 
    recordings, 
    filters, 
    sort, 
    loading, 
    error, 
    isUploadModalOpen,
    pagination,
    apiFilters,
    useAPI,
    processingFiles,
  } = useAppSelector((state) => state.recordings);
  
  const filteredAndSortedRecordings = useAppSelector(selectSortedRecordings);
  const subscription = useAppSelector(selectSubscription);
  
  // Local state for subscription loading
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);

  // Check if user is on free trial using subscription data from API
  const isFreeTrial = useMemo(() => {
    // Check subscription tier from API
    const tier = subscription?.tier?.toLowerCase();
    const isFree = tier === 'free' || tier === 'trial' || subscription?.status === 'trialing';
    
    console.log('🔍 Subscription Data:', {
      tier: subscription?.tier,
      status: subscription?.status,
      isFreeTrial: isFree,
      usage: subscription?.usage,
      limits: subscription?.limits,
    });

    return isFree;
  }, [subscription]);

  // Get recording limit from subscription API data
  const MAX_FREE_TRIAL_RECORDINGS = useMemo(() => {
    if (!subscription?.usage) return 2; // Fallback to 2 if no data
    return subscription.usage.files_limit || 2;
  }, [subscription]);

  // Get current uploaded count from subscription API data
  const currentUploadedCount = useMemo(() => {
    if (!subscription?.usage) return recordings.length;
    return subscription.usage.files_uploaded || recordings.length;
  }, [subscription, recordings.length]);

  // Check if approaching limit (80% threshold)
  const isApproachingLimit = useMemo(() => {
    if (!isFreeTrial) return false;
    const threshold = 0.8;
    return currentUploadedCount >= MAX_FREE_TRIAL_RECORDINGS * threshold;
  }, [isFreeTrial, currentUploadedCount, MAX_FREE_TRIAL_RECORDINGS]);

  // For free trial users, limit recordings display and show subscribe option
  const displayRecordings = useMemo(() => {
    if (!isFreeTrial) return filteredAndSortedRecordings;
    
    // For free trial users, show up to the limit
    return filteredAndSortedRecordings.slice(0, MAX_FREE_TRIAL_RECORDINGS);
  }, [isFreeTrial, filteredAndSortedRecordings, MAX_FREE_TRIAL_RECORDINGS]);

  // Check if free trial user has reached recording limit
  const hasReachedLimit = useMemo(() => {
    return isFreeTrial && currentUploadedCount >= MAX_FREE_TRIAL_RECORDINGS;
  }, [isFreeTrial, currentUploadedCount, MAX_FREE_TRIAL_RECORDINGS]);

  // Check if free trial user has exceeded limit (for showing subscribe row)
  const hasExceededLimit = useMemo(() => {
    return isFreeTrial && filteredAndSortedRecordings.length > MAX_FREE_TRIAL_RECORDINGS;
  }, [isFreeTrial, filteredAndSortedRecordings.length]);

  // Fetch recordings with API integration
  const fetchRecordingsData = useCallback(() => {
    dispatch(fetchRecordings({
      getToken,
      limit: pagination.limit,
      offset: pagination.offset,
      status: apiFilters.status,
      search: apiFilters.search,
      order_by: apiFilters.order_by,
      order_dir: apiFilters.order_dir,
    }));
  }, [dispatch, getToken, pagination.limit, pagination.offset, apiFilters]);

  // Fetch recordings on component mount and when filters/pagination changes
  useEffect(() => {
    fetchRecordingsData();
  }, [fetchRecordingsData]);

  // Fetch subscription data on mount
  useEffect(() => {
    const loadSubscription = async () => {
      setSubscriptionLoading(true);
      try {
        await dispatch(fetchSubscription(getToken)).unwrap();
      } catch (error) {
        console.error('Failed to load subscription in recordings:', error);
        // Fallback data will be used from Redux
      } finally {
        setSubscriptionLoading(false);
      }
    };
    
    loadSubscription();
  }, [dispatch, getToken]);

  const handleSort = (field: keyof Recording) => {
    dispatch(toggleSort(field));
  };

  const formatDuration = (seconds: number): string => {
    if (!seconds || seconds === 0) return '0s';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);
    
    return parts.join(' ');
  };

  const formatDate = (date: string | Date): string => {
    // Handle both ISO string dates and Date objects for backward compatibility
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleView = (id: string) => {
    console.log('View recording:', id);
    // Navigate to recording detail page using React Router
    navigate(`/app/recordings/${id}`);
  };

  const handleRemove = (id: string) => {
    console.log('Remove recording:', id);
    // Show confirmation dialog and remove
    if (window.confirm('Are you sure you want to remove this recording?')) {
      dispatch(deleteRecording(id));
    }
  };

  const handleUploadComplete = (newRecordings: Recording[]) => {
    // Fetch recordings to get updated list
    fetchRecordingsData();
    dispatch(closeUploadModal());
    
    // Redirect to the first uploaded recording's details page
    if (newRecordings.length > 0) {
      navigate(`/app/recordings/${newRecordings[0].id}`);
    }
  };

  const handlePageChange = (newOffset: number) => {
    dispatch(setOffset(newOffset));
  };

  const handleFilterChange = (key: string, value: string) => {
    dispatch(setApiFilters({ [key]: value }));
  };

  const applyFilters = () => {
    dispatch(setOffset(0));
    fetchRecordingsData();
  };

  const getStatusBadgeColor = (status?: string) => {
    if (!status) return 'secondary';
    const colors: Record<string, string> = {
      completed: 'default',
      processing_asr: 'secondary',
      processing_intel: 'secondary',
      pending_asr: 'outline',
      pending_upload: 'outline',
      failed_asr: 'destructive',
      failed_intel: 'destructive',
      cancelled: 'outline',
      expired: 'outline',
    };
    return colors[status] || 'secondary';
  };

  const handleSubscribe = () => {
    navigate('/app/billings');
  };

  const handleOpenUploadModal = () => {
    dispatch(openUploadModal());
  };

  const handleCloseUploadModal = () => {
    dispatch(closeUploadModal());
  };

  const handleClearFilters = () => {
    dispatch(clearApiFilters());
    dispatch(clearFilters());
  };

  return {
    // Constants
    MAX_FREE_TRIAL_RECORDINGS,
    
    // State
    recordings,
    filters,
    sort,
    loading,
    error,
    isUploadModalOpen,
    pagination,
    apiFilters,
    useAPI,
    filteredAndSortedRecordings,
    displayRecordings,
    processingFiles,
    subscription,
    subscriptionLoading,
    
    // Computed values
    isFreeTrial,
    hasReachedLimit,
    hasExceededLimit,
    currentUploadedCount,
    isApproachingLimit,
    
    // Functions
    handleSort,
    formatDuration,
    formatDate,
    handleView,
    handleRemove,
    handleUploadComplete,
    handlePageChange,
    handleFilterChange,
    applyFilters,
    getStatusBadgeColor,
    handleSubscribe,
    handleOpenUploadModal,
    handleCloseUploadModal,
    handleClearFilters,
    fetchRecordingsData,
  };
};

