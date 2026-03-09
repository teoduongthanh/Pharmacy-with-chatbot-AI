import type { ApiSuccessResponse } from '@/types/api';

type QueryParamValue = string | number | boolean | null | undefined;

export function buildQueryString<T extends object>(params: T): string {
  const searchParams = new URLSearchParams();

  (Object.entries(params) as Array<[string, QueryParamValue]>).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return;
    }

    searchParams.set(key, String(value));
  });

  const query = searchParams.toString();
  return query ? `?${query}` : '';
}

export function unwrapApiData<T>(payload: ApiSuccessResponse<T> | T): T {
  if (payload && typeof payload === 'object' && 'data' in (payload as ApiSuccessResponse<T>)) {
    return (payload as ApiSuccessResponse<T>).data;
  }

  return payload as T;
}
