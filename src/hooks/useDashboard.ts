import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { 
  fetchRecordings, 
  openUploadModal, 
  closeUploadModal, 
  fetchSubscription,
  selectFileAnalytics,
  selectTotalUploadedSize,
  selectTotalUploadedCount,
} from '../redux';
import { ANALYTICS_ENDPOINTS, buildUrl } from '../endpoints';
import { Recording } from '../types';

// Fallback data for when API is unavailable
const FALLBACK_DATA = {
  totalRecordings: 0,
  recordingsTrend: [0, 0, 0, 0, 0, 0],
  minutesProcessed: 0,
  minutesTrend: [0, 0, 0, 0, 0, 0],
  statusBreakdown: { completed: 0, processing: 0, failed: 0 },
  insightsTotal: { actions: 0, decisions: 0, issues: 0 },
};

// Fallback subscription data
const FALLBACK_SUBSCRIPTION = {
  tier: 'Free',
  tierDisplayName: 'Free Plan',
  status: 'active',
  usage: {
    files_uploaded: 0,
    files_limit: 10,
    files_limit_text: '10 files',
    storage_used_gb: 0,
    storage_limit_gb: 5,
  },
};

interface AnalyticsData {
  totalRecordings: number;
  recordingsTrend: number[];
  minutesProcessed: number;
  minutesTrend: number[];
  statusBreakdown: { completed: number; processing: number; failed: number };
  insightsTotal: { actions: number; decisions: number; issues: number };
}

export const useDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { getToken } = useAuth();
  
  // Redux state
  const { recordings, loading, isUploadModalOpen } = useAppSelector((state) => state.recordings);
  const subscription = useAppSelector((state) => state.billing.subscription);
  
  // File analytics from Redux (fallback data for when API is unavailable)
  const fileAnalytics = useAppSelector(selectFileAnalytics);
  const totalUploadedSize = useAppSelector(selectTotalUploadedSize);
  const totalUploadedCount = useAppSelector(selectTotalUploadedCount);
  
  // Local state for analytics
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>(FALLBACK_DATA);
  const [usingFallback, setUsingFallback] = useState(false);
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);

  // Fetch recordings and subscription on mount
  useEffect(() => {
    dispatch(fetchRecordings({ 
      getToken,
      limit: 100, // Get more for analytics
      offset: 0 
    }));
    
    // Fetch subscription data
    const loadSubscription = async () => {
      setSubscriptionLoading(true);
      try {
        await dispatch(fetchSubscription(getToken)).unwrap();
      } catch (error) {
        console.error('Failed to load subscription in dashboard:', error);
        // Fallback data will be used from Redux
      } finally {
        setSubscriptionLoading(false);
      }
    };
    
    loadSubscription();
  }, [dispatch, getToken]);

  // Calculate analytics from recordings data with file analytics fallback
  const calculatedAnalytics = useMemo((): AnalyticsData => {
    // If no recordings from API, try to use file analytics from Redux as fallback
    if (!recordings || recordings.length === 0) {
      // Use file analytics as fallback if available
      if (fileAnalytics && fileAnalytics.length > 0) {
        // Create trend data from file analytics (group by month for last 6 months)
        const now = new Date();
        const months = Array.from({ length: 6 }, (_, i) => {
          const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
          return d;
        });

        const recordingsTrend = months.map(month => {
          return fileAnalytics.filter(fa => {
            const uploadDate = new Date(fa.uploadedAt);
            return uploadDate.getMonth() === month.getMonth() && 
                   uploadDate.getFullYear() === month.getFullYear();
          }).length;
        });

        // Calculate total minutes from file analytics duration
        const totalMinutesFromAnalytics = Math.round(
          fileAnalytics.reduce((sum, fa) => sum + (fa.duration || 0), 0) / 60
        );

        const minutesTrend = months.map(month => {
          return Math.round(fileAnalytics
            .filter(fa => {
              const uploadDate = new Date(fa.uploadedAt);
              return uploadDate.getMonth() === month.getMonth() && 
                     uploadDate.getFullYear() === month.getFullYear();
            })
            .reduce((sum, fa) => sum + (fa.duration || 0), 0) / 60);
        });

        return {
          totalRecordings: totalUploadedCount,
          recordingsTrend,
          minutesProcessed: totalMinutesFromAnalytics,
          minutesTrend,
          statusBreakdown: { completed: totalUploadedCount, processing: 0, failed: 0 },
          insightsTotal: { actions: 0, decisions: 0, issues: 0 },
        };
      }
      
      return FALLBACK_DATA;
    }

    // Status breakdown
    const statusBreakdown = {
      completed: recordings.filter(r => r.status === 'completed').length,
      processing: recordings.filter(r => r.status?.includes('processing')).length,
      failed: recordings.filter(r => r.status?.includes('failed')).length,
    };

    // Total insights
    const insightsTotal = {
      actions: recordings.reduce((sum, r) => sum + (r.action_count || 0), 0),
      decisions: recordings.reduce((sum, r) => sum + (r.decision_count || 0), 0),
      issues: recordings.reduce((sum, r) => sum + (r.issue_count || 0), 0),
    };

    // Total minutes processed (convert from seconds to minutes)
    const minutesProcessed = Math.round(
      recordings.reduce((sum, r) => sum + (r.duration || 0), 0) / 60
    );

    // Create trend data (group by month for last 6 months)
    const now = new Date();
    const months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
      return d;
    });

    const recordingsTrend = months.map(month => {
      return recordings.filter(r => {
        const recordingDate = new Date(r.dateUploaded);
        return recordingDate.getMonth() === month.getMonth() && 
               recordingDate.getFullYear() === month.getFullYear();
      }).length;
    });

    const minutesTrend = months.map(month => {
      return Math.round(recordings
        .filter(r => {
          const recordingDate = new Date(r.dateUploaded);
          return recordingDate.getMonth() === month.getMonth() && 
                 recordingDate.getFullYear() === month.getFullYear();
        })
        .reduce((sum, r) => sum + (r.duration || 0), 0) / 60); // Convert seconds to minutes
    });

    return {
      totalRecordings: recordings.length,
      recordingsTrend: recordingsTrend.length > 0 ? recordingsTrend : FALLBACK_DATA.recordingsTrend,
      minutesProcessed,
      minutesTrend: minutesTrend.length > 0 ? minutesTrend : FALLBACK_DATA.minutesTrend,
      statusBreakdown,
      insightsTotal,
    };
  }, [recordings, fileAnalytics, totalUploadedCount]);

  // Update analytics data when calculated
  useEffect(() => {
    if (recordings && recordings.length > 0) {
      setAnalyticsData(calculatedAnalytics);
      setUsingFallback(false);
    } else if (fileAnalytics && fileAnalytics.length > 0) {
      // Use file analytics as fallback
      setAnalyticsData(calculatedAnalytics);
      setUsingFallback(true); // Still mark as using fallback since it's local data
    } else if (!loading) {
      setUsingFallback(true);
    }
  }, [calculatedAnalytics, recordings, loading, fileAnalytics]);

  // Try to fetch analytics from API (optional enhancement)
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const token = await getToken();
        if (!token) return;

        setAnalyticsData({
          totalRecordings: calculatedAnalytics.totalRecordings,
          recordingsTrend: calculatedAnalytics.recordingsTrend,
          minutesProcessed: calculatedAnalytics.minutesProcessed,
          minutesTrend: calculatedAnalytics.minutesTrend,
          statusBreakdown: calculatedAnalytics.statusBreakdown,
          insightsTotal: calculatedAnalytics.insightsTotal,
        });

        // const response = await fetch(buildUrl(ANALYTICS_ENDPOINTS.DASHBOARD), {
        //   headers: {
        //     'Authorization': `Bearer ${token}`,
        //     'Content-Type': 'application/json',
        //   },
        // });

        // if (response.ok) {
        //   const data = await response.json();
        //   // If API returns analytics, use it
        //   if (data.recordings) {
        //     setAnalyticsData({
        //       totalRecordings: data.recordings.total || calculatedAnalytics.totalRecordings,
        //       recordingsTrend: data.recordings.trend || calculatedAnalytics.recordingsTrend,
        //       minutesProcessed: data.processing?.total_minutes || calculatedAnalytics.minutesProcessed,
        //       minutesTrend: data.processing?.trend || calculatedAnalytics.minutesTrend,
        //       statusBreakdown: data.recordings.by_status || calculatedAnalytics.statusBreakdown,
        //       insightsTotal: data.intelligence || calculatedAnalytics.insightsTotal,
        //     });
        //     setUsingFallback(false);
        //   }
        // }
      } catch (error) {
        console.log('Analytics API not available, using calculated data');
        // Silently fail and use calculated data
      }
    };

    fetchAnalyticsData();
  }, [getToken, calculatedAnalytics]);

  // Calculate percentage changes
  const calculateChange = (trend: number[]): { value: string; isIncrease: boolean } => {
    if (trend.length < 2) return { value: '+0%', isIncrease: true };
    const current = trend[trend.length - 1];
    const previous = trend[trend.length - 2];
    if (previous === 0) return { value: '+100%', isIncrease: true };
    const change = ((current - previous) / previous) * 100;
    const isIncrease = change >= 0;
    return {
      value: `${isIncrease ? '+' : ''}${change.toFixed(1)}%`,
      isIncrease,
    };
  };

  const recordingsChange = calculateChange(analyticsData.recordingsTrend);
  const minutesChange = calculateChange(analyticsData.minutesTrend);

  // Get month labels for last 6 months
  const getMonthLabels = () => {
    const now = new Date();
    return Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
      return d.toLocaleDateString('en-US', { month: 'short' });
    });
  };

  const monthLabels = getMonthLabels();

  // Generate recent activity from recordings
  const recentActivity = useMemo(() => {
    if (!recordings || recordings.length === 0) {
      return [
        { action: 'No recent activity', icon: 'default', time: 'Upload your first recording to get started' },
      ];
    }

    // Get the 5 most recent recordings
    const recentRecordings = [...recordings]
      .sort((a, b) => new Date(b.dateUploaded).getTime() - new Date(a.dateUploaded).getTime())
      .slice(0, 5);

    return recentRecordings.map(recording => {
      const timeDiff = Date.now() - new Date(recording.dateUploaded).getTime();
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const days = Math.floor(hours / 24);
      
      let timeAgo = '';
      if (days > 0) {
        timeAgo = days === 1 ? '1 day ago' : `${days} days ago`;
      } else if (hours > 0) {
        timeAgo = hours === 1 ? '1 hour ago' : `${hours} hours ago`;
      } else {
        const minutes = Math.floor(timeDiff / (1000 * 60));
        timeAgo = minutes <= 1 ? 'Just now' : `${minutes} minutes ago`;
      }

      let icon = 'default';
      let action = '';
      
      if (recording.status === 'completed') {
        icon = 'weeklyteam';
        action = `"${recording.name.split('.')[0]}" transcribed`;
      } else if (recording.status?.includes('processing')) {
        icon = 'clientpresentation';
        action = `"${recording.name.split('.')[0]}" processing`;
      } else if (recording.status?.includes('failed')) {
        icon = 'default';
        action = `"${recording.name.split('.')[0]}" failed`;
      } else {
        icon = 'clientpresentation';
        action = `"${recording.name.split('.')[0]}" uploaded`;
      }

      // Add intelligence insights if available
      if (recording.action_count || recording.decision_count || recording.issue_count) {
        icon = 'aiintelligence';
        const insights = [];
        if (recording.action_count) insights.push(`${recording.action_count} actions`);
        if (recording.decision_count) insights.push(`${recording.decision_count} decisions`);
        if (recording.issue_count) insights.push(`${recording.issue_count} issues`);
        action = `AI insights generated for "${recording.name.split('.')[0]}" - ${insights.join(', ')}`;
      }

      return { action, icon, time: timeAgo };
    });
  }, [recordings]);

  // Chart data configurations with real data
  const totalRecordingsData = {
    labels: monthLabels,
    datasets: [
      {
        label: 'Total Recordings',
        data: analyticsData.recordingsTrend,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const minutesProcessedData = {
    labels: monthLabels,
    datasets: [
      {
        label: 'Minutes Processed',
        data: analyticsData.minutesTrend,
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
      },
    ],
  };

  const statusBreakdownData = {
    labels: ['Completed', 'Processing', 'Failed'],
    datasets: [
      {
        data: [
          analyticsData.statusBreakdown.completed,
          analyticsData.statusBreakdown.processing,
          analyticsData.statusBreakdown.failed,
        ],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(59, 130, 246)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const insightsData = {
    labels: ['Actions', 'Decisions', 'Issues'],
    datasets: [
      {
        label: 'Insights',
        data: [
          analyticsData.insightsTotal.actions,
          analyticsData.insightsTotal.decisions,
          analyticsData.insightsTotal.issues,
        ],
        backgroundColor: 'rgba(168, 85, 247, 0.8)',
        borderColor: 'rgb(168, 85, 247)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 3,
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: '70%',
  };

  const stats = [
    { 
      title: 'Total Recordings', 
      value: analyticsData.totalRecordings.toString(), 
      change: recordingsChange.value, 
      changeType: recordingsChange.isIncrease ? 'increase' : 'decrease',
      chartType: 'line' as const,
      chartData: totalRecordingsData,
      chartOptions: lineChartOptions
    },
    { 
      title: 'Minutes Processed', 
      value: analyticsData.minutesProcessed.toLocaleString(), 
      change: minutesChange.value, 
      changeType: minutesChange.isIncrease ? 'increase' : 'decrease',
      chartType: 'bar' as const,
      chartData: minutesProcessedData,
      chartOptions: barChartOptions
    },
    { 
      title: 'Status Breakdown', 
      value: `${analyticsData.statusBreakdown.completed}`, 
      change: `${analyticsData.statusBreakdown.completed} completed`, 
      changeType: 'increase' as const,
      chartType: 'doughnut' as const,
      chartData: statusBreakdownData,
      chartOptions: doughnutOptions
    },
    { 
      title: 'Total Insights', 
      value: (analyticsData.insightsTotal.actions + 
              analyticsData.insightsTotal.decisions + 
              analyticsData.insightsTotal.issues).toString(), 
      change: `${analyticsData.insightsTotal.actions} actions`, 
      changeType: 'increase' as const,
      chartType: 'bar' as const,
      chartData: insightsData,
      chartOptions: barChartOptions
    },
  ];

  // Navigation handlers
  const handleOpenUploadModal = () => {
    dispatch(openUploadModal());
  };

  const handleCloseUploadModal = () => {
    dispatch(closeUploadModal());
  };

  const handleNavigateToRecordings = () => {
    navigate('/app/recordings');
  };

  const handleNavigateToSettings = () => {
    navigate('/app/settings');
  };

  const handleNavigateToBilling = () => {
    navigate('/app/billings');
  };

  const handleNavigateToRecording = (id: string) => {
    navigate(`/app/recordings/${id}`);
  };

  const handleUploadComplete = (newRecordings: Recording[]) => {
    // Refresh recordings after upload
    dispatch(fetchRecordings({ 
      getToken,
      limit: 100,
      offset: 0 
    }));
    dispatch(closeUploadModal());
    
    // Navigate to first recording if available
    if (newRecordings.length > 0) {
      navigate(`/app/recordings/${newRecordings[0].id}`);
    }
  };

  // Subscription data with fallback (uses Redux file analytics when API unavailable)
  const subscriptionData = useMemo(() => {
    if (!subscription || subscription.id === 'sub_fallback' || subscription.id === 'sub_error_fallback') {
      // Use Redux file analytics count as fallback for files_uploaded
      return {
        ...FALLBACK_SUBSCRIPTION,
        usage: {
          ...FALLBACK_SUBSCRIPTION.usage,
          files_uploaded: totalUploadedCount, // Use Redux fallback data
          storage_used_gb: totalUploadedSize / (1024 * 1024 * 1024), // Convert bytes to GB
        },
      };
    }
    
    return {
      tier: subscription.tier || subscription.planId || 'Free',
      tierDisplayName: subscription.tierDisplayName || subscription.tier || 'Free Plan',
      status: subscription.status || 'active',
      usage: subscription.usage || FALLBACK_SUBSCRIPTION.usage,
    };
  }, [subscription, totalUploadedCount, totalUploadedSize]);

  // Calculate storage from file analytics (sum of all file sizes)
  const fileAnalyticsStorageGb = useMemo(() => {
    if (!fileAnalytics || fileAnalytics.length === 0) return 0;
    const totalBytes = fileAnalytics.reduce((sum, fa) => sum + (fa.fileSize || 0), 0);
    return totalBytes / (1024 * 1024 * 1024); // Convert bytes to GB
  }, [fileAnalytics]);

  // Computed usage values with multiple fallback sources (for display)
  // Priority: 1. API subscription data -> 2. analyticsData/fileAnalytics -> 3. Redux totals
  const usageValues = useMemo(() => {
    const usage = subscriptionData.usage;
    
    // Files: Use analyticsData.totalRecordings or Redux file analytics count as fallback
    const filesUploaded = usage.files_uploaded || analyticsData.totalRecordings || totalUploadedCount;
    
    // Storage: Use file analytics sum (calculated from each file's size) as fallback
    const storageUsedGb = usage.storage_used_gb || fileAnalyticsStorageGb || (totalUploadedSize / (1024 * 1024 * 1024));
    
    return {
      files_uploaded: filesUploaded,
      files_limit: usage.files_limit,
      storage_used_gb: storageUsedGb,
      storage_limit_gb: usage.storage_limit_gb,
    };
  }, [subscriptionData, analyticsData.totalRecordings, totalUploadedCount, totalUploadedSize, fileAnalyticsStorageGb]);

  // Calculate usage percentages (with Redux fallback support)
  const usagePercentages = useMemo(() => {
    return {
      files: usageValues.files_limit 
        ? Math.round((usageValues.files_uploaded / usageValues.files_limit) * 100)
        : 0,
      storage: usageValues.storage_limit_gb
        ? Math.round((usageValues.storage_used_gb / usageValues.storage_limit_gb) * 100)
        : 0,
    };
  }, [usageValues]);

  return {
    // State
    recordings,
    loading,
    isUploadModalOpen,
    analyticsData,
    usingFallback,
    recentActivity,
    subscriptionLoading,
    
    // Subscription data
    subscription: subscriptionData,
    usagePercentages,
    usageValues, // Computed usage values with Redux fallback support
    
    // File analytics fallback data (stored in Redux for offline/fallback use)
    fileAnalytics,
    totalUploadedSize,
    totalUploadedCount,
    
    // Computed values
    recordingsChange,
    minutesChange,
    monthLabels,
    stats,
    
    // Functions
    handleOpenUploadModal,
    handleCloseUploadModal,
    handleNavigateToRecordings,
    handleNavigateToSettings,
    handleNavigateToBilling,
    handleNavigateToRecording,
    handleUploadComplete,
  };
};

