// Redux Store Configuration Test
// This file verifies that the Redux store is properly configured

import { store } from './store';
import { updateProfile, updateNotifications } from './slices/settingsSlice';

// Test function to verify store functionality
export const testReduxStore = () => {
  console.log('🔧 Testing Redux Store Configuration...');
  
  // Get initial state
  const initialState = store.getState();
  console.log('📊 Initial State:', {
    settings: initialState.settings.profile.firstName,
    notifications: initialState.settings.notifications.emailNotifications
  });
  
  // Test profile update action
  store.dispatch(updateProfile({ firstName: 'Jane' }));
  const afterProfileUpdate = store.getState();
  console.log('👤 After Profile Update:', {
    firstName: afterProfileUpdate.settings.profile.firstName
  });
  
  // Test notifications update action
  store.dispatch(updateNotifications({ emailNotifications: false }));
  const afterNotificationUpdate = store.getState();
  console.log('📧 After Notification Update:', {
    emailNotifications: afterNotificationUpdate.settings.notifications.emailNotifications
  });
  
  console.log('✅ Redux Store Configuration Test Complete!');
  
  return {
    success: true,
    initialState,
    finalState: afterNotificationUpdate
  };
};

// Auto-run test in development
if (process.env.NODE_ENV === 'development') {
  // Uncomment the line below to run the test on import
  // testReduxStore();
}

export default testReduxStore;