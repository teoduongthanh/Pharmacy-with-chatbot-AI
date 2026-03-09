import type { ApiErrorResponse } from '@/types/api';
import { getAuthToken } from '@/utils/storage';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiClientOptions {
  baseURL?: string;
  headers?: HeadersInit;
  tokenProvider?: () => string | null;
  onError?: (error: ApiClientError) => void;
}

export interface ApiRequestOptions extends Omit<RequestInit, 'method' | 'body' | 'headers'> {
  headers?: HeadersInit;
  body?: unknown;
  withAuth?: boolean;
}

export class ApiClientError extends Error {
  status: number;
  code?: string;
  details?: unknown;

  constructor(message: string, status: number, code?: string, details?: unknown) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

class ApiClient {
  private baseURL: string;
  private defaultHeaders: HeadersInit;
  private tokenProvider: () => string | null;
  private onError?: (error: ApiClientError) => void;

  constructor(options: ApiClientOptions = {}) {
    this.baseURL = options.baseURL ?? '/api';
    this.defaultHeaders = options.headers ?? { Accept: 'application/json' };
    this.tokenProvider = options.tokenProvider ?? (() => null);
    this.onError = options.onError;
  }

  setTokenProvider(tokenProvider: () => string | null): void {
    this.tokenProvider = tokenProvider;
  }

  setErrorHandler(onError: (error: ApiClientError) => void): void {
    this.onError = onError;
  }

  async get<T>(endpoint: string, options: ApiRequestOptions = {}): Promise<T> {
    return this.request<T>('GET', endpoint, options);
  }

  async post<T, B = unknown>(endpoint: string, body?: B, options: ApiRequestOptions = {}): Promise<T> {
    return this.request<T>('POST', endpoint, { ...options, body });
  }

  async put<T, B = unknown>(endpoint: string, body?: B, options: ApiRequestOptions = {}): Promise<T> {
    return this.request<T>('PUT', endpoint, { ...options, body });
  }

  async patch<T, B = unknown>(endpoint: string, body?: B, options: ApiRequestOptions = {}): Promise<T> {
    return this.request<T>('PATCH', endpoint, { ...options, body });
  }

  async delete<T>(endpoint: string, options: ApiRequestOptions = {}): Promise<T> {
    return this.request<T>('DELETE', endpoint, options);
  }

  private resolveURL(endpoint: string): string {
    if (/^https?:\/\//i.test(endpoint)) {
      return endpoint;
    }

    const normalizedBaseURL = this.baseURL.replace(/\/$/, '');
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

    return `${normalizedBaseURL}${normalizedEndpoint}`;
  }

  private buildHeaders(headers?: HeadersInit, withAuth = true, body?: unknown): Headers {
    const merged = new Headers(this.defaultHeaders);

    if (headers) {
      const customHeaders = new Headers(headers);
      customHeaders.forEach((value, key) => merged.set(key, value));
    }

    if (withAuth) {
      const token = this.tokenProvider();
      if (token) {
        merged.set('Authorization', `Bearer ${token}`);
      }
    }

    if (body instanceof FormData) {
      merged.delete('Content-Type');
    } else if (body !== undefined && !merged.has('Content-Type')) {
      merged.set('Content-Type', 'application/json');
    }

    return merged;
  }

  private serializeBody(body: unknown): BodyInit | undefined {
    if (body === undefined || body === null) {
      return undefined;
    }

    if (
      body instanceof FormData ||
      typeof body === 'string' ||
      body instanceof URLSearchParams ||
      body instanceof Blob ||
      body instanceof ArrayBuffer
    ) {
      return body;
    }

    return JSON.stringify(body);
  }

  private async parseResponse(response: Response): Promise<unknown> {
    if (response.status === 204) {
      return undefined;
    }

    const contentType = response.headers.get('content-type');

    if (!contentType) {
      return undefined;
    }

    if (contentType.includes('application/json')) {
      return response.json().catch(() => undefined);
    }

    if (contentType.includes('text/')) {
      return response.text().catch(() => undefined);
    }

    return response.blob().catch(() => undefined);
  }

  private toApiClientError(response: Response, payload: unknown): ApiClientError {
    const errorPayload = (payload ?? {}) as Partial<ApiErrorResponse>;
    const message = errorPayload.message ?? `Request failed with status ${response.status}`;

    const error = new ApiClientError(
      message,
      response.status,
      errorPayload.code,
      errorPayload.details ?? payload
    );

    this.onError?.(error);

    return error;
  }

  private async request<T>(method: HttpMethod, endpoint: string, options: ApiRequestOptions): Promise<T> {
    const { body, headers, withAuth = true, ...restOptions } = options;

    let response: Response;

    try {
      response = await fetch(this.resolveURL(endpoint), {
        method,
        headers: this.buildHeaders(headers, withAuth, body),
        body: this.serializeBody(body),
        ...restOptions,
      });
    } catch (networkError) {
      const error = new ApiClientError('Network error. Please check your internet connection.', 0, 'NETWORK_ERROR', networkError);
      this.onError?.(error);
      throw error;
    }

    const payload = await this.parseResponse(response);

    if (!response.ok) {
      throw this.toApiClientError(response, payload);
    }

    return payload as T;
  }
}

const apiBaseURL = process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || '/api';

export const apiClient = new ApiClient({
  baseURL: apiBaseURL,
  headers: {
    Accept: 'application/json',
  },
  tokenProvider: getAuthToken,
  onError: (error) => {
    console.error('[API Client Error]', {
      message: error.message,
      status: error.status,
      code: error.code,
      details: error.details,
    });
  },
});
