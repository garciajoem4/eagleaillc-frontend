import { useCallback, useState, useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { DetailedIntelligence } from '../types';
import { sampleIntelligence } from '../data/sampleIntelligence';
import { audioStorageService } from '../services/audioStorageService';

interface TranscriptData {
  full_transcription?: string;
  segments?: Array<{
    start: number;
    end: number;
    text: string;
    speaker?: string;
  }>;
  duration_seconds: number;
  file_name: string;
  date_uploaded?: string;
}

interface FreeTrialOptions {
  isFreeTrial: boolean;
  freeTrialTimeLimitSeconds: number;
}

export const useRecordingDetail = (
  sampleTranscriptData: TranscriptData,
  freeTrialOptions?: FreeTrialOptions
) => {
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();

  // Free trial configuration
  const isFreeTrial = freeTrialOptions?.isFreeTrial || false;
  const freeTrialTimeLimit = freeTrialOptions?.freeTrialTimeLimitSeconds || 300;

  // Check if user is actually on free trial based on Clerk organization
  const FREE_TRIAL_ORG_ID = 'org_33nodgVx3c02DhIoiT1Wen7Xgup';
  const FREE_TRIAL_ROLE = 'org:free_trial';
  
  const actualIsFreeTrial = useMemo(() => {
    if (!user?.organizationMemberships) return false;
    
    return user.organizationMemberships.some((membership) => 
      membership.organization.id === FREE_TRIAL_ORG_ID && 
      membership.role === FREE_TRIAL_ROLE
    );
  }, [user?.organizationMemberships]);

  // State variables
  const { id: recordingId } = useParams<{ id: string }>();
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoadingAudio, setIsLoadingAudio] = useState(true);

  const [detailedIntelligence, setDetailedIntelligence] = useState<DetailedIntelligence | null>(null);
  const [transcriptView, setTranscriptView] = useState<'full' | 'segments'>('segments');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [fullTranscriptSearchQuery, setFullTranscriptSearchQuery] = useState<string>('');
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('0-10');
  const [actionItemsSearch, setActionItemsSearch] = useState<string>('');
  const [decisionsSearch, setDecisionsSearch] = useState<string>('');
  const [issuesSearch, setIssuesSearch] = useState<string>('');
  const [questionsSearch, setQuestionsSearch] = useState<string>('');
  
  // Export functionality state
  const [activeAutomationTab, setActiveAutomationTab] = useState<string>('transcript');
  const [isOtherExportsOpen, setIsOtherExportsOpen] = useState<boolean>(false);
  
  // Audio synchronization state
  const [currentAudioTime, setCurrentAudioTime] = useState<number>(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Audio visualization states
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);
  const [frequencyData, setFrequencyData] = useState<Uint8Array>(new Uint8Array(24));

  const fullSegmentButtons: string[] = ['PDF', 'JSON', 'CSV', 'TXT'];
  const fullOnlyButtons: string[] = ['PDF', 'JSON', 'TXT'];
  const segmentsOnlyButtons: string[] = ['PDF', 'CSV', 'TXT'];
  const completeAnalysisButtons: string[] = ['PDF', 'JSON', 'CSV', 'TXT'];
  const actionItemsButtons: string[] = ['PDF', 'JSON', 'CSV', 'TXT'];
  const decisionsButtons: string[] = ['PDF', 'JSON', 'CSV', 'TXT'];
  const issuesButtons: string[] = ['PDF', 'JSON', 'CSV', 'TXT'];
  const questionsButtons: string[] = ['PDF', 'JSON', 'CSV', 'TXT'];

  // Load audio from localStorage
    useEffect(() => {
      const loadAudioFromStorage = async () => {
        if (!recordingId) {
          setIsLoadingAudio(false);
          return;
        }
  
        try {
          console.log('Loading audio from localStorage for recording:', recordingId);
          console.log('User is free trial:', actualIsFreeTrial);
          
          // Use the new getAudioForUser method to get the appropriate version
          const storedAudio = await audioStorageService.getAudioForUser(recordingId, actualIsFreeTrial);
          
          if (storedAudio) {
            // Create blob URL from stored audio
            const blobUrl = URL.createObjectURL(storedAudio.blob);
            setAudioUrl(blobUrl);
            console.log('Successfully loaded audio from localStorage:', {
              recordingId,
              isFreeTrial: actualIsFreeTrial,
              isTrimmed: storedAudio.metadata?.isTrimmed,
              blobUrl
            });
          } else {
            console.log('No audio found in localStorage, using fallback');
            // Fallback to default audio or show message
            setAudioUrl('/july_12_2022_audio.mp3'); // Fallback to sample audio
          }
        } catch (error) {
          console.error('Error loading audio from localStorage:', error);
          // Fallback to default audio
          setAudioUrl('/july_12_2022_audio.mp3');
        } finally {
          setIsLoadingAudio(false);
        }
      };
  
      loadAudioFromStorage();
  
      // Cleanup blob URL when component unmounts or recordingId changes
      return () => {
        if (audioUrl && audioUrl.startsWith('blob:')) {
          URL.revokeObjectURL(audioUrl);
        }
      };
    }, [recordingId, audioUrl, actualIsFreeTrial]);

  // Load sample intelligence data for demonstration
  useEffect(() => {
    if (sampleTranscriptData) {
      setDetailedIntelligence(sampleIntelligence);
    }
  }, [id, sampleTranscriptData]);

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentAudioTime(audio.currentTime);
    };

    const handlePlay = () => {
      setIsAudioPlaying(true);
    };

    const handlePause = () => {
      setIsAudioPlaying(false);
    };

    const handleLoadedMetadata = () => {
      setAudioDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  // Setup audio analysis with Web Audio API
  const setupAudioAnalysis = useCallback(() => {
    if (!audioRef.current || audioContext || analyserNode) return;

    try {
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = context.createAnalyser();
      const source = context.createMediaElementSource(audioRef.current);
      
      analyser.fftSize = 64; // Will give us 32 frequency bins, we'll use 24
      analyser.smoothingTimeConstant = 0.8;
      
      source.connect(analyser);
      analyser.connect(context.destination);
      
      setAudioContext(context);
      setAnalyserNode(analyser);
      setFrequencyData(new Uint8Array(analyser.frequencyBinCount));
    } catch (error) {
      console.error('Error setting up audio analysis:', error);
    }
  }, [audioRef, audioContext, analyserNode]);

  // Animation loop for frequency data
  const updateFrequencyData = useCallback(() => {
    if (!analyserNode) return;

    const dataArray = new Uint8Array(analyserNode.frequencyBinCount);
    analyserNode.getByteFrequencyData(dataArray);
    
    // Take first 24 frequency bins for our visualization
    const displayData = new Uint8Array(24);
    for (let i = 0; i < 24; i++) {
      displayData[i] = dataArray[i];
    }
    
    setFrequencyData(displayData);
  }, [analyserNode]);

  // Separate animation loop management
  useEffect(() => {
    let frameId: number | null = null;
    
    const animate = () => {
      if (isAudioPlaying && analyserNode) {
        updateFrequencyData();
        frameId = requestAnimationFrame(animate);
      }
    };

    if (isAudioPlaying && analyserNode) {
      animate();
    }

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [isAudioPlaying, analyserNode, updateFrequencyData]);

  // Setup audio analysis when audio starts playing
  useEffect(() => {
    if (isAudioPlaying && audioRef.current && !audioContext) {
      setupAudioAnalysis();
    }
  }, [isAudioPlaying, audioContext, setupAudioAnalysis, audioRef]);

  // Cleanup audio context on unmount
  useEffect(() => {
    return () => {
      if (audioContext && audioContext.state !== 'closed') {
        audioContext.close().catch(console.error);
      }
    };
  }, [audioContext]);

  // Generate time range options based on recording duration
  const timeRangeOptions = useMemo(() => {
    const totalMinutes = Math.ceil(sampleTranscriptData.duration_seconds / 60);
    const ranges = [];

    // Add "All Time" at the end
    ranges.push({ value: 'all', label: 'All Time' });
    
    // Add time ranges first (0-10, 10-20, etc.)
    for (let i = 0; i < totalMinutes; i += 5) {
      const endMinute = Math.min(i + 5, totalMinutes);
      ranges.push({
        value: `${i}-${endMinute}`,
        label: `${i}:00 - ${endMinute}:00`
      });
    }
    
    return ranges;
  }, [sampleTranscriptData.duration_seconds]);

  // Generate free trial time range options (only 0-5 minutes)
  const freeTrialTimeRangeOptions = useMemo(() => {
    const ranges = [];
    
    // Only show 0-5 minute range for free trial users
    ranges.push({
      value: '0-5',
      label: '0:00 - 5:00'
    });
    
    return ranges;
  }, []);

  // Check if content exceeds free trial limit
  const hasExceededFreeTrialLimit = useMemo(() => {
    if (!isFreeTrial) return false;
    return sampleTranscriptData.duration_seconds > freeTrialTimeLimit;
  }, [isFreeTrial, sampleTranscriptData.duration_seconds, freeTrialTimeLimit]);

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

  // Filter segments based on search, time range, and audio playback
  const filteredSegments = useMemo(() => {
    if (!sampleTranscriptData.segments) return [];
    
    return sampleTranscriptData.segments.filter(segment => {
      const matchesSearch = searchQuery === '' || 
        segment.text.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesTimeRange = true;
      
      // Free trial restriction: only show segments within the time limit
      if (isFreeTrial && segment.start >= freeTrialTimeLimit) {
        return false;
      }
      
      // When audio has been played (even if paused), filter by 5-minute chunks around current time
      if (currentAudioTime > 0) {
        const chunkDuration = 300; // 5 minutes in seconds
        const chunkStart = Math.floor(currentAudioTime / chunkDuration) * chunkDuration;
        const chunkEnd = chunkStart + chunkDuration;
        
        // For free trial users, also ensure chunk doesn't exceed time limit
        if (isFreeTrial && chunkStart >= freeTrialTimeLimit) {
          return false;
        }
        
        matchesTimeRange = segment.start >= chunkStart && segment.start < chunkEnd;
      } else if (selectedTimeRange !== 'all') {
        // Use dropdown time range when audio hasn't been played yet
        const [startMin, endMin] = selectedTimeRange.split('-').map(Number);
        const segmentStartMin = Math.floor(segment.start / 60);
        matchesTimeRange = segmentStartMin >= startMin && segmentStartMin < endMin;
      }
      
      return matchesSearch && matchesTimeRange;
    });
  }, [searchQuery, selectedTimeRange, currentAudioTime, sampleTranscriptData.segments, isFreeTrial, freeTrialTimeLimit]);

  // Get currently active segment based on audio time
  const currentActiveSegment = useMemo(() => {
    if (!sampleTranscriptData.segments || !isAudioPlaying) return null;
    return sampleTranscriptData.segments.find(segment => 
      currentAudioTime >= segment.start && currentAudioTime <= segment.end
    );
  }, [currentAudioTime, isAudioPlaying, sampleTranscriptData.segments]);

  // Filter intelligence data based on search and type with audio synchronization
  const filteredActionItems = useMemo(() => {
    if (!detailedIntelligence?.action_items) return [];
    return detailedIntelligence.action_items.filter(item => {
      const searchText = actionItemsSearch.toLowerCase();
      const matchesSearch = searchText === '' || 
        item.task?.toLowerCase().includes(searchText) ||
        item.assigned_to?.toLowerCase().includes(searchText);

      // Free trial restriction: only show items within the time limit
      if (isFreeTrial) {
        const itemStartSeconds = parseTimestampToSeconds(item.timestamp_start);
        if (itemStartSeconds >= freeTrialTimeLimit) {
          return false;
        }
      }

      // When audio has been played (even if paused), filter by 5-minute chunks around current time
      if (currentAudioTime > 0) {
        const chunkDuration = 300; // 5 minutes in seconds
        const chunkStart = Math.floor(currentAudioTime / chunkDuration) * chunkDuration;
        const chunkEnd = chunkStart + chunkDuration;
        
        // For free trial users, also ensure chunk doesn't exceed time limit
        if (isFreeTrial && chunkStart >= freeTrialTimeLimit) {
          return false;
        }
        
        const itemStartSeconds = parseTimestampToSeconds(item.timestamp_start);
        const itemEndSeconds = parseTimestampToSeconds(item.timestamp_end);
        
        // Show item if it overlaps with the current 5-minute chunk
        const matchesTimeChunk = itemStartSeconds < chunkEnd && itemEndSeconds > chunkStart;
        return matchesSearch && matchesTimeChunk;
      }

      return matchesSearch;
    });
  }, [actionItemsSearch, detailedIntelligence, currentAudioTime, parseTimestampToSeconds, isFreeTrial, freeTrialTimeLimit]);

  const filteredDecisions = useMemo(() => {
    if (!detailedIntelligence?.decisions) return [];
    return detailedIntelligence.decisions.filter(decision => {
      const searchText = decisionsSearch.toLowerCase();
      const matchesSearch = searchText === '' || 
        decision.decision?.toLowerCase().includes(searchText);

      // Free trial restriction: only show items within the time limit
      if (isFreeTrial) {
        const itemStartSeconds = parseTimestampToSeconds(decision.timestamp_start);
        if (itemStartSeconds >= freeTrialTimeLimit) {
          return false;
        }
      }

      // When audio has been played (even if paused), filter by 5-minute chunks around current time
      if (currentAudioTime > 0) {
        const chunkDuration = 300; // 5 minutes in seconds
        const chunkStart = Math.floor(currentAudioTime / chunkDuration) * chunkDuration;
        const chunkEnd = chunkStart + chunkDuration;
        
        // For free trial users, also ensure chunk doesn't exceed time limit
        if (isFreeTrial && chunkStart >= freeTrialTimeLimit) {
          return false;
        }
        
        const itemStartSeconds = parseTimestampToSeconds(decision.timestamp_start);
        const itemEndSeconds = parseTimestampToSeconds(decision.timestamp_end);
        
        // Show item if it overlaps with the current 5-minute chunk
        const matchesTimeChunk = itemStartSeconds < chunkEnd && itemEndSeconds > chunkStart;
        return matchesSearch && matchesTimeChunk;
      }

      return matchesSearch;
    });
  }, [decisionsSearch, detailedIntelligence, currentAudioTime, parseTimestampToSeconds, isFreeTrial, freeTrialTimeLimit]);

  const filteredIssues = useMemo(() => {
    if (!detailedIntelligence?.issues) return [];
    return detailedIntelligence.issues.filter(issue => {
      const searchText = issuesSearch.toLowerCase();
      const matchesSearch = searchText === '' || 
        issue.issue?.toLowerCase().includes(searchText);

      // Free trial restriction: only show items within the time limit
      if (isFreeTrial) {
        const itemStartSeconds = parseTimestampToSeconds(issue.timestamp_start);
        if (itemStartSeconds >= freeTrialTimeLimit) {
          return false;
        }
      }

      // When audio has been played (even if paused), filter by 5-minute chunks around current time
      if (currentAudioTime > 0) {
        const chunkDuration = 300; // 5 minutes in seconds
        const chunkStart = Math.floor(currentAudioTime / chunkDuration) * chunkDuration;
        const chunkEnd = chunkStart + chunkDuration;
        
        // For free trial users, also ensure chunk doesn't exceed time limit
        if (isFreeTrial && chunkStart >= freeTrialTimeLimit) {
          return false;
        }
        
        const itemStartSeconds = parseTimestampToSeconds(issue.timestamp_start);
        const itemEndSeconds = parseTimestampToSeconds(issue.timestamp_end);
        
        // Show item if it overlaps with the current 5-minute chunk
        const matchesTimeChunk = itemStartSeconds < chunkEnd && itemEndSeconds > chunkStart;
        return matchesSearch && matchesTimeChunk;
      }

      return matchesSearch;
    });
  }, [issuesSearch, detailedIntelligence, currentAudioTime, parseTimestampToSeconds, isFreeTrial, freeTrialTimeLimit]);

  const filteredQuestions = useMemo(() => {
    if (!detailedIntelligence?.questions) return [];
    return detailedIntelligence.questions.filter(question => {
      const searchText = questionsSearch.toLowerCase();
      const matchesSearch = searchText === '' || 
        question.question?.toLowerCase().includes(searchText);

      // Free trial restriction: only show items within the time limit
      if (isFreeTrial) {
        const itemStartSeconds = parseTimestampToSeconds(question.timestamp_start);
        if (itemStartSeconds >= freeTrialTimeLimit) {
          return false;
        }
      }

      // When audio has been played (even if paused), filter by 5-minute chunks around current time
      if (currentAudioTime > 0) {
        const chunkDuration = 300; // 5 minutes in seconds
        const chunkStart = Math.floor(currentAudioTime / chunkDuration) * chunkDuration;
        const chunkEnd = chunkStart + chunkDuration;
        
        // For free trial users, also ensure chunk doesn't exceed time limit
        if (isFreeTrial && chunkStart >= freeTrialTimeLimit) {
          return false;
        }
        
        const itemStartSeconds = parseTimestampToSeconds(question.timestamp_start);
        const itemEndSeconds = parseTimestampToSeconds(question.timestamp_end);
        
        // Show item if it overlaps with the current 5-minute chunk
        const matchesTimeChunk = itemStartSeconds < chunkEnd && itemEndSeconds > chunkStart;
        return matchesSearch && matchesTimeChunk;
      }

      return matchesSearch;
    });
  }, [questionsSearch, detailedIntelligence, currentAudioTime, parseTimestampToSeconds, isFreeTrial, freeTrialTimeLimit]);

  // Get currently active intelligence items based on audio time
  const currentActiveItems = useMemo(() => {
    if (!isAudioPlaying || !detailedIntelligence) return {
      actionItems: [],
      decisions: [],
      issues: [],
      questions: []
    };

    return {
      actionItems: detailedIntelligence.action_items.filter(item => 
        isItemActiveAtTime(item.timestamp_start, item.timestamp_end, currentAudioTime)
      ),
      decisions: detailedIntelligence.decisions.filter(decision => 
        isItemActiveAtTime(decision.timestamp_start, decision.timestamp_end, currentAudioTime)
      ),
      issues: detailedIntelligence.issues.filter(issue => 
        isItemActiveAtTime(issue.timestamp_start, issue.timestamp_end, currentAudioTime)
      ),
      questions: detailedIntelligence.questions.filter(question => 
        isItemActiveAtTime(question.timestamp_start, question.timestamp_end, currentAudioTime)
      )
    };
  }, [currentAudioTime, isAudioPlaying, detailedIntelligence, isItemActiveAtTime]);

  // Export utility functions
  const downloadFile = useCallback((content: string, fileName: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  const formatTimestamp = useCallback((seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Export functions for transcript
  const exportTranscriptData = useCallback((type: 'full-segments' | 'full-only' | 'segments-only', format: 'pdf' | 'json' | 'csv' | 'txt') => {
    const timestamp = new Date().toISOString().split('T')[0];
    let content = '';
    let fileName = `transcript-${type}-${timestamp}`;
    let mimeType = 'text/plain';

    if (format === 'json') {
      let data: any = {};
      
      if (type === 'full-segments') {
        data = {
          full_transcription: sampleTranscriptData.full_transcription,
          segments: sampleTranscriptData.segments,
          duration_seconds: sampleTranscriptData.duration_seconds,
          file_name: sampleTranscriptData.file_name
        };
      } else if (type === 'full-only') {
        data = {
          full_transcription: sampleTranscriptData.full_transcription,
          duration_seconds: sampleTranscriptData.duration_seconds,
          file_name: sampleTranscriptData.file_name
        };
      } else if (type === 'segments-only') {
        data = {
          segments: sampleTranscriptData.segments,
          duration_seconds: sampleTranscriptData.duration_seconds,
          file_name: sampleTranscriptData.file_name
        };
      }
      
      content = JSON.stringify(data, null, 2);
      fileName += '.json';
      mimeType = 'application/json';
    } else if (format === 'csv') {
      if (type === 'segments-only' || type === 'full-segments') {
        content = 'Start Time,End Time,Speaker,Text\n';
        sampleTranscriptData.segments?.forEach(segment => {
          const startTime = formatTimestamp(segment.start);
          const endTime = formatTimestamp(segment.end);
          const text = segment.text.replace(/"/g, '""'); // Escape quotes
          content += `"${startTime}","${endTime}","${segment.speaker || 'Unknown'}","${text}"\n`;
        });
      } else {
        content = 'Content\n';
        content += `"${sampleTranscriptData.full_transcription?.replace(/"/g, '""') || 'No transcript available'}"`;
      }
      fileName += '.csv';
      mimeType = 'text/csv';
    } else if (format === 'txt') {
      if (type === 'full-segments') {
        content = `Transcript: ${sampleTranscriptData.file_name}\n`;
        content += `Duration: ${Math.floor(sampleTranscriptData.duration_seconds / 60)}m ${Math.floor(sampleTranscriptData.duration_seconds % 60)}s\n\n`;
        content += '=== FULL TRANSCRIPTION ===\n\n';
        content += sampleTranscriptData.full_transcription || 'No transcript available';
        content += '\n\n=== SEGMENTS ===\n\n';
        sampleTranscriptData.segments?.forEach(segment => {
          content += `[${formatTimestamp(segment.start)} - ${formatTimestamp(segment.end)}] ${segment.speaker || 'Unknown'}: ${segment.text}\n\n`;
        });
      } else if (type === 'full-only') {
        content = `Transcript: ${sampleTranscriptData.file_name}\n`;
        content += `Duration: ${Math.floor(sampleTranscriptData.duration_seconds / 60)}m ${Math.floor(sampleTranscriptData.duration_seconds % 60)}s\n\n`;
        content += sampleTranscriptData.full_transcription || 'No transcript available';
      } else if (type === 'segments-only') {
        content = `Transcript Segments: ${sampleTranscriptData.file_name}\n`;
        content += `Duration: ${Math.floor(sampleTranscriptData.duration_seconds / 60)}m ${Math.floor(sampleTranscriptData.duration_seconds % 60)}s\n\n`;
        sampleTranscriptData.segments?.forEach(segment => {
          content += `[${formatTimestamp(segment.start)} - ${formatTimestamp(segment.end)}] ${segment.speaker || 'Unknown'}: ${segment.text}\n\n`;
        });
      }
      fileName += '.txt';
    } else if (format === 'pdf') {
      // For now, we'll generate HTML content that can be printed as PDF
      let htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Transcript Export</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; }
    .header { border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
    .timestamp { color: #666; font-size: 0.9em; }
    .speaker { font-weight: bold; color: #333; }
    .segment { margin-bottom: 15px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Transcript: ${sampleTranscriptData.file_name}</h1>
    <p>Duration: ${Math.floor(sampleTranscriptData.duration_seconds / 60)}m ${Math.floor(sampleTranscriptData.duration_seconds % 60)}s</p>
    <p>Generated: ${new Date().toLocaleDateString()}</p>
  </div>`;

      if (type === 'full-segments') {
        htmlContent += '<h2>Full Transcription</h2>';
        htmlContent += `<p>${sampleTranscriptData.full_transcription || 'No transcript available'}</p>`;
        htmlContent += '<h2>Segments</h2>';
        sampleTranscriptData.segments?.forEach(segment => {
          htmlContent += `<div class="segment">
            <span class="timestamp">[${formatTimestamp(segment.start)} - ${formatTimestamp(segment.end)}]</span>
            <span class="speaker">${segment.speaker || 'Unknown'}:</span>
            ${segment.text}
          </div>`;
        });
      } else if (type === 'full-only') {
        htmlContent += '<h2>Full Transcription</h2>';
        htmlContent += `<p>${sampleTranscriptData.full_transcription || 'No transcript available'}</p>`;
      } else if (type === 'segments-only') {
        htmlContent += '<h2>Segments</h2>';
        sampleTranscriptData.segments?.forEach(segment => {
          htmlContent += `<div class="segment">
            <span class="timestamp">[${formatTimestamp(segment.start)} - ${formatTimestamp(segment.end)}]</span>
            <span class="speaker">${segment.speaker || 'Unknown'}:</span>
            ${segment.text}
          </div>`;
        });
      }

      htmlContent += '</body></html>';
      content = htmlContent;
      fileName += '.html';
      mimeType = 'text/html';
    }

    downloadFile(content, fileName, mimeType);
  }, [downloadFile, formatTimestamp, sampleTranscriptData]);

  // Export functions for intelligence analysis
  const exportIntelligenceData = useCallback((type: 'all' | 'action-items' | 'decisions' | 'issues' | 'questions', format: 'pdf' | 'json' | 'csv' | 'txt') => {
    const timestamp = new Date().toISOString().split('T')[0];
    let content = '';
    let fileName = `intelligence-${type}-${timestamp}`;
    let mimeType = 'text/plain';

    const getData = () => {
      switch (type) {
        case 'all':
          return {
            action_items: detailedIntelligence?.action_items || [],
            decisions: detailedIntelligence?.decisions || [],
            issues: detailedIntelligence?.issues || [],
            questions: detailedIntelligence?.questions || [],
            executive_summary: detailedIntelligence?.executive_summary,
            key_topics: detailedIntelligence?.key_topics || []
          };
        case 'action-items':
          return detailedIntelligence?.action_items || [];
        case 'decisions':
          return detailedIntelligence?.decisions || [];
        case 'issues':
          return detailedIntelligence?.issues || [];
        case 'questions':
          return detailedIntelligence?.questions || [];
        default:
          return [];
      }
    };

    const data = getData();

    if (format === 'json') {
      content = JSON.stringify(data, null, 2);
      fileName += '.json';
      mimeType = 'application/json';
    } else if (format === 'csv') {
      if (type === 'all') {
        content = 'Type,Item,Timestamp,Additional Info\n';
        
        (data as any).action_items?.forEach((item: any) => {
          content += `"Action Item","${item.task?.replace(/"/g, '""')}","${item.timestamp_start}","Assigned: ${item.assigned_to || 'N/A'}"\n`;
        });
        
        (data as any).decisions?.forEach((item: any) => {
          content += `"Decision","${item.decision?.replace(/"/g, '""')}","${item.timestamp_start}","Confidence: ${item.confidence}"\n`;
        });
        
        (data as any).issues?.forEach((item: any) => {
          content += `"Issue","${item.issue?.replace(/"/g, '""')}","${item.timestamp_start}",""\n`;
        });
        
        (data as any).questions?.forEach((item: any) => {
          content += `"Question","${item.question?.replace(/"/g, '""')}","${item.timestamp_start}",""\n`;
        });
      } else {
        if (type === 'action-items') {
          content = 'Task,Assigned To,Deadline,Timestamp,Confidence\n';
          (data as any[]).forEach((item: any) => {
            content += `"${item.task?.replace(/"/g, '""')}","${item.assigned_to || ''}","${item.deadline || ''}","${item.timestamp_start}","${item.confidence}"\n`;
          });
        } else if (type === 'decisions') {
          content = 'Decision,Reason,Timestamp,Confidence\n';
          (data as any[]).forEach((item: any) => {
            content += `"${item.decision?.replace(/"/g, '""')}","${item.reason?.replace(/"/g, '""') || ''}","${item.timestamp_start}","${item.confidence}"\n`;
          });
        } else if (type === 'issues') {
          content = 'Issue,Timestamp\n';
          (data as any[]).forEach((item: any) => {
            content += `"${item.issue?.replace(/"/g, '""')}","${item.timestamp_start}"\n`;
          });
        } else if (type === 'questions') {
          content = 'Question,Timestamp\n';
          (data as any[]).forEach((item: any) => {
            content += `"${item.question?.replace(/"/g, '""')}","${item.timestamp_start}"\n`;
          });
        }
      }
      fileName += '.csv';
      mimeType = 'text/csv';
    } else if (format === 'txt') {
      content = `Intelligence Analysis Export\nGenerated: ${new Date().toLocaleDateString()}\n\n`;
      
      if (type === 'all') {
        content += '=== EXECUTIVE SUMMARY ===\n\n';
        content += (data as any).executive_summary || 'No summary available';
        content += '\n\n=== KEY TOPICS ===\n\n';
        (data as any).key_topics?.forEach((topic: string) => {
          content += `• ${topic}\n`;
        });
        
        content += '\n\n=== ACTION ITEMS ===\n\n';
        (data as any).action_items?.forEach((item: any, index: number) => {
          content += `${index + 1}. ${item.task}\n`;
          content += `   Timestamp: ${item.timestamp_start}\n`;
          if (item.assigned_to) content += `   Assigned to: ${item.assigned_to}\n`;
          if (item.deadline) content += `   Deadline: ${item.deadline}\n`;
          content += `   Confidence: ${item.confidence}\n\n`;
        });
        
        content += '=== DECISIONS ===\n\n';
        (data as any).decisions?.forEach((item: any, index: number) => {
          content += `${index + 1}. ${item.decision}\n`;
          content += `   Timestamp: ${item.timestamp_start}\n`;
          if (item.reason) content += `   Reason: ${item.reason}\n`;
          content += `   Confidence: ${item.confidence}\n\n`;
        });
        
        content += '=== ISSUES ===\n\n';
        (data as any).issues?.forEach((item: any, index: number) => {
          content += `${index + 1}. ${item.issue}\n`;
          content += `   Timestamp: ${item.timestamp_start}\n\n`;
        });
        
        content += '=== QUESTIONS ===\n\n';
        (data as any).questions?.forEach((item: any, index: number) => {
          content += `${index + 1}. ${item.question}\n`;
          content += `   Timestamp: ${item.timestamp_start}\n\n`;
        });
      } else {
        const typeLabel = type.replace('-', ' ').toUpperCase();
        content += `=== ${typeLabel} ===\n\n`;
        
        (data as any[]).forEach((item: any, index: number) => {
          const itemText = item.task || item.decision || item.issue || item.question;
          content += `${index + 1}. ${itemText}\n`;
          content += `   Timestamp: ${item.timestamp_start}\n`;
          if (item.assigned_to) content += `   Assigned to: ${item.assigned_to}\n`;
          if (item.reason) content += `   Reason: ${item.reason}\n`;
          if (item.confidence) content += `   Confidence: ${item.confidence}\n`;
          content += '\n';
        });
      }
      
      fileName += '.txt';
    } else if (format === 'pdf') {
      // Generate HTML for PDF conversion
      let htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Intelligence Analysis Export</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; }
    .header { border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
    .section { margin-bottom: 30px; }
    .item { margin-bottom: 15px; padding: 10px; border-left: 4px solid #007bff; background: #f8f9fa; }
    .timestamp { color: #666; font-size: 0.9em; }
    .confidence { font-weight: bold; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Intelligence Analysis</h1>
    <p>Generated: ${new Date().toLocaleDateString()}</p>
  </div>`;

      if (type === 'all') {
        htmlContent += '<div class="section"><h2>Executive Summary</h2>';
        htmlContent += `<p>${(data as any).executive_summary || 'No summary available'}</p></div>`;
        
        htmlContent += '<div class="section"><h2>Key Topics</h2><ul>';
        (data as any).key_topics?.forEach((topic: string) => {
          htmlContent += `<li>${topic}</li>`;
        });
        htmlContent += '</ul></div>';
        
        // Add other sections...
        ['action_items', 'decisions', 'issues', 'questions'].forEach(section => {
          const sectionData = (data as any)[section];
          const sectionTitle = section.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
          
          htmlContent += `<div class="section"><h2>${sectionTitle}</h2>`;
          sectionData?.forEach((item: any, index: number) => {
            const itemText = item.task || item.decision || item.issue || item.question;
            htmlContent += `<div class="item">
              <p><strong>${index + 1}.</strong> ${itemText}</p>
              <p class="timestamp">Timestamp: ${item.timestamp_start}</p>
              ${item.confidence ? `<p class="confidence">Confidence: ${item.confidence}</p>` : ''}
            </div>`;
          });
          htmlContent += '</div>';
        });
      } else {
        const typeLabel = type.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
        htmlContent += `<div class="section"><h2>${typeLabel}</h2>`;
        
        (data as any[]).forEach((item: any, index: number) => {
          const itemText = item.task || item.decision || item.issue || item.question;
          htmlContent += `<div class="item">
            <p><strong>${index + 1}.</strong> ${itemText}</p>
            <p class="timestamp">Timestamp: ${item.timestamp_start}</p>
            ${item.confidence ? `<p class="confidence">Confidence: ${item.confidence}</p>` : ''}
          </div>`;
        });
        htmlContent += '</div>';
      }

      htmlContent += '</body></html>';
      content = htmlContent;
      fileName += '.html';
      mimeType = 'text/html';
    }

    downloadFile(content, fileName, mimeType);
  }, [downloadFile, detailedIntelligence]);

  const getSeverityVariant = (value: number | string): "default" | "secondary" | "destructive" | "outline" => {
    if (typeof value === 'number') {
      if (value >= 0.8) return 'default';
      if (value >= 0.6) return 'secondary';
      return 'destructive';
    }
    switch (value?.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'secondary';
    }
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatTimestampFromString = (timestamp: string): string => {
    return timestamp.replace(/(\d{2}):(\d{2}):(\d{2})\.(\d{2})/, '$1:$2:$3');
  };

  const formatSegmentTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderHighlightedText = (text: string, searchTerm: string) => {
    if (!searchTerm.trim()) {
      return text;
    }

    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        `<mark key="${index}" className="bg-yellow-200 px-1 rounded">
          ${part}
        </mark>`
      ) : (
        part
      )
    );
  };

  return {
    // State variables
    recordingId,
    audioUrl,
    setIsLoadingAudio,
    detailedIntelligence,
    setDetailedIntelligence,
    transcriptView,
    setTranscriptView,
    searchQuery,
    setSearchQuery,
    fullTranscriptSearchQuery,
    setFullTranscriptSearchQuery,
    selectedTimeRange,
    setSelectedTimeRange,
    actionItemsSearch,
    setActionItemsSearch,
    decisionsSearch,
    setDecisionsSearch,
    issuesSearch,
    setIssuesSearch,
    questionsSearch,
    setQuestionsSearch,
    activeAutomationTab,
    setActiveAutomationTab,
    isOtherExportsOpen,
    setIsOtherExportsOpen,
    currentAudioTime,
    setCurrentAudioTime,
    isAudioPlaying,
    setIsAudioPlaying,
    audioDuration,
    setAudioDuration,
    audioRef,

    // Audio visualization state
    audioContext,
    analyserNode,
    frequencyData,
    setupAudioAnalysis,
    updateFrequencyData,

    // Plain constants
    fullSegmentButtons,
    fullOnlyButtons,
    segmentsOnlyButtons,
    completeAnalysisButtons,
    actionItemsButtons,
    decisionsButtons,
    issuesButtons,
    questionsButtons,

    // Computed values
    timeRangeOptions,
    filteredSegments,
    currentActiveSegment,
    filteredActionItems,
    filteredDecisions,
    filteredIssues,
    filteredQuestions,
    currentActiveItems,

    // Free trial computed values
    hasExceededFreeTrialLimit,
    freeTrialTimeRangeOptions,

    // Utility functions
    parseTimestampToSeconds,
    isItemActiveAtTime,
    downloadFile,
    formatTimestamp,
    getSeverityVariant,
    formatDate,
    formatTimestampFromString,
    formatSegmentTime,
    renderHighlightedText,
    exportTranscriptData,
    exportIntelligenceData
  };
};
