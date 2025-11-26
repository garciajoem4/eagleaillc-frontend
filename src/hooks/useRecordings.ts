import { useEffect, useMemo, useCallback } from 'react';
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
} from '../redux';

// Constants for free trial limitations
const FREE_TRIAL_ORG_ID = 'org_33nodgVx3c02DhIoiT1Wen7Xgup';
const FREE_TRIAL_ROLE = 'org:free_trial';
const MAX_FREE_TRIAL_RECORDINGS = 2;

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
  } = useAppSelector((state) => state.recordings);
  
  const filteredAndSortedRecordings = useAppSelector(selectSortedRecordings);

  // Check if user is on free trial by examining organization memberships
  const isFreeTrial = useMemo(() => {
    if (!clerkUser?.organizationMemberships) return false;
    
    return clerkUser.organizationMemberships.some(membership => 
      membership.organization.id === FREE_TRIAL_ORG_ID && 
      membership.role === FREE_TRIAL_ROLE
    );
  }, [clerkUser]);

  // For free trial users, limit recordings display and show subscribe option
  const displayRecordings = useMemo(() => {
    if (!isFreeTrial) return filteredAndSortedRecordings;
    
    // For free trial users, show max 2 recordings
    return filteredAndSortedRecordings.slice(0, MAX_FREE_TRIAL_RECORDINGS);
  }, [isFreeTrial, filteredAndSortedRecordings]);

  // Check if free trial user has reached recording limit
  const hasReachedLimit = useMemo(() => {
    return isFreeTrial && recordings.length >= MAX_FREE_TRIAL_RECORDINGS;
  }, [isFreeTrial, recordings.length]);

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

  const handleSort = (field: keyof Recording) => {
    dispatch(toggleSort(field));
  };

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
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
    console.log('Navigate to subscription page');
    navigate('/app/billing');
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
    
    // Computed values
    isFreeTrial,
    hasReachedLimit,
    hasExceededLimit,
    
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

