// Audio Trimming Utility
// Handles trimming audio files to specified duration for free trial users

export interface AudioTrimResult {
  trimmedBlob: Blob;
  originalBlob: Blob;
  trimmedDuration: number;
  originalDuration: number;
}

export class AudioTrimmer {
  /**
   * Get duration of an audio file
   */
  static async getAudioDuration(file: File | Blob): Promise<number> {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      const url = URL.createObjectURL(file);
      
      audio.addEventListener('loadedmetadata', () => {
        URL.revokeObjectURL(url);
        resolve(audio.duration);
      });
      
      audio.addEventListener('error', () => {
        URL.revokeObjectURL(url);
        reject(new Error('Failed to load audio metadata'));
      });
      
      audio.src = url;
    });
  }

  /**
   * Trim audio file to specified duration using Web Audio API
   */
  static async trimAudio(
    file: File | Blob, 
    maxDurationSeconds: number
  ): Promise<AudioTrimResult> {
    try {
      // Get original duration first
      const originalDuration = await this.getAudioDuration(file);
      
      // If file is already shorter than limit, return as-is
      if (originalDuration <= maxDurationSeconds) {
        return {
          trimmedBlob: file,
          originalBlob: file,
          trimmedDuration: originalDuration,
          originalDuration: originalDuration
        };
      }

      // Convert file to ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      
      // Create AudioContext
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Decode audio data
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      
      // Calculate samples for the trim duration
      const sampleRate = audioBuffer.sampleRate;
      const trimSamples = Math.floor(maxDurationSeconds * sampleRate);
      const numberOfChannels = audioBuffer.numberOfChannels;
      
      // Create new AudioBuffer for trimmed audio
      const trimmedBuffer = audioContext.createBuffer(
        numberOfChannels,
        trimSamples,
        sampleRate
      );
      
      // Copy data from original buffer to trimmed buffer
      for (let channel = 0; channel < numberOfChannels; channel++) {
        const originalData = audioBuffer.getChannelData(channel);
        const trimmedData = trimmedBuffer.getChannelData(channel);
        
        for (let i = 0; i < trimSamples; i++) {
          trimmedData[i] = originalData[i];
        }
      }
      
      // Convert trimmed AudioBuffer back to Blob
      const trimmedBlob = await this.audioBufferToBlob(trimmedBuffer, file.type);
      
      // Close AudioContext to free resources
      await audioContext.close();
      
      return {
        trimmedBlob,
        originalBlob: file,
        trimmedDuration: maxDurationSeconds,
        originalDuration: originalDuration
      };
      
    } catch (error) {
      console.error('Error trimming audio:', error);
      
      // Fallback: return original file if trimming fails
      const originalDuration = await this.getAudioDuration(file);
      return {
        trimmedBlob: file,
        originalBlob: file,
        trimmedDuration: originalDuration,
        originalDuration: originalDuration
      };
    }
  }

  /**
   * Convert AudioBuffer to Blob using OfflineAudioContext for better quality
   */
  private static async audioBufferToBlob(
    audioBuffer: AudioBuffer, 
    mimeType: string = 'audio/wav'
  ): Promise<Blob> {
    try {
      // Use MediaRecorder if available for better format support
      if (window.MediaRecorder && mimeType !== 'audio/wav') {
        return await this.audioBufferToBlobWithMediaRecorder(audioBuffer, mimeType);
      }
      
      // Fallback to WAV encoding
      return this.audioBufferToWavBlob(audioBuffer);
    } catch (error) {
      console.error('Error converting AudioBuffer to Blob:', error);
      // Final fallback to WAV
      return this.audioBufferToWavBlob(audioBuffer);
    }
  }

  /**
   * Convert AudioBuffer to WAV Blob (always works)
   */
  private static audioBufferToWavBlob(audioBuffer: AudioBuffer): Blob {
    const numberOfChannels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const length = audioBuffer.length;
    const arrayBuffer = new ArrayBuffer(44 + length * numberOfChannels * 2);
    const view = new DataView(arrayBuffer);
    
    // WAV file header
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };
    
    // RIFF header
    writeString(0, 'RIFF');
    view.setUint32(4, 36 + length * numberOfChannels * 2, true);
    writeString(8, 'WAVE');
    
    // fmt chunk
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM format
    view.setUint16(22, numberOfChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numberOfChannels * 2, true);
    view.setUint16(32, numberOfChannels * 2, true);
    view.setUint16(34, 16, true);
    
    // data chunk
    writeString(36, 'data');
    view.setUint32(40, length * numberOfChannels * 2, true);
    
    // Convert float samples to 16-bit PCM
    let offset = 44;
    for (let i = 0; i < length; i++) {
      for (let channel = 0; channel < numberOfChannels; channel++) {
        const sample = audioBuffer.getChannelData(channel)[i];
        const intSample = Math.max(-1, Math.min(1, sample)) * 0x7FFF;
        view.setInt16(offset, intSample, true);
        offset += 2;
      }
    }
    
    return new Blob([arrayBuffer], { type: 'audio/wav' });
  }

  /**
   * Convert AudioBuffer to Blob using MediaRecorder (for MP3, etc.)
   */
  private static async audioBufferToBlobWithMediaRecorder(
    audioBuffer: AudioBuffer,
    mimeType: string
  ): Promise<Blob> {
    return new Promise((resolve, reject) => {
      try {
        // Create a regular AudioContext for MediaRecorder support
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        
        // Create MediaStreamDestination
        const dest = audioContext.createMediaStreamDestination();
        source.connect(dest);
        
        const mediaRecorder = new MediaRecorder(dest.stream, { mimeType });
        const chunks: Blob[] = [];
        
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };
        
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: mimeType });
          audioContext.close(); // Clean up
          resolve(blob);
        };
        
        mediaRecorder.onerror = (error) => {
          audioContext.close(); // Clean up
          reject(error);
        };
        
        mediaRecorder.start();
        source.start();
        
        // Stop recording after the buffer duration
        setTimeout(() => {
          mediaRecorder.stop();
        }, (audioBuffer.length / audioBuffer.sampleRate) * 1000);
      } catch (error) {
        reject(error);
      }
    });
  }
}