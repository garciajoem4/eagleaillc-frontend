import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DetailedIntelligence } from '../types';
import { sampleIntelligence } from '../data/sampleIntelligence';
import { sampleTranscriptData } from '../data/sampleTranscript';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';

const RecordingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [detailedIntelligence, setDetailedIntelligence] = useState<DetailedIntelligence | null>(null);
  const [transcriptView, setTranscriptView] = useState<'full' | 'segments'>('full');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSpeaker, setSelectedSpeaker] = useState<string>('all');
  const [intelligenceSearchQuery, setIntelligenceSearchQuery] = useState<string>('');
  const [selectedIntelligenceType, setSelectedIntelligenceType] = useState<string>('all');

  // Get unique speakers for filtering
  // const uniqueSpeakers = useMemo(() => {
  //   const speakers = sampleTranscriptData.segments?.map(segment => segment.speaker).filter(Boolean) || [];
  //   return Array.from(new Set(speakers));
  // }, []);

  // Filter segments based on search and speaker
  const filteredSegments = useMemo(() => {
    if (!sampleTranscriptData.segments) return [];
    
    return sampleTranscriptData.segments.filter(segment => {
      const matchesSearch = searchQuery === '' || 
        segment.text.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSpeaker = selectedSpeaker === 'all' || 
        segment.speaker === selectedSpeaker;
      
      return matchesSearch && matchesSpeaker;
    });
  }, [searchQuery, selectedSpeaker]);

  // Filter intelligence data based on search and type
  const filteredIntelligenceData = useMemo(() => {
    if (!detailedIntelligence) return { action_items: [], decisions: [], issues: [], questions: [] };

    const filterBySearchAndType = (items: any[], type: string) => {
      return items.filter(item => {
        const searchText = intelligenceSearchQuery.toLowerCase();
        const matchesSearch = searchText === '' || 
          (item.task || item.decision)?.toLowerCase().includes(searchText) ||
          (item.assigned_to || '')?.toLowerCase().includes(searchText);
        
        const matchesType = selectedIntelligenceType === 'all' || selectedIntelligenceType === type;
        
        return matchesSearch && matchesType;
      });
    };

    return {
      action_items: filterBySearchAndType(detailedIntelligence.action_items || [], 'action_items'),
      decisions: filterBySearchAndType(detailedIntelligence.decisions || [], 'decisions'),
      issues: filterBySearchAndType(detailedIntelligence.issues || [], 'issues'),
      questions: filterBySearchAndType(detailedIntelligence.questions || [], 'questions')
    };
  }, [intelligenceSearchQuery, selectedIntelligenceType, detailedIntelligence]);

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
            <Link to="/recordings">
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
        <Link to="/recordings">
          <Button variant="outline">← Back to Recordings</Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">{sampleTranscriptData.file_name.split('.')[0] || ''}</h1>
          <p className="text-gray-600 mt-1">Recording Details and Analysis</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
          <TabsTrigger value="intelligence">Intelligence</TabsTrigger>
          <TabsTrigger value="exports">Exports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recording Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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

        <TabsContent value="transcript" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Transcript</CardTitle>
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
                    {/* <div className="min-w-[150px]">
                      <select
                        value={selectedSpeaker}
                        onChange={(e) => setSelectedSpeaker(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="all">All Speakers</option>
                        {uniqueSpeakers.map((speaker) => (
                          <option key={speaker} value={speaker}>
                            {speaker}
                          </option>
                        ))}
                      </select>
                    </div> */}
                  </div>
                  {(searchQuery || selectedSpeaker !== 'all') && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>Showing {filteredSegments.length} of {sampleTranscriptData.segments?.length || 0} segments</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedSpeaker('all');
                        }}
                      >
                        Clear filters
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {transcriptView === 'full' ? (
                <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {sampleTranscriptData.full_transcription || 'Transcript not available yet. Processing may still be in progress.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredSegments.length > 0 ? filteredSegments.map((segment, index) => (
                    <div 
                      key={index} 
                      className="flex gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="flex-shrink-0 text-right min-w-[95px]">
                        <div className="text-xs font-mono text-gray-500 mb-1">
                          {formatSegmentTime(segment.start)} - {formatSegmentTime(segment.end)}
                        </div>
                        {/* {segment.speaker && (
                          <Badge variant="outline" className="text-xs">
                            {segment.speaker}
                          </Badge>
                        )} */}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 leading-relaxed">
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
                          {/* {segment.confidence && (
                            <Badge 
                              variant={segment.confidence >= 0.9 ? 'default' : segment.confidence >= 0.7 ? 'secondary' : 'destructive'} 
                              className="text-xs"
                            >
                              {Math.round(segment.confidence * 100)}% confidence
                            </Badge>
                          )} */}
                          <span className="text-xs text-gray-500">
                            Duration: {Math.round((segment.end - segment.start) * 10) / 10}s
                          </span>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                      {searchQuery || selectedSpeaker !== 'all' 
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

        <TabsContent value="intelligence" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Intelligence Analysis</CardTitle>
              <CardDescription>
                Search and filter through AI-generated insights from your recording
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search and Filter Controls for Intelligence */}
              <div className="mb-6 space-y-3">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      placeholder="Search action items, decisions, issues, and questions..."
                      value={intelligenceSearchQuery}
                      onChange={(e) => setIntelligenceSearchQuery(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="min-w-[180px]">
                    <select
                      value={selectedIntelligenceType}
                      onChange={(e) => setSelectedIntelligenceType(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Types</option>
                      <option value="action_items">Action Items</option>
                      <option value="decisions">Decisions</option>
                      <option value="issues">Issues</option>
                      <option value="questions">Questions</option>
                    </select>
                  </div>
                </div>
                {(intelligenceSearchQuery || selectedIntelligenceType !== 'all') && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>
                      Showing {
                        (selectedIntelligenceType === 'all' || selectedIntelligenceType === 'action_items' ? filteredIntelligenceData.action_items.length : 0) +
                        (selectedIntelligenceType === 'all' || selectedIntelligenceType === 'decisions' ? filteredIntelligenceData.decisions.length : 0) +
                        (selectedIntelligenceType === 'all' || selectedIntelligenceType === 'issues' ? filteredIntelligenceData.issues.length : 0) +
                        (selectedIntelligenceType === 'all' || selectedIntelligenceType === 'questions' ? filteredIntelligenceData.questions.length : 0)
                      } of {
                        (detailedIntelligence?.action_items.length || 0) +
                        (detailedIntelligence?.decisions.length || 0) +
                        (detailedIntelligence?.issues.length || 0) +
                        (detailedIntelligence?.questions.length || 0)
                      } items
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setIntelligenceSearchQuery('');
                        setSelectedIntelligenceType('all');
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  {/* Action Items */}
                  {(selectedIntelligenceType === 'all' || selectedIntelligenceType === 'action_items') && (
                    <div className="mb-8">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Action Items</h3>
                        <Badge variant="outline">{filteredIntelligenceData.action_items.length}</Badge>
                        {filteredIntelligenceData.action_items.length !== (detailedIntelligence?.action_items.length || 0) && (
                          <Badge variant="secondary" className="text-xs">
                            of {detailedIntelligence?.action_items.length || 0} total
                          </Badge>
                        )}
                      </div>
                      {filteredIntelligenceData.action_items.length ? (
                        <div className="space-y-3">
                          {filteredIntelligenceData.action_items.map((item, index) => (
                            <Card key={index} className="border-l-4 border-l-blue-500">
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="text-xs">
                                      Confidence: {item.confidence}
                                    </Badge>
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {formatTimestamp(item.timestamp_start)} - {formatTimestamp(item.timestamp_end)}
                                  </div>
                                </div>
                                <p className="text-gray-900 font-medium mb-2">
                                  {intelligenceSearchQuery && item.task ? (
                                    item.task.split(new RegExp(`(${intelligenceSearchQuery})`, 'gi')).map((part: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined, i: React.Key | null | undefined) =>
                                      typeof part === 'string' && part.toLowerCase() === intelligenceSearchQuery.toLowerCase() ? (
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
                                  <p className="text-sm text-gray-600">
                                    Assigned To: {intelligenceSearchQuery && item.assigned_to.toLowerCase().includes(intelligenceSearchQuery.toLowerCase()) ? (
                                      item.assigned_to.split(new RegExp(`(${intelligenceSearchQuery})`, 'gi')).map((part: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined, i: React.Key | null | undefined) =>
                                        typeof part === 'string' && part.toLowerCase() === intelligenceSearchQuery.toLowerCase() ? (
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
                                  <p className="text-sm text-gray-600">Due: {new Date(item.deadline).toLocaleDateString()}</p>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                          {intelligenceSearchQuery || selectedIntelligenceType !== 'all' 
                            ? 'No action items match your search criteria' 
                            : 'No action items identified'
                          }
                        </div>
                      )}
                    </div>
                  )}

                  {/* Decisions */}
                  {(selectedIntelligenceType === 'all' || selectedIntelligenceType === 'decisions') && (
                    <div className="mb-8">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Decisions</h3>
                        <Badge variant="outline">{filteredIntelligenceData.decisions.length}</Badge>
                        {filteredIntelligenceData.decisions.length !== (detailedIntelligence?.decisions.length || 0) && (
                          <Badge variant="secondary" className="text-xs">
                            of {detailedIntelligence?.decisions.length || 0} total
                          </Badge>
                        )}
                      </div>
                      {filteredIntelligenceData.decisions.length ? (
                        <div className="space-y-3">
                          {filteredIntelligenceData.decisions.map((decision, index) => (
                            <Card key={index} className="border-l-4 border-l-green-500">
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                  <Badge variant={getSeverityVariant(decision.confidence)} className="text-xs">
                                    {decision.confidence}
                                  </Badge>
                                  <div className="text-xs text-gray-500">
                                    {formatTimestamp(decision.timestamp_start)} - {formatTimestamp(decision.timestamp_end)}
                                  </div>
                                </div>
                                <p className="text-gray-900 font-medium mb-2">
                                  {intelligenceSearchQuery && decision.decision ? (
                                    decision.decision.split(new RegExp(`(${intelligenceSearchQuery})`, 'gi')).map((part: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined, i: React.Key | null | undefined) =>
                                      typeof part === 'string' && part.toLowerCase() === intelligenceSearchQuery.toLowerCase() ? (
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
                                  <div className="text-sm text-gray-600 bg-green-50 p-2 rounded">
                                    <strong>Reason:</strong> {decision.reason}
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                          {intelligenceSearchQuery || selectedIntelligenceType !== 'all' 
                            ? 'No decisions match your search criteria' 
                            : 'No decisions identified'
                          }
                        </div>
                      )}
                    </div>
                  )}

                  {/* Issues */}
                  {(selectedIntelligenceType === 'all' || selectedIntelligenceType === 'issues') && (
                    <div className="mb-8">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Issues</h3>
                        <Badge variant="outline">{filteredIntelligenceData.issues.length}</Badge>
                        {filteredIntelligenceData.issues.length !== (detailedIntelligence?.issues.length || 0) && (
                          <Badge variant="secondary" className="text-xs">
                            of {detailedIntelligence?.issues.length || 0} total
                          </Badge>
                        )}
                      </div>
                      {filteredIntelligenceData.issues.length ? (
                        <div className="space-y-3">
                          {filteredIntelligenceData.issues.map((issue, index) => (
                            <Card key={index} className="border-l-4 border-l-red-500">
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                  {/* <div className="flex items-center gap-2">
                                    <Badge variant={getSeverityVariant(issue.severity)} className="text-xs">
                                      {issue.severity}
                                    </Badge>
                                    <Badge variant={getSeverityVariant(issue.confidence)} className="text-xs">
                                      Confidence: {issue.confidence}
                                    </Badge>
                                  </div> */}
                                  <div className="text-xs text-gray-500">
                                    {formatTimestamp(issue.timestamp_start)} - {formatTimestamp(issue.timestamp_end)}
                                  </div>
                                </div>
                                <p className="text-gray-900 font-medium mb-2">
                                  {intelligenceSearchQuery && issue.issue ? (
                                    issue.issue.split(new RegExp(`(${intelligenceSearchQuery})`, 'gi')).map((part: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined, i: React.Key | null | undefined) =>
                                      typeof part === 'string' && part.toLowerCase() === intelligenceSearchQuery.toLowerCase() ? (
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
                                {/* {issue.impact && (
                                  <div className="text-sm text-gray-600 bg-red-50 p-2 rounded">
                                    <strong>Impact:</strong> {issue.impact}
                                  </div>
                                )} */}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                          {intelligenceSearchQuery || selectedIntelligenceType !== 'all' 
                            ? 'No issues match your search criteria' 
                            : 'No issues identified'
                          }
                        </div>
                      )}
                    </div>
                  )}

                  {/* Questions */}
                  {(selectedIntelligenceType === 'all' || selectedIntelligenceType === 'questions') && (
                    <div className="mb-8">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Questions</h3>
                        <Badge variant="outline">{filteredIntelligenceData.questions.length}</Badge>
                        {filteredIntelligenceData.questions.length !== (detailedIntelligence?.questions.length || 0) && (
                          <Badge variant="secondary" className="text-xs">
                            of {detailedIntelligence?.questions.length || 0} total
                          </Badge>
                        )}
                      </div>
                      {filteredIntelligenceData.questions.length ? (
                        <div className="space-y-3">
                          {filteredIntelligenceData.questions.map((question, index) => (
                            <Card key={index} className="border-l-4 border-l-yellow-500">
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                  {/* <Badge variant={getSeverityVariant(question.confidence)} className="text-xs">
                                    {Math.round(question.confidence * 100)}% confidence
                                  </Badge> */}
                                  <div className="text-xs text-gray-500">
                                    {formatTimestamp(question.timestamp_start)} - {formatTimestamp(question.timestamp_end)}
                                  </div>
                                </div>
                                <p className="text-gray-900 font-medium mb-2">
                                  {intelligenceSearchQuery && question.question ? (
                                    question.question.split(new RegExp(`(${intelligenceSearchQuery})`, 'gi')).map((part: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined, i: React.Key | null | undefined) =>
                                      typeof part === 'string' && part.toLowerCase() === intelligenceSearchQuery.toLowerCase() ? (
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
                                {/* {question.context && (
                                  <div className="text-sm text-gray-600 bg-yellow-50 p-2 rounded">
                                    <strong>Context:</strong> {question.context}
                                  </div>
                                )} */}
                                {/* {question.requires_followup && (
                                  <div className="text-sm text-red-600 font-medium mt-2">
                                    ⚠️ Requires follow-up
                                  </div>
                                )} */}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                          {intelligenceSearchQuery || selectedIntelligenceType !== 'all' 
                            ? 'No questions match your search criteria' 
                            : 'No questions identified'
                          }
                        </div>
                      )}
                    </div>
                  )}
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
