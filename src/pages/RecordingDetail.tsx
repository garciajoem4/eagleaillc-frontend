import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Recording, DetailedIntelligence } from '../types';
import { mockRecordings } from '../data/mockData';
import { sampleIntelligence } from '../data/sampleIntelligence';
import { sampleTranscriptData } from '../data/sampleTranscript';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';

const RecordingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recording, setRecording] = useState<Recording | null>(null);
  const [detailedIntelligence, setDetailedIntelligence] = useState<DetailedIntelligence | null>(null);
  const [transcriptView, setTranscriptView] = useState<'full' | 'segments'>('full');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSpeaker, setSelectedSpeaker] = useState<string>('all');

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

  useEffect(() => {
    // In a real app, this would fetch from an API
    const foundRecording = mockRecordings.find(r => r.id === id);
    setRecording(foundRecording || null);

    // Load sample intelligence data for demonstration
    if (foundRecording) {
      setDetailedIntelligence(sampleIntelligence);
    }
  }, [id]);

  if (!recording) {
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

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
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
      <div className="flex items-center space-x-4">
        <Link to="/recordings">
          <Button variant="outline">← Back to Recordings</Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{recording.name}</h1>
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
                <CardTitle>Recording Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Name</label>
                    <p className="text-gray-900">{recording.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Date Uploaded</label>
                    <p className="text-gray-900">{formatDate(recording.dateUploaded)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Duration</label>
                    <Badge variant="secondary">{formatDuration(recording.duration)}</Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <Badge variant="default">Processed</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Executive Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  {detailedIntelligence?.executive_summary || recording.overview || 'No summary available.'}
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
                <CardTitle>Key Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {(detailedIntelligence?.key_topics || recording.intelligence?.keyTopics || []).map((topic: string, index: number) => (
                    <Badge key={index} variant="secondary">{topic}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Analysis Stats</CardTitle>
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
                <CardTitle>Available Exports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {recording.exports?.map((format, index) => (
                    <Badge key={index} variant="outline">{format}</Badge>
                  )) || <span className="text-gray-500">No exports available</span>}
                </div>
              </CardContent>
            </Card>
          </div>

          {detailedIntelligence?.confidence_note && (
            <Card>
              <CardHeader>
                <CardTitle>Processing Note</CardTitle>
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
                    {sampleTranscriptData.full_transcription || recording.transcript || 'Transcript not available yet. Processing may still be in progress.'}
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
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  {/* Action Items */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Action Items</h3>
                      <Badge variant="outline">{detailedIntelligence?.action_items.length || 0}</Badge>
                    </div>
                    {detailedIntelligence?.action_items.length ? (
                      <div className="space-y-3">
                        {detailedIntelligence.action_items.map((item, index) => (
                          <Card key={index} className="border-l-4 border-l-blue-500">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs">
                                    Confidence: {item.confidence}
                                  </Badge>
                                  {/* <Badge variant={getSeverityVariant(item.confidence)} className="text-xs">
                                    {Math.round(item.confidence * 100)}%
                                  </Badge> */}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {formatTimestamp(item.timestamp_start)} - {formatTimestamp(item.timestamp_end)}
                                </div>
                              </div>
                              <p className="text-gray-900 font-medium mb-2">{item.task}</p>
                              {item.assigned_to && (
                                <p className="text-sm text-gray-600">Assigned To: {item.assigned_to}</p>
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
                        No action items identified
                      </div>
                    )}
                  </div>

                  {/* Decisions */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Decisions</h3>
                      <Badge variant="outline">{detailedIntelligence?.decisions.length || 0}</Badge>
                    </div>
                    {detailedIntelligence?.decisions.length ? (
                      <div className="space-y-3">
                        {detailedIntelligence.decisions.map((decision, index) => (
                          <Card key={index} className="border-l-4 border-l-green-500">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <Badge variant={getSeverityVariant(decision.confidence)} className="text-xs">
                                  {Math.round(decision.confidence * 100)}% confidence
                                </Badge>
                                <div className="text-xs text-gray-500">
                                  {formatTimestamp(decision.timestamp_start)} - {formatTimestamp(decision.timestamp_end)}
                                </div>
                              </div>
                              <p className="text-gray-900 font-medium mb-2">{decision.description}</p>
                              {decision.rationale && (
                                <div className="text-sm text-gray-600 bg-green-50 p-2 rounded">
                                  <strong>Rationale:</strong> {decision.rationale}
                                </div>
                              )}
                              {decision.participants && decision.participants.length > 0 && (
                                <p className="text-sm text-gray-600 mt-2">
                                  Participants: {decision.participants.join(', ')}
                                </p>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                        No decisions identified
                      </div>
                    )}
                  </div>

                  {/* Issues */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Issues</h3>
                      <Badge variant="outline">{detailedIntelligence?.issues.length || 0}</Badge>
                    </div>
                    {detailedIntelligence?.issues.length ? (
                      <div className="space-y-3">
                        {detailedIntelligence.issues.map((issue, index) => (
                          <Card key={index} className="border-l-4 border-l-red-500">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Badge variant={getSeverityVariant(issue.severity)} className="text-xs">
                                    {issue.severity}
                                  </Badge>
                                  <Badge variant={getSeverityVariant(issue.confidence)} className="text-xs">
                                    {Math.round(issue.confidence * 100)}%
                                  </Badge>
                                </div>
                                <div className="text-xs text-gray-500">
                                  {formatTimestamp(issue.timestamp_start)} - {formatTimestamp(issue.timestamp_end)}
                                </div>
                              </div>
                              <p className="text-gray-900 font-medium mb-2">{issue.description}</p>
                              {issue.impact && (
                                <div className="text-sm text-gray-600 bg-red-50 p-2 rounded">
                                  <strong>Impact:</strong> {issue.impact}
                                </div>
                              )}
                              {issue.category && (
                                <p className="text-sm text-gray-600 mt-2">Category: {issue.category}</p>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                        No issues identified
                      </div>
                    )}
                  </div>

                  {/* Questions */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Questions</h3>
                      <Badge variant="outline">{detailedIntelligence?.questions.length || 0}</Badge>
                    </div>
                    {detailedIntelligence?.questions.length ? (
                      <div className="space-y-3">
                        {detailedIntelligence.questions.map((question, index) => (
                          <Card key={index} className="border-l-4 border-l-yellow-500">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <Badge variant={getSeverityVariant(question.confidence)} className="text-xs">
                                  {Math.round(question.confidence * 100)}% confidence
                                </Badge>
                                <div className="text-xs text-gray-500">
                                  {formatTimestamp(question.timestamp_start)} - {formatTimestamp(question.timestamp_end)}
                                </div>
                              </div>
                              <p className="text-gray-900 font-medium mb-2">{question.description}</p>
                              {question.context && (
                                <div className="text-sm text-gray-600 bg-yellow-50 p-2 rounded">
                                  <strong>Context:</strong> {question.context}
                                </div>
                              )}
                              {question.requires_followup && (
                                <div className="text-sm text-red-600 font-medium mt-2">
                                  ⚠️ Requires follow-up
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                        No questions identified
                      </div>
                    )}
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
