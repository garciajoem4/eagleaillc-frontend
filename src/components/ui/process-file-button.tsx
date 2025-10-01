// Process File Button Component
// Demonstrates integration of local storage functionality with UI

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './button';
import { Badge } from './badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Progress } from './progress';
import { useRecordingAudio } from '../../hooks/useRecordingAudio';
import { audioStorageService } from '../../services/audioStorageService';
import { ProcessFileOptions } from '../../services/recordingService';

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
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [processResult, setProcessResult] = useState<{
    recordingId?: string;
    audioUrl?: string;
    locallyStored?: boolean;
  } | null>(null);

  const {
    processFile,
    formatFileSize,
    refreshStorageStats
  } = useRecordingAudio();

  const handleProcessFile = async () => {
    if (isProcessing) return;

    setIsProcessing(true);
    setProgress(0);
    setProcessResult(null);

    try {
      // Stage 1: Uploading
      setProcessingStage('Uploading file...');
      setProgress(20);

      // Simulate upload time
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Configure processing options
      const options: ProcessFileOptions = {
        storeLocally: true,
        transcribe: true,
        generateIntelligence: true,
        exportFormats: ['pdf', 'docx']
      };

      // Stage 2: Processing with AI
      setProcessingStage('Processing with AI...');
      setProgress(50);

      // TODO: Uncomment for future API integration
      // await processFile(file, options);
      
      // Simulate API processing time
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Stage 3: Storing locally
      setProcessingStage('Storing locally...');
      setProgress(80);

      // Generate a mock recording ID
      const recordingId = `recording-${Date.now()}`;

      // Store file in localStorage using audioStorageService
      await audioStorageService.storeAudio(
        recordingId,
        file,
        file.name,
        {
          duration: 0, // Will be updated after processing
          transcriptId: `transcript-${recordingId}`,
          processed: true
        }
      );

      // Stage 4: Complete
      setProcessingStage('Complete!');
      setProgress(100);

      // Refresh storage stats
      await refreshStorageStats();

      // Create result object
      const result = {
        recordingId,
        audioUrl: URL.createObjectURL(file),
        locallyStored: true
      };

      setProcessResult(result);

      // Call completion callback if provided
      if (onProcessComplete) {
        onProcessComplete(result.recordingId, result.audioUrl);
      }

      // Navigate to recording detail page
      navigate(`/app/recordings/${recordingId}`);

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
    <div className="space-y-4">
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
    </div>
  );
};

export default ProcessFileButton;