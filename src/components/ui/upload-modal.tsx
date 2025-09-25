import React, { useState } from 'react';
import { UploadFile } from '../../hooks/useFileUpload';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import FileUpload from './file-upload';
import { Input } from './input';
import { Label } from './label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import ProcessFileButton from './process-file-button';

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



  const handleProcessComplete = (recordingId: string, audioUrl?: string) => {
    // Create a recording object from the processed result
    const newRecording = {
      id: recordingId,
      name: `Recording ${recordingId.substring(0, 8)}`,
      dateUploaded: new Date(),
      duration: 0, // Will be filled after processing
      overview: 'Processing complete',
      transcript: 'Transcript generated',
      intelligence: {
        keyTopics: ['Processed Content'],
        sentiment: 'Neutral',
        actionItems: ['Review recording']
      },
      exports: ['PDF'],
      audioUrl // Include local audio URL if available
    };

    onUploadComplete([newRecording]);
    onClose();
  };

  const handleProcessError = (error: string) => {
    console.error('File processing failed:', error);
    // You could show a toast or error message here
  };

  return (
    <div className="fixed !mt-0 inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload" className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  File Upload
                </TabsTrigger>
                <TabsTrigger value="url" className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  From URL
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="space-y-4">
                <FileUpload
                  multiple={true}
                  onUploadComplete={handleFileUploadComplete}
                  onUploadError={(error) => console.error('Upload error:', error)}
                />
                
                {uploadedFiles.length > 0 && (
                  <div className="space-y-4 pt-4 border-t">
                    {/* <div className="text-sm text-gray-600 mb-4">
                      Ready to process {uploadedFiles.length} file(s). Each file will be processed and stored locally for faster access.
                    </div> */}
                    
                    {uploadedFiles.map((uploadFile, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{uploadFile.name}</span>
                          <span className="text-sm text-gray-500">
                            {(uploadFile.size / (1024 * 1024)).toFixed(2)} MB
                          </span>
                        </div>
                        
                        <ProcessFileButton
                          file={uploadFile.file}
                          onProcessComplete={handleProcessComplete}
                          onProcessError={handleProcessError}
                          showProgress={true}
                          showStorageInfo={true}
                        />
                      </div>
                    ))}
                    
                    <div className="flex justify-end space-x-2 pt-4 border-t">
                      <Button variant="outline" onClick={onClose}>
                        Cancel
                      </Button>
                    </div>
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
