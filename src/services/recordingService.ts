// Recording Service
// Handles API calls for recordings and coordinates with local storage

import { audioStorageService } from './audioStorageService';
import { RECORDING_ENDPOINTS, STORAGE_ENDPOINTS, buildUrl, API_CONFIG } from '../endpoints';
import { Recording } from '../types';

export interface ProcessFileOptions {
  storeLocally?: boolean;
  transcribe?: boolean;
  generateIntelligence?: boolean;
  exportFormats?: string[];
}

export interface ProcessFileResult {
  recordingId: string;
  transcriptId?: string;
  intelligenceId?: string;
  audioUrl?: string;
  locallyStored: boolean;
  processingStatus: 'pending' | 'processing' | 'completed' | 'failed';
}

export interface UploadProgress {
  uploadId: string;
  progress: number;
  status: 'uploading' | 'processing' | 'completed' | 'failed';
  error?: string;
}

class RecordingService {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor() {
    this.baseUrl = API_CONFIG.FULL_BASE_URL;
    this.headers = API_CONFIG.HEADERS;
  }

  /**
   * Set authentication token
   */
  setAuthToken(token: string): void {
    this.headers['Authorization'] = `Bearer ${token}`;
  }

  /**
   * Upload and process a recording file
   */
  async processFile(
    file: File,
    options: ProcessFileOptions = {}
  ): Promise<ProcessFileResult> {
    const {
      storeLocally = true,
      transcribe = true,
      generateIntelligence = true,
      exportFormats = ['pdf', 'docx']
    } = options;

    try {
      // Step 1: Upload the file
      const uploadResult = await this.uploadFile(file);
      
      // Step 2: Store locally if requested
      if (storeLocally) {
        await audioStorageService.storeAudio(
          uploadResult.recordingId,
          file,
          file.name,
          {
            duration: 0, // Will be updated after processing
            transcriptId: uploadResult.transcriptId,
            processed: false
          }
        );
      }

      // Step 3: Process the recording
      const processResult = await this.processRecording(uploadResult.recordingId, {
        transcribe,
        generateIntelligence,
        exportFormats
      });

      // Step 4: Create local audio URL if stored locally
      let audioUrl: string | undefined;
      if (storeLocally) {
        audioUrl = (await audioStorageService.createAudioUrl(uploadResult.recordingId)) || undefined;
      }

      return {
        recordingId: uploadResult.recordingId,
        transcriptId: processResult.transcriptId,
        intelligenceId: processResult.intelligenceId,
        audioUrl: audioUrl || processResult.audioUrl,
        locallyStored: storeLocally,
        processingStatus: processResult.status
      };

    } catch (error) {
      console.error('Error processing file:', error);
      throw new Error('Failed to process file. Please try again.');
    }
  }

  /**
   * Upload a single file to the server
   */
  private async uploadFile(file: File): Promise<{
    recordingId: string;
    transcriptId?: string;
    uploadId: string;
  }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    formData.append('fileSize', file.size.toString());
    formData.append('mimeType', file.type);

    const response = await fetch(buildUrl(RECORDING_ENDPOINTS.CREATE), {
      method: 'POST',
      headers: {
        // Don't set Content-Type for FormData, browser will set it with boundary
        'Authorization': this.headers['Authorization'],
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const result = await response.json();
    return {
      recordingId: result.id || result.recordingId,
      transcriptId: result.transcriptId,
      uploadId: result.uploadId,
    };
  }

  /**
   * Process a recording (transcription and intelligence)
   */
  private async processRecording(
    recordingId: string,
    options: {
      transcribe?: boolean;
      generateIntelligence?: boolean;
      exportFormats?: string[];
    }
  ): Promise<{
    transcriptId?: string;
    intelligenceId?: string;
    audioUrl?: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
  }> {
    const response = await fetch(buildUrl(RECORDING_ENDPOINTS.PROCESS(recordingId)), {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(options),
    });

    if (!response.ok) {
      throw new Error(`Processing failed: ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Get recording audio - check local first, then server
   */
  async getRecordingAudio(recordingId: string): Promise<string | null> {
    try {
      // Check local storage first
      const localUrl = await audioStorageService.createAudioUrl(recordingId);
      if (localUrl) {
        console.log('Using local audio for recording:', recordingId);
        return localUrl;
      }

      // Fallback to server
      console.log('Fetching audio from server for recording:', recordingId);
      return await this.fetchAudioFromServer(recordingId);

    } catch (error) {
      console.error('Error getting recording audio:', error);
      return null;
    }
  }

  /**
   * Fetch audio from server and optionally store locally
   */
  async fetchAudioFromServer(
    recordingId: string,
    storeLocally: boolean = true
  ): Promise<string | null> {
    try {
      const response = await fetch(buildUrl(STORAGE_ENDPOINTS.DOWNLOAD(recordingId)), {
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch audio: ${response.statusText}`);
      }

      const blob = await response.blob();
      
      // Store locally if requested
      if (storeLocally) {
        const recording = await this.getRecording(recordingId);
        await audioStorageService.storeAudio(
          recordingId,
          blob,
          recording?.name || `recording-${recordingId}`,
          {
            duration: recording?.duration,
            processed: true
          }
        );
      }

      return URL.createObjectURL(blob);

    } catch (error) {
      console.error('Error fetching audio from server:', error);
      return null;
    }
  }

  /**
   * Get all recordings
   */
  async getRecordings(filters?: {
    page?: number;
    limit?: number;
    search?: string;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<{
    recordings: Recording[];
    total: number;
    page: number;
    limit: number;
  }> {
    const queryParams = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const url = `${buildUrl(RECORDING_ENDPOINTS.LIST)}?${queryParams}`;
    const response = await fetch(url, {
      headers: this.headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch recordings: ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Get a single recording
   */
  async getRecording(recordingId: string): Promise<Recording | null> {
    try {
      const response = await fetch(buildUrl(RECORDING_ENDPOINTS.GET_BY_ID(recordingId)), {
        headers: this.headers,
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`Failed to fetch recording: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching recording:', error);
      return null;
    }
  }

  /**
   * Delete a recording
   */
  async deleteRecording(recordingId: string): Promise<void> {
    try {
      // Delete from server
      const response = await fetch(buildUrl(RECORDING_ENDPOINTS.DELETE(recordingId)), {
        method: 'DELETE',
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(`Failed to delete recording: ${response.statusText}`);
      }

      // Delete from local storage
      await audioStorageService.deleteAudio(recordingId);

    } catch (error) {
      console.error('Error deleting recording:', error);
      throw error;
    }
  }

  /**
   * Get recording transcript
   */
  async getTranscript(recordingId: string): Promise<any> {
    const response = await fetch(buildUrl(RECORDING_ENDPOINTS.TRANSCRIPT(recordingId)), {
      headers: this.headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch transcript: ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Get recording intelligence analysis
   */
  async getIntelligence(recordingId: string): Promise<any> {
    const response = await fetch(buildUrl(RECORDING_ENDPOINTS.INTELLIGENCE(recordingId)), {
      headers: this.headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch intelligence: ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Export recording in specified format
   */
  async exportRecording(
    recordingId: string,
    format: 'pdf' | 'docx' | 'txt' | 'json'
  ): Promise<Blob> {
    const response = await fetch(buildUrl(RECORDING_ENDPOINTS.EXPORT(recordingId, format)), {
      headers: this.headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to export recording: ${response.statusText}`);
    }

    return await response.blob();
  }

  /**
   * Check if recording has local audio
   */
  async hasLocalAudio(recordingId: string): Promise<boolean> {
    return await audioStorageService.hasAudio(recordingId);
  }

  /**
   * Get local storage statistics
   */
  async getLocalStorageStats(): Promise<{
    totalFiles: number;
    totalSize: number;
    availableSpace: number;
    utilizationPercentage: number;
  }> {
    return await audioStorageService.getStorageStats();
  }

  /**
   * Clear all local audio storage
   */
  async clearLocalStorage(): Promise<void> {
    await audioStorageService.clearAll();
  }
}

// Export singleton instance
export const recordingService = new RecordingService();