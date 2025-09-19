import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Recording, RecordingFilters, TableSort } from '../../types';

// Extended state interface for recordings management
interface RecordingState {
  // Core data
  recordings: Recording[];
  currentRecording: Recording | null;
  
  // Filtering and search
  filters: RecordingFilters;
  searchQuery: string;
  
  // Sorting and pagination
  sort: TableSort;
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    hasMore: boolean;
  };
  
  // UI state
  selectedRecordings: string[];
  isUploadModalOpen: boolean;
  
  // Async state
  loading: boolean;
  error: string | null;
  
  // Operations state
  uploading: boolean;
  processing: Record<string, boolean>; // Track processing state per recording ID
  lastFetched: string | null;
}

// API mock functions - replace with actual API calls
const mockApiDelay = (ms: number = 1000) => new Promise(resolve => setTimeout(resolve, ms));

// Async thunks for API operations
export const fetchRecordings = createAsyncThunk(
  'recordings/fetchRecordings',
  async (params: { filters?: RecordingFilters; sort?: TableSort; page?: number } = {}) => {
    await mockApiDelay(800); // Simulate API call
    
    // Mock API response - replace with actual API call
    const mockRecordings: Recording[] = [
      {
        id: '1',
        name: 'Weekly Team Meeting',
        dateUploaded: new Date('2024-01-15').toISOString(),
        duration: 45,
        overview: 'Discussion about project progress and upcoming deadlines.',
        exports: ['pdf', 'json']
      },
      {
        id: '2',
        name: 'Client Presentation',
        dateUploaded: new Date('2024-01-12').toISOString(),
        duration: 30,
        overview: 'Product demo and feature walkthrough for new client.',
        exports: ['pdf']
      },
      {
        id: '3',
        name: 'Sales Call - Prospect Alpha',
        dateUploaded: new Date('2024-01-10').toISOString(),
        duration: 25,
        overview: 'Initial discovery call with potential enterprise customer.',
        exports: []
      }
    ];
    
    return {
      recordings: mockRecordings,
      totalCount: mockRecordings.length,
      hasMore: false
    };
  }
);

export const createRecording = createAsyncThunk(
  'recordings/createRecording',
  async (recordingData: { name: string; file: File }) => {
    await mockApiDelay(2000); // Simulate upload time
    
    const newRecording: Recording = {
      id: Date.now().toString(),
      name: recordingData.name,
      dateUploaded: new Date().toISOString(),
      duration: Math.floor(Math.random() * 60) + 10, // Random duration 10-70 minutes
      overview: 'Processing...',
      exports: []
    };
    
    return newRecording;
  }
);

export const updateRecording = createAsyncThunk(
  'recordings/updateRecording',
  async ({ id, updates }: { id: string; updates: Partial<Recording> }) => {
    await mockApiDelay(500);
    return { id, updates };
  }
);

export const deleteRecording = createAsyncThunk(
  'recordings/deleteRecording',
  async (id: string) => {
    await mockApiDelay(500);
    return id;
  }
);

export const processRecording = createAsyncThunk(
  'recordings/processRecording',
  async (id: string) => {
    await mockApiDelay(3000); // Simulate processing time
    
    return {
      id,
      updates: {
        overview: 'Meeting focused on project deliverables and timeline adjustments.',
        transcript: 'This is a sample transcript...',
        intelligence: { 
          summary: 'Key discussion points covered project status and next steps.',
          action_items: ['Review timeline', 'Update stakeholders'],
          decisions: ['Extend deadline by 1 week']
        }
      }
    };
  }
);

// Initial state
const initialState: RecordingState = {
  recordings: [],
  currentRecording: null,
  
  filters: {
    name: '',
    dateFrom: undefined,
    dateTo: undefined,
  },
  searchQuery: '',
  
  sort: {
    field: 'dateUploaded',
    direction: 'desc',
  },
  
  pagination: {
    page: 1,
    limit: 20,
    totalCount: 0,
    hasMore: false,
  },
  
  selectedRecordings: [],
  isUploadModalOpen: false,
  
  loading: false,
  error: null,
  
  uploading: false,
  processing: {},
  lastFetched: null,
};

// Recordings slice
const recordingsSlice = createSlice({
  name: 'recordings',
  initialState,
  reducers: {
    // Filter and search actions
    setFilters: (state, action: PayloadAction<Partial<RecordingFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1; // Reset pagination when filters change
    },
    
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.pagination.page = 1; // Reset pagination when search changes
    },
    
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.searchQuery = '';
      state.pagination.page = 1;
    },
    
    // Sorting actions
    setSort: (state, action: PayloadAction<TableSort>) => {
      state.sort = action.payload;
      state.pagination.page = 1; // Reset pagination when sort changes
    },
    
    toggleSort: (state, action: PayloadAction<keyof Recording>) => {
      const field = action.payload;
      if (state.sort.field === field) {
        state.sort.direction = state.sort.direction === 'asc' ? 'desc' : 'asc';
      } else {
        state.sort = { field, direction: 'asc' };
      }
      state.pagination.page = 1;
    },
    
    // Selection actions
    selectRecording: (state, action: PayloadAction<string>) => {
      if (!state.selectedRecordings.includes(action.payload)) {
        state.selectedRecordings.push(action.payload);
      }
    },
    
    deselectRecording: (state, action: PayloadAction<string>) => {
      state.selectedRecordings = state.selectedRecordings.filter(id => id !== action.payload);
    },
    
    toggleRecordingSelection: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.selectedRecordings.includes(id)) {
        state.selectedRecordings = state.selectedRecordings.filter(recordingId => recordingId !== id);
      } else {
        state.selectedRecordings.push(id);
      }
    },
    
    selectAllRecordings: (state) => {
      state.selectedRecordings = state.recordings.map(recording => recording.id);
    },
    
    clearSelection: (state) => {
      state.selectedRecordings = [];
    },
    
    // Modal actions
    openUploadModal: (state) => {
      state.isUploadModalOpen = true;
    },
    
    closeUploadModal: (state) => {
      state.isUploadModalOpen = false;
    },
    
    // Current recording actions
    setCurrentRecording: (state, action: PayloadAction<Recording | null>) => {
      state.currentRecording = action.payload;
    },
    
    // Pagination actions
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pagination.limit = action.payload;
      state.pagination.page = 1; // Reset to first page when changing page size
    },
    
    // Error handling
    clearError: (state) => {
      state.error = null;
    },
    
    // Reset state
    resetRecordings: () => initialState,
  },
  
  extraReducers: (builder) => {
    builder
      // Fetch recordings
      .addCase(fetchRecordings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecordings.fulfilled, (state, action) => {
        state.loading = false;
        state.recordings = action.payload.recordings;
        state.pagination.totalCount = action.payload.totalCount;
        state.pagination.hasMore = action.payload.hasMore;
        state.lastFetched = new Date().toISOString();
      })
      .addCase(fetchRecordings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch recordings';
      })
      
      // Create recording
      .addCase(createRecording.pending, (state) => {
        state.uploading = true;
        state.error = null;
      })
      .addCase(createRecording.fulfilled, (state, action) => {
        state.uploading = false;
        state.recordings.unshift(action.payload); // Add to beginning of list
        state.pagination.totalCount += 1;
        state.isUploadModalOpen = false; // Close modal on successful upload
      })
      .addCase(createRecording.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.error.message || 'Failed to create recording';
      })
      
      // Update recording
      .addCase(updateRecording.fulfilled, (state, action) => {
        const { id, updates } = action.payload;
        const index = state.recordings.findIndex(r => r.id === id);
        if (index !== -1) {
          state.recordings[index] = { ...state.recordings[index], ...updates };
        }
        if (state.currentRecording?.id === id) {
          state.currentRecording = { ...state.currentRecording, ...updates };
        }
      })
      
      // Delete recording
      .addCase(deleteRecording.fulfilled, (state, action) => {
        const id = action.payload;
        state.recordings = state.recordings.filter(r => r.id !== id);
        state.selectedRecordings = state.selectedRecordings.filter(recordingId => recordingId !== id);
        state.pagination.totalCount -= 1;
        if (state.currentRecording?.id === id) {
          state.currentRecording = null;
        }
      })
      
      // Process recording
      .addCase(processRecording.pending, (state, action) => {
        state.processing[action.meta.arg] = true;
      })
      .addCase(processRecording.fulfilled, (state, action) => {
        const { id, updates } = action.payload;
        const index = state.recordings.findIndex(r => r.id === id);
        if (index !== -1) {
          state.recordings[index] = { ...state.recordings[index], ...updates };
        }
        if (state.currentRecording?.id === id) {
          state.currentRecording = { ...state.currentRecording, ...updates };
        }
        delete state.processing[id];
      })
      .addCase(processRecording.rejected, (state, action) => {
        delete state.processing[action.meta.arg];
        state.error = 'Failed to process recording';
      });
  },
});

// Export actions
export const {
  setFilters,
  setSearchQuery,
  clearFilters,
  setSort,
  toggleSort,
  selectRecording,
  deselectRecording,
  toggleRecordingSelection,
  selectAllRecordings,
  clearSelection,
  openUploadModal,
  closeUploadModal,
  setCurrentRecording,
  setPage,
  setPageSize,
  clearError,
  resetRecordings,
} = recordingsSlice.actions;

// Export selectors for easy state access
export const selectRecordings = (state: { recordings: RecordingState }) => state.recordings.recordings;
export const selectFilteredRecordings = (state: { recordings: RecordingState }) => {
  const { recordings, filters, searchQuery } = state.recordings;
  
  return recordings.filter(recording => {
    const nameMatch = recording.name.toLowerCase().includes(filters.name.toLowerCase());
    const searchMatch = searchQuery === '' || 
      recording.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recording.overview?.toLowerCase().includes(searchQuery.toLowerCase());
    const dateFromMatch = !filters.dateFrom || recording.dateUploaded >= filters.dateFrom;
    const dateToMatch = !filters.dateTo || recording.dateUploaded <= filters.dateTo;
    
    return nameMatch && searchMatch && dateFromMatch && dateToMatch;
  });
};

export const selectSortedRecordings = (state: { recordings: RecordingState }) => {
  const filteredRecordings = selectFilteredRecordings(state);
  const { sort } = state.recordings;
  
  return [...filteredRecordings].sort((a, b) => {
    let aValue = a[sort.field];
    let bValue = b[sort.field];

    if (aValue instanceof Date && bValue instanceof Date) {
      aValue = aValue.getTime();
      bValue = bValue.getTime();
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sort.direction === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });
};

export const selectRecordingById = (state: { recordings: RecordingState }, id: string) => 
  state.recordings.recordings.find(recording => recording.id === id);

export const selectIsRecordingSelected = (state: { recordings: RecordingState }, id: string) =>
  state.recordings.selectedRecordings.includes(id);

// Export reducer
export default recordingsSlice.reducer;