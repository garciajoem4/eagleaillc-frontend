import { useCallback, useState, useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { DetailedIntelligence } from '../types';
import { sampleIntelligence } from '../data/sampleIntelligence';
import { sampleTranscriptData } from '../data/sampleTranscript';
import { fetchAndStoreApiResults } from '../redux/slices/recordingsSlice';
import { audioStorageService } from '../services/audioStorageService';
import { useAppSelector } from '../redux/hooks';

import { ApiResponse } from '../types/api';
import { WorkflowHelpers } from '../endpoints';

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

interface RecordingDetailDependencies {
  dispatch: any;
  getToken: () => Promise<string | null>;
}

const getDataFromAPI = async ({ recordingId, getToken }: { recordingId: string; getToken: () => Promise<string | null> }) => {
  try {
    const data = await WorkflowHelpers.fetchResults(recordingId, getToken);
    
    if (data) {
      // Transform the API data to match our Recording interface
      const apiResults = {
        recordingId,
        recording: data.recording,
        transcript: data.full_transcription || data.transcript,
        intelligence: data.intelligence || data.detailed_intelligence || {
          action_items: data.action_items || [],
          decisions: data.decisions || [],
          issues: data.issues || [],
          questions: data.questions || [],
          executive_summary: data.executive_summary,
          key_topics: data.key_topics || []
        }
      };
      
      return apiResults;
    }
    
    return null;
  } catch (error) {
    console.error('Failed to fetch API results:', error);
    throw error;
  }
}

// Helper function to normalize data structure
const normalizeTranscriptData = (data: ApiResponse | TranscriptData | null): {
  recording: { id: string; file_name: string; duration_seconds: number; created_at?: string };
  transcript: { segments?: Array<{ start_sec?: number; end_sec?: number; start?: number; end?: number; text: string; speaker_label?: string | null; speaker?: string; segment_idx?: number; segments_id?: number }>; full_transcription?: string; total_segments?: number; duration_seconds: number };
  intelligence?: any;
} => {
  // Handle null/undefined data
  if (!data) {
    return {
      recording: {
        id: `temp-${Date.now()}`,
        file_name: 'loading.wav',
        duration_seconds: 0
      },
      transcript: {
        segments: [],
        full_transcription: '',
        total_segments: 0,
        duration_seconds: 0
      },
      intelligence: {
        summary: "",
        actions: [],
        decisions: [],
        issues: [],
        questions: [],
        topics: []
      }
    };
  }

  // Check if it's already in API format
  if ('recording' in data && 'transcript' in data) {
    return data as ApiResponse;
  }
  
  // Convert legacy format to API format
  const legacyData = data as TranscriptData;
  return {
    recording: {
      id: `legacy-${Date.now()}`,
      file_name: legacyData.file_name || 'unknown.wav',
      duration_seconds: legacyData.duration_seconds || 0,
      created_at: legacyData.date_uploaded
    },
    transcript: {
      segments: legacyData.segments?.map((segment, index) => ({
        segment_idx: index,
        start_sec: segment.start,
        end_sec: segment.end,
        text: segment.text,
        speaker_label: segment.speaker || null
      })),
      full_transcription: legacyData.full_transcription,
      total_segments: legacyData.segments?.length || 0,
      duration_seconds: legacyData.duration_seconds || 0,
    },
    intelligence: {
      summary: "",
      actions: [],
      decisions: [],
      issues: [],
      questions: [],
      topics: []
    }
  };
};

export const useRecordingDetail = (
  freeTrialOptions?: FreeTrialOptions,
  dependencies?: RecordingDetailDependencies
) => {
  const { user } = useUser();

  // Extract dependencies
  const { dispatch, getToken } = dependencies || {};

  // State for data management
  const [activeTranscriptData, setActiveTranscriptData] = useState<ApiResponse | TranscriptData | null>(null);
  const [dataSource, setDataSource] = useState<'redux' | 'api' | 'sample' | 'loading'>('loading');
  const [isFetchingResults, setIsFetchingResults] = useState(false);
  const [resultsError, setResultsError] = useState<string | null>(null);
  const [dataAPI, setDataAPI] = useState<ApiResponse | TranscriptData | null>(null);

  // Normalize the data to consistent format
  const normalizedData = useMemo(() => {
    if (!activeTranscriptData) {
      // Return default structure when transcriptData is null
      return {
        recording: {
          id: `temp-${Date.now()}`,
          file_name: 'loading.wav',
          duration_seconds: 0
        },
        transcript: {
          segments: [],
          full_transcription: '',
          total_segments: 0
        },
        intelligence: {
          summary: "",
          actions: [],
          decisions: [],
          issues: [],
          questions: [],
          topics: []
        }
      };
    }
    return normalizeTranscriptData(activeTranscriptData);
  }, [activeTranscriptData]);

  const normalizedDataAPI = useMemo(() => {
    if (!dataAPI) {
      // Return default structure when transcriptData is null
      return {
        recording: {
          id: `temp-${Date.now()}`,
          file_name: 'loading.wav',
          duration_seconds: 0
        },
        transcript: {
          segments: [],
          full_transcription: '',
          total_segments: 0,
          duration_seconds: 0
        },
        intelligence: {
          summary: "",
          actions: [],
          decisions: [],
          issues: [],
          questions: [],
          topics: [],
          content_type: '',
          segments_processed: 0,
          notes: '',
          processed_at: ''
        }
      };
    }
    return normalizeTranscriptData(dataAPI);
  }, [dataAPI]);

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
  
  // Redux selector for recording data
  const reduxRecording = useAppSelector(state => {
    if (!recordingId || recordingId.startsWith('recording-')) {
      return null; // Skip Redux lookup for mock/local recordings
    }

    const recording = state.recordings.recordings.find(r => r.id === recordingId);

    return recording;
  });
  
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoadingAudio, setIsLoadingAudio] = useState(true);
  void isLoadingAudio; // Used by setIsLoadingAudio

  const [detailedIntelligence, setDetailedIntelligence] = useState<DetailedIntelligence | null>(null);
  const [transcriptView, setTranscriptView] = useState<'full' | 'segments'>('segments');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [fullTranscriptSearchQuery, setFullTranscriptSearchQuery] = useState<string>('');
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('0-10');
  const [actionItemsSearch, setActionItemsSearch] = useState<string>('');
  const [decisionsSearch, setDecisionsSearch] = useState<string>('');
  const [issuesSearch, setIssuesSearch] = useState<string>('');
  const [questionsSearch, setQuestionsSearch] = useState<string>('');
  const [audioFileName, setAudioFileName] = useState<string>('');
  
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
          // console.log('Loading audio from localStorage for recording:', recordingId);
          // console.log('User is free trial:', actualIsFreeTrial);
          
          // Use the new getAudioForUser method to get the appropriate version
          const storedAudio = await audioStorageService.getAudioForUser(recordingId, actualIsFreeTrial);

          if (storedAudio) {
            // Create blob URL from stored audio
            const blobUrl = URL.createObjectURL(storedAudio.blob);
            setAudioUrl(blobUrl);
            setAudioFileName(storedAudio?.fileName || '');
            // console.log('Successfully loaded audio from localStorage:', {
            //   recordingId,
            //   isFreeTrial: actualIsFreeTrial,
            //   isTrimmed: storedAudio.metadata?.isTrimmed,
            //   blobUrl
            // });
          } else {
            console.log('No audio found in localStorage, using fallback');
            // Fallback to default audio or show message
            setAudioUrl('/loading.mp3'); // Fallback to sample audio
          }
        } catch (error) {
          console.error('Error loading audio from localStorage:', error);
          // Fallback to default audio
          setAudioUrl('/loading.mp3');
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

  // Load intelligence data - use real data if available, fallback to sample for demonstration
  useEffect(() => {
    if (normalizedData) {
      // Check if we have real intelligence data from API/Redux
      if (normalizedData.intelligence && 
          (normalizedData.intelligence.action_items?.length > 0 || 
          normalizedData.intelligence.decisions?.length > 0 || 
          normalizedData.intelligence.executive_summary)) {
        // Use real intelligence data
        setDetailedIntelligence(normalizedData.intelligence);
      } else {
        // Fallback to sample data for demonstration
        setDetailedIntelligence(sampleIntelligence);
      }
    } else if (!activeTranscriptData) {
      // When activeTranscriptData is null, use sample data temporarily
      setDetailedIntelligence(sampleIntelligence);
    }
  }, [recordingId, normalizedData, activeTranscriptData]);

  // Redux data handling useEffect
  useEffect(() => {
    if (reduxRecording?.transcript) {
      // Transform Redux recording to expected ApiResponse format
      // Check if transcript is already in the correct format or needs transformation
      let transcriptData;
      if (typeof reduxRecording.transcript === 'string') {
        // If transcript is a string, create a basic structure
        transcriptData = {
          segments: [],
          total_segments: 0,
          full_transcription: reduxRecording.transcript,
          duration_seconds: 0
        };
      } else {
        // If transcript is already an object, use it as is
        const transcriptObj = reduxRecording.transcript as any;
        transcriptData = {
          segments: transcriptObj.segments || [],
          total_segments: transcriptObj.segments?.length || 0,
          full_transcription: transcriptObj.full_transcription || transcriptObj,
          duration_seconds: transcriptObj.duration_seconds || 0,
        };
      }

      const reduxData: ApiResponse = {
        recording: {
          id: reduxRecording.id,
          file_name: reduxRecording.name || 'recording.wav',
          duration_seconds: (reduxRecording.duration || 0) * 60, // Convert minutes to seconds
          created_at: reduxRecording.dateUploaded
        },
        transcript: transcriptData,
        intelligence: reduxRecording.intelligence || {
          summary: "",
          actions: [],
          decisions: [],
          issues: [],
          questions: [],
          topics: []
        }
      };
      setActiveTranscriptData(reduxData);
      setDataSource('redux');
    }
  }, [reduxRecording]);

  // API fetching and fallback useEffect
  useEffect(() => {
    if (!recordingId || recordingId.startsWith('recording-')) {
      // Use sample data for mock/local recordings
      setActiveTranscriptData(sampleTranscriptData);
      setDataSource('sample');
      return;
    }

    if (reduxRecording?.transcript || reduxRecording?.intelligence) {
      // Data already available in Redux - this is handled by the previous useEffect
      setIsFetchingResults(false);
      setResultsError(null);
    } else if (dispatch && getToken) {
      // Data not in Redux, attempt to fetch and store it
      setIsFetchingResults(true);
      setResultsError(null);
      
      const fetchAndStoreResults = async () => {
        try {
          const result = await dispatch(fetchAndStoreApiResults({ 
            recordingId, 
            getToken
          })).unwrap();

          
          setActiveTranscriptData(result);
          
          const dataSourceAPI = await getDataFromAPI({recordingId, getToken});

          const tempDataSource = {
            recording: {
              id: recordingId,
              file_name: dataSourceAPI?.recording?.file_name || dataSourceAPI?.transcript?.file_name || '',
              duration_seconds: dataSourceAPI?.transcript?.duration_seconds || 0,
              created_at: new Date().toISOString(),
            },
            transcript: {
              segments: dataSourceAPI?.transcript?.segments || [],
              full_transcription: dataSourceAPI?.transcript?.full_transcription || '',
              total_segments: dataSourceAPI?.transcript?.total_segments || 0,
              duration_seconds: dataSourceAPI?.transcript?.duration_seconds || 0,
            },
            intelligence: {
              summary: dataSourceAPI?.intelligence?.executive_summary || "",
              actions: dataSourceAPI?.intelligence?.action_items || [],
              decisions: dataSourceAPI?.intelligence?.decisions || [],
              issues: dataSourceAPI?.intelligence?.issues || [],
              questions: dataSourceAPI?.intelligence?.questions || [],
              topics: dataSourceAPI?.intelligence?.key_topics || [],
              content_type: dataSourceAPI?.intelligence?.content_type || "",
              segments_processed: dataSourceAPI?.intelligence?.total_segments_processed || 0,
              notes: dataSourceAPI?.intelligence?.confidence_note || "",
              processed_at: dataSourceAPI?.intelligence?.processed_at || ""
            }
          };

          setDataAPI(tempDataSource);
          
          setDataSource('api');
        } catch (error: any) {
          console.error('❌ Failed to fetch recording results:', error);
          
          // Fallback to sample data for demonstration
          setActiveTranscriptData(sampleTranscriptData);
          setDataSource('sample');
          
          // Only show error for non-404 cases (404 is expected for new recordings)
          if (!error.message?.includes('404')) {
            setResultsError(`API Error: ${error.message || 'Failed to fetch results'} - Using sample data for demonstration`);
          }
        } finally {
          setIsFetchingResults(false);
        }
      };

      fetchAndStoreResults();
    }
  }, [recordingId, reduxRecording, dispatch, getToken]);

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

    const totalMinutes = Math.ceil(normalizedDataAPI.recording.duration_seconds / 60);
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
  }, [normalizedDataAPI.recording.duration_seconds]);

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
    return normalizedData.recording.duration_seconds > freeTrialTimeLimit;
  }, [isFreeTrial, normalizedData.recording.duration_seconds, freeTrialTimeLimit]);

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
    if (!normalizedDataAPI?.transcript?.segments) return [];
    
    return normalizedDataAPI.transcript.segments.filter(segment => {
      const matchesSearch = searchQuery === '' || 
        segment.text.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesTimeRange = true;
      const segmentStart = segment.start_sec ?? segment.start ?? 0;
      
      // Free trial restriction: only show segments within the time limit
      if (isFreeTrial && segmentStart >= freeTrialTimeLimit) {
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
        
        matchesTimeRange = segmentStart >= chunkStart && segmentStart < chunkEnd;
      } else if (selectedTimeRange !== 'all') {
        // Use dropdown time range when audio hasn't been played yet
        const [startMin, endMin] = selectedTimeRange.split('-').map(Number);
        const segmentStartMin = Math.floor(segmentStart / 60);
        matchesTimeRange = segmentStartMin >= startMin && segmentStartMin < endMin;
      }
      
      return matchesSearch && matchesTimeRange;
    });
  }, [searchQuery, selectedTimeRange, currentAudioTime, normalizedDataAPI?.transcript?.segments, isFreeTrial, freeTrialTimeLimit]);

  // Get currently active segment based on audio time
  const currentActiveSegment = useMemo(() => {
    if (!normalizedDataAPI?.transcript?.segments || !isAudioPlaying) return null;
    return normalizedDataAPI.transcript.segments.find(segment => {
      const start = segment.start_sec ?? segment.start ?? 0;
      const end = segment.end_sec ?? segment.end ?? 0;
      return currentAudioTime >= start && currentAudioTime <= end;
    });
  }, [currentAudioTime, isAudioPlaying, normalizedDataAPI?.transcript?.segments]);

  interface FilteredActionItem {
    task?: string;
    confidence?: string;
    assigned_to?: string;
    timestamp_start: string;
    timestamp_end: string;
    deadline?: string;
  }

  // Filter intelligence data based on search and type with audio synchronization
  const filteredActionItems = useMemo(() => {
    if (!normalizedDataAPI?.intelligence?.actions) return [];
    return normalizedDataAPI.intelligence.actions.filter((item: FilteredActionItem) => {
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
  }, [actionItemsSearch, normalizedDataAPI?.intelligence?.actions, currentAudioTime, parseTimestampToSeconds, isFreeTrial, freeTrialTimeLimit]);

  interface FilteredDecisionItem {
    reason?: string;
    confidence?: string;
    decision?: string;
    timestamp_start: string;
    timestamp_end: string;
  }

  const filteredDecisions = useMemo(() => {
    if (!normalizedDataAPI?.intelligence?.decisions) return [];
    return normalizedDataAPI.intelligence.decisions.filter((decision: FilteredDecisionItem) => {
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
  }, [decisionsSearch, normalizedDataAPI?.intelligence?.decisions, currentAudioTime, parseTimestampToSeconds, isFreeTrial, freeTrialTimeLimit]);

  interface FilteredIssueItem {
    issue?: string;
    timestamp_start: string;
    timestamp_end: string;
  }
  
  const filteredIssues = useMemo(() => {
    if (!normalizedDataAPI?.intelligence?.issues) return [];
    return normalizedDataAPI.intelligence.issues.filter((issue: FilteredIssueItem) => {
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
  }, [issuesSearch, normalizedDataAPI?.intelligence?.issues, currentAudioTime, parseTimestampToSeconds, isFreeTrial, freeTrialTimeLimit]);

  interface FilteredQuestionItem {
    question?: string;
    timestamp_start: string;
    timestamp_end: string;
  }
  
  const filteredQuestions = useMemo(() => {
    if (!normalizedDataAPI?.intelligence?.questions) return [];
    return normalizedDataAPI?.intelligence?.questions.filter((question: FilteredQuestionItem) => {
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
  }, [questionsSearch, normalizedDataAPI?.intelligence?.questions, currentAudioTime, parseTimestampToSeconds, isFreeTrial, freeTrialTimeLimit]);

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
          full_transcription: normalizedDataAPI?.transcript?.full_transcription,
          segments: normalizedDataAPI?.transcript?.segments,
          duration_seconds: normalizedDataAPI?.recording?.duration_seconds,
          file_name: normalizedDataAPI?.recording?.file_name
        };
      } else if (type === 'full-only') {
        data = {
          full_transcription: normalizedDataAPI?.transcript?.full_transcription,
          duration_seconds: normalizedDataAPI?.recording?.duration_seconds,
          file_name: normalizedDataAPI?.recording?.file_name
        };
      } else if (type === 'segments-only') {
        data = {
          segments: normalizedDataAPI?.transcript?.segments,
          duration_seconds: normalizedDataAPI?.recording?.duration_seconds,
          file_name: normalizedDataAPI?.recording?.file_name
        };
      }
      
      content = JSON.stringify(data, null, 2);
      fileName += '.json';
      mimeType = 'application/json';
    } else if (format === 'csv') {
      if (type === 'segments-only' || type === 'full-segments') {
        content = 'Start Time,End Time,Speaker,Text\n';
        normalizedDataAPI?.transcript?.segments?.forEach(segment => {
          const start = segment.start_sec ?? segment.start ?? 0;
          const end = segment.end_sec ?? segment.end ?? 0;
          const startTime = formatTimestamp(start);
          const endTime = formatTimestamp(end);
          const text = segment.text.replace(/"/g, '""'); // Escape quotes
          const speaker = segment.speaker_label ?? segment.speaker ?? 'Unknown';
          content += `"${startTime}","${endTime}","${speaker}","${text}"\n`;
        });
      } else {
        content = 'Content\n';
        content += `"${normalizedDataAPI?.transcript?.full_transcription?.replace(/"/g, '""') || 'No transcript available'}"`;
      }
      fileName += '.csv';
      mimeType = 'text/csv';
    } else if (format === 'txt') {
      if (type === 'full-segments') {
        const fileName = normalizedDataAPI?.recording?.file_name || 'transcript';
        const duration = normalizedDataAPI?.recording?.duration_seconds || 0;
        content = `Transcript: ${fileName}\n`;
        content += `Duration: ${Math.floor(duration / 60)}m ${Math.floor(duration % 60)}s\n\n`;
        content += '=== FULL TRANSCRIPTION ===\n\n';
        content += normalizedDataAPI?.transcript?.full_transcription || 'No transcript available';
        content += '\n\n=== SEGMENTS ===\n\n';
        normalizedDataAPI?.transcript?.segments?.forEach(segment => {
          const start = segment.start_sec ?? segment.start ?? 0;
          const end = segment.end_sec ?? segment.end ?? 0;
          const speaker = segment.speaker_label ?? segment.speaker ?? 'Unknown';
          content += `[${formatTimestamp(start)} - ${formatTimestamp(end)}] ${speaker}: ${segment.text}\n\n`;
        });
      } else if (type === 'full-only') {
        const fileName = normalizedDataAPI?.recording?.file_name || 'transcript';
        const duration = normalizedDataAPI?.recording?.duration_seconds || 0;
        content = `Transcript: ${fileName}\n`;
        content += `Duration: ${Math.floor(duration / 60)}m ${Math.floor(duration % 60)}s\n\n`;
        content += normalizedDataAPI?.transcript?.full_transcription || 'No transcript available';
      } else if (type === 'segments-only') {
        const fileName = normalizedDataAPI?.recording?.file_name || 'transcript';
        const duration = normalizedDataAPI?.recording?.duration_seconds || 0;
        content = `Transcript Segments: ${fileName}\n`;
        content += `Duration: ${Math.floor(duration / 60)}m ${Math.floor(duration % 60)}s\n\n`;
        normalizedDataAPI?.transcript?.segments?.forEach(segment => {
          const start = segment.start_sec ?? segment.start ?? 0;
          const end = segment.end_sec ?? segment.end ?? 0;
          const speaker = segment.speaker_label ?? segment.speaker ?? 'Unknown';
          content += `[${formatTimestamp(start)} - ${formatTimestamp(end)}] ${speaker}: ${segment.text}\n\n`;
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
    <h1>Transcript: ${normalizedDataAPI?.recording?.file_name || 'transcript'}</h1>
    <p>Duration: ${Math.floor((normalizedDataAPI?.recording?.duration_seconds || 0) / 60)}m ${Math.floor((normalizedDataAPI?.recording?.duration_seconds || 0) % 60)}s</p>
    <p>Generated: ${new Date().toLocaleDateString()}</p>
  </div>`;

      if (type === 'full-segments') {
        htmlContent += '<h2>Full Transcription</h2>';
        htmlContent += `<p>${normalizedDataAPI?.transcript?.full_transcription || 'No transcript available'}</p>`;
        htmlContent += '<h2>Segments</h2>';
        normalizedDataAPI?.transcript?.segments?.forEach(segment => {
          const start = segment.start_sec ?? segment.start ?? 0;
          const end = segment.end_sec ?? segment.end ?? 0;
          const speaker = segment.speaker_label ?? segment.speaker ?? 'Unknown';
          htmlContent += `<div class="segment">
            <span class="timestamp">[${formatTimestamp(start)} - ${formatTimestamp(end)}]</span>
            <span class="speaker">${speaker}:</span>
            ${segment.text}
          </div>`;
        });
      } else if (type === 'full-only') {
        htmlContent += '<h2>Full Transcription</h2>';
        htmlContent += `<p>${normalizedDataAPI?.transcript?.full_transcription || 'No transcript available'}</p>`;
      } else if (type === 'segments-only') {
        htmlContent += '<h2>Segments</h2>';
        normalizedDataAPI?.transcript?.segments?.forEach(segment => {
          const start = segment.start_sec ?? segment.start ?? 0;
          const end = segment.end_sec ?? segment.end ?? 0;
          const speaker = segment.speaker_label ?? segment.speaker ?? 'Unknown';
          htmlContent += `<div class="segment">
            <span class="timestamp">[${formatTimestamp(start)} - ${formatTimestamp(end)}]</span>
            <span class="speaker">${speaker}:</span>
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
  }, [downloadFile, formatTimestamp, normalizedDataAPI?.recording?.duration_seconds, normalizedDataAPI?.recording?.file_name, normalizedDataAPI?.transcript?.full_transcription, normalizedDataAPI?.transcript?.segments]);

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
            action_items: normalizedDataAPI?.intelligence?.actions || [],
            decisions: normalizedDataAPI?.intelligence?.decisions || [],
            issues: normalizedDataAPI?.intelligence?.issues || [],
            questions: normalizedDataAPI?.intelligence?.questions || [],
            executive_summary: normalizedDataAPI?.intelligence?.summary,
            key_topics: normalizedDataAPI?.intelligence?.topics || []
          };
        case 'action-items':
          return normalizedDataAPI?.intelligence?.actions || [];
        case 'decisions':
          return normalizedDataAPI?.intelligence?.decisions || [];
        case 'issues':
          return normalizedDataAPI?.intelligence?.issues || [];
        case 'questions':
          return normalizedDataAPI?.intelligence?.questions || [];
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
  }, [downloadFile, normalizedDataAPI?.intelligence]);

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
    audioFileName,
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

    // New data management state
    dataAPI: normalizedDataAPI,
    reduxRecording,
    activeTranscriptData: normalizedData,
    dataSource,
    isFetchingResults,
    resultsError,

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
