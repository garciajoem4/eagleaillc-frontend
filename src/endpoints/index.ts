// API Endpoints Configuration
// Central location for all API endpoints
// Based on working implementation from production tests

// Detect if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

// Use proxy in development, direct URL in production
const API_BASE_URL = isDevelopment 
  ? '' // Use relative URLs in development (proxy will handle routing)
  : (process.env.NEXT_PUBLIC_API_URL || 'https://speechai-api.ngrok.dev');

const API_VERSION = ''; // No version prefix in current implementation
const API_USERNAME = process.env.NEXT_PUBLIC_API_URL_USERNAME;
const API_PASSWORD = process.env.NEXT_PUBLIC_API_URL_PASSWORD;

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  VERSION: API_VERSION,
  FULL_BASE_URL: API_BASE_URL, // Direct base URL without version
  TIMEOUT: 30000, // 30 seconds
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  BASIC_AUTH: {
    USERNAME: API_USERNAME,
    PASSWORD: API_PASSWORD,
  },
  CLERK_CONFIG: {
    DOMAIN: process.env.NEXT_PUBLIC_CLERK_DOMAIN,
    TOKEN_REFRESH_INTERVAL: 2, // Refresh token every 2 polls (6 seconds)
  },
};

// Authentication endpoints
export const AUTH_ENDPOINTS = {
  HEALTH: '/health', // Test authentication endpoint
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  PROFILE: '/auth/profile',
};

// Recording endpoints (based on working implementation)
export const RECORDING_ENDPOINTS = {
  LIST: '/recordings',
  CREATE: '/recordings',
  GET_BY_ID: (id: string) => `/recordings/${id}`,
  UPDATE: (id: string) => `/recordings/${id}`,
  DELETE: (id: string) => `/recordings/${id}`,
  PROCESS: (id: string) => `/recordings/${id}/process`,
  DOWNLOAD: (id: string) => `/recordings/${id}/download`,
  TRANSCRIPT: (id: string) => `/recordings/${id}/transcript`,
  INTELLIGENCE: (id: string) => `/recordings/${id}/intelligence`,
  EXPORT: (id: string, format: string) => `/recordings/${id}/export/${format}`,
  // Working endpoints from production test
  CONFIRM_UPLOAD: (id: string) => `/recordings/${id}/confirm-upload`,
  STATUS: (id: string) => `/recordings/${id}/status`,
  RESULTS: (id: string) => `/recordings/${id}/results`,
};

// Storage endpoints (based on working implementation)
export const STORAGE_ENDPOINTS = {
  GENERATE_UPLOAD_URL: '/storage/generate-upload-url', // Working endpoint
  UPLOAD: '/storage/upload',
  DOWNLOAD: (fileId: string) => `/storage/${fileId}/download`,
  DELETE: (fileId: string) => `/storage/${fileId}`,
  METADATA: (fileId: string) => `/storage/${fileId}/metadata`,
};

// User endpoints
export const USER_ENDPOINTS = {
  PROFILE: '/user/profile',
  SETTINGS: '/user/settings',
  PREFERENCES: '/user/preferences',
  USAGE: '/user/usage',
  SUBSCRIPTION: '/user/subscription',
};

// Billing endpoints
export const BILLING_ENDPOINTS = {
  SUBSCRIPTION: '/billing/subscription',
  INVOICES: '/billing/invoices',
  USAGE: '/billing/usage',
  PAYMENT_METHODS: '/billing/payment-methods',
  CREATE_CHECKOUT: '/billing/checkout',
  CANCEL_SUBSCRIPTION: '/billing/subscription/cancel',
};

// Analytics endpoints
export const ANALYTICS_ENDPOINTS = {
  DASHBOARD: '/analytics/dashboard',
  RECORDINGS: '/analytics/recordings',
  USAGE: '/analytics/usage',
  EXPORT: '/analytics/export',
};

// Build full URL helper
export const buildUrl = (endpoint: string): string => {
  return `${API_CONFIG.FULL_BASE_URL}${endpoint}`;
};

// Basic Authentication Helper Functions
export const BasicAuthHelpers = {
  /**
   * Encode username and password for basic authentication
   */
  encodeBasicAuth: (username: string, password: string): string => {
    return btoa(`${username}:${password}`);
  },

  /**
   * Create basic auth headers
   */
  createBasicAuthHeaders: (username?: string, password?: string) => {
    const user = username || API_CONFIG.BASIC_AUTH.USERNAME;
    const pass = password || API_CONFIG.BASIC_AUTH.PASSWORD;
    
    if (!user || !pass) {
      throw new Error('Basic auth credentials not available');
    }

    const encoded = BasicAuthHelpers.encodeBasicAuth(user, pass);
    return {
      'Authorization': `Basic ${encoded}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  },

  /**
   * Make basic authenticated request
   */
  makeBasicAuthRequest: async (
    url: string,
    options: RequestInit = {},
    username?: string,
    password?: string
  ) => {
    const headers = BasicAuthHelpers.createBasicAuthHeaders(username, password);
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        ...headers,
      },
    });

    return response;
  },
};

// Clerk Authentication Helper Functions
export const ClerkAuthHelpers = {
  /**
   * Create authenticated headers with Clerk token
   */
  createAuthHeaders: (token: string) => ({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }),

  /**
   * Make authenticated request with automatic token refresh
   */
  makeAuthenticatedRequest: async (
    url: string,
    options: RequestInit,
    getToken: () => Promise<string | null>
  ) => {
    const token = await getToken();
    if (!token) {
      throw new Error('No authentication token available');
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
      },
    });

    return response;
  },
};

// Production Workflow Helper Functions
export const WorkflowHelpers = {
  /**
   * Complete upload and processing workflow with user context
   */
  uploadAndProcess: async (
    file: File,
    getToken: () => Promise<string | null>,
    userMetadata: {
      user_id: string;
      tenant_id?: string;
      audio_details?: {
        duration_seconds?: number;
        sample_rate?: number;
        channels?: number;
      };
    },
    onStatusUpdate?: (status: string) => void
  ) => {
    const token = await getToken();
    if (!token) throw new Error('Not authenticated');

    // Step 1: Generate signed URL with user context
    onStatusUpdate?.('Generating signed upload URL...');
    
    let urlRes;
    try {
      urlRes = await fetch(buildUrl(STORAGE_ENDPOINTS.GENERATE_UPLOAD_URL), {
        method: 'POST',
        headers: ClerkAuthHelpers.createAuthHeaders(token),
        body: JSON.stringify({
          filename: file.name || 'original.wav',
          content_type: file.type || 'audio/wav',
          expiration_minutes: 60,
          user_id: userMetadata.user_id,
          tenant_id: userMetadata.tenant_id,
          file_size: file.size,
          audio_details: {
            original_filename: file.name,
            file_size_bytes: file.size,
            content_type: file.type,
            duration_seconds: userMetadata.audio_details?.duration_seconds,
            sample_rate: userMetadata.audio_details?.sample_rate,
            channels: userMetadata.audio_details?.channels,
          },
        }),
      });
    } catch (error: any) {
      // Handle CORS and network errors specifically
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        throw new Error('API connection failed. This might be a CORS issue or the API server is not accessible. Please check your network connection and try again.');
      }
      throw new Error(`Network error: ${error.message}`);
    }

    if (!urlRes.ok) {
      let errorMessage = `Failed to get upload URL: ${urlRes.status} ${urlRes.statusText}`;
      try {
        const errorData = await urlRes.text();
        if (errorData) {
          errorMessage += ` - ${errorData}`;
        }
      } catch (e) {
        // Ignore JSON parsing errors
      }
      throw new Error(errorMessage);
    }

    const uploadInfo = await urlRes.json();

    // Step 2: Upload to GCS
    onStatusUpdate?.('Uploading file to GCS...');
    const gcsRes = await fetch(uploadInfo.url, {
      method: uploadInfo.method || 'PUT',
      headers: uploadInfo.headers || { 'Content-Type': file.type },
      body: file,
    });

    if (!gcsRes.ok) {
      throw new Error(`GCS upload failed: ${gcsRes.status}`);
    }

    // Step 3: Confirm upload with comprehensive details
    onStatusUpdate?.('Confirming upload...');
    const confirmRes = await fetch(
      buildUrl(RECORDING_ENDPOINTS.CONFIRM_UPLOAD(uploadInfo.recording_id)),
      {
        method: 'POST',
        headers: ClerkAuthHelpers.createAuthHeaders(token),
        body: JSON.stringify({
          // File details
          file_size: file.size,
          duration_seconds: userMetadata.audio_details?.duration_seconds || 10.0,
          sample_rate: userMetadata.audio_details?.sample_rate || 16000,
          channels: userMetadata.audio_details?.channels || 1,
          
          // User context
          user_id: userMetadata.user_id,
          tenant_id: userMetadata.tenant_id,
          
          // Audio metadata
          audio_details: {
            original_filename: file.name,
            file_size_bytes: file.size,
            content_type: file.type,
            upload_timestamp: new Date().toISOString(),
            duration_seconds: userMetadata.audio_details?.duration_seconds,
            sample_rate: userMetadata.audio_details?.sample_rate,
            channels: userMetadata.audio_details?.channels,
          },
        }),
      }
    );

    if (!confirmRes.ok) {
      throw new Error(`Confirm failed: ${confirmRes.status}`);
    }

    return uploadInfo.recording_id;
  },

  /**
   * Poll for processing status with automatic token refresh
   */
  pollStatus: async (
    recordingId: string,
    getToken: () => Promise<string | null>,
    onStatusUpdate?: (status: any) => void
  ) => {
    const maxPolls = 200;
    const pollInterval = 3000;
    let currentToken = await getToken();

    for (let i = 0; i < maxPolls; i++) {
      // Refresh token every 2 polls
      if (i > 0 && i % API_CONFIG.CLERK_CONFIG.TOKEN_REFRESH_INTERVAL === 0) {
        const newToken = await getToken();
        if (newToken) currentToken = newToken;
      }

      const statusRes = await fetch(
        buildUrl(RECORDING_ENDPOINTS.STATUS(recordingId)),
        {
          headers: { Authorization: `Bearer ${currentToken}` },
        }
      );

      if (!statusRes.ok) {
        throw new Error(`Status check failed: ${statusRes.status}`);
      }

      const status = await statusRes.json();
      onStatusUpdate?.(status);

      if (status.status === 'completed') {
        return status;
      }

      if (status.status.startsWith('failed')) {
        throw new Error(`Processing failed: ${status.message}`);
      }

      await new Promise((resolve) => setTimeout(resolve, pollInterval));
    }

    throw new Error('Timeout waiting for processing');
  },

  /**
   * Fetch final results
   */
  fetchResults: async (
    recordingId: string,
    getToken: () => Promise<string | null>
  ) => {
    const token = await getToken();
    if (!token) throw new Error('Not authenticated');

    const resultsRes = await fetch(
      buildUrl(RECORDING_ENDPOINTS.RESULTS(recordingId)),
      {
        headers: ClerkAuthHelpers.createAuthHeaders(token),
      }
    );

    if (!resultsRes.ok) {
      throw new Error(`Failed to fetch results: ${resultsRes.status}`);
    }

    return await resultsRes.json();
  },
};

// API Testing Helper Functions
export const APITestHelpers = {
  /**
   * Test basic connectivity to the API
   */
  testConnection: async (): Promise<{ success: boolean; message: string; details?: any }> => {
    try {
      console.log('🔍 Testing basic API connectivity...');
      console.log('📡 API URL:', API_CONFIG.FULL_BASE_URL);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

      const response = await fetch(API_CONFIG.FULL_BASE_URL, {
        method: 'GET',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      return {
        success: response.ok,
        message: `Connection ${response.ok ? 'successful' : 'failed'} - Status: ${response.status} ${response.statusText}`,
        details: {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
        }
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Connection failed: ${error.message}`,
        details: { error: error.name, message: error.message }
      };
    }
  },

  /**
   * Test health endpoint with basic auth
   */
  testHealthEndpoint: async (): Promise<{ success: boolean; message: string; details?: any }> => {
    try {
      console.log('🏥 Testing health endpoint with basic auth...');
      const healthUrl = buildUrl(AUTH_ENDPOINTS.HEALTH);
      console.log('📡 Health URL:', healthUrl);

      if (!API_CONFIG.BASIC_AUTH.USERNAME || !API_CONFIG.BASIC_AUTH.PASSWORD) {
        return {
          success: false,
          message: 'Basic auth credentials not configured',
          details: { 
            username: !!API_CONFIG.BASIC_AUTH.USERNAME,
            password: !!API_CONFIG.BASIC_AUTH.PASSWORD 
          }
        };
      }

      const response = await BasicAuthHelpers.makeBasicAuthRequest(healthUrl, {
        method: 'GET',
      });

      const responseData = await response.text();
      
      return {
        success: response.ok,
        message: `Health check ${response.ok ? 'passed' : 'failed'} - Status: ${response.status}`,
        details: {
          status: response.status,
          statusText: response.statusText,
          data: responseData,
          headers: Object.fromEntries(response.headers.entries()),
        }
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Health check failed: ${error.message}`,
        details: { error: error.name, message: error.message }
      };
    }
  },

  /**
   * Test various API endpoints
   */
  testEndpoints: async (): Promise<{ success: boolean; message: string; results: any[] }> => {
    const results = [];
    
    console.log('📋 Testing API endpoints...');

    // Test basic endpoints with basic auth
    const endpointsToTest = [
      { name: 'Health', endpoint: AUTH_ENDPOINTS.HEALTH, method: 'GET' },
      { name: 'Recordings List', endpoint: RECORDING_ENDPOINTS.LIST, method: 'GET' },
      { name: 'User Profile', endpoint: USER_ENDPOINTS.PROFILE, method: 'GET' },
    ];

    for (const test of endpointsToTest) {
      try {
        console.log(`🔍 Testing ${test.name}: ${test.endpoint}`);
        const url = buildUrl(test.endpoint);
        
        const response = await BasicAuthHelpers.makeBasicAuthRequest(url, {
          method: test.method,
        });

        const responseData = await response.text();
        
        results.push({
          name: test.name,
          endpoint: test.endpoint,
          success: response.ok,
          status: response.status,
          statusText: response.statusText,
          data: responseData.substring(0, 200) + (responseData.length > 200 ? '...' : ''),
        });
      } catch (error: any) {
        results.push({
          name: test.name,
          endpoint: test.endpoint,
          success: false,
          error: error.message,
        });
      }
    }

    const successCount = results.filter(r => r.success).length;
    
    return {
      success: successCount > 0,
      message: `${successCount}/${results.length} endpoints responded successfully`,
      results,
    };
  },

  /**
   * Run comprehensive API tests
   */
  runAllTests: async () => {
    console.log('🚀 Starting comprehensive API tests...');
    console.log('='.repeat(50));
    
    // Test 1: Basic connectivity
    console.log('\n1️⃣ Testing basic connectivity');
    const connectionTest = await APITestHelpers.testConnection();
    console.log(`${connectionTest.success ? '✅' : '❌'} ${connectionTest.message}`);
    if (connectionTest.details) {
      console.log('📊 Details:', connectionTest.details);
    }

    // Test 2: Health endpoint
    console.log('\n2️⃣ Testing health endpoint with basic auth');
    const healthTest = await APITestHelpers.testHealthEndpoint();
    console.log(`${healthTest.success ? '✅' : '❌'} ${healthTest.message}`);
    if (healthTest.details) {
      console.log('📊 Details:', healthTest.details);
    }

    // Test 3: Multiple endpoints
    console.log('\n3️⃣ Testing multiple endpoints');
    const endpointsTest = await APITestHelpers.testEndpoints();
    console.log(`${endpointsTest.success ? '✅' : '❌'} ${endpointsTest.message}`);
    
    console.log('\n📋 Endpoint Test Results:');
    endpointsTest.results.forEach(result => {
      console.log(`${result.success ? '✅' : '❌'} ${result.name}: ${result.success ? result.status : result.error}`);
    });

    // Summary
    console.log('\n' + '='.repeat(50));
    const overallSuccess = connectionTest.success || healthTest.success || endpointsTest.success;
    console.log(`🏁 Overall Result: ${overallSuccess ? '✅ PASSED' : '❌ FAILED'}`);
    
    if (!overallSuccess) {
      console.log('\n🔧 Troubleshooting tips:');
      console.log('1. Check if the API URL is correct and accessible');
      console.log('2. Verify the basic auth credentials in .env file');
      console.log('3. Check if CORS is properly configured on the API');
      console.log('4. Ensure the API server is running');
    }

    return {
      connection: connectionTest,
      health: healthTest,
      endpoints: endpointsTest,
      overall: overallSuccess,
    };
  },

  /**
   * Quick test function for console use
   */
  quickTest: async () => {
    console.log('⚡ Running quick API test...');
    const result = await APITestHelpers.testHealthEndpoint();
    console.log(`${result.success ? '✅ API is accessible' : '❌ API test failed'}: ${result.message}`);
    return result;
  },
};

// Export all endpoints
export const ENDPOINTS = {
  ...AUTH_ENDPOINTS,
  ...RECORDING_ENDPOINTS,
  ...STORAGE_ENDPOINTS,
  ...USER_ENDPOINTS,
  ...BILLING_ENDPOINTS,
  ...ANALYTICS_ENDPOINTS,
};