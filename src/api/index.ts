/**
 * API layer barrel — prefer domain services + React Query hooks.
 */
export { http, apiClient, ApiService } from './client';
export { ENDPOINTS, OTP_TYPE } from './endpoints';
export { queryKeys } from './queryKeys';
export * from './services';
export { getErrorMessage, normalizeApiError } from './errors';
