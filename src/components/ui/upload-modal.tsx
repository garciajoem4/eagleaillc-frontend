import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { UploadFile } from '../../hooks/useFileUpload';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addFiles, addFileAnalytics, type FileAnalytics } from '../../redux/slices/uploadsSlice';
import { selectSubscription } from '../../redux';
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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user: clerkUser } = useUser();
  const subscription = useAppSelector(selectSubscription);
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);
  const [urlInput, setUrlInput] = useState('');
  const [limitError, setLimitError] = useState<string | null>(null);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);

  // Check subscription limits
  const uploadLimit = useMemo(() => {
    if (!subscription?.usage) return null;
    return {
      current: subscription.usage.files_uploaded || 0,
      limit: subscription.usage.files_limit || 0,
      limitText: subscription.usage.files_limit_text || 'Unlimited',
      remaining: (subscription.usage.files_limit || 0) - (subscription.usage.files_uploaded || 0)
    };
  }, [subscription]);

  const hasReachedLimit = useMemo(() => {
    if (!uploadLimit) return false;
    return uploadLimit.remaining <= 0;
  }, [uploadLimit]);

  const tierName = useMemo(() => {
    return subscription?.tierDisplayName || subscription?.tier || 'Free';
  }, [subscription]);

  // Reset error when modal closes
  useEffect(() => {
    if (!isOpen) {
      setLimitError(null);
      setShowUpgradePrompt(false);
      setUploadedFiles([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileUploadComplete = (files: UploadFile[]) => {
    // Check if user has reached upload limit
    if (hasReachedLimit) {
      setLimitError(`File limit exceeded. You've reached your ${tierName} plan limit of ${uploadLimit?.limitText}.`);
      setShowUpgradePrompt(true);
      return;
    }

    // Check if uploading these files would exceed the limit
    if (uploadLimit && uploadLimit.remaining < files.length) {
      setLimitError(`Cannot upload ${files.length} file(s). You have ${uploadLimit.remaining} upload(s) remaining on your ${tierName} plan.`);
      setShowUpgradePrompt(true);
      return;
    }

    setLimitError(null);
    setShowUpgradePrompt(false);
    setUploadedFiles(files);
    
    // Store file data in Redux for fallback/analytics purposes
    if (files.length > 0) {
      // Extract raw File objects to store in Redux uploads slice
      const rawFiles = files.map(f => f.file);
      dispatch(addFiles(rawFiles));
      
      // Store file analytics data for dashboard fallback (includes file size and name)
      files.forEach((file, index) => {
        const fileAnalyticsData: FileAnalytics = {
          recordingId: `pending-${Date.now()}-${index}`, // Temporary ID until processed
          fileName: file.name,
          fileSize: file.size,
          fileType: file.file.type,
          uploadedAt: new Date().toISOString(),
          userId: clerkUser?.id,
          tenantId: clerkUser?.organizationMemberships?.[0]?.organization?.id,
        };
        dispatch(addFileAnalytics(fileAnalyticsData));
      });
      
      // Log file details for debugging
      console.log('Files stored in Redux for fallback:', files.map(f => ({
        name: f.name,
        size: f.size,
        type: f.file.type,
        userId: clerkUser?.id,
      })));
    }
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



  const handleProcessStart = () => {
    // Close the modal immediately when processing starts
    onClose();
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

    // Call the parent callback to update the recordings list
    onUploadComplete([newRecording]);
    
    // Navigate directly to the recording detail page
    navigate(`/app/recordings/${recordingId}`);
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
                {/* Upload Limit Warning */}
                {uploadLimit && uploadLimit.remaining <= 3 && uploadLimit.remaining > 0 && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-yellow-800">
                          Approaching upload limit
                        </p>
                        <p className="text-xs text-yellow-700 mt-1">
                          You have {uploadLimit.remaining} upload(s) remaining on your {tierName} plan.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Limit Error Message */}
                {limitError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-red-800 mb-1">
                          Upload Limit Reached
                        </p>
                        <p className="text-sm text-red-700">
                          {limitError}
                        </p>
                        {showUpgradePrompt && (
                          <div className="mt-3">
                            <Button
                              size="sm"
                              className="bg-red-600 hover:bg-red-700 text-white"
                              onClick={() => {
                                onClose();
                                navigate('/app/billings');
                              }}
                            >
                              Upgrade Plan
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

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
                      <div key={index} className="relative">
                        {/* <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{uploadFile.name}</span>
                          <span className="text-sm text-gray-500">
                            {(uploadFile.size / (1024 * 1024)).toFixed(2)} MB
                          </span>
                        </div> */}
                        
                        <ProcessFileButton
                          file={uploadFile.file}
                          onProcessStart={handleProcessStart}
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
