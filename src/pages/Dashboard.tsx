import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

const Dashboard: React.FC = () => {
  const stats = [
    { title: 'Total Recordings', value: '42', change: '+12%', changeType: 'increase' },
    { title: 'Minutes Processed', value: '1,234', change: '+8%', changeType: 'increase' },
    { title: 'Accuracy Rate', value: '98%', change: '+1%', changeType: 'increase' },
    { title: 'This Month', value: '$2,456', change: '-3%', changeType: 'decrease' },
  ];

  const recentActivity = [
    { action: 'Weekly Team Meeting transcribed', icon: '📝', time: '2 hours ago' },
    { action: 'Client Presentation uploaded', icon: '🎥', time: '5 hours ago' },
    { action: 'AI Intelligence report generated', icon: '💡', time: '1 day ago' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your recordings.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <Badge 
                variant={stat.changeType === 'increase' ? 'default' : 'destructive'}
                className="text-xs"
              >
                {stat.change} from last month
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and changes to your recordings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                  <div className="text-2xl">{activity.icon}</div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="default">
                📤 Upload Recording
              </Button>
              <Button className="w-full justify-start" variant="outline">
                📊 View Reports
              </Button>
              <Button className="w-full justify-start" variant="outline">
                ⚙️ Manage Settings
              </Button>
              <Button className="w-full justify-start" variant="outline">
                💳 View Billing
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
