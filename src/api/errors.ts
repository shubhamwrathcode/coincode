import { AxiosError } from 'axios';
import { ApiError, ApiResponse } from '../types/api';

export const getErrorMessage = (error: unknown, fallback = 'Something went wrong') => {
  if (error instanceof ApiError) {
    return error.message || fallback;
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error && typeof error === 'object') {
    const maybe = error as Record<string, any>;
    return (
      maybe?.message ||
      maybe?.error?.message ||
      maybe?.response?.data?.message ||
      maybe?.response?.data?.error?.message ||
      fallback
    );
  }

  return fallback;
};

export const normalizeApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) {
    return error;
  }

  const axiosError = error as AxiosError<ApiResponse>;
  const status = axiosError?.response?.status;
  const body = axiosError?.response?.data;

  const message =
    body?.message ||
    body?.error?.message ||
    axiosError?.message ||
    'Network request failed';

  const code = body?.code || body?.error?.code;

  return new ApiError(message, {
    status,
    code,
    data: body?.data,
    raw: body ?? error,
  });
};

export const extractAccessToken = (data: Record<string, any> | null | undefined) => {
  if (!data) return null;
  return (
    data.accessToken ||
    data.access_token ||
    data.token ||
    data?.tokens?.accessToken ||
    data?.tokens?.access_token ||
    null
  );
};

export const extractRefreshToken = (data: Record<string, any> | null | undefined) => {
  if (!data) return null;
  return (
    data.refreshToken ||
    data.refresh_token ||
    data?.tokens?.refreshToken ||
    data?.tokens?.refresh_token ||
    null
  );
};
