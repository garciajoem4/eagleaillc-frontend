import React, { useRef, useCallback } from 'react';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import { Progress } from './progress';
import { useReduxFileUpload } from '../../hooks/useReduxFileUpload';
import { UploadFile } from '../../redux/slices/uploadsSlice';

interface ReduxFileUploadProps {
  onUploadComplete?: (files: UploadFile[]) => void;
  onUploadError?: (error: string) => void;
  multiple?: boolean;
  className?: string;
  autoUpload?: boolean;
  showProgress?: boolean;
  showStats?: boolean;
}

const ReduxFileUpload: React.FC<ReduxFileUploadProps> = ({
  onUploadComplete,
  onUploadError,
  multiple = false,
  className = '',
  autoUpload = true,
  showProgress = true,
  showStats = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    uploadedFiles,
    pendingFiles,
    successfulFiles,
    isUploading,
    totalProgress,
    handleFileSelect,
    removeFile,
    clearFiles,
    clearCompleted,
    retryUpload,
    cancelUpload,
    startUploads,
    getUploadStats,
    config
  } = useReduxFileUpload({
    onUploadComplete,
    onUploadError,
    autoUpload
  });

  const handleButtonClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(event.target.files);
    // Reset input to allow same file selection
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [handleFileSelect]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    
    const files = event.dataTransfer.files;
    handleFileSelect(files);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleDragEnter = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusColor = (status: UploadFile['status']): string => {
    switch (status) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'uploading':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-gray-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getStatusText = (status: UploadFile['status']): string => {
    switch (status) {
      case 'success':
        return 'Completed';
      case 'error':
        return 'Failed';
      case 'uploading':
        return 'Uploading...';
      case 'pending':
        return 'Pending';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  const stats = getUploadStats();

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <Card>
        <CardContent className="p-6">
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onClick={handleButtonClick}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              multiple={multiple}
              accept={config.acceptedTypes.join(',')}
            />
            
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 text-gray-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 48 48">
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              
              <div>
                <p className="text-lg font-medium text-gray-900">
                  Drop files here or click to upload
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Supports: {config.acceptedTypes.join(', ')} up to {formatFileSize(config.maxFileSize)}
                </p>
              </div>

              <Button type="button" className="bg-blue-600 hover:bg-blue-700">
                Choose Files
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      {showStats && uploadedFiles.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                <div className="text-sm text-gray-500">Total</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                <div className="text-sm text-gray-500">Pending</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{stats.uploading}</div>
                <div className="text-sm text-gray-500">Uploading</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{stats.successful}</div>
                <div className="text-sm text-gray-500">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
                <div className="text-sm text-gray-500">Failed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Global Progress */}
      {showProgress && isUploading && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span>{Math.round(totalProgress)}%</span>
              </div>
              <Progress value={totalProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* File List */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Files ({uploadedFiles.length})</h3>
              <div className="space-x-2">
                {!autoUpload && pendingFiles.length > 0 && (
                  <Button
                    onClick={startUploads}
                    size="sm"
                    disabled={isUploading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Start Upload
                  </Button>
                )}
                {successfulFiles.length > 0 && (
                  <Button onClick={clearCompleted} size="sm" variant="outline">
                    Clear Completed
                  </Button>
                )}
                <Button onClick={clearFiles} size="sm" variant="outline">
                  Clear All
                </Button>
              </div>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(file.status)}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(file.size)} • {getStatusText(file.status)}
                        </p>
                        {file.error && (
                          <p className="text-xs text-red-600 mt-1">{file.error}</p>
                        )}
                      </div>
                    </div>

                    {/* Individual file progress */}
                    {file.status === 'uploading' && (
                      <div className="mt-2">
                        <Progress value={file.progress} className="h-1" />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <Badge variant="outline" className="text-xs">
                      {getStatusText(file.status)}
                    </Badge>

                    {file.status === 'error' && (
                      <Button
                        onClick={() => retryUpload(file.id)}
                        size="sm"
                        variant="outline"
                        className="px-2 py-1 h-auto text-xs"
                      >
                        Retry
                      </Button>
                    )}

                    {(file.status === 'uploading' || file.status === 'pending') && (
                      <Button
                        onClick={() => cancelUpload(file.id)}
                        size="sm"
                        variant="outline"
                        className="px-2 py-1 h-auto text-xs text-red-600 border-red-200 hover:bg-red-50"
                      >
                        Cancel
                      </Button>
                    )}

                    <Button
                      onClick={() => removeFile(file.id)}
                      size="sm"
                      variant="outline"
                      className="px-2 py-1 h-auto text-xs text-red-600 border-red-200 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReduxFileUpload;