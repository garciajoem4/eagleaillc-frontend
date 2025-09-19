import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './slices/settingsSlice';
import recordingsReducer from './slices/recordingsSlice';
import uploadsReducer from './slices/uploadsSlice';
import billingReducer from './slices/billingSlice';

// Store configuration with all Redux slices
export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    recordings: recordingsReducer,
    uploads: uploadsReducer,
    billing: billingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Configuration for RTK middleware
      serializableCheck: {
        // Ignore these action types for serialization checks
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        // Ignore these field paths in all actions
        ignoredActionsPaths: ['meta.arg', 'payload.timestamp', 'meta.requestId'],
        // Ignore these paths in the state (File objects and other non-serializable values)
        ignoredPaths: [
          'uploads.files', 
          'uploads.files.file',
          // Add any future non-serializable paths here
        ],
      },
      // Enable immutability and serialization checks in development
      immutableCheck: {
        warnAfter: 128, // Warn if state check takes longer than 128ms
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Export store types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export a function to get the current state (useful for testing)
export const getState = () => store.getState();

// Export store for use in components and middleware
export default store;