import React, { useState } from 'react';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Input } from './input';
import { Label } from './label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import FileUpload from './file-upload';
import { UploadFile } from '../../hooks/useFileUpload';
import { context7Service } from '../../services/context7Service';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete: (recordings: any[]) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onUploadComplete }) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);
  const [urlInput, setUrlInput] = useState('');
  const [context7Query, setContext7Query] = useState('');
  const [context7Project, setContext7Project] = useState('');

  if (!isOpen) return null;

  const handleFileUploadComplete = (files: UploadFile[]) => {
    setUploadedFiles(files);
  };

  const handleUrlSubmit = async () => {
    if (!urlInput.trim()) return;

    setIsProcessing(true);
    try {
      // Simulate processing URL
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newRecording = {
        id: `url-${Date.now()}`,
        name: `Recording from URL`,
        dateUploaded: new Date(),
        duration: 60, // placeholder
        overview: `Recording imported from ${urlInput}`,
        transcript: 'Transcript will be generated...',
        intelligence: {
          keyTopics: ['URL Import'],
          sentiment: 'Neutral',
          actionItems: ['Process recording']
        },
        exports: ['PDF']
      };

      onUploadComplete([newRecording]);
      onClose();
    } catch (error) {
      console.error('URL processing failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleContext7Query = async () => {
    if (!context7Query.trim()) return;

    setIsProcessing(true);
    try {
      const result = await context7Service.query(context7Project || 'general', context7Query);
      
      const newRecording = {
        id: `context7-${Date.now()}`,
        name: `Context7 Query: ${context7Query.substring(0, 50)}...`,
        dateUploaded: new Date(),
        duration: 0,
        overview: `Context7 query results`,
        transcript: result.content,
        intelligence: {
          keyTopics: ['Context7', 'Documentation', 'Query'],
          sentiment: 'Informational',
          actionItems: ['Review query results']
        },
        exports: ['PDF', 'TXT']
      };

      onUploadComplete([newRecording]);
      onClose();
    } catch (error) {
      console.error('Context7 query failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleProcessFiles = async () => {
    if (uploadedFiles.length === 0) return;

    setIsProcessing(true);
    try {
      // Process uploaded files
      const newRecordings = uploadedFiles.map(file => ({
        id: `upload-${Date.now()}-${Math.random()}`,
        name: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
        dateUploaded: new Date(),
        duration: Math.floor(Math.random() * 120) + 30, // Random duration 30-150 min
        overview: `Uploaded recording: ${file.name}`,
        transcript: 'Transcript will be generated after processing...',
        intelligence: {
          keyTopics: ['Uploaded Content'],
          sentiment: 'Neutral',
          actionItems: ['Review and process']
        },
        exports: ['PDF']
      }));

      onUploadComplete(newRecordings);
      onClose();
    } catch (error) {
      console.error('File processing failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Upload Recording</CardTitle>
                <CardDescription>
                  Add new audio or video recordings to your library
                </CardDescription>
              </div>
              <Button variant="outline" onClick={onClose}>
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload">📁 File Upload</TabsTrigger>
                <TabsTrigger value="url">🔗 From URL</TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="space-y-4">
                <FileUpload
                  multiple={true}
                  onUploadComplete={handleFileUploadComplete}
                  onUploadError={(error) => console.error('Upload error:', error)}
                />
                
                {uploadedFiles.length > 0 && (
                  <div className="flex justify-end space-x-2 pt-4 border-t">
                    <Button variant="outline" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleProcessFiles} 
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : `Process ${uploadedFiles.length} File(s)`}
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="url" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="url-input">Recording URL</Label>
                    <Input
                      id="url-input"
                      type="url"
                      placeholder="https://example.com/recording.mp3"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Enter a direct URL to an audio or video file
                    </p>
                  </div>

                  <div className="flex justify-end space-x-2 pt-4 border-t">
                    <Button variant="outline" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleUrlSubmit} 
                      disabled={!urlInput.trim() || isProcessing}
                    >
                      {isProcessing ? 'Processing...' : 'Import from URL'}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UploadModal;
