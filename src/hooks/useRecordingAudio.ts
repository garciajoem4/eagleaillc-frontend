// Custom hook for recording audio management with local storage
// Provides easy-to-use interface for components to handle audio recording storage and playback

import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  processFileWithLocalStorage,
  checkLocalAudioStatus,
  getRecordingAudio,
  updateLocalStorageStats,
  clearLocalStorage,
  selectLocalAudioStatus,
  selectLocalStorageStats,
} from '../redux';
import { ProcessFileOptions } from '../services/recordingService';

export interface UseRecordingAudioReturn {
  // State
  localAudioStatus: Record<string, {
    hasLocal: boolean;
    audioUrl?: string;
    lastChecked: string;
  }>;
  localStorageStats: {
    totalFiles: number;
    totalSize: number;
    availableSpace: number;
    utilizationPercentage: number;
  } | null;
  
  // Audio URL helpers
  getAudioUrl: (recordingId: string) => string | undefined;
  hasLocalAudio: (recordingId: string) => boolean;
  
  // Actions
  processFile: (file: File, options?: ProcessFileOptions) => Promise<void>;
  loadAudio: (recordingId: string) => Promise<void>;
  checkAudioStatus: (recordingId: string) => Promise<void>;
  refreshStorageStats: () => Promise<void>;
  clearAllLocalStorage: () => Promise<void>;
  
  // Utilities
  formatFileSize: (bytes: number) => string;
  getStorageUtilization: () => number;
}

export const useRecordingAudio = (): UseRecordingAudioReturn => {
  const dispatch = useAppDispatch();
  
  // Selectors
  const localAudioStatus = useAppSelector(selectLocalAudioStatus);
  const localStorageStats = useAppSelector(selectLocalStorageStats);

  // Audio URL helpers
  const getAudioUrl = useCallback((recordingId: string) => {
    return localAudioStatus[recordingId]?.audioUrl;
  }, [localAudioStatus]);

  const hasLocalAudio = useCallback((recordingId: string) => {
    return localAudioStatus[recordingId]?.hasLocal || false;
  }, [localAudioStatus]);

  // Process file with local storage
  const processFile = useCallback(async (file: File, options?: ProcessFileOptions) => {
    try {
      await dispatch(processFileWithLocalStorage({ file, options })).unwrap();
    } catch (error) {
      console.error('Error processing file:', error);
      throw error;
    }
  }, [dispatch]);

  // Load audio (check local first, then server)
  const loadAudio = useCallback(async (recordingId: string) => {
    try {
      await dispatch(getRecordingAudio(recordingId)).unwrap();
    } catch (error) {
      console.error('Error loading audio:', error);
      throw error;
    }
  }, [dispatch]);

  // Check audio status
  const checkAudioStatus = useCallback(async (recordingId: string) => {
    try {
      await dispatch(checkLocalAudioStatus(recordingId)).unwrap();
    } catch (error) {
      console.error('Error checking audio status:', error);
      throw error;
    }
  }, [dispatch]);

  // Refresh storage statistics
  const refreshStorageStats = useCallback(async () => {
    try {
      await dispatch(updateLocalStorageStats()).unwrap();
    } catch (error) {
      console.error('Error refreshing storage stats:', error);
      throw error;
    }
  }, [dispatch]);

  // Clear all local storage
  const clearAllLocalStorage = useCallback(async () => {
    try {
      await dispatch(clearLocalStorage()).unwrap();
    } catch (error) {
      console.error('Error clearing local storage:', error);
      throw error;
    }
  }, [dispatch]);

  // Utility functions
  const formatFileSize = useCallback((bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }, []);

  const getStorageUtilization = useCallback((): number => {
    if (!localStorageStats) return 0;
    return localStorageStats.utilizationPercentage;
  }, [localStorageStats]);

  // Auto-refresh storage stats on mount
  useEffect(() => {
    refreshStorageStats();
  }, [refreshStorageStats]);

  return {
    // State
    localAudioStatus,
    localStorageStats,
    
    // Audio URL helpers
    getAudioUrl,
    hasLocalAudio,
    
    // Actions
    processFile,
    loadAudio,
    checkAudioStatus,
    refreshStorageStats,
    clearAllLocalStorage,
    
    // Utilities
    formatFileSize,
    getStorageUtilization,
  };
};

export default useRecordingAudio;