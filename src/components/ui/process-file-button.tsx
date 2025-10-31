    // Process File Button Component
    // Demonstrates integration of local storage functionality with UI

    import React, { useState, useMemo, useRef, useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { useUser, useAuth } from '@clerk/clerk-react';
    import { useAppDispatch } from '../../redux/hooks';
    import { fetchAndStoreApiResults } from '../../redux/slices/recordingsSlice';
    import { Button } from './button';
    import { Badge } from './badge';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
    import { Progress } from './progress';
    import { useRecordingAudio } from '../../hooks/useRecordingAudio';
    import { audioStorageService } from '../../services/audioStorageService';
    import { AudioTrimmer } from '../../utils/audioTrimmer';
    import { WorkflowHelpers, ClerkAuthHelpers } from '../../endpoints/index';

    // Constants for free trial limitations
    const FREE_TRIAL_ORG_ID = 'org_33nodgVx3c02DhIoiT1Wen7Xgup';
    const FREE_TRIAL_ROLE = 'org:free_trial';
    const FREE_TRIAL_TIME_LIMIT_SECONDS = 300; // 5 minutes

    interface ProcessFileButtonProps {
      file: File;
      onProcessComplete?: (recordingId: string, audioUrl?: string) => void;
      onProcessError?: (error: string) => void;
      className?: string;
      variant?: 'default' | 'outline' | 'secondary';
      showProgress?: boolean;
      showStorageInfo?: boolean;
    }

    const ProcessFileButton: React.FC<ProcessFileButtonProps> = ({
      file,
      onProcessComplete,
      onProcessError,
      className = '',
      variant = 'default',
      showProgress = true,
      showStorageInfo = false
    }) => {
      const navigate = useNavigate();
      const { user: clerkUser } = useUser();
      const { getToken } = useAuth(); // Add Clerk auth hook
      const dispatch = useAppDispatch();
      const [isProcessing, setIsProcessing] = useState(false);
      const [processingStage, setProcessingStage] = useState<string>('');
      const [progress, setProgress] = useState(0);
      const [isFinalizing, setIsFinalizing] = useState(false);
      const [processResult, setProcessResult] = useState<{
        recordingId?: string;
        audioUrl?: string;
        locallyStored?: boolean;
        isTrimmed?: boolean;
      } | null>(null);
      
      const finalizationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

      const {
        formatFileSize,
        refreshStorageStats
      } = useRecordingAudio();

      // Check if user is on free trial by examining organization memberships
      const isFreeTrial = useMemo(() => {
        if (!clerkUser?.organizationMemberships) return false;
        
        return clerkUser.organizationMemberships.some(membership => 
          membership.organization.id === FREE_TRIAL_ORG_ID && 
          membership.role === FREE_TRIAL_ROLE
        );
      }, [clerkUser]);

      // Cleanup timeout on unmount
      useEffect(() => {
        return () => {
          if (finalizationTimeoutRef.current) {
            clearTimeout(finalizationTimeoutRef.current);
          }
        };
      }, []);

      // Helper function to handle finalization delay and navigation
      const finalizeAndNavigate = (recordingId: string) => {
        setIsFinalizing(true);
        setProcessingStage('Finalizing Redux storage...');
        
        finalizationTimeoutRef.current = setTimeout(() => {
          setIsFinalizing(false);
          navigate(`/app/recordings/${recordingId}`);
        }, 4000);
      };

      const handleProcessFile = async () => {
        if (isProcessing) return;

        setIsProcessing(true);
        setProgress(0);
        setProcessResult(null);

        try {
          // Stage 1: Check if trimming is needed for free trial users
          let fileToProcess: File | Blob = file;
          let originalFile: File | Blob = file;
          let isTrimmed = false;

          if (isFreeTrial) {
            setProcessingStage('Checking audio duration...');
            setProgress(10);

            try {
              const duration = await AudioTrimmer.getAudioDuration(file);
              
              if (duration > FREE_TRIAL_TIME_LIMIT_SECONDS) {
                setProcessingStage('Trimming audio to 5 minutes...');
                setProgress(20);

                const trimResult = await AudioTrimmer.trimAudio(file, FREE_TRIAL_TIME_LIMIT_SECONDS);
                fileToProcess = trimResult.trimmedBlob;
                originalFile = trimResult.originalBlob;
                isTrimmed = true;

                console.log(`Audio trimmed from ${trimResult.originalDuration}s to ${trimResult.trimmedDuration}s`);
              }
            } catch (error) {
              console.warn('Failed to trim audio, proceeding with original:', error);
              // Continue with original file if trimming fails
            }
          }

          // Stage 2: Upload and process with API
          setProcessingStage('Uploading to API...');
          setProgress(30);

          try {
            // Convert Blob to File if necessary for API upload
            const uploadFile = fileToProcess instanceof Blob && !(fileToProcess instanceof File) 
              ? new File([fileToProcess], file.name, { type: file.type })
              : fileToProcess as File;

            // Prepare user metadata for API
            const userMetadata = {
              user_id: clerkUser?.id || 'anonymous',
              tenant_id: clerkUser?.organizationMemberships?.[0]?.organization?.id,
              audio_details: {
                duration_seconds: isFreeTrial && isTrimmed ? FREE_TRIAL_TIME_LIMIT_SECONDS : undefined,
                sample_rate: 16000, // Default sample rate
                channels: 1, // Default to mono
              },
            };

            // console.log('Uploading with user metadata:', {
            //   user_id: userMetadata.user_id,
            //   tenant_id: userMetadata.tenant_id,
            //   filename: uploadFile.name,
            //   file_size: uploadFile.size,
            //   is_free_trial: isFreeTrial,
            //   is_trimmed: isTrimmed,
            // });

            // Use the new WorkflowHelpers for API integration with user context
            const recordingId = await WorkflowHelpers.uploadAndProcess(
              uploadFile,
              getToken,
              userMetadata,
              (status) => {
                setProcessingStage(status);
                setProgress(Math.min(progress + 10, 70));
              }
            );

            // Stage 3: Poll for completion
            setProcessingStage('Processing...');
            setProgress(70);

            await WorkflowHelpers.pollStatus(
              recordingId,
              getToken,
              (status) => {
                setProcessingStage(`Processing: ${status.status} (${status.progress || 0}%)`);
                setProgress(70 + (status.progress || 0) * 0.1);
              }
            );

            // Stage 3.5: Fetch and store API results in Redux
            setProcessingStage('Fetching API results...');
            setProgress(85);
            
            try {
              await dispatch(fetchAndStoreApiResults({ 
                recordingId, 
                getToken: async () => {
                  try {
                    return await getToken({ template: 'synaptivoice-api' });
                  } catch (e) {
                    try {
                      return await getToken();
                    } catch (err) {
                      return null;
                    }
                  }
                }
              })).unwrap();
            } catch (error) {
              // console.warn('Failed to fetch and store API results, continuing with local storage only:', error);
              // Continue with the process even if API results fetch fails
            }

            // Stage 4: Store locally as backup
            setProcessingStage('Storing locally...');
            setProgress(90);

            // Store file(s) in localStorage using audioStorageService
            try {
              // console.log('Starting localStorage operation...', {
              //   recordingId,
              //   fileName: file.name,
              //   fileSize: file.size,
              //   fileType: file.type,
              //   isFreeTrial,
              //   isTrimmed
              // });

              const metadata = {
                duration: isFreeTrial && isTrimmed ? FREE_TRIAL_TIME_LIMIT_SECONDS : 0,
                transcriptId: `transcript-${recordingId}`,
                processed: true,
                user_id: clerkUser?.id || 'anonymous',
                tenant_id: clerkUser?.organizationMemberships?.[0]?.organization?.id,
                upload_timestamp: new Date().toISOString(),
                audio_details: {
                  original_filename: file.name,
                  file_size_bytes: file.size,
                  content_type: file.type,
                  is_free_trial: isFreeTrial,
                  is_trimmed: isTrimmed,
                }
              };

              if (isFreeTrial && isTrimmed) {
                // Store both trimmed and full versions for free trial users
                await audioStorageService.storeDualAudio(
                  recordingId,
                  fileToProcess,
                  originalFile,
                  file.name,
                  metadata
                );
                console.log('Successfully stored both trimmed and full audio versions:', recordingId);
              } else {
                // Store single version for non-free trial users or files that don't need trimming
                await audioStorageService.storeAudio(
                  recordingId,
                  fileToProcess,
                  file.name,
                  metadata
                );
                console.log('Successfully stored audio in localStorage:', recordingId);
              }
            } catch (storageError) {
              console.error('Failed to store audio in localStorage:', storageError);
              // Continue with the process even if localStorage fails
            }

            // Stage 5: Complete
            setProcessingStage('Complete!');
            setProgress(100);

            // Refresh storage stats
            await refreshStorageStats();

            // Create result object
            const result = {
              recordingId,
              audioUrl: URL.createObjectURL(fileToProcess),
              locallyStored: true,
              isTrimmed
            };

            setProcessResult(result);

            // Call completion callback if provided
            if (onProcessComplete) {
              onProcessComplete(result.recordingId, result.audioUrl);
            }

            // Add delay before navigation to allow Redux to store results
            finalizeAndNavigate(recordingId);

          } catch (apiError) {
            console.warn('API processing failed, falling back to local-only mode:', apiError);
            
            // Check if this is a CORS or network connectivity issue
            const errorMessage = apiError instanceof Error ? apiError.message : String(apiError);
            if (errorMessage.includes('CORS') || errorMessage.includes('Failed to fetch') || errorMessage.includes('PreflightMissingAllowOriginHeader')) {
              console.error('🚫 CORS Error Detected:', errorMessage);
              console.info('💡 Solution: Restart the development server to enable the proxy configuration');
              
              // Provide user-friendly error message
              if (onProcessError) {
                onProcessError('API connection blocked by browser security. Please restart the development server and try again.');
                return;
              }
            }
            
            // Fallback to local-only processing
            setProcessingStage('API unavailable, storing locally...');
            setProgress(80);

            // Generate a mock recording ID for fallback
            const recordingId = `recording-${Date.now()}`;

            // Store file(s) in localStorage as fallback
            try {
              const metadata = {
                duration: isFreeTrial && isTrimmed ? FREE_TRIAL_TIME_LIMIT_SECONDS : 0,
                transcriptId: `transcript-${recordingId}`,
                processed: false, // Mark as not processed by API
                user_id: clerkUser?.id || 'anonymous',
                tenant_id: clerkUser?.organizationMemberships?.[0]?.organization?.id,
                upload_timestamp: new Date().toISOString(),
                audio_details: {
                  original_filename: file.name,
                  file_size_bytes: file.size,
                  content_type: file.type,
                  is_free_trial: isFreeTrial,
                  is_trimmed: isTrimmed,
                }
              };

              if (isFreeTrial && isTrimmed) {
                await audioStorageService.storeDualAudio(
                  recordingId,
                  fileToProcess,
                  originalFile,
                  file.name,
                  metadata
                );
              } else {
                await audioStorageService.storeAudio(
                  recordingId,
                  fileToProcess,
                  file.name,
                  metadata
                );
              }

              // Complete with local storage only
              setProcessingStage('Stored locally (offline mode)');
              setProgress(100);

              const result = {
                recordingId,
                audioUrl: URL.createObjectURL(fileToProcess),
                locallyStored: true,
                isTrimmed
              };

              setProcessResult(result);

              if (onProcessComplete) {
                onProcessComplete(result.recordingId, result.audioUrl);
              }

              // Add delay before navigation to allow Redux to store results
              finalizeAndNavigate(recordingId);

            } catch (storageError: any) {
              throw new Error(`Both API and local storage failed: ${storageError?.message || 'Unknown error'}`);
            }
          }

        } catch (error) {
          console.error('Error processing file:', error);
          const errorMessage = error instanceof Error ? error.message : 'Failed to process file';
          
          if (onProcessError) {
            onProcessError(errorMessage);
          }
        } finally {
          setIsProcessing(false);
          setProcessingStage('');
          setProgress(0);
        }
      };

      const getButtonText = () => {
        if (isProcessing) {
          return processingStage || 'Processing...';
        }
        if (processResult) {
          return 'Process Another File';
        }
        return 'Process File';
      };

      const getButtonIcon = () => {
        if (isProcessing) {
          return (
            <svg className="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          );
        }
        
        if (processResult) {
          return (
            <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          );
        }

        return (
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        );
      };

      return (
        <div className="relative space-y-4">
          {/* File Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {file.name}
              </CardTitle>
              <CardDescription>
                Size: {formatFileSize(file.size)} • Type: {file.type}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {file.type.includes('audio') ? 'Audio' : 'Video'} File
                    </Badge>
                    {processResult?.locallyStored && (
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        Stored Locally
                      </Badge>
                    )}
                  </div>
                  
                  {showProgress && isProcessing && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{processingStage}</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} className="w-full" />
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleProcessFile}
                  disabled={isProcessing}
                  variant={processResult ? 'outline' : variant}
                  className={className}
                >
                  {getButtonIcon()}
                  {getButtonText()}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Storage Information */}
          {/* {showStorageInfo && localStorageStats && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Local Storage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Used Space:</span>
                    <span>{formatFileSize(localStorageStats.totalSize)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Available:</span>
                    <span>{formatFileSize(localStorageStats.availableSpace)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Files Stored:</span>
                    <span>{localStorageStats.totalFiles}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Utilization:</span>
                      <span>{getStorageUtilization().toFixed(1)}%</span>
                    </div>
                    <Progress 
                      value={getStorageUtilization()} 
                      className="w-full h-2" 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )} */}

          {/* Process Result */}
          {processResult && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-lg text-green-800 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Processing Complete
                </CardTitle>
                <CardDescription className="text-green-700">
                  Your file has been processed and stored locally for faster access.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Recording ID:</span>
                    <code className="bg-white px-2 py-1 rounded text-xs">
                      {processResult.recordingId}
                    </code>
                  </div>
                  <div className="flex justify-between">
                    <span>Local Storage:</span>
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      Available
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Features Generated:</span>
                    <div className="flex gap-1">
                      <Badge variant="outline" className="text-xs">Transcript</Badge>
                      <Badge variant="outline" className="text-xs">Intelligence</Badge>
                      <Badge variant="outline" className="text-xs">Exports</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Finalization Loading Overlay */}
          {isFinalizing && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg z-50">
              <div className="flex flex-col items-center space-y-3 text-white">
                <svg className="w-8 h-8 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <p className="text-sm font-medium">Finalizing...</p>
                <p className="text-xs text-gray-300">Preparing your recording data</p>
              </div>
            </div>
          )}
        </div>
      );
    };

    export default ProcessFileButton;