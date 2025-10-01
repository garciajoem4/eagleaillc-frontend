# Local Audio Storage Integration Guide

## Overview

This guide explains how to use the new local audio storage functionality that has been integrated into the SynaptiVoice frontend application. The system now supports storing uploaded recordings locally on the user's device for faster access and offline playback.

## Features Added

### 1. **Local Storage Service** (`src/services/audioStorageService.ts`)
- Stores audio files locally using IndexedDB
- Automatic cleanup based on retention policies
- Storage usage statistics and management
- Supports large audio files efficiently

### 2. **Recording Service** (`src/services/recordingService.ts`)
- Handles API communication with the server
- Coordinates between local storage and server
- "Process File" functionality with local storage integration
- Automatic fallback from local to server audio

### 3. **Enhanced Redux State** (`src/redux/slices/recordingsSlice.ts`)
- Tracks local audio storage status for each recording
- Storage statistics and utilization
- New actions for local storage management

### 4. **Custom Hook** (`src/hooks/useRecordingAudio.ts`)
- Easy-to-use interface for components
- Handles all local storage operations
- Provides utility functions for file size formatting

### 5. **Process File Button Component** (`src/components/ui/process-file-button.tsx`)
- Ready-to-use UI component for file processing
- Shows progress, storage info, and results
- Integrates with Redux and services

## API Endpoints

All API endpoints are defined in `src/endpoints/index.ts`:

```typescript
// Example usage
import { buildUrl, RECORDING_ENDPOINTS } from '../endpoints';

const recordingUrl = buildUrl(RECORDING_ENDPOINTS.GET_BY_ID('123'));
// Results in: https://api.synaptivoice.com/v1/recordings/123
```

### Available Endpoints:
- **Recording Management**: CRUD operations, processing, downloads
- **File Storage**: Upload, download, metadata
- **User Management**: Profile, settings, usage
- **Billing**: Subscription, invoices, payment methods

## Usage Examples

### 1. Process a File with Local Storage

```typescript
import { useRecordingAudio } from '../hooks/useRecordingAudio';

const MyComponent = () => {
  const { processFile } = useRecordingAudio();

  const handleFileUpload = async (file: File) => {
    try {
      await processFile(file, {
        storeLocally: true,
        transcribe: true,
        generateIntelligence: true,
        exportFormats: ['pdf', 'docx']
      });
      console.log('File processed and stored locally!');
    } catch (error) {
      console.error('Processing failed:', error);
    }
  };

  return (
    <input 
      type="file" 
      onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
    />
  );
};
```

### 2. Get Audio URL (Local First, Server Fallback)

```typescript
import { useRecordingAudio } from '../hooks/useRecordingAudio';

const AudioPlayer = ({ recordingId }: { recordingId: string }) => {
  const { loadAudio, getAudioUrl } = useRecordingAudio();
  const [audioUrl, setAudioUrl] = useState<string | undefined>();

  useEffect(() => {
    const loadRecordingAudio = async () => {
      await loadAudio(recordingId);
      const url = getAudioUrl(recordingId);
      setAudioUrl(url);
    };
    
    loadRecordingAudio();
  }, [recordingId, loadAudio, getAudioUrl]);

  return audioUrl ? (
    <audio controls src={audioUrl} />
  ) : (
    <div>Loading audio...</div>
  );
};
```

### 3. Check Local Storage Status

```typescript
import { useRecordingAudio } from '../hooks/useRecordingAudio';

const StorageInfo = () => {
  const { 
    localStorageStats, 
    formatFileSize, 
    getStorageUtilization 
  } = useRecordingAudio();

  if (!localStorageStats) return <div>Loading...</div>;

  return (
    <div>
      <p>Files: {localStorageStats.totalFiles}</p>
      <p>Used: {formatFileSize(localStorageStats.totalSize)}</p>
      <p>Available: {formatFileSize(localStorageStats.availableSpace)}</p>
      <p>Utilization: {getStorageUtilization()}%</p>
    </div>
  );
};
```

### 4. Use Redux Actions Directly

```typescript
import { useAppDispatch } from '../redux/hooks';
import { processFileWithLocalStorage, getRecordingAudio } from '../redux';

const MyComponent = () => {
  const dispatch = useAppDispatch();

  const handleProcessFile = async (file: File) => {
    const result = await dispatch(processFileWithLocalStorage({ 
      file, 
      options: { storeLocally: true } 
    })).unwrap();
    
    console.log('Processing result:', result);
  };

  const handleGetAudio = async (recordingId: string) => {
    const result = await dispatch(getRecordingAudio(recordingId)).unwrap();
    console.log('Audio URL:', result.audioUrl);
  };
};
```

### 5. Using the Process File Button Component

```typescript
import ProcessFileButton from '../components/ui/process-file-button';

const UploadInterface = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleProcessComplete = (recordingId: string, audioUrl?: string) => {
    console.log('Processing complete!', { recordingId, audioUrl });
    // Navigate to recording detail or show success message
  };

  const handleProcessError = (error: string) => {
    console.error('Processing failed:', error);
    // Show error message to user
  };

  return (
    <div>
      <input 
        type="file" 
        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
      />
      
      {selectedFile && (
        <ProcessFileButton
          file={selectedFile}
          onProcessComplete={handleProcessComplete}
          onProcessError={handleProcessError}
          showProgress={true}
          showStorageInfo={true}
        />
      )}
    </div>
  );
};
```

## Integration with Existing Components

### 1. Update RecordingDetail.tsx

Replace the audio source logic to check local storage first:

```typescript
// In RecordingDetail.tsx
import { useRecordingAudio } from '../hooks/useRecordingAudio';

const RecordingDetail = ({ recordingId }: { recordingId: string }) => {
  const { getAudioUrl, hasLocalAudio, loadAudio } = useRecordingAudio();
  const [audioSrc, setAudioSrc] = useState<string>('');

  useEffect(() => {
    const loadRecordingAudio = async () => {
      // Check if we have local audio
      if (hasLocalAudio(recordingId)) {
        const url = getAudioUrl(recordingId);
        if (url) {
          setAudioSrc(url);
          return;
        }
      }
      
      // Load from server if not available locally
      await loadAudio(recordingId);
      const url = getAudioUrl(recordingId);
      if (url) {
        setAudioSrc(url);
      }
    };

    loadRecordingAudio();
  }, [recordingId]);

  return (
    <div>
      {audioSrc ? (
        <audio controls src={audioSrc}>
          Your browser does not support the audio element.
        </audio>
      ) : (
        <div>Loading audio...</div>
      )}
    </div>
  );
};
```

### 2. Update UploadModal.tsx

Add the ProcessFileButton component to the upload flow:

```typescript
// In UploadModal.tsx (add after file selection)
import ProcessFileButton from './process-file-button';

// Inside the component, after file is selected:
{selectedFiles.map((file, index) => (
  <ProcessFileButton
    key={index}
    file={file}
    onProcessComplete={(recordingId, audioUrl) => {
      // Handle successful processing
      onUploadComplete([{ id: recordingId, name: file.name, audioUrl }]);
    }}
    onProcessError={(error) => {
      // Handle processing error
      console.error('Processing failed:', error);
    }}
    showProgress={true}
    showStorageInfo={true}
  />
))}
```

## Environment Configuration

Add these environment variables to your `.env` file:

```bash
# API Configuration
REACT_APP_API_BASE_URL=https://api.synaptivoice.com
REACT_APP_API_VERSION=v1

# Optional: Local Storage Configuration
REACT_APP_MAX_LOCAL_STORAGE_SIZE=2147483648  # 2GB in bytes
REACT_APP_AUDIO_RETENTION_DAYS=30
```

## Storage Management

The system automatically manages local storage:

- **Retention Policy**: Files older than 30 days are automatically deleted
- **Size Limits**: Maximum 2GB of local storage (configurable)
- **Cleanup**: Least recently accessed files are removed when storage is full
- **Statistics**: Real-time storage usage tracking

## Error Handling

All services include comprehensive error handling:

```typescript
try {
  await processFile(file);
} catch (error) {
  if (error.message.includes('storage')) {
    // Handle storage-related errors
    console.log('Storage limit reached');
  } else if (error.message.includes('network')) {
    // Handle network-related errors
    console.log('Network error occurred');
  } else {
    // Handle other errors
    console.log('General error:', error.message);
  }
}
```

## Performance Considerations

- **IndexedDB**: Used for efficient large file storage
- **Lazy Loading**: Audio is only loaded when needed
- **Caching**: Local files are cached and reused
- **Background Cleanup**: Storage cleanup runs automatically
- **Progress Tracking**: Real-time progress updates during processing

## Next Steps

1. **Test the Integration**: Use the ProcessFileButton component in your upload flow
2. **Customize Endpoints**: Update the API endpoints in `src/endpoints/index.ts` to match your actual API
3. **Add Authentication**: Integrate the recording service with your authentication system
4. **Monitor Storage**: Add storage management UI for users to see and manage their local files
5. **Error Handling**: Implement user-friendly error messages and retry mechanisms

## Troubleshooting

### Common Issues:

1. **IndexedDB Not Supported**: Fallback to server-only mode
2. **Storage Quota Exceeded**: Automatic cleanup triggers
3. **Network Errors**: Graceful fallback to local files
4. **File Corruption**: Re-download from server option

### Debug Mode:

Enable debug logging by setting `localStorage.debug = 'synaptivoice:*'` in the browser console.

This integration provides a robust foundation for local audio storage while maintaining compatibility with your existing server-based system.