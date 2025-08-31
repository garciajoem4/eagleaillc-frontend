import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Recording } from '../types';
import { mockRecordings } from '../data/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

type TabType = 'overview' | 'transcript' | 'intelligence' | 'exports';

const RecordingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recording, setRecording] = useState<Recording | null>(null);

  useEffect(() => {
    // In a real app, this would fetch from an API
    const foundRecording = mockRecordings.find(r => r.id === id);
    setRecording(foundRecording || null);
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
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{recording.overview || 'No summary available.'}</p>
              </CardContent>
            </Card>
          </div>

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
        </TabsContent>

        <TabsContent value="transcript" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Transcript</CardTitle>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">📋 Copy</Button>
                  <Button size="sm" variant="outline">📥 Download</Button>
                  <Button size="sm" variant="outline">🔍 Search</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {recording.transcript || 'Transcript not available yet. Processing may still be in progress.'}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="intelligence" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Intelligence Report</CardTitle>
            </CardHeader>
            <CardContent>
              {recording.intelligence ? (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Key Topics</h4>
                    <div className="flex flex-wrap gap-2">
                      {recording.intelligence.keyTopics?.map((topic: string, index: number) => (
                        <Badge key={index} variant="secondary">{topic}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Sentiment Analysis</h4>
                    <Badge variant={recording.intelligence.sentiment?.toLowerCase() === 'positive' ? 'default' : 'destructive'}>
                      {recording.intelligence.sentiment}
                    </Badge>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Action Items</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {recording.intelligence.actionItems?.map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Intelligence analysis not available yet. Processing may still be in progress.</p>
              )}
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
