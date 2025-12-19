import React from 'react';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import UploadModal from '../components/ui/upload-modal';
import { useRecordings } from '../hooks/useRecordings';

const Recordings: React.FC = () => {
  const {
    // Constants
    MAX_FREE_TRIAL_RECORDINGS,
    
    // State
    recordings,
    loading,
    isUploadModalOpen,
    pagination,
    apiFilters,
    useAPI,
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
  } = useRecordings();

  return (
    <div className="mx-auto max-w-[1200px] space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Recordings</h1>
            {isFreeTrial ? (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Free Trial ({currentUploadedCount}/{MAX_FREE_TRIAL_RECORDINGS})
              </Badge>
            ) : (
              <Badge variant="default" className="bg-green-100 text-green-800">
                {subscription?.tierDisplayName || 'Pro Account'}
              </Badge>
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Manage and organize your audio recordings</p>
        </div>
        {
          (recordings.length > 0 || processingFiles.length > 0) && (
            <div className="flex flex-col items-end gap-2">
              <Button 
                className="btn-primary flex align-center"
                onClick={handleOpenUploadModal}
                disabled={hasReachedLimit}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload Recording
              </Button>
              {hasReachedLimit && (
                <div className="text-xs text-gray-600 text-center">
                  <span className="text-orange-600">Free trial limit reached</span>
                </div>
              )}
            </div>
          )
        }
      </div>

      {/* Usage Stats Card */}
      {/* {subscription?.usage && (
        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Files Uploaded</div>
                <div className="text-2xl font-bold text-gray-900">
                  {subscription.usage.files_uploaded} / {subscription.usage.files_limit_text}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full ${
                      (subscription.usage.files_uploaded / subscription.usage.files_limit) > 0.8 
                        ? 'bg-orange-600' 
                        : 'bg-blue-600'
                    }`}
                    style={{ 
                      width: `${Math.min(100, (subscription.usage.files_uploaded / subscription.usage.files_limit) * 100)}%` 
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Storage Used</div>
                <div className="text-2xl font-bold text-gray-900">
                  {subscription.usage.storage_used_gb.toFixed(2)} / {subscription.usage.storage_limit_gb} GB
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full ${
                      (subscription.usage.storage_used_gb / subscription.usage.storage_limit_gb) > 0.8 
                        ? 'bg-orange-600' 
                        : 'bg-green-600'
                    }`}
                    style={{ 
                      width: `${Math.min(100, (subscription.usage.storage_used_gb / subscription.usage.storage_limit_gb) * 100)}%` 
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Plan</div>
                <div className="text-2xl font-bold text-gray-900">
                  {subscription.tierDisplayName || subscription.tier || 'Free'}
                </div>
                {subscription.limits && (
                  <div className="text-xs text-gray-600 mt-2">
                    Max duration: {subscription.limits.max_file_duration_text}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )} */}

      {/* Approaching Limit Warning */}
      {isFreeTrial && isApproachingLimit && !hasReachedLimit && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-yellow-800">Approaching Free Trial Limit</h3>
                  <p className="text-sm text-yellow-700">
                    You have {MAX_FREE_TRIAL_RECORDINGS - currentUploadedCount} upload{MAX_FREE_TRIAL_RECORDINGS - currentUploadedCount !== 1 ? 's' : ''} remaining. Consider upgrading for unlimited uploads.
                  </p>
                </div>
              </div>
              <Button
                onClick={handleSubscribe}
                variant="outline"
                className="border-yellow-600 text-yellow-700 hover:bg-yellow-100"
              >
                View Plans
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

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
                    You've reached your free trial limit of {MAX_FREE_TRIAL_RECORDINGS} files. Upgrade to continue uploading.
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
      {(recordings.length > 0 || apiFilters.status || apiFilters.search) && (
        <Card>
          <CardContent className='pt-6'>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="searchFilter">Search Filename</Label>
                <Input
                  id="searchFilter"
                  type="text"
                  placeholder="Search by filename..."
                  value={apiFilters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  disabled={isFreeTrial}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="statusFilter">Status</Label>
                <select
                  id="statusFilter"
                  value={apiFilters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  disabled={isFreeTrial}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">All</option>
                  <option value="completed">Completed</option>
                  <option value="processing_asr">Processing ASR</option>
                  <option value="processing_intel">Processing Intelligence</option>
                  <option value="pending_asr">Pending ASR</option>
                  <option value="pending_upload">Pending Upload</option>
                  <option value="failed_asr">Failed ASR</option>
                  <option value="failed_intel">Failed Intel</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sortFilter">Sort By</Label>
                <select
                  id="sortFilter"
                  value={apiFilters.order_by}
                  onChange={(e) => handleFilterChange('order_by', e.target.value)}
                  disabled={isFreeTrial}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="created_at">Created Date</option>
                  <option value="completed_at">Completed Date</option>
                  <option value="duration_seconds">Duration</option>
                  <option value="file_name">Filename</option>
                  <option value="status">Status</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="directionFilter">Direction</Label>
                <select
                  id="directionFilter"
                  value={apiFilters.order_dir}
                  onChange={(e) => handleFilterChange('order_dir', e.target.value)}
                  disabled={isFreeTrial}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="DESC">Descending</option>
                  <option value="ASC">Ascending</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button
                onClick={applyFilters}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Apply Filters'}
              </Button>
              <Button
                variant="outline"
                onClick={handleClearFilters}
                disabled={isFreeTrial}
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Processing Files Section */}
      {processingFiles && processingFiles.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-blue-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <h3 className="text-sm font-semibold text-blue-900">
                  Processing {processingFiles.length} {processingFiles.length === 1 ? 'file' : 'files'}
                </h3>
              </div>
              
              {processingFiles.map((file) => (
                <div key={file.id} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 truncate max-w-md">
                        {file.fileName}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {(file.fileSize / (1024 * 1024)).toFixed(2)} MB • Started {new Date(file.startedAt).toLocaleTimeString()}
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {file.progress}%
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-600 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {/* {file.stage} */}
                      Processing...
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="text-xs text-blue-700 mt-2">
                You can navigate away - processing will continue in the background
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Uploaded On
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Insights
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {displayRecordings.map((recording: any) => (
                      <tr key={recording.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{recording.name.split('.')[0]}</div>
                          {recording.overview && (
                            <div className="text-xs text-gray-500 mt-1 truncate max-w-xs">
                              {recording.overview.substring(0, 60)}...
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {recording.status ? (
                            <Badge variant={getStatusBadgeColor(recording.status) as any}>
                              {recording.status.replace(/_/g, ' ').toUpperCase()}
                            </Badge>
                          ) : (
                            <Badge variant="outline">Local</Badge>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {formatDate(recording.dateUploaded)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="secondary">{formatDuration(recording.duration)}</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-xs space-y-1">
                            {recording.action_count > 0 && (
                              <div className="text-green-600">✓ {recording.action_count} actions</div>
                            )}
                            {recording.decision_count > 0 && (
                              <div className="text-blue-600">✓ {recording.decision_count} decisions</div>
                            )}
                            {recording.issue_count > 0 && (
                              <div className="text-orange-600">⚠ {recording.issue_count} issues</div>
                            )}
                          </div>
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
                        <td colSpan={6} className="px-6 py-4 text-center">
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

          {/* Pagination Controls */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
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
                    <>
                      Showing {pagination.offset + 1} - {Math.min(pagination.offset + pagination.limit, pagination.totalCount)} of {pagination.totalCount} recordings
                    </>
                  )}
                </div>
                
                {!isFreeTrial && useAPI && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(Math.max(0, pagination.offset - pagination.limit))}
                      disabled={pagination.offset === 0 || loading}
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous
                    </Button>
                    
                    <div className="flex items-center px-3 text-sm text-gray-600">
                      Page {pagination.page}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(pagination.offset + pagination.limit)}
                      disabled={!pagination.hasMore || loading}
                    >
                      Next
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No recordings yet</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Upload your first audio or video file to get started with smart transcription and analysis.
            </p>
            <div className="flex flex-col items-center gap-3">
              <Button 
                className="btn-primary"
                onClick={handleOpenUploadModal}
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
        onClose={handleCloseUploadModal}
        onUploadComplete={handleUploadComplete}
      />
    </div>
  );
};

export default Recordings;
