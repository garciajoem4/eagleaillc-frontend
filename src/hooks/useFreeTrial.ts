import { useCallback, useEffect, useRef, useState } from 'react';
import { sampleIntelligence } from '../data/sampleIntelligence';
import { UploadFile } from './useFileUpload';
import { DetailedIntelligence } from '../types';

const TRIAL_STORAGE_KEY = 'synaptivoice_trial_used';

export const useFreeTrial = () => {
  // State variables
  const [trialUsed, setTrialUsed] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);
  const [currentAudioTime, setCurrentAudioTime] = useState<number>(0);
  const [detailedIntelligence] = useState<DetailedIntelligence>(sampleIntelligence);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Check if trial has been used
  useEffect(() => {
    const used = localStorage.getItem(TRIAL_STORAGE_KEY);
    if (used === 'true') {
      setTrialUsed(true);
    }
  }, []);

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentAudioTime(audio.currentTime);
    };

    const handlePlay = () => {
      // Audio is playing
    };

    const handlePause = () => {
      // Audio is paused
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [showResults]);

  // Utility functions for timestamp handling
  const parseTimestampToSeconds = useCallback((timestamp: string): number => {
    const parts = timestamp.split(':');
    if (parts.length === 3) {
      const hours = parseInt(parts[0]);
      const minutes = parseInt(parts[1]);
      const seconds = parseFloat(parts[2]);
      return hours * 3600 + minutes * 60 + seconds;
    }
    return 0;
  }, []);

  const isItemActiveAtTime = useCallback((startTimestamp: string, endTimestamp: string, currentTime: number): boolean => {
    const startTime = parseTimestampToSeconds(startTimestamp);
    const endTime = parseTimestampToSeconds(endTimestamp);
    return currentTime >= startTime && currentTime <= endTime;
  }, [parseTimestampToSeconds]);

  const handleFileUploadComplete = useCallback((files: UploadFile[]) => {
    setUploadedFiles(files);
  }, []);

  const handleStartTrial = useCallback(async () => {
    if (trialUsed) return;

    setIsProcessing(true);
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mark trial as used
      localStorage.setItem(TRIAL_STORAGE_KEY, 'true');
      setTrialUsed(true);
      setShowResults(true);
    } catch (error) {
      console.error('Trial processing failed:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [trialUsed]);

  const jumpToTimestamp = useCallback((timestamp: string) => {
    const audio = audioRef.current;
    if (audio) {
      const seconds = parseTimestampToSeconds(timestamp);
      audio.currentTime = seconds;
    }
  }, [parseTimestampToSeconds]);

  return {
    // State variables
    trialUsed,
    isProcessing,
    showResults,
    setShowResults,
    uploadedFiles,
    currentAudioTime,
    detailedIntelligence,
    audioRef,

    // Functions
    parseTimestampToSeconds,
    isItemActiveAtTime,
    handleFileUploadComplete,
    handleStartTrial,
    jumpToTimestamp
  };
};