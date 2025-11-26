import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchRecordings, openUploadModal, closeUploadModal } from '../redux';
import { ANALYTICS_ENDPOINTS, buildUrl } from '../endpoints';
import UploadModal from '../components/ui/upload-modal';
import { Recording } from '../types';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Fallback data for when API is unavailable
const FALLBACK_DATA = {
  totalRecordings: 0,
  recordingsTrend: [0, 0, 0, 0, 0, 0],
  minutesProcessed: 0,
  minutesTrend: [0, 0, 0, 0, 0, 0],
  statusBreakdown: { completed: 0, processing: 0, failed: 0 },
  insightsTotal: { actions: 0, decisions: 0, issues: 0 },
};

interface AnalyticsData {
  totalRecordings: number;
  recordingsTrend: number[];
  minutesProcessed: number;
  minutesTrend: number[];
  statusBreakdown: { completed: number; processing: number; failed: number };
  insightsTotal: { actions: number; decisions: number; issues: number };
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { getToken } = useAuth();
  
  // Redux state
  const { recordings, loading, isUploadModalOpen } = useAppSelector((state) => state.recordings);
  
  // Local state for analytics
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>(FALLBACK_DATA);
  const [usingFallback, setUsingFallback] = useState(false);

  // Fetch recordings on mount
  useEffect(() => {
    dispatch(fetchRecordings({ 
      getToken,
      limit: 100, // Get more for analytics
      offset: 0 
    }));
  }, [dispatch, getToken]);

  // Calculate analytics from recordings data
  const calculatedAnalytics = useMemo((): AnalyticsData => {
    if (!recordings || recordings.length === 0) {
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

    // Total minutes processed
    const minutesProcessed = Math.round(
      recordings.reduce((sum, r) => sum + (r.duration || 0), 0)
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
      return recordings
        .filter(r => {
          const recordingDate = new Date(r.dateUploaded);
          return recordingDate.getMonth() === month.getMonth() && 
                 recordingDate.getFullYear() === month.getFullYear();
        })
        .reduce((sum, r) => sum + (r.duration || 0), 0);
    });

    return {
      totalRecordings: recordings.length,
      recordingsTrend: recordingsTrend.length > 0 ? recordingsTrend : FALLBACK_DATA.recordingsTrend,
      minutesProcessed,
      minutesTrend: minutesTrend.length > 0 ? minutesTrend : FALLBACK_DATA.minutesTrend,
      statusBreakdown,
      insightsTotal,
    };
  }, [recordings]);

  // Update analytics data when calculated
  useEffect(() => {
    if (recordings && recordings.length > 0) {
      setAnalyticsData(calculatedAnalytics);
      setUsingFallback(false);
    } else if (!loading) {
      setUsingFallback(true);
    }
  }, [calculatedAnalytics, recordings, loading]);

  // Try to fetch analytics from API (optional enhancement)
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const token = await getToken();
        if (!token) return;

        const response = await fetch(buildUrl(ANALYTICS_ENDPOINTS.DASHBOARD), {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          // If API returns analytics, use it
          if (data.recordings) {
            setAnalyticsData({
              totalRecordings: data.recordings.total || calculatedAnalytics.totalRecordings,
              recordingsTrend: data.recordings.trend || calculatedAnalytics.recordingsTrend,
              minutesProcessed: data.processing?.total_minutes || calculatedAnalytics.minutesProcessed,
              minutesTrend: data.processing?.trend || calculatedAnalytics.minutesTrend,
              statusBreakdown: data.recordings.by_status || calculatedAnalytics.statusBreakdown,
              insightsTotal: data.intelligence || calculatedAnalytics.insightsTotal,
            });
            setUsingFallback(false);
          }
        }
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

  return (
    <div className="mx-auto max-w-[1200px] space-y-8">
      {/* Header with status indicator */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            {loading ? 'Loading analytics...' : 'Overview of your recordings and activity'}
          </p>
        </div>
        {usingFallback && !loading && (
          <Badge variant="outline" className="text-xs">
            Using sample data
          </Badge>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {stat.value}
              </div>
              
              {/* Chart Container */}
              <div className="h-16 mb-3">
                {stat.chartType === 'line' && (
                  <Line data={stat.chartData} options={stat.chartOptions} />
                )}
                {stat.chartType === 'bar' && (
                  <Bar data={stat.chartData} options={stat.chartOptions} />
                )}
                {stat.chartType === 'doughnut' && (
                  <div className="flex justify-center">
                    <div className="w-16 h-16">
                      <Doughnut data={stat.chartData} options={stat.chartOptions} />
                    </div>
                  </div>
                )}
              </div>
              
              <Badge 
                variant={stat.changeType === 'increase' ? 'default' : 'destructive'}
                className="text-xs"
              >
                {stat.change} from last month
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and changes to your recordings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const getActivityIcon = (icon: string) => {
                  switch (icon) {
                    case 'weeklyteam':
                      return (
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      );
                    case 'clientpresentation':
                      return (
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      );
                    case 'aiintelligence':
                      return (
                        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      );
                    default:
                      return (
                        <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      );
                  }
                };
                
                return (
                  <div key={index} className="flex items-center space-x-4 border-b border-gray-100 dark:border-gray-700 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex-shrink-0">
                      {getActivityIcon(activity.icon)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{activity.action}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button 
                className="w-full justify-start" 
                variant="default"
                onClick={() => dispatch(openUploadModal())}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload Recording
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => navigate('/app/recordings')}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                View Recordings
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => navigate('/app/settings')}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Manage Settings
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => navigate('/app/billing')}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                View Billing
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Redux Store Demo - for testing Redux integration */}
        {/* <ReduxDemo /> */}
      </div>

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => dispatch(closeUploadModal())}
        onUploadComplete={(newRecordings: Recording[]) => {
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
        }}
      />
    </div>
  );
};

export default Dashboard;
