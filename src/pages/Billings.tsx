import React, { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import StripeProvider from '../components/StripeProvider';
import SubscriptionPayment from '../components/SubscriptionPayment';
import { useBilling } from '../hooks/useBilling';


const Billings: React.FC = () => {
  const { user } = useUser();
  
  // Redux billing hook
  const {
    subscription,
    currentPlan,
    defaultPaymentMethod,
    billingRecords,
    usageWarnings,
    isLoading,
    error,
    paymentFailures,
    formatCurrency,
    openPaymentMethodModal,
    clearError,
    dismissUsageWarning,
    refreshBillingHistory,
  } = useBilling({ autoFetch: true });

  // Auto-refresh billing data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      refreshBillingHistory();
    }, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, [refreshBillingHistory]);

  const formatDate = (date: string | Date): string => {
    // Handle both ISO string dates and Date objects
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate billing totals
  const totalPaid = billingRecords
    .filter(record => record.status === 'paid')
    .reduce((sum, record) => sum + (record.amount || record.total || 0), 0);

  const totalPending = billingRecords
    .filter(record => record.status === 'pending' || record.status === 'overdue')
    .reduce((sum, record) => sum + (record.amount || record.total || 0), 0);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'paid':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'overdue':
      case 'failed':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  // Helper functions for new Redux-powered features
  const openUpgradePlanModal = () => {
    openPaymentMethodModal(); // Use existing modal function for now
  };

  const downloadInvoice = (recordId: string) => {
    // TODO: Implement invoice download
    console.log('Downloading invoice for record:', recordId);
  };

  const retryPayment = (recordId: string) => {
    // TODO: Implement payment retry
    console.log('Retrying payment for record:', recordId);
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
            {/* Error Display */}
            {error && (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-red-600">⚠️</span>
                      <span className="text-red-800">{error}</span>
                    </div>
                    <Button onClick={clearError} size="sm" variant="outline">
                      Dismiss
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Usage Warnings */}
            {usageWarnings.length > 0 && (
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-medium text-yellow-800">⚠️ Usage Warnings</h3>
                    {usageWarnings.map((warning, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-yellow-700 text-sm">{warning}</span>
                        <Button onClick={() => dismissUsageWarning(warning)} size="sm" variant="outline">
                          Dismiss
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Payment Failures Alert */}
            {paymentFailures > 0 && (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-red-600">💳</span>
                    <span className="text-red-800">
                      {paymentFailures} recent payment failure(s). Please update your payment method.
                    </span>
                    <Button onClick={openPaymentMethodModal} size="sm">
                      Update Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

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
                    {currentPlan ? formatCurrency(currentPlan.price) : formatCurrency(0)}
                  </CardTitle>
                  <CardDescription>
                    {currentPlan ? `${currentPlan.name} (${currentPlan.interval}ly)` : 'No Active Plan'}
                  </CardDescription>
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
                  {currentPlan ? (
                    <>
                      <div>
                        <h3 className="text-xl font-semibold">{currentPlan.name}</h3>
                        <p className="text-2xl font-bold text-blue-600">
                          {formatCurrency(currentPlan.price)}/{currentPlan.interval}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Status: {subscription?.status}
                          {subscription?.currentPeriodEnd && 
                            ` • Next billing: ${new Date(subscription.currentPeriodEnd).toLocaleDateString()}`
                          }
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Features included:</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          {currentPlan.features?.map((feature, index) => (
                            <li key={index}>✅ {feature}</li>
                          )) || (
                            <>
                              <li>✅ Unlimited recordings</li>
                              <li>✅ Smart transcription</li>
                              <li>✅ Intelligence analytics</li>
                              <li>✅ Export options</li>
                              <li>✅ Priority support</li>
                            </>
                          )}
                        </ul>
                      </div>
                      
                      <div className="flex space-x-2 pt-4">
                        <Button size="sm" onClick={() => openUpgradePlanModal()}>
                          Upgrade Plan
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => openUpgradePlanModal()}>
                          Change Plan
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">No active subscription plan</p>
                      <Button onClick={() => openUpgradePlanModal()}>
                        Choose a Plan
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Your default payment method</CardDescription>
                </CardHeader>
                <CardContent>
                  {defaultPaymentMethod ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">
                          {defaultPaymentMethod.type === 'card' ? '💳' : defaultPaymentMethod.type === 'bank_account' ? '🏦' : '💰'}
                        </div>
                        <div>
                          <p className="font-medium">
                            {defaultPaymentMethod.brand ? 
                              `${defaultPaymentMethod.brand} ending in ${defaultPaymentMethod.last4}` :
                              `Payment method ending in ${defaultPaymentMethod.last4}`
                            }
                          </p>
                          {defaultPaymentMethod.expiryMonth && defaultPaymentMethod.expiryYear && (
                            <p className="text-sm text-gray-600">
                              Expires {defaultPaymentMethod.expiryMonth.toString().padStart(2, '0')}/{defaultPaymentMethod.expiryYear}
                            </p>
                          )}
                        </div>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => openPaymentMethodModal()}>
                        Update Payment
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">No payment method on file</p>
                      <Button onClick={() => openPaymentMethodModal()}>
                        Add Payment Method
                      </Button>
                    </div>
                  )}
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
                      {isLoading && billingRecords.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                            Loading billing history...
                          </td>
                        </tr>
                      ) : billingRecords.length > 0 ? (
                        billingRecords.map((record) => (
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
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => downloadInvoice(record.id)}
                                  disabled={!record.invoiceUrl}
                                >
                                  📥 Download
                                </Button>
                                {record.status === 'pending' && (
                                  <Button 
                                    size="sm"
                                    onClick={() => retryPayment(record.id)}
                                    disabled={isLoading}
                                  >
                                    💳 Pay Now
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                            No billing history found
                          </td>
                        </tr>
                      )}
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

