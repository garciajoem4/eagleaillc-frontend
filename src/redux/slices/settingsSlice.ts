import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Settings state interface based on current Settings.tsx component
interface SettingsState {
  // Profile settings
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    phone: string;
  };
  
  // Notification preferences
  notifications: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    recordingComplete: boolean;
    weeklyReports: boolean;
    billingAlerts: boolean;
  };
  
  // Recording preferences
  recording: {
    autoTranscribe: boolean;
    aiIntelligence: boolean;
    defaultExportFormat: 'pdf' | 'json' | 'txt' | 'csv';
    storageRetention: number;
  };
  
  // Security settings
  security: {
    twoFactorAuth: boolean;
    sessionTimeout: number;
  };
  
  // UI state
  loading: boolean;
  error: string | null;
  lastSaved: string | null;
}

// Initial state matching the current Settings.tsx defaults
const initialState: SettingsState = {
  profile: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    company: 'SynaptiVoice',
    phone: '+1 (555) 123-4567',
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: false,
    recordingComplete: true,
    weeklyReports: true,
    billingAlerts: true,
  },
  recording: {
    autoTranscribe: true,
    aiIntelligence: true,
    defaultExportFormat: 'pdf',
    storageRetention: 365,
  },
  security: {
    twoFactorAuth: false,
    sessionTimeout: 60,
  },
  loading: false,
  error: null,
  lastSaved: null,
};

// Settings slice with actions for managing user preferences
const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    // Update profile information
    updateProfile: (state, action: PayloadAction<Partial<SettingsState['profile']>>) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    
    // Update notification preferences
    updateNotifications: (state, action: PayloadAction<Partial<SettingsState['notifications']>>) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },
    
    // Update recording preferences
    updateRecording: (state, action: PayloadAction<Partial<SettingsState['recording']>>) => {
      state.recording = { ...state.recording, ...action.payload };
    },
    
    // Update security settings
    updateSecurity: (state, action: PayloadAction<Partial<SettingsState['security']>>) => {
      state.security = { ...state.security, ...action.payload };
    },
    
    // Generic field update action for any setting
    updateSetting: (state, action: PayloadAction<{ 
      section: keyof Omit<SettingsState, 'loading' | 'error' | 'lastSaved'>;
      field: string;
      value: any;
    }>) => {
      const { section, field, value } = action.payload;
      if (state[section] && typeof state[section] === 'object') {
        (state[section] as any)[field] = value;
      }
    },
    
    // Loading and error state management
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    
    // Save success action
    saveSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.lastSaved = new Date().toISOString();
    },
    
    // Reset all settings to defaults
    resetSettings: () => initialState,
  },
});

// Export actions for use in components
export const {
  updateProfile,
  updateNotifications,
  updateRecording,
  updateSecurity,
  updateSetting,
  setLoading,
  setError,
  saveSuccess,
  resetSettings,
} = settingsSlice.actions;

// Export reducer for store configuration
export default settingsSlice.reducer;