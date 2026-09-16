import { Platform } from 'react-native';
import { ENV } from '../config/env';
import { getAccessToken, useAuthStore } from '../store/authStore';
import { ApiResponse } from '../types/api';
import { normalizeApiError, getErrorMessage } from './errors';
import { ApiError } from '../types/api';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type RequestOptions = {
  method?: HttpMethod;
  data?: unknown;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  timeoutMs?: number;
};

const buildUrl = (path: string, params?: Record<string, unknown>) => {
  const base = ENV.API_BASE_URL.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = new URL(`${base}${normalizedPath}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString();
};

const parseBody = async (response: Response) => {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const unwrap = <T>(status: number, body: any): T => {
  if (body && typeof body === 'object' && 'success' in body) {
    const envelope = body as ApiResponse<T>;
    if (envelope.success === false) {
      throw new ApiError(envelope.message || 'Request failed', {
        status,
        code: envelope.code || envelope.error?.code,
        data: envelope.data,
        raw: envelope,
      });
    }
    return envelope as unknown as T;
  }

  if (!status || status < 200 || status >= 300) {
    throw new ApiError(
      typeof body === 'string' ? body : body?.message || `HTTP ${status}`,
      { status, data: body, raw: body },
    );
  }

  return body as T;
};

const request = async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
  const method = options.method || 'GET';
  const url = buildUrl(path, options.params);
  const token = getAccessToken();
  const isFormData =
    typeof FormData !== 'undefined' && options.data instanceof FormData;

  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...(options.headers || {}),
  };

  if (!isFormData) {
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (__DEV__) {
    console.log('[API Request]', method, url);
    if (options.data && !isFormData) {
      console.log('[API Request] body:', options.data);
    }
  }

  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    options.timeoutMs || ENV.API_TIMEOUT_MS,
  );

  try {
    const response = await fetch(url, {
      method,
      headers,
      body:
        options.data === undefined
          ? undefined
          : isFormData
            ? (options.data as FormData)
            : JSON.stringify(options.data),
      signal: controller.signal,
    });

    const body = await parseBody(response);

    if (__DEV__) {
      console.log('[API Response]', response.status, url, body);
    }

    // 401 → clear session
    if (response.status === 401) {
      const code = body?.code || body?.error?.code;
      if (code === 'TOKEN_INVALID' || code === 'UNAUTHORIZED' || !code) {
        const { accessToken, logout } = useAuthStore.getState();
        if (accessToken) logout();
      }
    }

    // Even non-2xx JSON envelopes go through unwrap for consistent ApiError
    if (!response.ok && !(body && typeof body === 'object' && 'success' in body)) {
      throw new ApiError(body?.message || `HTTP ${response.status}`, {
        status: response.status,
        code: body?.code,
        data: body?.data ?? body,
        raw: body,
      });
    }

    return unwrap<T>(response.status, body);
  } catch (error: any) {
    if (__DEV__) {
      console.log('[API Error]', {
        url,
        name: error?.name,
        message: getErrorMessage(error),
        platform: Platform.OS,
      });
    }

    if (error instanceof ApiError) {
      throw error;
    }

    if (error?.name === 'AbortError') {
      throw new ApiError('Request timeout', { code: 'TIMEOUT', raw: error });
    }

    const isProxyUrl = url.includes('127.0.0.1:8787') || url.includes('localhost:8787');
    const hint = isProxyUrl
      ? 'API proxy is not running. Stop Metro and run: npm start (auto-starts proxy) or npm run api:proxy'
      : 'Cannot reach server. Check internet or backend URL.';

    throw new ApiError(error?.message || hint, {
      code: 'ERR_NETWORK',
      raw: error,
    });
  } finally {
    clearTimeout(timeout);
  }
};

/**
 * Typed HTTP client using React Native fetch (more reliable than axios on iOS).
 */
export const http = {
  get: <T = any>(url: string, config?: { params?: Record<string, unknown>; headers?: Record<string, string> }) =>
    request<T>(url, { method: 'GET', params: config?.params, headers: config?.headers }),

  post: <T = any>(url: string, data?: unknown, config?: { headers?: Record<string, string> }) =>
    request<T>(url, { method: 'POST', data, headers: config?.headers }),

  put: <T = any>(url: string, data?: unknown, config?: { headers?: Record<string, string> }) =>
    request<T>(url, { method: 'PUT', data, headers: config?.headers }),

  patch: <T = any>(url: string, data?: unknown, config?: { headers?: Record<string, string> }) =>
    request<T>(url, { method: 'PATCH', data, headers: config?.headers }),

  delete: <T = any>(url: string, config?: { data?: unknown; headers?: Record<string, string> }) =>
    request<T>(url, { method: 'DELETE', data: config?.data, headers: config?.headers }),

  upload: <T = any>(url: string, formData: FormData, config?: { headers?: Record<string, string> }) =>
    request<T>(url, { method: 'POST', data: formData, headers: config?.headers }),
};

/** Kept for older imports — axios no longer used for requests */
export const apiClient = null;

export const ApiService = {
  get: (url: string, params?: any) => http.get(url, { params }),
  getWithToken: (url: string, _token: string, params?: any) => http.get(url, { params }),
  post: (url: string, data: any) => http.post(url, data),
  postWithToken: (url: string, data: any, _token: string) => http.post(url, data),
  postFormData: (url: string, formData: FormData) => http.upload(url, formData),
  postFormDataWithToken: (url: string, formData: FormData, _token: string) =>
    http.upload(url, formData),
  put: (url: string, data: any) => http.put(url, data),
  putWithToken: (url: string, data: any, _token: string) => http.put(url, data),
  putFormDataWithToken: (url: string, formData: FormData, _token: string) =>
    http.upload(url, formData),
  delete: (url: string) => http.delete(url),
  deleteWithToken: (url: string, _token: string, data?: any) =>
    http.delete(url, { data }),
};

if (__DEV__) {
  console.log('[API] Base URL:', ENV.API_BASE_URL);
  if (ENV.USE_DEV_PROXY) {
    console.log('[API] iOS dev proxy ON →', ENV.SERVER_URL);
    console.log('[API] Keep running: npm run api:proxy');
  }
}
