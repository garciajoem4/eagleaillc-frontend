export interface Recording {
  id: string;
  name: string;
  dateUploaded: string; // ISO date string
  duration: number; // in seconds (changed from minutes for accurate display)
  overview?: string;
  transcript?: string;
  intelligence?: any;
  exports?: string[];
  // API-specific fields
  status?: string;
  processing_time_seconds?: number;
  action_count?: number;
  decision_count?: number;
  issue_count?: number;
}

export interface RecordingItem {
  id: string;
  name: string;
  uploadDate: string; // ISO date string
  duration: number; // in seconds
}

export interface User {
  username: string;
  isAuthenticated: boolean;
  id?: string;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  imageUrl?: string;
}

export interface TableSort {
  field: keyof Recording;
  direction: 'asc' | 'desc';
}

export interface RecordingFilters {
  name: string;
  dateFrom?: string; // ISO date string
  dateTo?: string; // ISO date string
}

// Enhanced intelligence types for backend JSON output
export interface ActionItem {
  task: string;
  confidence: 'low' | 'medium' | 'high';
  assigned_to?: string;
  deadline?: string;
  timestamp_start: string;
  timestamp_end: string;
}

export interface Decision {
  decision: string;
  reason?: string;
  participants?: string[];
  timestamp_start: string;
  timestamp_end: string;
  confidence: string;
}

export interface Issue {
  issue: string;
  timestamp_start: string;
  timestamp_end: string;
}

export interface Question {
  question: string;
  timestamp_start: string;
  timestamp_end: string;
}

export interface DetailedIntelligence {
  content_type: string;
  total_segments_processed: number;
  processed_at: string;
  executive_summary: string;
  key_topics: string[];
  action_items: ActionItem[];
  decisions: Decision[];
  issues: Issue[];
  questions: Question[];
  confidence_note?: string;
}
