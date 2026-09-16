/** Standard AGCE API envelope */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  code?: string;
  data: T;
  error?: {
    code?: string;
    message?: string;
  };
}

export interface PaginatedData<T> {
  items: T[];
  total?: number;
  page?: number;
  limit?: number;
}

export class ApiError extends Error {
  status?: number;
  code?: string;
  data?: unknown;
  raw?: unknown;

  constructor(
    message: string,
    options?: { status?: number; code?: string; data?: unknown; raw?: unknown },
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = options?.status;
    this.code = options?.code;
    this.data = options?.data;
    this.raw = options?.raw;
  }
}
