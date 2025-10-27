import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import FileUpload from '../components/ui/file-upload';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { sampleTranscriptData } from '../data/sampleTranscript';
import { useFreeTrial } from '../hooks/useFreeTrial';

const FreeTrial: React.FC = () => {
  const {
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
    isItemActiveAtTime,
    handleFileUploadComplete,
    handleStartTrial,
    jumpToTimestamp
  } = useFreeTrial();

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Trial Results Header */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link to="/" className="flex-shrink-0">
                  <h1 className="text-2xl font-bold text-blue-600">SynaptiVoice</h1>
                </Link>
                <Badge variant="secondary" className="ml-4">Free Trial</Badge>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" onClick={() => setShowResults(false)}>
                  Try Again
                </Button>
                <Link to="/login">
                  <Button>Upgrade to Full Version</Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Trial Results Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Audio Player */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>july_12_2022_audio.mp3</span>
                <Badge>Sample Recording</Badge>
              </CardTitle>
              <CardDescription>
                This is a sample recording to demonstrate SynaptiVoice's capabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <audio
                ref={audioRef}
                controls
                className="w-full"
                src="/july_12_2022_audio.mp3"
              >
                Your browser does not support the audio element.
              </audio>
            </CardContent>
          </Card>

          {/* Results Tabs */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
              <TabsTrigger value="intelligence">Intelligence</TabsTrigger>
              <TabsTrigger value="exports" disabled>
                Exports <Badge variant="outline" className="ml-1">Pro</Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recording Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900">Duration</h4>
                      <p className="text-2xl font-bold text-blue-600">
                        {Math.floor(sampleTranscriptData.duration_seconds / 3600)}h{' '}
                        {Math.floor((sampleTranscriptData.duration_seconds % 3600) / 60)}m
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900">Segments</h4>
                      <p className="text-2xl font-bold text-blue-600">{detailedIntelligence.total_segments_processed}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900">Content Type</h4>
                      <p className="text-2xl font-bold text-blue-600 capitalize">{detailedIntelligence.content_type}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Key Topics</h4>
                    <div className="flex flex-wrap gap-2">
                      {detailedIntelligence.key_topics.slice(0, 5).map((topic, index) => (
                        <Badge key={index} variant="outline">{topic}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transcript" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Full Transcript</CardTitle>
                  <CardDescription>
                    Click on any segment to jump to that point in the audio
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {sampleTranscriptData.segments?.slice(0, 20).map((segment, index) => (
                      <div
                        key={segment.segments_id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          isItemActiveAtTime(
                            `00:${Math.floor(segment.start / 60).toString().padStart(2, '0')}:${(segment.start % 60).toFixed(2).padStart(5, '0')}`,
                            `00:${Math.floor(segment.end / 60).toString().padStart(2, '0')}:${(segment.end % 60).toFixed(2).padStart(5, '0')}`,
                            currentAudioTime
                          ) ? 'bg-blue-100 border-blue-300' : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                        onClick={() => jumpToTimestamp(`00:${Math.floor(segment.start / 60).toString().padStart(2, '0')}:${(segment.start % 60).toFixed(2).padStart(5, '0')}`)}
                      >
                        <div className="flex items-start space-x-3">
                          <span className="text-xs text-gray-500 font-mono min-w-16">
                            {Math.floor(segment.start / 60).toString().padStart(2, '0')}:
                            {(segment.start % 60).toFixed(0).padStart(2, '0')}
                          </span>
                          <p className="text-sm text-gray-900 flex-1">{segment.text}</p>
                          {segment.speaker && (
                            <Badge variant="outline" className="text-xs">
                              {segment.speaker}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                    <div className="text-center py-4 text-gray-500">
                      <p>Only showing first 20 segments in trial version</p>
                      <Link to="/login">
                        <Button variant="outline" size="sm" className="mt-2">
                          View Full Transcript
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="intelligence" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Action Items */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Action Items
                      <Badge>{detailedIntelligence.action_items.length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {detailedIntelligence.action_items.slice(0, 5).map((item, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            isItemActiveAtTime(item.timestamp_start, item.timestamp_end, currentAudioTime)
                              ? 'bg-blue-100 border-blue-300'
                              : 'bg-gray-50 hover:bg-gray-100'
                          }`}
                          onClick={() => jumpToTimestamp(item.timestamp_start)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <Badge variant={item.confidence === 'high' ? 'default' : item.confidence === 'medium' ? 'secondary' : 'outline'}>
                              {item.confidence}
                            </Badge>
                            <span className="text-xs text-gray-500 font-mono">
                              {item.timestamp_start}
                            </span>
                          </div>
                          <p className="text-sm text-gray-900">{item.task}</p>
                        </div>
                      ))}
                      <div className="text-center text-gray-500 text-sm">
                        Showing 5 of {detailedIntelligence.action_items.length} action items
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Decisions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Decisions
                      <Badge>{detailedIntelligence.decisions.length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {detailedIntelligence.decisions.slice(0, 5).map((decision, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            isItemActiveAtTime(decision.timestamp_start, decision.timestamp_end, currentAudioTime)
                              ? 'bg-green-100 border-green-300'
                              : 'bg-gray-50 hover:bg-gray-100'
                          }`}
                          onClick={() => jumpToTimestamp(decision.timestamp_start)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <Badge variant={decision.confidence === 'high' ? 'default' : decision.confidence === 'medium' ? 'secondary' : 'outline'}>
                              {decision.confidence}
                            </Badge>
                            <span className="text-xs text-gray-500 font-mono">
                              {decision.timestamp_start}
                            </span>
                          </div>
                          <p className="text-sm text-gray-900">{decision.decision}</p>
                        </div>
                      ))}
                      <div className="text-center text-gray-500 text-sm">
                        Showing 5 of {detailedIntelligence.decisions.length} decisions
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Issues */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Issues
                      <Badge variant="destructive">{detailedIntelligence.issues.length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {detailedIntelligence.issues.slice(0, 5).map((issue, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            isItemActiveAtTime(issue.timestamp_start, issue.timestamp_end, currentAudioTime)
                              ? 'bg-red-100 border-red-300'
                              : 'bg-gray-50 hover:bg-gray-100'
                          }`}
                          onClick={() => jumpToTimestamp(issue.timestamp_start)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <Badge variant="outline">
                              Issue
                            </Badge>
                            <span className="text-xs text-gray-500 font-mono">
                              {issue.timestamp_start}
                            </span>
                          </div>
                          <p className="text-sm text-gray-900">{issue.issue}</p>
                        </div>
                      ))}
                      <div className="text-center text-gray-500 text-sm">
                        Showing 5 of {detailedIntelligence.issues.length} issues
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Questions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Questions
                      <Badge variant="secondary">{detailedIntelligence.questions.length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {detailedIntelligence.questions.slice(0, 5).map((question, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            isItemActiveAtTime(question.timestamp_start, question.timestamp_end, currentAudioTime)
                              ? 'bg-yellow-100 border-yellow-300'
                              : 'bg-gray-50 hover:bg-gray-100'
                          }`}
                          onClick={() => jumpToTimestamp(question.timestamp_start)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <span className="text-xs text-gray-500 font-mono">
                              {question.timestamp_start}
                            </span>
                          </div>
                          <p className="text-sm text-gray-900">{question.question}</p>
                        </div>
                      ))}
                      <div className="text-center text-gray-500 text-sm">
                        Showing 5 of {detailedIntelligence.questions.length} questions
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="exports">
              <Card>
                <CardHeader>
                  <CardTitle>Export Options</CardTitle>
                  <CardDescription>
                    Export functionality is available in the full version
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center py-8">
                  <p className="text-gray-500 mb-4">
                    Upgrade to access PDF reports, Word documents, JSON data exports, and more.
                  </p>
                  <Link to="/login">
                    <Button>Upgrade Now</Button>
                  </Link>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  if (trialUsed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle>Trial Already Used</CardTitle>
            <CardDescription>
              You've already used your free trial. Upgrade to continue using SynaptiVoice.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="text-6xl mb-4">🚀</div>
            <p className="text-gray-600 dark:text-gray-300">
              Ready to unlock the full power of your meeting intelligence?
            </p>
            <div className="space-y-2">
              <Link to="/login" className="block">
                <Button className="w-full">Get Full Access</Button>
              </Link>
              <Link to="/" className="block">
                <Button variant="outline" className="w-full">Back to Home</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Trial Header */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600">SynaptiVoice</h1>
              </Link>
              <Badge variant="secondary" className="ml-4">Free Trial</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline">Already have an account?</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Trial Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Try SynaptiVoice Free
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Upload one recording to see how our app transform your meetings into actionable insights
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              1 Upload Free
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Transcription
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Smart Intelligence
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              No Credit Card
            </span>
          </div>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardContent>
            <div className="p-6">
              <div className="text-center py-4">
                <h3 className="text-lg font-semibold mb-2">Upload Audio or Video</h3>
                <p className="text-gray-600 mb-4">
                  Support for MP3, MP4, MOV, AVI, WMV, FLV, WebM files up to 500MB
                </p>
              </div>

              <FileUpload
                onUploadComplete={handleFileUploadComplete}
                multiple={false}
              />

              {uploadedFiles.length > 0 && (
                <div className="mt-6">
                  <Button 
                    onClick={handleStartTrial}
                    disabled={isProcessing}
                    className="w-full"
                    size="lg"
                  >
                    {isProcessing ? 'Processing...' : 'Start Analysis'}
                  </Button>
                </div>
              )}
            </div>

            {/* Trial Limitations Notice */}
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">Trial Limitations</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• One upload or query only</li>
                <li>• Limited transcript view (first 20 segments)</li>
                <li>• Sample intelligence data for demonstration</li>
                <li>• No export functionality</li>
                <li>• No saved recordings</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FreeTrial;
