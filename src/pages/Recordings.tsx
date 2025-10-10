import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { Recording } from '../types';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import UploadModal from '../components/ui/upload-modal';
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
} from '../redux';

// Constants for free trial limitations
const FREE_TRIAL_ORG_ID = 'org_33nodgVx3c02DhIoiT1Wen7Xgup';
const FREE_TRIAL_ROLE = 'org:free_trial';
const MAX_FREE_TRIAL_RECORDINGS = 2;

const Recordings: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user: clerkUser } = useUser();
  
  // Redux state selectors
  const { 
    recordings, 
    filters, 
    sort, 
    loading, 
    error, 
    isUploadModalOpen
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

  // Fetch recordings on component mount
  useEffect(() => {
    dispatch(fetchRecordings({}));
  }, [dispatch]);

  // Auto-show upload modal if user has no recordings (first time user)
  useEffect(() => {
    if (recordings.length === 0 && !loading && !error) {
      dispatch(openUploadModal());
    }
  }, [recordings.length, loading, error, dispatch]);

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
    dispatch(fetchRecordings({}));
    dispatch(closeUploadModal());
    
    // Redirect to the first uploaded recording's details page
    if (newRecordings.length > 0) {
      navigate(`/app/recordings/${newRecordings[0].id}`);
    }
  };

  const handleSubscribe = () => {
    console.log('Navigate to subscription page');
    navigate('/app/billing');
  };

  return (
    <div className="mx-auto max-w-[1200px] space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <h1 className="text-3xl font-semibold text-gray-900">Recordings</h1>
            {isFreeTrial && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Free Trial ({recordings.length}/{MAX_FREE_TRIAL_RECORDINGS})
              </Badge>
            )}
          </div>
          <p className="text-gray-600 mt-2">Manage and organize your audio recordings</p>
        </div>
        {
          recordings.length > 0 && (
            <div className="flex flex-col items-end gap-2">
              <Button 
                className="btn-primary flex align-center"
                onClick={() => dispatch(openUploadModal())}
                // disabled={hasReachedLimit}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload Recording
              </Button>
              {/* {hasReachedLimit && (
                <div className="text-sm text-gray-600 text-center">
                  <Button
                    variant="link"
                    onClick={handleSubscribe}
                    className="text-sm text-blue-600 hover:text-blue-800 p-0 h-auto"
                  >
                    Subscribe to a plan
                  </Button>
                </div>
              )} */}
            </div>
          )
        }
      </div>

      {/* Free Trial Limit Notification */}
      {isFreeTrial && hasReachedLimit && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-orange-800">Free Trial Limit Reached</h3>
                  <p className="text-sm text-orange-700">
                    You've reached your free trial limit of {MAX_FREE_TRIAL_RECORDINGS} recordings. Upgrade to continue uploading.
                  </p>
                </div>
              </div>
              <Button
                onClick={handleSubscribe}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                Subscribe Now
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      {recordings.length > 0 && (
        <Card>
          <CardContent className='pt-6'>
            {/* {isFreeTrial && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Free Trial:</strong> Search filters are available with paid plans. 
                  <Button
                    variant="link"
                    onClick={handleSubscribe}
                    className="text-sm text-blue-600 hover:text-blue-800 p-0 h-auto ml-1"
                  >
                    Subscribe to unlock
                  </Button>
                </p>
              </div>
            )} */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nameFilter">Recording Name</Label>
                <Input
                  id="nameFilter"
                  type="text"
                  placeholder="Search by name..."
                  value={filters.name}
                  onChange={(e) => dispatch(setFilters({ ...filters, name: e.target.value }))}
                  disabled={isFreeTrial}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateFromFilter">From Date</Label>
                <Input
                  id="dateFromFilter"
                  type="date"
                  value={filters.dateFrom ? new Date(filters.dateFrom).toISOString().split('T')[0] : ''}
                  onChange={(e) =>
                    dispatch(setFilters({
                      ...filters,
                      dateFrom: e.target.value ? new Date(e.target.value).toISOString() : undefined,
                    }))
                  }
                  disabled={isFreeTrial}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateToFilter">To Date</Label>
                <Input
                  id="dateToFilter"
                  type="date"
                  value={filters.dateTo ? new Date(filters.dateTo).toISOString().split('T')[0] : ''}
                  onChange={(e) =>
                    dispatch(setFilters({
                      ...filters,
                      dateTo: e.target.value ? new Date(e.target.value).toISOString() : undefined,
                    }))
                  }
                  disabled={isFreeTrial}
                />
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => dispatch(clearFilters())}
                  className="w-full"
                  disabled={isFreeTrial}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recordings Table */}
      {recordings.length > 0 ? (
        <>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th 
                        className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 ${
                          sort.field === 'name' ? 'bg-gray-100' : ''
                        }`}
                        onClick={() => handleSort('name')}
                      >
                        Name
                        <span className="ml-2">
                          {sort.field === 'name' ? (sort.direction === 'asc' ? '↑' : '↓') : '↕'}
                        </span>
                      </th>
                      <th 
                        className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 ${
                          sort.field === 'dateUploaded' ? 'bg-gray-100' : ''
                        }`}
                        onClick={() => handleSort('dateUploaded')}
                      >
                        Date Uploaded
                        <span className="ml-2">
                          {sort.field === 'dateUploaded' ? (sort.direction === 'asc' ? '↑' : '↓') : '↕'}
                        </span>
                      </th>
                      <th 
                        className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 ${
                          sort.field === 'duration' ? 'bg-gray-100' : ''
                        }`}
                        onClick={() => handleSort('duration')}
                      >
                        Duration
                        <span className="ml-2">
                          {sort.field === 'duration' ? (sort.direction === 'asc' ? '↑' : '↓') : '↕'}
                        </span>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {displayRecordings.map((recording) => (
                      <tr key={recording.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{recording.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {formatDate(recording.dateUploaded)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="secondary">{formatDuration(recording.duration)}</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleView(recording.id)}
                              title="View Details"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleRemove(recording.id)}
                              title="Remove"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {hasExceededLimit && (
                      <tr className="bg-blue-50 border-t-2 border-blue-200">
                        <td colSpan={4} className="px-6 py-4 text-center">
                          <div className="flex flex-col items-center space-y-2">
                            <p className="text-sm text-blue-800 font-medium">
                              You have more recordings available with a paid plan
                            </p>
                            <Button
                              onClick={handleSubscribe}
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                              size="sm"
                            >
                              Subscribe to a plan
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {displayRecordings.length === 0 && !hasExceededLimit && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No recordings found matching your criteria.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="text-sm text-gray-500">
            {isFreeTrial ? (
              <>
                Showing {displayRecordings.length} of {Math.min(recordings.length, MAX_FREE_TRIAL_RECORDINGS)} recordings 
                {recordings.length > MAX_FREE_TRIAL_RECORDINGS && (
                  <span className="text-blue-600">
                    {` (${recordings.length - MAX_FREE_TRIAL_RECORDINGS} more with paid plan)`}
                  </span>
                )}
              </>
            ) : (
              `Showing ${filteredAndSortedRecordings.length} of ${recordings.length} recordings`
            )}
          </div>
        </>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No recordings yet</h3>
            <p className="text-gray-600 mb-6">
              Upload your first audio or video file to get started with smart transcription and analysis.
            </p>
            <div className="flex flex-col items-center gap-3">
              <Button 
                className="btn-primary"
                onClick={() => dispatch(openUploadModal())}
                disabled={hasReachedLimit}
              >
                Upload Your First Recording
              </Button>
              {hasReachedLimit && (
                <div className="text-sm text-gray-600">
                  <Button
                    variant="link"
                    onClick={handleSubscribe}
                    className="text-sm text-blue-600 hover:text-blue-800 p-0 h-auto"
                  >
                    Subscribe to a plan
                  </Button>
                  {' '}to upload more recordings
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => dispatch(closeUploadModal())}
        onUploadComplete={handleUploadComplete}
      />
    </div>
  );
};

export default Recordings;
