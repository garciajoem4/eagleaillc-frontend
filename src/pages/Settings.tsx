import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const Settings: React.FC = () => {
  const { user } = useUser();
  
  const [formData, setFormData] = useState({
    // Profile settings
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    
    // Notification settings
    emailNotifications: true,
    smsNotifications: false,
    recordingComplete: true,
    weeklyReports: true,
    billingAlerts: true,
    
    // Recording settings
    autoTranscribe: true,
    aiIntelligence: true,
    defaultExportFormat: 'pdf',
    storageRetention: 365,
    
    // Timezone settings
    timezone: 'CDT',
    
    // Security settings
    twoFactorAuth: false,
    sessionTimeout: 60,
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.primaryEmailAddress?.emailAddress || '',
        company: user.publicMetadata?.company as string || '',
        phone: user.publicMetadata?.phone as string || ''
      }));
    }
  }, [user]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving settings:', formData);
    alert('Settings saved successfully!');
  };

  const renderContent = () => {
    return (
        <div className="mx-auto max-w-[1200px] space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600 mt-2">Manage your account preferences and configuration</p>
            </div>
          <Button onClick={handleSave}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Save Changes
          </Button>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 2a7 7 0 00-7 7v3a4 4 0 004 4h6a4 4 0 004-4V9a7 7 0 00-7-7zM8 21h8" />
              </svg>
              Notifications
            </TabsTrigger>
            <TabsTrigger value="recording">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
              Preferences
            </TabsTrigger>
            <TabsTrigger value="security">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to be notified</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-600">Receive email notifications for important updates</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.emailNotifications}
                    onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                    className="w-4 h-4"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Recording Complete</Label>
                    <p className="text-sm text-gray-600">Notify when recording processing is complete</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.recordingComplete}
                    onChange={(e) => handleInputChange('recordingComplete', e.target.checked)}
                    className="w-4 h-4"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-gray-600">Receive weekly summary reports</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.weeklyReports}
                    onChange={(e) => handleInputChange('weeklyReports', e.target.checked)}
                    className="w-4 h-4"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recording">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Configure default recording behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto Transcribe</Label>
                    <p className="text-sm text-gray-600">Automatically transcribe recordings upon upload</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.autoTranscribe}
                    onChange={(e) => handleInputChange('autoTranscribe', e.target.checked)}
                    className="w-4 h-4"
                  />
                </div> */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label>AI Intelligence</Label>
                    <p className="text-sm text-gray-600">Generate AI-powered insights and analysis</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.aiIntelligence}
                    onChange={(e) => handleInputChange('aiIntelligence', e.target.checked)}
                    className="w-4 h-4"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <p className="text-sm text-gray-600">Select your local timezone</p>
                  <select
                    id="timezone"
                    value={formData.timezone}
                    onChange={(e) => handleInputChange('timezone', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  >
                    <option value="EDT">Eastern Daylight Time (EDT)</option>
                    <option value="CDT">Central Daylight Time (CDT)</option>
                    <option value="MDT">Mountain Daylight Time (MDT)</option>
                    <option value="PDT">Pacific Daylight Time (PDT)</option>
                    <option value="EST">Eastern Standard Time (EST)</option>
                    <option value="CST">Central Standard Time (CST)</option>
                    <option value="MST">Mountain Standard Time (MST)</option>
                    <option value="PST">Pacific Standard Time (PST)</option>
                    <option value="AKDT">Alaska Daylight Time (AKDT)</option>
                    <option value="HST">Hawaii Standard Time (HST)</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="retention">Storage Retention (days)</Label>
                  <Input
                    id="retention"
                    type="number"
                    min="30"
                    max="1095"
                    value={formData.storageRetention}
                    onChange={(e) => handleInputChange('storageRetention', parseInt(e.target.value))}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.twoFactorAuth}
                    onChange={(e) => handleInputChange('twoFactorAuth', e.target.checked)}
                    className="w-4 h-4"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout</Label>
                  <select
                    id="sessionTimeout"
                    value={formData.sessionTimeout}
                    onChange={(e) => handleInputChange('sessionTimeout', parseInt(e.target.value))}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  >
                    <option value={15}>15 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={60}>1 hour</option>
                    <option value={120}>2 hours</option>
                    <option value={480}>8 hours</option>
                  </select>
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button variant="outline">Change Password</Button>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  return renderContent();
};

export default Settings;
