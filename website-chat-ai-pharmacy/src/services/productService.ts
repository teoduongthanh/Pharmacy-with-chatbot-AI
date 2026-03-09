import type { ApiSuccessResponse, PaginatedResponse } from '@/types/api';
import type {
  CreateProductPayload,
  Product,
  ProductQueryParams,
  UpdateProductPayload,
} from '@/types/product';
import { buildQueryString, unwrapApiData } from '@/utils/api';

import { apiClient } from './apiClient';

const PRODUCTS_ENDPOINT = '/products';

export const productService = {
  async getProducts(query: ProductQueryParams = {}): Promise<Product[]> {
    const queryString = buildQueryString(query);
    const response = await apiClient.get<ApiSuccessResponse<Product[]> | Product[]>(`${PRODUCTS_ENDPOINT}${queryString}`);
    return unwrapApiData(response);
  },

  async getProductsPaginated(query: ProductQueryParams = {}): Promise<PaginatedResponse<Product>> {
    const queryString = buildQueryString(query);
    const response = await apiClient.get<
      ApiSuccessResponse<PaginatedResponse<Product>> | PaginatedResponse<Product>
    >(`${PRODUCTS_ENDPOINT}${queryString}`);
    return unwrapApiData(response);
  },

  async getProductById(productId: string): Promise<Product> {
    const response = await apiClient.get<ApiSuccessResponse<Product> | Product>(`${PRODUCTS_ENDPOINT}/${productId}`);
    return unwrapApiData(response);
  },

  async createProduct(payload: CreateProductPayload): Promise<Product> {
    const response = await apiClient.post<ApiSuccessResponse<Product> | Product, CreateProductPayload>(
      PRODUCTS_ENDPOINT,
      payload
    );
    return unwrapApiData(response);
  },

  async updateProduct(productId: string, payload: UpdateProductPayload): Promise<Product> {
    const response = await apiClient.put<ApiSuccessResponse<Product> | Product, UpdateProductPayload>(
      `${PRODUCTS_ENDPOINT}/${productId}`,
      payload
    );
    return unwrapApiData(response);
  },

  async deleteProduct(productId: string): Promise<void> {
    await apiClient.delete<void>(`${PRODUCTS_ENDPOINT}/${productId}`);
  },
};
