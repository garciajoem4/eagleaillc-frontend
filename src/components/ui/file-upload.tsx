import React, { useRef } from 'react';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import { useFileUpload, UploadFile } from '../../hooks/useFileUpload';

interface FileUploadProps {
  onUploadComplete?: (files: UploadFile[]) => void;
  onUploadError?: (error: string) => void;
  multiple?: boolean;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onUploadComplete,
  onUploadError,
  multiple = false,
  className = ''
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    uploadedFiles,
    isUploading,
    handleFileSelect,
    removeFile,
    clearFiles,
    retryUpload
  } = useFileUpload({
    acceptedTypes: ['.mp3', '.mp4', '.mov', '.avi', '.wmv', '.flv', '.webm', 'audio/', 'video/'],
    maxFileSize: 500 * 1024 * 1024, // 500MB
    multiple,
    onUploadComplete,
    onUploadError
  });

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(event.target.files);
    // Reset input to allow same file selection
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleFileSelect(files);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileTypeIcon = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'mp3':
      case 'wav':
      case 'aac':
        return '🎵';
      case 'mp4':
      case 'mov':
      case 'avi':
      case 'wmv':
      case 'flv':
      case 'webm':
        return '🎬';
      default:
        return '📁';
    }
  };

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept=".mp3,.mp4,.mov,.avi,.wmv,.flv,.webm,audio/*,video/*"
        multiple={multiple}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
        onClick={handleButtonClick}
      >
        <div className="space-y-4">
          <div className="text-4xl">📤</div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Upload Audio or Video Files</h3>
            <p className="text-gray-500 mt-1">
              Drag and drop files here, or click to browse
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Supports MP3, MP4, MOV, AVI, WMV, FLV, WebM (max 500MB)
            </p>
          </div>
          <Button type="button" variant="outline">
            Choose Files
          </Button>
        </div>
      </div>

      {/* Upload Progress */}
      {uploadedFiles.length > 0 && (
        <Card className="mt-4">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">
                {multiple ? 'Uploaded Files' : 'Upload Progress'}
              </h4>
              {uploadedFiles.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFiles}
                  disabled={isUploading}
                >
                  Clear All
                </Button>
              )}
            </div>

            <div className="space-y-3">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className="text-2xl">{getFileTypeIcon(file.name)}</div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">
                          {formatFileSize(file.size)}
                        </span>
                        {file.status === 'success' && (
                          <Badge variant="default">✓ Complete</Badge>
                        )}
                        {file.status === 'error' && (
                          <Badge variant="destructive">✗ Error</Badge>
                        )}
                        {file.status === 'uploading' && (
                          <Badge variant="secondary">⏳ Uploading</Badge>
                        )}
                      </div>
                    </div>

                    {file.status === 'uploading' && (
                      <div className="mt-2">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {Math.round(file.progress)}% complete
                        </p>
                      </div>
                    )}

                    {file.status === 'error' && file.error && (
                      <p className="text-xs text-red-600 mt-1">{file.error}</p>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    {file.status === 'error' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => retryUpload(file.id)}
                      >
                        Retry
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeFile(file.id)}
                      disabled={file.status === 'uploading'}
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

export default FileUpload;
