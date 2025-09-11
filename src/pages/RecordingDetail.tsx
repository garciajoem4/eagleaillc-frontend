import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { sampleIntelligence } from '../data/sampleIntelligence';
import { sampleTranscriptData } from '../data/sampleTranscript';
import { DetailedIntelligence } from '../types';

const RecordingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [detailedIntelligence, setDetailedIntelligence] = useState<DetailedIntelligence | null>(null);
  const [transcriptView, setTranscriptView] = useState<'full' | 'segments'>('segments');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [fullTranscriptSearchQuery, setFullTranscriptSearchQuery] = useState<string>('');
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('0-10');
  const [actionItemsSearch, setActionItemsSearch] = useState<string>('');
  const [decisionsSearch, setDecisionsSearch] = useState<string>('');
  const [issuesSearch, setIssuesSearch] = useState<string>('');
  const [questionsSearch, setQuestionsSearch] = useState<string>('');
  
  // Audio synchronization state
  const [currentAudioTime, setCurrentAudioTime] = useState<number>(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const audioRef = React.useRef<HTMLAudioElement>(null);

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

  // Audio event handlers
  useEffect(() => {
    setTimeout(() => {
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
    }, 2000);
  }, []);

  // Get unique speakers for filtering
  // const uniqueSpeakers = useMemo(() => {
  //   const speakers = sampleTranscriptData.segments?.map(segment => segment.speaker).filter(Boolean) || [];
  //   return Array.from(new Set(speakers));
  // }, []);

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
  }, []);

  // Filter segments based on search, time range, and audio playback
  const filteredSegments = useMemo(() => {
    if (!sampleTranscriptData.segments) return [];
    
    return sampleTranscriptData.segments.filter(segment => {
      const matchesSearch = searchQuery === '' || 
        segment.text.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesTimeRange = true;
      
      // When audio has been played (even if paused), filter by 5-minute chunks around current time
      if (currentAudioTime > 0) {
        const chunkDuration = 300; // 5 minutes in seconds
        const chunkStart = Math.floor(currentAudioTime / chunkDuration) * chunkDuration;
        const chunkEnd = chunkStart + chunkDuration;
        matchesTimeRange = segment.start >= chunkStart && segment.start < chunkEnd;
      } else if (selectedTimeRange !== 'all') {
        // Use dropdown time range when audio hasn't been played yet
        const [startMin, endMin] = selectedTimeRange.split('-').map(Number);
        const segmentStartMin = Math.floor(segment.start / 60);
        matchesTimeRange = segmentStartMin >= startMin && segmentStartMin < endMin;
      }
      
      return matchesSearch && matchesTimeRange;
    });
  }, [searchQuery, selectedTimeRange, currentAudioTime]);

  // Get currently active segment based on audio time
  const currentActiveSegment = useMemo(() => {
    if (!sampleTranscriptData.segments || !isAudioPlaying) return null;
    return sampleTranscriptData.segments.find(segment => 
      currentAudioTime >= segment.start && currentAudioTime <= segment.end
    );
  }, [currentAudioTime, isAudioPlaying]);

  // Filter intelligence data based on search and type with audio synchronization
  const filteredActionItems = useMemo(() => {
    if (!detailedIntelligence?.action_items) return [];
    return detailedIntelligence.action_items.filter(item => {
      const searchText = actionItemsSearch.toLowerCase();
      const matchesSearch = searchText === '' || 
        item.task?.toLowerCase().includes(searchText) ||
        item.assigned_to?.toLowerCase().includes(searchText);

      // When audio has been played (even if paused), filter by 5-minute chunks around current time
      if (currentAudioTime > 0) {
        const chunkDuration = 300; // 5 minutes in seconds
        const chunkStart = Math.floor(currentAudioTime / chunkDuration) * chunkDuration;
        const chunkEnd = chunkStart + chunkDuration;
        
        const itemStartSeconds = parseTimestampToSeconds(item.timestamp_start);
        const itemEndSeconds = parseTimestampToSeconds(item.timestamp_end);
        
        // Show item if it overlaps with the current 5-minute chunk
        const matchesTimeChunk = itemStartSeconds < chunkEnd && itemEndSeconds > chunkStart;
        return matchesSearch && matchesTimeChunk;
      }

      return matchesSearch;
    });
  }, [actionItemsSearch, detailedIntelligence, currentAudioTime, parseTimestampToSeconds]);

  const filteredDecisions = useMemo(() => {
    if (!detailedIntelligence?.decisions) return [];
    return detailedIntelligence.decisions.filter(decision => {
      const searchText = decisionsSearch.toLowerCase();
      const matchesSearch = searchText === '' || 
        decision.decision?.toLowerCase().includes(searchText);

      // When audio has been played (even if paused), filter by 5-minute chunks around current time
      if (currentAudioTime > 0) {
        const chunkDuration = 300; // 5 minutes in seconds
        const chunkStart = Math.floor(currentAudioTime / chunkDuration) * chunkDuration;
        const chunkEnd = chunkStart + chunkDuration;
        
        const itemStartSeconds = parseTimestampToSeconds(decision.timestamp_start);
        const itemEndSeconds = parseTimestampToSeconds(decision.timestamp_end);
        
        // Show item if it overlaps with the current 5-minute chunk
        const matchesTimeChunk = itemStartSeconds < chunkEnd && itemEndSeconds > chunkStart;
        return matchesSearch && matchesTimeChunk;
      }

      return matchesSearch;
    });
  }, [decisionsSearch, detailedIntelligence, currentAudioTime, parseTimestampToSeconds]);

  const filteredIssues = useMemo(() => {
    if (!detailedIntelligence?.issues) return [];
    return detailedIntelligence.issues.filter(issue => {
      const searchText = issuesSearch.toLowerCase();
      const matchesSearch = searchText === '' || 
        issue.issue?.toLowerCase().includes(searchText);

      // When audio has been played (even if paused), filter by 5-minute chunks around current time
      if (currentAudioTime > 0) {
        const chunkDuration = 300; // 5 minutes in seconds
        const chunkStart = Math.floor(currentAudioTime / chunkDuration) * chunkDuration;
        const chunkEnd = chunkStart + chunkDuration;
        
        const itemStartSeconds = parseTimestampToSeconds(issue.timestamp_start);
        const itemEndSeconds = parseTimestampToSeconds(issue.timestamp_end);
        
        // Show item if it overlaps with the current 5-minute chunk
        const matchesTimeChunk = itemStartSeconds < chunkEnd && itemEndSeconds > chunkStart;
        return matchesSearch && matchesTimeChunk;
      }

      return matchesSearch;
    });
  }, [issuesSearch, detailedIntelligence, currentAudioTime, parseTimestampToSeconds]);

  const filteredQuestions = useMemo(() => {
    if (!detailedIntelligence?.questions) return [];
    return detailedIntelligence.questions.filter(question => {
      const searchText = questionsSearch.toLowerCase();
      const matchesSearch = searchText === '' || 
        question.question?.toLowerCase().includes(searchText);

      // When audio has been played (even if paused), filter by 5-minute chunks around current time
      if (currentAudioTime > 0) {
        const chunkDuration = 300; // 5 minutes in seconds
        const chunkStart = Math.floor(currentAudioTime / chunkDuration) * chunkDuration;
        const chunkEnd = chunkStart + chunkDuration;
        
        const itemStartSeconds = parseTimestampToSeconds(question.timestamp_start);
        const itemEndSeconds = parseTimestampToSeconds(question.timestamp_end);
        
        // Show item if it overlaps with the current 5-minute chunk
        const matchesTimeChunk = itemStartSeconds < chunkEnd && itemEndSeconds > chunkStart;
        return matchesSearch && matchesTimeChunk;
      }

      return matchesSearch;
    });
  }, [questionsSearch, detailedIntelligence, currentAudioTime, parseTimestampToSeconds]);

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

  useEffect(() => {
    // Load sample intelligence data for demonstration
    if (sampleTranscriptData) {
      setDetailedIntelligence(sampleIntelligence);
    }
  }, [id]);

  if (!sampleTranscriptData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Recording Not Found</CardTitle>
            <CardDescription>The requested recording could not be found.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/app/recordings">
              <Button variant="outline">← Back to Recordings</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // const formatDuration = (minutes: number): string => {
  //   const hours = Math.floor(minutes / 60);
  //   const mins = minutes % 60;
  //   return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  // };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatTimestamp = (timestamp: string): string => {
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
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

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

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Link to="/app/recordings">
          <Button variant="outline">← Back to Recordings</Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">{sampleTranscriptData.file_name.split('.')[0] || ''}</h1>
          <p className="text-gray-600 mt-1">Recording Details and Analysis</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="automations">Automations</TabsTrigger>
          <TabsTrigger value="exports">Exports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Audio Player Section */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recording Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="mb-2 text-sm font-medium text-gray-500 block">Audio Playback</label>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-2 rounded-lg border border-blue-100">
                    <div className="mb-4">
                      {/* <h4 className="text-sm font-medium text-gray-700 mb-2">
                        {sampleTranscriptData.file_name}
                      </h4> */}
                      <audio 
                        controls 
                        className="w-full h-12"
                        preload="metadata"
                        style={{
                          filter: 'sepia(20%) saturate(70%) hue-rotate(200deg) brightness(1.1)',
                        }}
                      >
                        <source src="/july_12_2022_audio.mp3" type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          MP3 Audio
                        </Badge>
                        {/* <span className="text-gray-600">
                          Duration: {Math.floor(sampleTranscriptData.duration_seconds / 60)}:{String(Math.floor(sampleTranscriptData.duration_seconds % 60)).padStart(2, '0')}
                        </span> */}
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <span className="text-xs">🎧 High Quality</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Name</label>
                  <p className="text-gray-900">{sampleTranscriptData.file_name.split('.')[0] || ''}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Date Uploaded</label>
                  <p className="text-gray-900">{sampleTranscriptData.date_uploaded ? formatDate(new Date(sampleTranscriptData.date_uploaded)) : '-'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Duration</label>
                  <Badge variant="secondary">{Math.floor(sampleTranscriptData.duration_seconds / 60)}m {Math.floor(sampleTranscriptData.duration_seconds % 60)}s</Badge>
                </div>
                
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Executive Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  {detailedIntelligence?.executive_summary || 'No summary available.'}
                </p>
                {detailedIntelligence && (
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Content Type: </span>
                      <Badge variant="outline">{detailedIntelligence.content_type}</Badge>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Segments Processed: </span>
                      <span className="text-gray-900">{detailedIntelligence.total_segments_processed}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Processed At: </span>
                      <span className="text-gray-900">
                        {new Date(detailedIntelligence.processed_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Key Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {(detailedIntelligence?.key_topics || []).map((topic: string, index: number) => (
                    <Badge key={index} variant="secondary">{topic}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Analysis Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Action Items:</span>
                  <Badge variant="outline">{detailedIntelligence?.action_items.length || 0}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Decisions:</span>
                  <Badge variant="outline">{detailedIntelligence?.decisions.length || 0}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Issues:</span>
                  <Badge variant="outline">{detailedIntelligence?.issues.length || 0}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Questions:</span>
                  <Badge variant="outline">{detailedIntelligence?.questions.length || 0}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Available Exports */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Available Exports</CardTitle>
              </CardHeader>
              <CardContent>
                {/* <div className="flex flex-wrap gap-2">
                  {recording.exports?.map((format, index) => (
                    <Badge key={index} variant="outline">{format}</Badge>
                  )) || <span className="text-gray-500">No exports available</span>}
                </div> */}
              </CardContent>
            </Card>
          </div>

          {detailedIntelligence?.confidence_note && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Processing Note</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-700 bg-amber-50 p-3 rounded-lg">
                  {detailedIntelligence.confidence_note}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="automations" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Tabs defaultValue="transcript" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="transcript">Transcript</TabsTrigger>
                    <TabsTrigger value="intelligence">Intelligence</TabsTrigger>
                  </TabsList>

                  <TabsContent value="transcript" className="space-y-6 mt-6">
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">Transcript</CardTitle>
                        </div>
                        <CardDescription>
                          Duration: {Math.floor(sampleTranscriptData.duration_seconds / 60)}m {Math.floor(sampleTranscriptData.duration_seconds % 60)}s
                          {sampleTranscriptData.segments && ` • ${sampleTranscriptData.segments.length} segments`}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {/* Transcript View Toggle */}
                        <div className="mb-4">
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant={transcriptView === 'full' ? 'default' : 'outline'}
                              onClick={() => setTranscriptView('full')}
                            >
                              Full Text
                            </Button>
                            <Button 
                              size="sm" 
                              variant={transcriptView === 'segments' ? 'default' : 'outline'}
                              onClick={() => setTranscriptView('segments')}
                            >
                              Segments
                            </Button>
                          </div>
                        </div>

                        {/* Search and Filter Controls (only show for segments view) */}
                        {transcriptView === 'segments' && (
                          <div className="mb-4 space-y-3">
                            <div className="flex gap-3">
                              <div className="flex-1">
                                <Input
                                  placeholder="Search transcript..."
                                  value={searchQuery}
                                  onChange={(e) => setSearchQuery(e.target.value)}
                                  className="w-full"
                                />
                              </div>
                              <div className="min-w-[150px]">
                                <select
                                  value={selectedTimeRange}
                                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  disabled={currentAudioTime > 0}
                                >
                                  {timeRangeOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            
                            {/* Audio-based filtering indicator */}
                            {currentAudioTime > 0 && (
                              <div className="flex items-center gap-2 text-sm bg-blue-50 p-2 rounded-lg border border-blue-200">
                                <div className="flex items-center gap-2">
                                  <Badge variant="default" className="bg-blue-100 text-blue-800">
                                    {isAudioPlaying ? '' : 'PAUSED |'} Audio Filter: {Math.floor(Math.floor(currentAudioTime / 300) * 300 / 60)}:00 - {Math.floor((Math.floor(currentAudioTime / 300) * 300 + 300) / 60)}:00
                                  </Badge>
                                  <span className="text-blue-600">({filteredSegments.length} segments)</span>
                                </div>
                              </div>
                            )}
                            
                            {(searchQuery || (selectedTimeRange !== 'all' && currentAudioTime === 0)) && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span>Showing {filteredSegments.length} of {sampleTranscriptData.segments?.length || 0} segments</span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    setSearchQuery('');
                                    setSelectedTimeRange('0-10');
                                  }}
                                >
                                  Clear filters
                                </Button>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Search Control for Full Transcript View */}
                        {transcriptView === 'full' && (
                          <div className="mb-4 space-y-3">
                            <div className="flex gap-3">
                              <div className="flex-1">
                                <Input
                                  placeholder="Search full transcript..."
                                  value={fullTranscriptSearchQuery}
                                  onChange={(e) => setFullTranscriptSearchQuery(e.target.value)}
                                  className="w-full"
                                />
                              </div>
                            </div>
                            {fullTranscriptSearchQuery && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span>Searching for: "{fullTranscriptSearchQuery}"</span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => setFullTranscriptSearchQuery('')}
                                >
                                  Clear search
                                </Button>
                              </div>
                            )}
                          </div>
                        )}

                        {transcriptView === 'full' ? (
                          <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                            <p className="text-gray-700 whitespace-pre-wrap">
                              {sampleTranscriptData.full_transcription ? (
                                renderHighlightedText(sampleTranscriptData.full_transcription, fullTranscriptSearchQuery)
                              ) : (
                                'Transcript not available yet. Processing may still be in progress.'
                              )}
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-3 max-h-96 overflow-y-auto">
                            {filteredSegments.length > 0 ? filteredSegments.map((segment, index) => {
                              const isCurrentlyActive = currentActiveSegment?.start === segment.start && currentActiveSegment?.end === segment.end;
                              return (
                                <div 
                                  key={index} 
                                  className={`flex gap-4 p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer ${
                                    isCurrentlyActive 
                                      ? 'bg-blue-50 border-l-4 border-l-blue-500 shadow-md' 
                                      : 'bg-gray-50'
                                  }`}
                                >
                                  <div className="flex-shrink-0 text-right min-w-[95px]">
                                    <div className={`text-xs font-mono mb-1 ${
                                      isCurrentlyActive ? 'text-blue-600 font-bold' : 'text-gray-500'
                                    }`}>
                                      {formatSegmentTime(segment.start)} - {formatSegmentTime(segment.end)}
                                    </div>
                                    {isCurrentlyActive && (
                                      <Badge variant="default" className="text-xs bg-blue-100 text-blue-800">
                                        Active
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <p className={`text-sm ${
                                      isCurrentlyActive ? 'text-blue-900 font-medium' : 'text-gray-900'
                                    }`}>
                                      {searchQuery ? (
                                        segment.text.split(new RegExp(`(${searchQuery})`, 'gi')).map((part, i) =>
                                          part.toLowerCase() === searchQuery.toLowerCase() ? (
                                            <mark key={i} className="bg-yellow-200 px-1 rounded">
                                              {part}
                                            </mark>
                                          ) : (
                                            part
                                          )
                                        )
                                      ) : (
                                        segment.text
                                      )}
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">
                                      <span className={`text-xs ${
                                        isCurrentlyActive ? 'text-blue-600' : 'text-gray-500'
                                      }`}>
                                        Duration: {Math.round((segment.end - segment.start) * 10) / 10}s
                                      </span>
                                      {/* {isCurrentlyActive && (
                                        <span className="text-xs text-blue-600">
                                          Currently playing
                                        </span>
                                      )} */}
                                    </div>
                                  </div>
                                </div>
                              );
                            }) : (
                              <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                                {searchQuery || selectedTimeRange !== 'all' 
                                  ? 'No segments match your search criteria' 
                                  : 'No segments available'
                                }
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="intelligence" className="space-y-6 mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Intelligence Analysis</CardTitle>
                        <CardDescription>
                          Search and filter from your recording
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Tabs defaultValue="action-items" className="w-full">
                          <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="action-items">Action Items</TabsTrigger>
                            <TabsTrigger value="decisions">Decisions</TabsTrigger>
                            <TabsTrigger value="issues">Issues</TabsTrigger>
                            <TabsTrigger value="questions">Questions</TabsTrigger>
                          </TabsList>

                          {/* Action Items Tab */}
                          <TabsContent value="action-items" className="space-y-4">
                            <div className="flex gap-3">
                              <div className="flex-1">
                                <Input
                                  placeholder="Search action items..."
                                  value={actionItemsSearch}
                                  onChange={(e) => setActionItemsSearch(e.target.value)}
                                  className="w-full"
                                />
                              </div>
                            </div>
                            
                            {/* Audio-based filtering indicator */}
                            {currentAudioTime > 0 && (
                              <div className="flex items-center gap-2 text-sm bg-blue-50 p-2 rounded-lg border border-blue-200">
                                <div className="flex items-center gap-2">
                                  <Badge variant="default" className="bg-blue-100 text-blue-800">
                                    {isAudioPlaying ? '' : 'PAUSED |'} Audio Filter: {Math.floor(Math.floor(currentAudioTime / 300) * 300 / 60)}:00 - {Math.floor((Math.floor(currentAudioTime / 300) * 300 + 300) / 60)}:00
                                  </Badge>
                                  <span className="text-blue-600">({filteredActionItems.length} items)</span>
                                </div>
                              </div>
                            )}
                            
                            {actionItemsSearch && currentAudioTime === 0 && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span>Showing {filteredActionItems.length} of {detailedIntelligence?.action_items.length || 0} action items</span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => setActionItemsSearch('')}
                                >
                                  Clear search
                                </Button>
                              </div>
                            )}
                            
                            <div className="space-y-3">
                              <div className="flex items-center gap-3 mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Action Items</h3>
                                <Badge variant="outline">{filteredActionItems.length}</Badge>
                                {filteredActionItems.length !== (detailedIntelligence?.action_items.length || 0) && (
                                  <Badge variant="secondary" className="text-xs">
                                    of {detailedIntelligence?.action_items.length || 0} total
                                  </Badge>
                                )}
                              </div>
                              {filteredActionItems.length ? (
                                <div className="space-y-3 max-h-96 overflow-y-auto">
                                  {filteredActionItems.map((item, index) => {
                                    const isCurrentlyActive = currentActiveItems.actionItems.some(activeItem => 
                                      activeItem.timestamp_start === item.timestamp_start && 
                                      activeItem.timestamp_end === item.timestamp_end
                                    );
                                    return (
                                      <Card key={index} className={`border-l-4 ${
                                        isCurrentlyActive 
                                          ? 'border-l-blue-500 bg-blue-50 shadow-md' 
                                          : 'border-l-blue-500'
                                      }`}>
                                        <CardContent className="p-4">
                                          <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center text-xs gap-2">
                                              Confidence:
                                              <Badge variant="outline" className="text-xs bg-gray-200">
                                                {item.confidence}
                                              </Badge>
                                              {isCurrentlyActive && (
                                                <Badge variant="default" className="text-xs bg-blue-100 text-blue-800">
                                                  Active
                                                </Badge>
                                              )}
                                            </div>
                                            <div className={`text-xs ${
                                              isCurrentlyActive ? 'text-blue-600 font-bold' : 'text-gray-500'
                                            }`}>
                                              {/* {formatTimestamp(item.timestamp_start)} - {formatTimestamp(item.timestamp_end)} */}
                                              {formatTimestamp(item.timestamp_start)}
                                            </div>
                                          </div>
                                          <p className={`text-sm mb-2 ${
                                            isCurrentlyActive ? 'text-blue-900 font-medium' : 'text-gray-900'
                                          }`}>
                                            {actionItemsSearch && item.task ? (
                                              item.task.split(new RegExp(`(${actionItemsSearch})`, 'gi')).map((part: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined, i: React.Key | null | undefined) =>
                                                typeof part === 'string' && part.toLowerCase() === actionItemsSearch.toLowerCase() ? (
                                                  <mark key={i} className="bg-yellow-200 px-1 rounded">
                                                    {part}
                                                  </mark>
                                                ) : (
                                                  part
                                                )
                                              )
                                            ) : (
                                              item.task
                                            )}
                                          </p>
                                          {item.assigned_to && (
                                            <p className={`text-sm ${
                                              isCurrentlyActive ? 'text-blue-700' : 'text-gray-600'
                                            }`}>
                                              Assigned To: {actionItemsSearch && item.assigned_to.toLowerCase().includes(actionItemsSearch.toLowerCase()) ? (
                                                item.assigned_to.split(new RegExp(`(${actionItemsSearch})`, 'gi')).map((part: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined, i: React.Key | null | undefined) =>
                                                  typeof part === 'string' && part.toLowerCase() === actionItemsSearch.toLowerCase() ? (
                                                    <mark key={i} className="bg-yellow-200 px-1 rounded">
                                                      {part}
                                                    </mark>
                                                  ) : (
                                                    part
                                                  )
                                                )
                                              ) : (
                                                item.assigned_to
                                              )}
                                            </p>
                                          )}
                                          {item.deadline && (
                                            <p className={`text-sm ${
                                              isCurrentlyActive ? 'text-blue-700' : 'text-gray-600'
                                            }`}>Due: {new Date(item.deadline).toLocaleDateString()}</p>
                                          )}
                                        </CardContent>
                                      </Card>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                                  {actionItemsSearch 
                                    ? 'No action items match your search criteria' 
                                    : 'No action items identified'
                                  }
                                </div>
                              )}
                            </div>
                          </TabsContent>

                          {/* Decisions Tab */}
                          <TabsContent value="decisions" className="space-y-4">
                            <div className="flex gap-3">
                              <div className="flex-1">
                                <Input
                                  placeholder="Search decisions..."
                                  value={decisionsSearch}
                                  onChange={(e) => setDecisionsSearch(e.target.value)}
                                  className="w-full"
                                />
                              </div>
                            </div>
                            
                            {/* Audio-based filtering indicator */}
                            {currentAudioTime > 0 && (
                              <div className="flex items-center gap-2 text-sm bg-green-50 p-2 rounded-lg border border-green-200">
                                <div className="flex items-center gap-2">
                                  <Badge variant="default" className="bg-green-100 text-green-800">
                                    {isAudioPlaying ? '' : 'PAUSED |'} Audio Filter: {Math.floor(Math.floor(currentAudioTime / 300) * 300 / 60)}:00 - {Math.floor((Math.floor(currentAudioTime / 300) * 300 + 300) / 60)}:00
                                  </Badge>
                                  <span className="text-green-600">({filteredDecisions.length} items)</span>
                                </div>
                              </div>
                            )}
                            
                            {decisionsSearch && currentAudioTime === 0 && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span>Showing {filteredDecisions.length} of {detailedIntelligence?.decisions.length || 0} decisions</span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => setDecisionsSearch('')}
                                >
                                  Clear search
                                </Button>
                              </div>
                            )}
                            
                            <div className="space-y-3">
                              <div className="flex items-center gap-3 mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Decisions</h3>
                                <Badge variant="outline">{filteredDecisions.length}</Badge>
                                {filteredDecisions.length !== (detailedIntelligence?.decisions.length || 0) && (
                                  <Badge variant="secondary" className="text-xs">
                                    of {detailedIntelligence?.decisions.length || 0} total
                                  </Badge>
                                )}
                              </div>
                              {filteredDecisions.length ? (
                                <div className="space-y-3 max-h-96 overflow-y-auto">
                                  {filteredDecisions.map((decision, index) => {
                                    const isCurrentlyActive = currentActiveItems.decisions.some(activeDecision => 
                                      activeDecision.timestamp_start === decision.timestamp_start && 
                                      activeDecision.timestamp_end === decision.timestamp_end
                                    );
                                    return (
                                      <Card key={index} className={`border-l-4 ${
                                        isCurrentlyActive 
                                          ? 'border-l-green-500 bg-green-50 shadow-md' 
                                          : 'border-l-green-500'
                                      }`}>
                                        <CardContent className="p-4">
                                          <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                              <Badge variant={getSeverityVariant(decision.confidence)} className="text-xs">
                                                {decision.confidence}
                                              </Badge>
                                              {isCurrentlyActive && (
                                                <Badge variant="default" className="text-xs bg-green-100 text-green-800">
                                                  Active
                                                </Badge>
                                              )}
                                            </div>
                                            <div className={`text-xs ${
                                              isCurrentlyActive ? 'text-green-600 font-bold' : 'text-gray-500'
                                            }`}>
                                              {/* {formatTimestamp(decision.timestamp_start)} - {formatTimestamp(decision.timestamp_end)} */}
                                              {formatTimestamp(decision.timestamp_start)}
                                            </div>
                                          </div>
                                          <p className={`text-sm mb-2 ${
                                            isCurrentlyActive ? 'text-green-900 font-medium' : 'text-gray-900'
                                          }`}>
                                            {decisionsSearch && decision.decision ? (
                                              decision.decision.split(new RegExp(`(${decisionsSearch})`, 'gi')).map((part: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined, i: React.Key | null | undefined) =>
                                                typeof part === 'string' && part.toLowerCase() === decisionsSearch.toLowerCase() ? (
                                                  <mark key={i} className="bg-yellow-200 px-1 rounded">
                                                    {part}
                                                  </mark>
                                                ) : (
                                                  part
                                                )
                                              )
                                            ) : (
                                              decision.decision
                                            )}
                                          </p>
                                          {decision.reason && (
                                            <div className={`text-sm p-2 rounded ${
                                              isCurrentlyActive 
                                                ? 'text-green-700 bg-green-100' 
                                                : 'text-gray-600 bg-green-50'
                                            }`}>
                                              <strong>Reason:</strong> {decision.reason}
                                            </div>
                                          )}
                                        </CardContent>
                                      </Card>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                                  {decisionsSearch 
                                    ? 'No decisions match your search criteria' 
                                    : 'No decisions identified'
                                  }
                                </div>
                              )}
                            </div>
                          </TabsContent>

                          {/* Issues Tab */}
                          <TabsContent value="issues" className="space-y-4">
                            <div className="flex gap-3">
                              <div className="flex-1">
                                <Input
                                  placeholder="Search issues..."
                                  value={issuesSearch}
                                  onChange={(e) => setIssuesSearch(e.target.value)}
                                  className="w-full"
                                />
                              </div>
                            </div>
                            
                            {/* Audio-based filtering indicator */}
                            {currentAudioTime > 0 && (
                              <div className="flex items-center gap-2 text-sm bg-red-50 p-2 rounded-lg border border-red-200">
                                <div className="flex items-center gap-2">
                                  <Badge variant="default" className="bg-red-100 text-red-800">
                                    {isAudioPlaying ? '' : 'PAUSED |'} Audio Filter: {Math.floor(Math.floor(currentAudioTime / 300) * 300 / 60)}:00 - {Math.floor((Math.floor(currentAudioTime / 300) * 300 + 300) / 60)}:00
                                  </Badge>
                                  <span className="text-red-600">({filteredIssues.length} items)</span>
                                </div>
                              </div>
                            )}
                            
                            {issuesSearch && currentAudioTime === 0 && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span>Showing {filteredIssues.length} of {detailedIntelligence?.issues.length || 0} issues</span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => setIssuesSearch('')}
                                >
                                  Clear search
                                </Button>
                              </div>
                            )}
                            
                            <div className="space-y-3">
                              <div className="flex items-center gap-3 mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Issues</h3>
                                <Badge variant="outline">{filteredIssues.length}</Badge>
                                {filteredIssues.length !== (detailedIntelligence?.issues.length || 0) && (
                                  <Badge variant="secondary" className="text-xs">
                                    of {detailedIntelligence?.issues.length || 0} total
                                  </Badge>
                                )}
                              </div>
                              {filteredIssues.length ? (
                                <div className="space-y-3 max-h-96 overflow-y-auto">
                                  {filteredIssues.map((issue, index) => {
                                    const isCurrentlyActive = currentActiveItems.issues.some(activeIssue => 
                                      activeIssue.timestamp_start === issue.timestamp_start && 
                                      activeIssue.timestamp_end === issue.timestamp_end
                                    );
                                    return (
                                      <Card key={index} className={`border-l-4 ${
                                        isCurrentlyActive 
                                          ? 'border-l-red-500 bg-red-50 shadow-md' 
                                          : 'border-l-red-500'
                                      }`}>
                                        <CardContent className="p-4">
                                          <div className="flex items-start justify-between mb-2">
                                            {isCurrentlyActive && (
                                              <Badge variant="default" className="text-xs bg-red-100 text-red-800">
                                                Active
                                              </Badge>
                                            )}
                                            <div className={`text-xs ${
                                              isCurrentlyActive ? 'text-red-600 font-bold' : 'text-gray-500'
                                            }`}>
                                              {/* {formatTimestamp(issue.timestamp_start)} - {formatTimestamp(issue.timestamp_end)} */}
                                              {formatTimestamp(issue.timestamp_start)}
                                            </div>
                                          </div>
                                          <p className={`text-sm mb-2 ${
                                            isCurrentlyActive ? 'text-red-900 font-medium' : 'text-gray-900'
                                          }`}>
                                            {issuesSearch && issue.issue ? (
                                              issue.issue.split(new RegExp(`(${issuesSearch})`, 'gi')).map((part: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined, i: React.Key | null | undefined) =>
                                                typeof part === 'string' && part.toLowerCase() === issuesSearch.toLowerCase() ? (
                                                  <mark key={i} className="bg-yellow-200 px-1 rounded">
                                                    {part}
                                                  </mark>
                                                ) : (
                                                  part
                                                )
                                              )
                                            ) : (
                                              issue.issue
                                            )}
                                          </p>
                                        </CardContent>
                                      </Card>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                                  {issuesSearch 
                                    ? 'No issues match your search criteria' 
                                    : 'No issues identified'
                                  }
                                </div>
                              )}
                            </div>
                          </TabsContent>

                          {/* Questions Tab */}
                          <TabsContent value="questions" className="space-y-4">
                            <div className="flex gap-3">
                              <div className="flex-1">
                                <Input
                                  placeholder="Search questions..."
                                  value={questionsSearch}
                                  onChange={(e) => setQuestionsSearch(e.target.value)}
                                  className="w-full"
                                />
                              </div>
                            </div>
                            
                            {/* Audio-based filtering indicator */}
                            {currentAudioTime > 0 && (
                              <div className="flex items-center gap-2 text-sm bg-yellow-50 p-2 rounded-lg border border-yellow-200">
                                <div className="flex items-center gap-2">
                                  <Badge variant="default" className="bg-yellow-100 text-yellow-800">
                                    {isAudioPlaying ? '' : 'PAUSED |'} Audio Filter: {Math.floor(Math.floor(currentAudioTime / 300) * 300 / 60)}:00 - {Math.floor((Math.floor(currentAudioTime / 300) * 300 + 300) / 60)}:00
                                  </Badge>
                                  <span className="text-yellow-600">({filteredQuestions.length} items)</span>
                                </div>
                              </div>
                            )}
                            
                            {questionsSearch && currentAudioTime === 0 && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span>Showing {filteredQuestions.length} of {detailedIntelligence?.questions.length || 0} questions</span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => setQuestionsSearch('')}
                                >
                                  Clear search
                                </Button>
                              </div>
                            )}
                            
                            <div className="space-y-3">
                              <div className="flex items-center gap-3 mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Questions</h3>
                                <Badge variant="outline">{filteredQuestions.length}</Badge>
                                {filteredQuestions.length !== (detailedIntelligence?.questions.length || 0) && (
                                  <Badge variant="secondary" className="text-xs">
                                    of {detailedIntelligence?.questions.length || 0} total
                                  </Badge>
                                )}
                              </div>
                              {filteredQuestions.length ? (
                                <div className="space-y-3 max-h-96 overflow-y-auto">
                                  {filteredQuestions.map((question, index) => {
                                    const isCurrentlyActive = currentActiveItems.questions.some(activeQuestion => 
                                      activeQuestion.timestamp_start === question.timestamp_start && 
                                      activeQuestion.timestamp_end === question.timestamp_end
                                    );
                                    return (
                                      <Card key={index} className={`border-l-4 ${
                                        isCurrentlyActive 
                                          ? 'border-l-yellow-500 bg-yellow-50 shadow-md' 
                                          : 'border-l-yellow-500'
                                      }`}>
                                        <CardContent className="p-4">
                                          <div className="flex items-start justify-between mb-2">
                                            {isCurrentlyActive && (
                                              <Badge variant="default" className="text-xs bg-yellow-100 text-yellow-800">
                                                Active
                                              </Badge>
                                            )}
                                            <div className={`text-xs ${
                                              isCurrentlyActive ? 'text-yellow-600 font-bold' : 'text-gray-500'
                                            }`}>
                                              {/* {formatTimestamp(question.timestamp_start)} - {formatTimestamp(question.timestamp_end)} */}
                                              {formatTimestamp(question.timestamp_start)}
                                            </div>
                                          </div>
                                          <p className={`text-sm mb-2 ${
                                            isCurrentlyActive ? 'text-yellow-900 font-medium' : 'text-gray-900'
                                          }`}>
                                            {questionsSearch && question.question ? (
                                              question.question.split(new RegExp(`(${questionsSearch})`, 'gi')).map((part: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined, i: React.Key | null | undefined) =>
                                                typeof part === 'string' && part.toLowerCase() === questionsSearch.toLowerCase() ? (
                                                  <mark key={i} className="bg-yellow-200 px-1 rounded">
                                                    {part}
                                                  </mark>
                                                ) : (
                                                  part
                                                )
                                              )
                                            ) : (
                                              question.question
                                            )}
                                          </p>
                                        </CardContent>
                                      </Card>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                                  {questionsSearch 
                                    ? 'No questions match your search criteria' 
                                    : 'No questions identified'
                                  }
                                </div>
                              )}
                            </div>
                          </TabsContent>
                        </Tabs>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
                <div className="pl-3">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 mb-6 p-2 rounded-lg border border-blue-100">
                    <div className="mb-4">
                      {/* <h4 className="text-sm font-medium text-gray-700 mb-2">
                        {sampleTranscriptData.file_name}
                      </h4> */}
                      <audio 
                        ref={audioRef}
                        controls 
                        className="w-full h-12"
                        preload="metadata"
                        style={{
                          filter: 'sepia(20%) saturate(70%) hue-rotate(200deg) brightness(1.1)',
                        }}
                      >
                        <source src="/july_12_2022_audio.mp3" type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          MP3 Audio
                        </Badge>
                        {isAudioPlaying && (
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            Playing: {Math.floor(currentAudioTime / 60)}:{String(Math.floor(currentAudioTime % 60)).padStart(2, '0')}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <span className="text-xs">🎧 High Quality</span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <CardTitle className="text-lg mb-4">Executive Summary</CardTitle>
                    <p className="text-gray-700 mb-4">
                      {detailedIntelligence?.executive_summary || 'No summary available.'}
                    </p>
                  </div>
                  <div className="mb-6">
                    <CardTitle className="text-lg mb-4">Key Topics</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      {(detailedIntelligence?.key_topics || []).map((topic: string, index: number) => (
                        <Badge key={index} variant="secondary">{topic}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="mb-6">
                    <CardTitle className="text-lg mb-2">Notes</CardTitle>
                    <p className="text-amber-700 bg-amber-50 p-3 text-sm rounded-lg">
                      {detailedIntelligence?.confidence_note}
                    </p>
                  </div>
                  <div className="mb-6">
                    <CardTitle className="text-lg mb-2">Exports</CardTitle>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Export Options</CardTitle>
              <CardDescription>Download your recording in various formats</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">📄 PDF Export</h4>
                    <p className="text-sm text-gray-600">Complete transcript and summary in PDF format</p>
                  </div>
                  <Button size="sm">Download</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">📝 Word Document</h4>
                    <p className="text-sm text-gray-600">Editable transcript in DOCX format</p>
                  </div>
                  <Button size="sm">Download</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">📋 Plain Text</h4>
                    <p className="text-sm text-gray-600">Simple text file with transcript</p>
                  </div>
                  <Button size="sm">Download</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">📊 JSON Data</h4>
                    <p className="text-sm text-gray-600">Structured data with intelligence analysis</p>
                  </div>
                  <Button size="sm">Download</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecordingDetail;
