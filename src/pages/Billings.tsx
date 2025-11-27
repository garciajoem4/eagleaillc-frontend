import React from 'react';
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
  
  // Get everything from the useBilling hook (with auto-refresh every 5 minutes)
  const {
    // State
    subscription,
    currentPlan,
    defaultPaymentMethod,
    billingRecords,
    usageWarnings,
    isLoading,
    error,
    paymentFailures,
    apiError,
    isRefreshing,
    
    // Functions
    formatCurrency,
    formatDate,
    openPaymentMethodModal,
    clearError,
    clearApiError,
    dismissUsageWarning,
    handleRefreshSubscription,
    
    // Computed values
    totalPaid,
    totalPending,
    getStatusVariant,
    
    // Helper functions
    openUpgradePlanModal,
    downloadInvoice,
    retryPayment,
  } = useBilling({ 
    autoFetch: true,
    refreshInterval: 300000 // Auto-refresh every 5 minutes
  });



  return (
    <StripeProvider>
      <div className="mx-auto max-w-[1200px] space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Billing & Payments</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Manage your subscription and payment history for {user?.firstName || 'User'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleRefreshSubscription}
              disabled={isRefreshing}
            >
              <svg 
                className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
            <Button className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Invoice
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Loading State */}
            {isRefreshing && (
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-blue-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span className="text-blue-800">Loading subscription data...</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* API Error Display */}
            {apiError && (
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <div>
                        <span className="text-yellow-800 font-medium">API Connection Issue: </span>
                        <span className="text-yellow-700">{apiError}</span>
                        <p className="text-yellow-600 text-sm mt-1">Displaying cached or fallback data</p>
                      </div>
                    </div>
                    <Button onClick={clearApiError} size="sm" variant="outline">
                      Dismiss
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Error Display */}
            {error && (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
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
                    <h3 className="font-medium text-yellow-800 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      Usage Warnings
                    </h3>
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
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
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

            {/* Usage Statistics from Backend API */}
            {subscription?.usage && (
              <Card>
                <CardHeader>
                  <CardTitle>Usage & Limits</CardTitle>
                  <CardDescription>Current billing period usage from backend</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Files Usage */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Files Uploaded</span>
                      <span className="text-sm text-gray-600">
                        {subscription.usage.files_uploaded || 0} / {subscription.usage.files_limit_text || subscription.usage.files_limit || 'Unlimited'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          ((subscription.usage.files_uploaded || 0) / (subscription.usage.files_limit || 1)) > 0.8 
                            ? 'bg-red-600' 
                            : 'bg-blue-600'
                        }`}
                        style={{ 
                          width: `${Math.min(100, ((subscription.usage.files_uploaded || 0) / (subscription.usage.files_limit || 1)) * 100)}%` 
                        }}
                      />
                    </div>
                  </div>

                  {/* Storage Usage */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Storage Used</span>
                      <span className="text-sm text-gray-600">
                        {subscription.usage.storage_used_gb?.toFixed(2) || 0} GB / {subscription.usage.storage_limit_gb || 'Unlimited'} GB
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          ((subscription.usage.storage_used_gb || 0) / (subscription.usage.storage_limit_gb || 1)) > 0.8 
                            ? 'bg-red-600' 
                            : 'bg-green-600'
                        }`}
                        style={{ 
                          width: `${Math.min(100, ((subscription.usage.storage_used_gb || 0) / (subscription.usage.storage_limit_gb || 1)) * 100)}%` 
                        }}
                      />
                    </div>
                  </div>

                  {/* Billing Period */}
                  {subscription.usage.billing_period_start && subscription.usage.billing_period_end && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500">
                        Billing Period: {new Date(subscription.usage.billing_period_start).toLocaleDateString()} - {new Date(subscription.usage.billing_period_end).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  {/* Plan Limits */}
                  {subscription.limits && (
                    <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                      <h4 className="text-sm font-medium text-gray-700">Plan Limits</h4>
                      {subscription.limits.max_file_duration_text && (
                        <p className="text-xs text-gray-600">
                          • Max File Duration: {subscription.limits.max_file_duration_text}
                        </p>
                      )}
                      {subscription.limits.priority_text && (
                        <p className="text-xs text-gray-600">
                          • Processing Priority: {subscription.limits.priority_text}
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

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
                        <h3 className="text-xl font-semibold">
                          {subscription?.tierDisplayName || currentPlan.name}
                        </h3>
                        <p className="text-2xl font-bold text-blue-600">
                          {formatCurrency(currentPlan.price)}/{subscription?.billingCycle || currentPlan.interval}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Status: <span className="capitalize">{subscription?.status}</span>
                          {subscription?.currentPeriodEnd && 
                            ` • Next billing: ${new Date(subscription.currentPeriodEnd).toLocaleDateString()}`
                          }
                        </p>
                        {subscription?.trialEndsAt && (
                          <p className="text-sm text-blue-600 mt-1">
                            Trial ends: {new Date(subscription.trialEndsAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Features included:</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          {currentPlan.features?.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {feature}
                            </li>
                          )) || (
                            <>
                              <li className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Unlimited recordings
                              </li>
                              <li className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Smart transcription
                              </li>
                              <li className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Intelligence analytics
                              </li>
                              <li className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Export options
                              </li>
                              <li className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Priority support
                              </li>
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
                        <div className="flex-shrink-0">
                          {defaultPaymentMethod.type === 'card' ? (
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                          ) : defaultPaymentMethod.type === 'bank_account' ? (
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          ) : (
                            <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          )}
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
            
            {/* Debug Section - Show raw subscription data */}
            {process.env.NODE_ENV === 'development' && subscription && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-sm">Debug: Raw Subscription Data</CardTitle>
                  <CardDescription>Backend API response (Development Only)</CardDescription>
                </CardHeader>
                <CardContent>
                  <details className="cursor-pointer">
                    <summary className="font-medium text-sm text-gray-700 mb-2">
                      View Raw JSON Data
                    </summary>
                    <pre className="text-xs bg-gray-50 p-4 rounded overflow-auto max-h-96 border border-gray-200">
                      {JSON.stringify(subscription, null, 2)}
                    </pre>
                  </details>
                </CardContent>
              </Card>
            )}
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
                                  className="flex items-center gap-1"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                  Download
                                </Button>
                                {record.status === 'pending' && (
                                  <Button 
                                    size="sm"
                                    onClick={() => retryPayment(record.id)}
                                    disabled={isLoading}
                                    className="flex items-center gap-1"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                    Pay Now
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

