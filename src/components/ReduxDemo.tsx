import React from 'react';
import { useAppSelector, useAppDispatch, updateProfile, updateNotifications } from '../redux';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

/**
 * Redux Demo Component
 * Demonstrates how to use Redux state and actions in components
 * This component shows the current settings state and provides actions to update it
 */
export const ReduxDemo: React.FC = () => {
  // Using typed Redux hooks
  const settings = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  // Example action handlers
  const handleUpdateProfile = () => {
    dispatch(updateProfile({ 
      firstName: 'Jane', 
      lastName: 'Smith',
      company: 'Eagle AI LLC' 
    }));
  };

  const handleToggleNotifications = () => {
    dispatch(updateNotifications({ 
      emailNotifications: !settings.notifications.emailNotifications 
    }));
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Redux Store Demo
          <Badge variant="outline">Live State</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-semibold">Profile Info:</h4>
          <p className="text-sm">
            <strong>Name:</strong> {settings.profile.firstName} {settings.profile.lastName}
          </p>
          <p className="text-sm">
            <strong>Company:</strong> {settings.profile.company}
          </p>
          <p className="text-sm">
            <strong>Email Notifications:</strong>{' '}
            <Badge variant={settings.notifications.emailNotifications ? 'default' : 'secondary'}>
              {settings.notifications.emailNotifications ? 'Enabled' : 'Disabled'}
            </Badge>
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold">State Actions:</h4>
          <div className="flex gap-2 flex-wrap">
            <Button 
              size="sm" 
              variant="outline"
              onClick={handleUpdateProfile}
            >
              Update Profile
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={handleToggleNotifications}
            >
              Toggle Notifications
            </Button>
          </div>
        </div>

        {settings.lastSaved && (
          <div className="text-xs text-gray-500">
            Last saved: {new Date(settings.lastSaved).toLocaleTimeString()}
          </div>
        )}
        
        {settings.error && (
          <div className="text-xs text-red-500">
            Error: {settings.error}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReduxDemo;