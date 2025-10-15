// API Endpoints Configuration
// Central location for all API endpoints
// Based on working implementation from production tests

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_VERSION = ''; // No version prefix in current implementation

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  VERSION: API_VERSION,
  FULL_BASE_URL: API_BASE_URL, // Direct base URL without version
  TIMEOUT: 30000, // 30 seconds
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  CLERK_CONFIG: {
    DOMAIN: 'https://set-clam-53.clerk.accounts.dev',
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
   * Complete upload and processing workflow
   */
  uploadAndProcess: async (
    file: File,
    getToken: () => Promise<string | null>,
    onStatusUpdate?: (status: string) => void
  ) => {
    const token = await getToken();
    if (!token) throw new Error('Not authenticated');

    // Step 1: Generate signed URL
    onStatusUpdate?.('Generating signed upload URL...');
    const urlRes = await fetch(buildUrl(STORAGE_ENDPOINTS.GENERATE_UPLOAD_URL), {
      method: 'POST',
      headers: ClerkAuthHelpers.createAuthHeaders(token),
      body: JSON.stringify({
        filename: 'original.wav',
        content_type: file.type || 'audio/wav',
        expiration_minutes: 60,
      }),
    });

    if (!urlRes.ok) {
      throw new Error(`Failed to get upload URL: ${urlRes.status}`);
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

    // Step 3: Confirm upload
    onStatusUpdate?.('Confirming upload...');
    const confirmRes = await fetch(
      buildUrl(RECORDING_ENDPOINTS.CONFIRM_UPLOAD(uploadInfo.recording_id)),
      {
        method: 'POST',
        headers: ClerkAuthHelpers.createAuthHeaders(token),
        body: JSON.stringify({
          file_size: file.size,
          duration_seconds: 10.0,
          sample_rate: 16000,
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

// Export all endpoints
export const ENDPOINTS = {
  ...AUTH_ENDPOINTS,
  ...RECORDING_ENDPOINTS,
  ...STORAGE_ENDPOINTS,
  ...USER_ENDPOINTS,
  ...BILLING_ENDPOINTS,
  ...ANALYTICS_ENDPOINTS,
};