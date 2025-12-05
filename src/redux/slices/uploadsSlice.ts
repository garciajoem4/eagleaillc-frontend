import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Upload file interface
export interface UploadFile {
  file: File;
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error' | 'cancelled';
  error?: string;
  uploadedAt?: Date;
  recordingId?: string; // Link to created recording
}

// Upload configuration
export interface UploadConfig {
  acceptedTypes: string[];
  maxFileSize: number; // in bytes
  maxConcurrentUploads: number;
  chunkSize: number; // for chunked uploads
  retryAttempts: number;
}

// URL upload interface
export interface UrlUpload {
  id: string;
  url: string;
  status: 'pending' | 'processing' | 'success' | 'error';
  progress: number;
  error?: string;
  recordingId?: string;
}

// Batch upload interface
export interface BatchUpload {
  id: string;
  name: string;
  files: string[]; // UploadFile IDs
  status: 'pending' | 'uploading' | 'completed' | 'failed';
  totalFiles: number;
  completedFiles: number;
  failedFiles: number;
  createdAt: Date;
}

// File analytics data for individual recordings
export interface FileAnalytics {
  recordingId: string;
  fileName: string;
  fileSize: number; // in bytes
  fileType: string;
  uploadedAt: string; // ISO date string
  duration?: number; // in seconds
  isTrimmed?: boolean;
  userId?: string;
  tenantId?: string;
}

// Redux state interface
interface UploadsState {
  // File uploads
  files: UploadFile[];
  activeUploads: string[]; // Currently uploading file IDs
  
  // URL uploads
  urlUploads: UrlUpload[];
  
  // Batch uploads
  batches: BatchUpload[];
  
  // Configuration
  config: UploadConfig;
  
  // UI state
  isUploading: boolean;
  totalProgress: number; // Overall progress for all active uploads
  
  // Queue management
  uploadQueue: string[]; // Queued file IDs waiting to upload
  
  // Statistics
  stats: {
    totalUploaded: number;
    totalFailed: number;
    totalSize: number; // Total bytes uploaded
  };
  
  // Analytics - Individual file sizes for analytics
  fileAnalytics: FileAnalytics[];
  
  // Error handling
  error: string | null;
}

// Initial state
const defaultConfig: UploadConfig = {
  acceptedTypes: ['.mp3', '.wav', '.mp4', '.m4a', '.aac', '.webm', '.ogg'],
  maxFileSize: 500 * 1024 * 1024, // 500MB
  maxConcurrentUploads: 3,
  chunkSize: 1024 * 1024, // 1MB chunks
  retryAttempts: 3,
};

const initialState: UploadsState = {
  files: [],
  activeUploads: [],
  urlUploads: [],
  batches: [],
  config: defaultConfig,
  isUploading: false,
  totalProgress: 0,
  uploadQueue: [],
  stats: {
    totalUploaded: 0,
    totalFailed: 0,
    totalSize: 0,
  },
  fileAnalytics: [],
  error: null,
};

// Utility functions
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const validateFile = (file: File, config: UploadConfig): string | null => {
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
};

// Async thunks for upload operations
export const uploadFile = createAsyncThunk(
  'uploads/uploadFile',
  async (uploadFile: UploadFile, { dispatch, rejectWithValue }) => {
    try {
      // Simulate file upload with progress updates
      return new Promise<{ uploadFile: UploadFile; recordingId: string }>((resolve, reject) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 15 + 5; // 5-20% increments
          if (progress > 100) progress = 100;

          // Dispatch progress update
          dispatch(updateFileProgress({ fileId: uploadFile.id, progress }));

          if (progress >= 100) {
            clearInterval(interval);
            
            // Simulate potential error (5% chance)
            if (Math.random() < 0.05) {
              dispatch(setFileError({ 
                fileId: uploadFile.id, 
                error: 'Upload failed. Server error occurred.' 
              }));
              reject(new Error('Upload failed'));
              return;
            }

            // Success - simulate recording creation
            const recordingId = `rec-${generateId()}`;
            resolve({ uploadFile, recordingId });
          }
        }, 200);

        // Simulate network error (2% chance)
        if (Math.random() < 0.02) {
          setTimeout(() => {
            clearInterval(interval);
            dispatch(setFileError({ 
              fileId: uploadFile.id, 
              error: 'Network error. Please check your connection.' 
            }));
            reject(new Error('Network error'));
          }, 1000);
        }
      });
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Upload failed');
    }
  }
);

export const uploadFromUrl = createAsyncThunk(
  'uploads/uploadFromUrl',
  async (params: { url: string; name?: string }, { dispatch, rejectWithValue }) => {
    try {
      const urlUpload: UrlUpload = {
        id: generateId(),
        url: params.url,
        status: 'processing',
        progress: 0,
      };

      // Add URL upload to state
      dispatch(addUrlUpload(urlUpload));

      // Simulate URL processing
      return new Promise<{ urlUpload: UrlUpload; recordingId: string }>((resolve, reject) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 10 + 5;
          if (progress > 100) progress = 100;

          dispatch(updateUrlProgress({ urlId: urlUpload.id, progress }));

          if (progress >= 100) {
            clearInterval(interval);
            
            // Simulate error (3% chance)
            if (Math.random() < 0.03) {
              dispatch(setUrlError({ 
                urlId: urlUpload.id, 
                error: 'Failed to process URL. Invalid or inaccessible content.' 
              }));
              reject(new Error('URL processing failed'));
              return;
            }

            const recordingId = `rec-url-${generateId()}`;
            resolve({ urlUpload, recordingId });
          }
        }, 300);
      });
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'URL upload failed');
    }
  }
);

export const retryUpload = createAsyncThunk(
  'uploads/retryUpload',
  async (fileId: string, { getState, dispatch }) => {
    const state = getState() as { uploads: UploadsState };
    const file = state.uploads.files.find(f => f.id === fileId);
    
    if (!file) {
      throw new Error('File not found');
    }

    // Reset file status
    dispatch(resetFileStatus(fileId));
    
    // Re-queue for upload
    return dispatch(uploadFile(file));
  }
);

export const createBatchUpload = createAsyncThunk(
  'uploads/createBatchUpload',
  async (params: { name: string; fileIds: string[] }, { dispatch, getState }) => {
    const batchUpload: BatchUpload = {
      id: generateId(),
      name: params.name,
      files: params.fileIds,
      status: 'pending',
      totalFiles: params.fileIds.length,
      completedFiles: 0,
      failedFiles: 0,
      createdAt: new Date(),
    };

    // Add batch to state
    dispatch(addBatch(batchUpload));

    // Start uploading files in batch
    dispatch(updateBatchStatus({ batchId: batchUpload.id, status: 'uploading' }));

    const state = getState() as { uploads: UploadsState };
    const filesToUpload = state.uploads.files.filter(f => params.fileIds.includes(f.id));

    try {
      // Upload files with concurrency control
      const uploads = filesToUpload.map(file => dispatch(uploadFile(file)));
      await Promise.allSettled(uploads);

      dispatch(updateBatchStatus({ batchId: batchUpload.id, status: 'completed' }));
      return batchUpload;
    } catch (error) {
      dispatch(updateBatchStatus({ batchId: batchUpload.id, status: 'failed' }));
      throw error;
    }
  }
);

// Redux slice
const uploadsSlice = createSlice({
  name: 'uploads',
  initialState,
  reducers: {
    // File management
    addFiles: (state, action: PayloadAction<File[]>) => {
      const newFiles = action.payload.map(file => {
        const error = validateFile(file, state.config);
        const uploadFile: UploadFile = {
          file,
          id: generateId(),
          name: file.name,
          size: file.size,
          type: file.type,
          progress: 0,
          status: error ? 'error' : 'pending',
          error: error || undefined,
        };
        return uploadFile;
      });

      state.files.push(...newFiles);

      // Add valid files to upload queue
      const validFiles = newFiles.filter(f => f.status === 'pending');
      state.uploadQueue.push(...validFiles.map(f => f.id));
    },

    removeFile: (state, action: PayloadAction<string>) => {
      const fileId = action.payload;
      state.files = state.files.filter(f => f.id !== fileId);
      state.activeUploads = state.activeUploads.filter(id => id !== fileId);
      state.uploadQueue = state.uploadQueue.filter(id => id !== fileId);
    },

    clearFiles: (state) => {
      state.files = [];
      state.activeUploads = [];
      state.uploadQueue = [];
    },

    clearCompletedFiles: (state) => {
      state.files = state.files.filter(f => f.status !== 'success');
    },

    // Upload progress and status
    updateFileProgress: (state, action: PayloadAction<{ fileId: string; progress: number }>) => {
      const { fileId, progress } = action.payload;
      const file = state.files.find(f => f.id === fileId);
      if (file) {
        file.progress = progress;
        file.status = 'uploading';
      }
      
      // Update total progress
      const totalFiles = state.files.filter(f => f.status !== 'error').length;
      const totalProgress = state.files
        .filter(f => f.status !== 'error')
        .reduce((sum, f) => sum + f.progress, 0);
      state.totalProgress = totalFiles > 0 ? totalProgress / totalFiles : 0;
    },

    setFileError: (state, action: PayloadAction<{ fileId: string; error: string }>) => {
      const { fileId, error } = action.payload;
      const file = state.files.find(f => f.id === fileId);
      if (file) {
        file.status = 'error';
        file.error = error;
      }
      
      // Remove from active uploads
      state.activeUploads = state.activeUploads.filter(id => id !== fileId);
      
      // Update stats
      state.stats.totalFailed += 1;
    },

    resetFileStatus: (state, action: PayloadAction<string>) => {
      const fileId = action.payload;
      const file = state.files.find(f => f.id === fileId);
      if (file) {
        file.status = 'pending';
        file.progress = 0;
        file.error = undefined;
      }
    },

    cancelUpload: (state, action: PayloadAction<string>) => {
      const fileId = action.payload;
      const file = state.files.find(f => f.id === fileId);
      if (file) {
        file.status = 'cancelled';
      }
      
      // Remove from active uploads and queue
      state.activeUploads = state.activeUploads.filter(id => id !== fileId);
      state.uploadQueue = state.uploadQueue.filter(id => id !== fileId);
    },

    // URL uploads
    addUrlUpload: (state, action: PayloadAction<UrlUpload>) => {
      state.urlUploads.push(action.payload);
    },

    updateUrlProgress: (state, action: PayloadAction<{ urlId: string; progress: number }>) => {
      const { urlId, progress } = action.payload;
      const urlUpload = state.urlUploads.find(u => u.id === urlId);
      if (urlUpload) {
        urlUpload.progress = progress;
      }
    },

    setUrlError: (state, action: PayloadAction<{ urlId: string; error: string }>) => {
      const { urlId, error } = action.payload;
      const urlUpload = state.urlUploads.find(u => u.id === urlId);
      if (urlUpload) {
        urlUpload.status = 'error';
        urlUpload.error = error;
      }
    },

    removeUrlUpload: (state, action: PayloadAction<string>) => {
      state.urlUploads = state.urlUploads.filter(u => u.id !== action.payload);
    },

    // Batch uploads
    addBatch: (state, action: PayloadAction<BatchUpload>) => {
      state.batches.push(action.payload);
    },

    updateBatchStatus: (state, action: PayloadAction<{ batchId: string; status: BatchUpload['status'] }>) => {
      const { batchId, status } = action.payload;
      const batch = state.batches.find(b => b.id === batchId);
      if (batch) {
        batch.status = status;
      }
    },

    updateBatchProgress: (state, action: PayloadAction<{ batchId: string; completed: number; failed: number }>) => {
      const { batchId, completed, failed } = action.payload;
      const batch = state.batches.find(b => b.id === batchId);
      if (batch) {
        batch.completedFiles = completed;
        batch.failedFiles = failed;
      }
    },

    removeBatch: (state, action: PayloadAction<string>) => {
      state.batches = state.batches.filter(b => b.id !== action.payload);
    },

    // Configuration
    updateConfig: (state, action: PayloadAction<Partial<UploadConfig>>) => {
      state.config = { ...state.config, ...action.payload };
    },

    // Queue management
    processUploadQueue: (state) => {
      const availableSlots = state.config.maxConcurrentUploads - state.activeUploads.length;
      if (availableSlots > 0 && state.uploadQueue.length > 0) {
        const filesToProcess = state.uploadQueue.splice(0, availableSlots);
        state.activeUploads.push(...filesToProcess);
        
        // Update uploading status
        state.isUploading = state.activeUploads.length > 0;
      }
    },

    // Global state
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

    resetUploads: (state) => {
      return { ...initialState, config: state.config };
    },

    // Analytics - Store file size and metadata for analytics
    addFileAnalytics: (state, action: PayloadAction<FileAnalytics>) => {
      // Check if analytics for this recording already exists
      const existingIndex = state.fileAnalytics.findIndex(
        fa => fa.recordingId === action.payload.recordingId
      );
      
      if (existingIndex >= 0) {
        // Update existing analytics
        state.fileAnalytics[existingIndex] = action.payload;
      } else {
        // Add new analytics
        state.fileAnalytics.push(action.payload);
      }
      
      // Update total size in stats
      state.stats.totalSize = state.fileAnalytics.reduce(
        (sum, fa) => sum + fa.fileSize, 0
      );
    },

    removeFileAnalytics: (state, action: PayloadAction<string>) => {
      const recordingId = action.payload;
      state.fileAnalytics = state.fileAnalytics.filter(
        fa => fa.recordingId !== recordingId
      );
      
      // Update total size in stats
      state.stats.totalSize = state.fileAnalytics.reduce(
        (sum, fa) => sum + fa.fileSize, 0
      );
    },

    clearFileAnalytics: (state) => {
      state.fileAnalytics = [];
      state.stats.totalSize = 0;
    },
  },

  extraReducers: (builder) => {
    builder
      // File upload fulfilled
      .addCase(uploadFile.fulfilled, (state, action) => {
        const { uploadFile, recordingId } = action.payload;
        const file = state.files.find(f => f.id === uploadFile.id);
        
        if (file) {
          file.status = 'success';
          file.progress = 100;
          file.uploadedAt = new Date();
          file.recordingId = recordingId;
        }

        // Remove from active uploads
        state.activeUploads = state.activeUploads.filter(id => id !== uploadFile.id);
        
        // Update stats
        state.stats.totalUploaded += 1;
        state.stats.totalSize += uploadFile.size;
        
        // Update uploading status
        state.isUploading = state.activeUploads.length > 0;
      })

      // File upload rejected
      .addCase(uploadFile.rejected, (state, action) => {
        const fileId = action.meta.arg.id;
        const file = state.files.find(f => f.id === fileId);
        
        if (file) {
          file.status = 'error';
          file.error = action.error.message || 'Upload failed';
        }

        // Remove from active uploads
        state.activeUploads = state.activeUploads.filter(id => id !== fileId);
        
        // Update stats
        state.stats.totalFailed += 1;
        
        // Update uploading status
        state.isUploading = state.activeUploads.length > 0;
      })

      // URL upload fulfilled
      .addCase(uploadFromUrl.fulfilled, (state, action) => {
        const { urlUpload, recordingId } = action.payload;
        const url = state.urlUploads.find(u => u.id === urlUpload.id);
        
        if (url) {
          url.status = 'success';
          url.progress = 100;
          url.recordingId = recordingId;
        }
      })

      // URL upload rejected
      .addCase(uploadFromUrl.rejected, (state, action) => {
        const urlId = action.meta.arg.url;
        const url = state.urlUploads.find(u => u.url === urlId);
        
        if (url) {
          url.status = 'error';
          url.error = action.error.message || 'URL upload failed';
        }
      });
  },
});

// Export actions
export const {
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
  setError,
  clearError,
  resetUploads,
  addFileAnalytics,
  removeFileAnalytics,
  clearFileAnalytics,
} = uploadsSlice.actions;

// Selectors
export const selectAllFiles = (state: { uploads: UploadsState }) => state.uploads.files;
export const selectActiveUploads = (state: { uploads: UploadsState }) => state.uploads.activeUploads;
export const selectPendingFiles = (state: { uploads: UploadsState }) => 
  state.uploads.files.filter(f => f.status === 'pending');
export const selectUploadingFiles = (state: { uploads: UploadsState }) => 
  state.uploads.files.filter(f => f.status === 'uploading');
export const selectSuccessfulFiles = (state: { uploads: UploadsState }) => 
  state.uploads.files.filter(f => f.status === 'success');
export const selectFailedFiles = (state: { uploads: UploadsState }) => 
  state.uploads.files.filter(f => f.status === 'error');
export const selectUrlUploads = (state: { uploads: UploadsState }) => state.uploads.urlUploads;
export const selectBatches = (state: { uploads: UploadsState }) => state.uploads.batches;
export const selectUploadStats = (state: { uploads: UploadsState }) => state.uploads.stats;
export const selectIsUploading = (state: { uploads: UploadsState }) => state.uploads.isUploading;
export const selectTotalProgress = (state: { uploads: UploadsState }) => state.uploads.totalProgress;
export const selectUploadConfig = (state: { uploads: UploadsState }) => state.uploads.config;

// Analytics selectors
export const selectFileAnalytics = (state: { uploads: UploadsState }) => state.uploads.fileAnalytics;
export const selectFileAnalyticsById = (state: { uploads: UploadsState }, recordingId: string) => 
  state.uploads.fileAnalytics.find(fa => fa.recordingId === recordingId);
export const selectTotalUploadedSize = (state: { uploads: UploadsState }) => 
  state.uploads.fileAnalytics.reduce((sum, fa) => sum + fa.fileSize, 0);
export const selectTotalUploadedCount = (state: { uploads: UploadsState }) => 
  state.uploads.fileAnalytics.length;
export const selectAverageFileSize = (state: { uploads: UploadsState }) => {
  const analytics = state.uploads.fileAnalytics;
  if (analytics.length === 0) return 0;
  return analytics.reduce((sum, fa) => sum + fa.fileSize, 0) / analytics.length;
};
export const selectRecentUploads = (state: { uploads: UploadsState }, count: number = 5) => 
  [...state.uploads.fileAnalytics]
    .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
    .slice(0, count);

export default uploadsSlice.reducer;