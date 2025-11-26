// Redux store exports
export { store, getState } from './store';
export type { RootState, AppDispatch } from './store';

// Typed hooks exports
export { useAppDispatch, useAppSelector, useReduxDispatch, useReduxSelector } from './hooks';

// Settings slice actions exports
export {
  updateProfile,
  updateNotifications,
  updateRecording,
  updateSecurity,
  updateSetting,
  setLoading,
  setError,
  saveSuccess,
  resetSettings,
} from './slices/settingsSlice';

// Recordings slice actions and selectors exports
export {
  // Actions
  setFilters,
  setSearchQuery,
  clearFilters,
  setSort,
  toggleSort,
  selectRecording,
  deselectRecording,
  toggleRecordingSelection,
  selectAllRecordings,
  clearSelection,
  openUploadModal,
  closeUploadModal,
  setCurrentRecording,
  setPage,
  setPageSize,
  setOffset,
  setApiFilters,
  clearApiFilters,
  toggleAPIMode,
  clearError,
  resetRecordings,
  // Async thunks
  fetchRecordings,
  createRecording,
  updateRecording as updateRecordingAsync,
  deleteRecording,
  processRecording,
  processFileWithLocalStorage,
  checkLocalAudioStatus,
  getRecordingAudio,
  updateLocalStorageStats,
  clearLocalStorage,
  // Selectors
  selectRecordings,
  selectFilteredRecordings,
  selectSortedRecordings,
  selectRecordingById,
  selectIsRecordingSelected,
  selectLocalAudioStatus,
  selectLocalStorageStats,
  selectRecordingAudioUrl,
  selectHasLocalAudio,
} from './slices/recordingsSlice';

// Uploads slice actions and selectors exports
export {
  // Actions
  addFiles,
  removeFile,
  clearFiles,
  clearCompletedFiles,
  updateFileProgress,
  setFileError,
  resetFileStatus,
  cancelUpload,
  addUrlUpload,
  updateUrlProgress,
  setUrlError,
  removeUrlUpload,
  addBatch,
  updateBatchStatus,
  updateBatchProgress,
  removeBatch,
  updateConfig,
  processUploadQueue,
  setError as setUploadError,
  clearError as clearUploadError,
  resetUploads,
  // Async thunks
  uploadFile,
  uploadFromUrl,
  retryUpload,
  createBatchUpload,
  // Selectors
  selectAllFiles,
  selectActiveUploads,
  selectPendingFiles,
  selectUploadingFiles,
  selectSuccessfulFiles,
  selectFailedFiles,
  selectUrlUploads,
  selectBatches,
  selectUploadStats,
  selectIsUploading,
  selectTotalProgress,
  selectUploadConfig,
} from './slices/uploadsSlice';

// Billing slice actions and selectors exports
export {
  // Actions
  setShowUpgradeModal,
  setShowPaymentMethodModal,
  setShowCancelSubscriptionModal,
  setDefaultPaymentMethod,
  removePaymentMethod,
  addUsageWarning,
  clearUsageWarnings,
  removeUsageWarning,
  setError as setBillingError,
  clearError as clearBillingError,
  selectPlan,
  setBillingPage,
  resetBilling,
  // Async thunks
  fetchSubscription,
  createSubscription,
  cancelSubscription,
  fetchPaymentMethods,
  addPaymentMethod,
  fetchBillingRecords,
  fetchCurrentUsage,
  updateBillingPreferences,
  // Selectors
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
} from './slices/billingSlice';

// Re-export default store
export { default } from './store';