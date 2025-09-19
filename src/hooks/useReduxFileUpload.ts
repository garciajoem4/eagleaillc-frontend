import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  addFiles,
  removeFile,
  clearFiles,
  clearCompletedFiles,
  uploadFile,
  uploadFromUrl,
  retryUpload,
  cancelUpload,
  processUploadQueue,
  selectAllFiles,
  selectPendingFiles,
  selectUploadingFiles,
  selectSuccessfulFiles,
  selectFailedFiles,
  selectIsUploading,
  selectTotalProgress,
  selectUploadConfig,
} from '../redux';
import { UploadFile } from '../redux/slices/uploadsSlice';

interface UseReduxFileUploadOptions {
  onUploadComplete?: (files: UploadFile[]) => void;
  onUploadError?: (error: string) => void;
  autoUpload?: boolean; // Automatically start upload when files are added
}

export const useReduxFileUpload = (options: UseReduxFileUploadOptions = {}) => {
  const dispatch = useAppDispatch();
  
  // Redux state selectors
  const allFiles = useAppSelector(selectAllFiles);
  const pendingFiles = useAppSelector(selectPendingFiles);
  const uploadingFiles = useAppSelector(selectUploadingFiles);
  const successfulFiles = useAppSelector(selectSuccessfulFiles);
  const failedFiles = useAppSelector(selectFailedFiles);
  const isUploading = useAppSelector(selectIsUploading);
  const totalProgress = useAppSelector(selectTotalProgress);
  const config = useAppSelector(selectUploadConfig);

  // File handling
  const handleFileSelect = useCallback(async (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    dispatch(addFiles(fileArray));

    // Auto-upload if enabled
    if (options.autoUpload !== false) {
      dispatch(processUploadQueue());
      
      // Start uploads for valid files
      const validFiles = fileArray.filter(file => {
        // Validate file type
        const isValidType = config.acceptedTypes.some(type => {
          if (type.startsWith('.')) {
            return file.name.toLowerCase().endsWith(type.toLowerCase());
          }
          return file.type.includes(type);
        });

        // Validate file size
        const isValidSize = file.size <= config.maxFileSize;

        return isValidType && isValidSize;
      });

      // Upload files
      const uploadPromises = validFiles.map(file => {
        const uploadFileData: UploadFile = {
          file,
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: file.name,
          size: file.size,
          type: file.type,
          progress: 0,
          status: 'pending',
        };
        return dispatch(uploadFile(uploadFileData));
      });

      try {
        const results = await Promise.allSettled(uploadPromises);
        const successfulUploads = results
          .filter(result => result.status === 'fulfilled')
          .map(result => (result as any).value.uploadFile);

        if (successfulUploads.length > 0 && options.onUploadComplete) {
          options.onUploadComplete(successfulUploads);
        }

        const failures = results.filter(result => result.status === 'rejected');
        if (failures.length > 0 && options.onUploadError) {
          options.onUploadError(`${failures.length} file(s) failed to upload`);
        }
      } catch (error) {
        if (options.onUploadError) {
          options.onUploadError(error instanceof Error ? error.message : 'Upload failed');
        }
      }
    }
  }, [dispatch, config, options]);

  // URL upload handling
  const handleUrlUpload = useCallback(async (url: string, name?: string) => {
    try {
      const result = await dispatch(uploadFromUrl({ url, name }));
      
      if (uploadFromUrl.fulfilled.match(result) && options.onUploadComplete) {
        // Create a mock UploadFile for consistency with file uploads
        const mockUploadFile: UploadFile = {
          file: new File([], name || 'URL Upload'),
          id: result.payload.urlUpload.id,
          name: name || 'URL Upload',
          size: 0,
          type: 'url',
          progress: 100,
          status: 'success',
          recordingId: result.payload.recordingId,
        };
        options.onUploadComplete([mockUploadFile]);
      }
    } catch (error) {
      if (options.onUploadError) {
        options.onUploadError(error instanceof Error ? error.message : 'URL upload failed');
      }
    }
  }, [dispatch, options]);

  // File management
  const handleRemoveFile = useCallback((fileId: string) => {
    dispatch(removeFile(fileId));
  }, [dispatch]);

  const handleClearFiles = useCallback(() => {
    dispatch(clearFiles());
  }, [dispatch]);

  const handleClearCompleted = useCallback(() => {
    dispatch(clearCompletedFiles());
  }, [dispatch]);

  // Upload control
  const handleRetryUpload = useCallback((fileId: string) => {
    dispatch(retryUpload(fileId));
  }, [dispatch]);

  const handleCancelUpload = useCallback((fileId: string) => {
    dispatch(cancelUpload(fileId));
  }, [dispatch]);

  const startUploads = useCallback(() => {
    dispatch(processUploadQueue());
  }, [dispatch]);

  // Validation utility
  const validateFile = useCallback((file: File): string | null => {
    // Check file type
    const isValidType = config.acceptedTypes.some(type => {
      if (type.startsWith('.')) {
        return file.name.toLowerCase().endsWith(type.toLowerCase());
      }
      return file.type.includes(type);
    });

    if (!isValidType) {
      return `File type not supported. Accepted types: ${config.acceptedTypes.join(', ')}`;
    }

    // Check file size
    if (file.size > config.maxFileSize) {
      const maxSizeMB = config.maxFileSize / (1024 * 1024);
      return `File size exceeds ${maxSizeMB}MB limit`;
    }

    return null;
  }, [config]);

  // Statistics
  const getUploadStats = useCallback(() => {
    return {
      total: allFiles.length,
      pending: pendingFiles.length,
      uploading: uploadingFiles.length,
      successful: successfulFiles.length,
      failed: failedFiles.length,
      totalProgress,
    };
  }, [allFiles.length, pendingFiles.length, uploadingFiles.length, successfulFiles.length, failedFiles.length, totalProgress]);

  return {
    // Files data
    uploadedFiles: allFiles,
    pendingFiles,
    uploadingFiles,
    successfulFiles,
    failedFiles,
    
    // Status
    isUploading,
    totalProgress,
    
    // File operations
    handleFileSelect,
    handleUrlUpload,
    removeFile: handleRemoveFile,
    clearFiles: handleClearFiles,
    clearCompleted: handleClearCompleted,
    
    // Upload control
    retryUpload: handleRetryUpload,
    cancelUpload: handleCancelUpload,
    startUploads,
    
    // Utilities
    validateFile,
    getUploadStats,
    
    // Configuration
    config,
  };
};

// Export the enhanced hook as default
export default useReduxFileUpload;