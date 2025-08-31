export interface Recording {
  id: string;
  name: string;
  dateUploaded: Date;
  duration: number; // in minutes
  overview?: string;
  transcript?: string;
  intelligence?: any;
  exports?: string[];
}

export interface User {
  username: string;
  isAuthenticated: boolean;
}

export interface TableSort {
  field: keyof Recording;
  direction: 'asc' | 'desc';
}

export interface RecordingFilters {
  name: string;
  dateFrom?: Date;
  dateTo?: Date;
}
