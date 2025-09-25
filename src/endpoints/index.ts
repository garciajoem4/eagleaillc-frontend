// API Endpoints Configuration
// Central location for all API endpoints

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.synaptivoice.com';
const API_VERSION = 'v1';

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  VERSION: API_VERSION,
  FULL_BASE_URL: `${API_BASE_URL}/${API_VERSION}`,
  TIMEOUT: 30000, // 30 seconds
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// Authentication endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  PROFILE: '/auth/profile',
};

// Recording endpoints
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
};

// Upload endpoints
export const UPLOAD_ENDPOINTS = {
  SINGLE: '/uploads/single',
  MULTIPLE: '/uploads/multiple',
  CHUNK: '/uploads/chunk',
  STATUS: (uploadId: string) => `/uploads/${uploadId}/status`,
  CANCEL: (uploadId: string) => `/uploads/${uploadId}/cancel`,
  RESUME: (uploadId: string) => `/uploads/${uploadId}/resume`,
};

// File storage endpoints
export const STORAGE_ENDPOINTS = {
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

// Export all endpoints
export const ENDPOINTS = {
  ...AUTH_ENDPOINTS,
  ...RECORDING_ENDPOINTS,
  ...UPLOAD_ENDPOINTS,
  ...STORAGE_ENDPOINTS,
  ...USER_ENDPOINTS,
  ...BILLING_ENDPOINTS,
  ...ANALYTICS_ENDPOINTS,
};