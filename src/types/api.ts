// API response interfaces matching the server structure

export interface ApiRecording {
  id: string;
  file_name: string;
  duration_seconds: number;
  created_at: string;
  completed_at?: string;
  processing_time_seconds?: number;
}

export interface ApiTranscriptSegment {
  segment_idx: number;
  start_sec: number;
  end_sec: number;
  text: string;
  speaker_label?: string | null;
}

export interface ApiTranscript {
  segments: ApiTranscriptSegment[];
  total_segments: number;
  full_transcription?: string;
  duration_seconds: number;
}

export interface ApiIntelligence {
  summary: string;
  actions: any[];
  decisions: any[];
  issues: any[];
  questions: any[];
  topics: string[];
}

export interface ApiResponse {
  recording: ApiRecording;
  transcript: ApiTranscript;
  intelligence: ApiIntelligence;
}

// Legacy interfaces for backward compatibility
export interface TranscriptData {
  file_name: string;
  file_path: string;
  duration_seconds: number;
  date_uploaded: string;
  sample_rate: number;
  is_longform: boolean;
  was_stereo: boolean;
  full_transcription?: string;
  segments?: TranscriptSegment[];
}

export interface TranscriptSegment {
  segments_id: number;
  start: number;
  end: number;
  text: string;
  speaker?: string;
  confidence?: number;
}