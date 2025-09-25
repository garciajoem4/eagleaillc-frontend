import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

const Recordings: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
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

  return (
    <div className="mx-auto max-w-[1200px] space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <h1 className="text-3xl font-semibold text-gray-900">Recordings</h1>
          </div>
          <p className="text-gray-600 mt-2">Manage and organize your audio recordings</p>
        </div>
        {
          recordings.length > 0 && (
            <Button 
              className="btn-primary flex align-center"
              onClick={() => dispatch(openUploadModal())}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Upload Recording
            </Button>
          )
        }
      </div>

      {/* Filters */}
      {recordings.length > 0 && (
        <Card>
          <CardContent className='pt-6'>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nameFilter">Recording Name</Label>
                <Input
                  id="nameFilter"
                  type="text"
                  placeholder="Search by name..."
                  value={filters.name}
                  onChange={(e) => dispatch(setFilters({ ...filters, name: e.target.value }))}
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
                />
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => dispatch(clearFilters())}
                  className="w-full"
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
                    {filteredAndSortedRecordings.map((recording) => (
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
                  </tbody>
                </table>
              </div>

              {filteredAndSortedRecordings.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No recordings found matching your criteria.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="text-sm text-gray-500">
            Showing {filteredAndSortedRecordings.length} of {recordings.length} recordings
          </div>
        </>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No recordings yet</h3>
            <p className="text-gray-600 mb-6">
              Upload your first audio or video file to get started with smart transcription and analysis.
            </p>
            <Button 
              className="btn-primary"
              onClick={() => dispatch(openUploadModal())}
            >
              Upload Your First Recording
            </Button>
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
