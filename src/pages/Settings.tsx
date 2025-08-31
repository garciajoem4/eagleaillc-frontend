import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const Settings: React.FC = () => {
  const [formData, setFormData] = useState({
    // Profile settings
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    company: 'Eagle AI LLC',
    phone: '+1 (555) 123-4567',
    
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
    
    // Security settings
    twoFactorAuth: false,
    sessionTimeout: 60,
  });

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
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-2">Manage your account preferences and configuration</p>
          </div>
          <Button onClick={handleSave}>💾 Save Changes</Button>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">👤 Profile</TabsTrigger>
            <TabsTrigger value="notifications">🔔 Notifications</TabsTrigger>
            <TabsTrigger value="recording">🎙️ Recording</TabsTrigger>
            <TabsTrigger value="security">🔒 Security</TabsTrigger>
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
                <CardTitle>Recording Preferences</CardTitle>
                <CardDescription>Configure default recording behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
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
                </div>
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
                  <Button variant="outline">Download Data</Button>
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
