import { useState, useCallback } from 'react';

export interface UploadFile {
  file: File;
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

interface UseFileUploadOptions {
  acceptedTypes: string[];
  maxFileSize: number; // in bytes
  multiple?: boolean;
  onUploadComplete?: (files: UploadFile[]) => void;
  onUploadError?: (error: string) => void;
}

export const useFileUpload = (options: UseFileUploadOptions) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const validateFile = useCallback((file: File): string | null => {
    // Check file type
    const isValidType = options.acceptedTypes.some(type => {
      if (type.startsWith('.')) {
        return file.name.toLowerCase().endsWith(type.toLowerCase());
      }
      return file.type.includes(type);
    });

    if (!isValidType) {
      return `File type not supported. Accepted types: ${options.acceptedTypes.join(', ')}`;
    }

    // Check file size
    if (file.size > options.maxFileSize) {
      const maxSizeMB = options.maxFileSize / (1024 * 1024);
      return `File size exceeds ${maxSizeMB}MB limit`;
    }

    return null;
  }, [options.acceptedTypes, options.maxFileSize]);

  const uploadFile = useCallback(async (uploadFile: UploadFile): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Simulate upload with progress
      setUploadedFiles(prev => 
        prev.map(f => f.id === uploadFile.id ? { ...f, status: 'uploading' } : f)
      );

      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 100) progress = 100;

        setUploadedFiles(prev => 
          prev.map(f => f.id === uploadFile.id ? { ...f, progress } : f)
        );

        if (progress >= 100) {
          clearInterval(interval);
          setUploadedFiles(prev => 
            prev.map(f => f.id === uploadFile.id ? { ...f, status: 'success', progress: 100 } : f)
          );
          resolve();
        }
      }, 200);

      // Simulate potential error (5% chance)
      if (Math.random() < 0.05) {
        setTimeout(() => {
          clearInterval(interval);
          setUploadedFiles(prev => 
            prev.map(f => f.id === uploadFile.id ? { 
              ...f, 
              status: 'error', 
              error: 'Upload failed. Please try again.' 
            } : f)
          );
          reject(new Error('Upload failed'));
        }, 1000);
      }
    });
  }, []);

  const handleFileSelect = useCallback(async (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const newUploadFiles: UploadFile[] = [];

    // Validate files
    for (const file of fileArray) {
      const error = validateFile(file);
      const uploadFile: UploadFile = {
        file,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: error ? 'error' : 'pending',
        error: error || undefined
      };
      newUploadFiles.push(uploadFile);
    }

    setUploadedFiles(prev => [...prev, ...newUploadFiles]);

    // Upload valid files
    const validFiles = newUploadFiles.filter(f => f.status === 'pending');
    if (validFiles.length > 0) {
      setIsUploading(true);
      
      try {
        await Promise.all(validFiles.map(uploadFile));
        options.onUploadComplete?.(validFiles);
      } catch (error) {
        options.onUploadError?.(error instanceof Error ? error.message : 'Upload failed');
      } finally {
        setIsUploading(false);
      }
    }
  }, [validateFile, uploadFile, options]);

  const removeFile = useCallback((fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  }, []);

  const clearFiles = useCallback(() => {
    setUploadedFiles([]);
  }, []);

  const retryUpload = useCallback(async (fileId: string) => {
    const file = uploadedFiles.find(f => f.id === fileId);
    if (!file) return;

    setUploadedFiles(prev => 
      prev.map(f => f.id === fileId ? { ...f, status: 'pending', error: undefined, progress: 0 } : f)
    );

    try {
      await uploadFile(file);
    } catch (error) {
      // Error handling is done in uploadFile
    }
  }, [uploadedFiles, uploadFile]);

  return {
    uploadedFiles,
    isUploading,
    handleFileSelect,
    removeFile,
    clearFiles,
    retryUpload
  };
};
