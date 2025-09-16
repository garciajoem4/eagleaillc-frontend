import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import StripeProvider from '../components/StripeProvider';
import SubscriptionPayment from '../components/SubscriptionPayment';

interface BillingRecord {
  id: string;
  date: Date;
  description: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
}

const mockBillingData: BillingRecord[] = [
  {
    id: '1',
    date: new Date('2024-01-01'),
    description: 'Monthly Subscription - January 2024',
    amount: 99.99,
    status: 'paid'
  },
  {
    id: '2',
    date: new Date('2024-02-01'),
    description: 'Monthly Subscription - February 2024',
    amount: 99.99,
    status: 'paid'
  },
  {
    id: '3',
    date: new Date('2024-03-01'),
    description: 'Monthly Subscription - March 2024',
    amount: 99.99,
    status: 'pending'
  }
];

const Billings: React.FC = () => {
  const { user } = useUser();

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const totalPaid = mockBillingData
    .filter(record => record.status === 'paid')
    .reduce((sum, record) => sum + record.amount, 0);

  const totalPending = mockBillingData
    .filter(record => record.status === 'pending')
    .reduce((sum, record) => sum + record.amount, 0);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'paid':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'overdue':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <StripeProvider>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Billing & Payments</h1>
            <p className="text-gray-600 mt-2">
              Manage your subscription and payment history for {user?.firstName || 'User'}
            </p>
          </div>
          <Button>📄 Download Invoice</Button>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl font-bold text-green-600">
                    {formatCurrency(totalPaid)}
                  </CardTitle>
                  <CardDescription>Total Paid</CardDescription>
                </CardHeader>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl font-bold text-yellow-600">
                    {formatCurrency(totalPending)}
                  </CardTitle>
                  <CardDescription>Pending Payment</CardDescription>
                </CardHeader>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl font-bold text-blue-600">
                    {formatCurrency(99.99)}
                  </CardTitle>
                  <CardDescription>Monthly Plan</CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current Plan */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Plan</CardTitle>
                  <CardDescription>Your active subscription details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">Professional Plan</h3>
                    <p className="text-2xl font-bold text-blue-600">{formatCurrency(99.99)}/month</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Features included:</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>✅ Unlimited recordings</li>
                      <li>✅ Smart transcription</li>
                      <li>✅ Intelligence analytics</li>
                      <li>✅ Export options</li>
                      <li>✅ Priority support</li>
                    </ul>
                  </div>
                  
                  <div className="flex space-x-2 pt-4">
                    <Button size="sm">
                      Upgrade Plan
                    </Button>
                    <Button size="sm" variant="outline">Change Plan</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Your default payment method</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">💳</div>
                      <div>
                        <p className="font-medium">Visa ending in 1234</p>
                        <p className="text-sm text-gray-600">Expires 12/25</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Update Payment</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="subscription" className="space-y-6">
            <SubscriptionPayment />
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            {/* Billing History */}
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>Your payment and invoice history</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockBillingData.map((record) => (
                        <tr key={record.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                            {formatDate(record.date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                            {record.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                            {formatCurrency(record.amount)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant={getStatusVariant(record.status)}>
                              {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">📥 Download</Button>
                              {record.status === 'pending' && (
                                <Button size="sm">💳 Pay Now</Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </StripeProvider>
  );
};

export default Billings;

