export interface Product {
  id: string;
  name: string;
  description?: string;
  category?: string;
  imageUrl?: string;
  price: number;
  inStock: boolean;
  stockQuantity?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  category?: string;
  inStock?: boolean;
}

export interface CreateProductPayload {
  name: string;
  price: number;
  description?: string;
  category?: string;
  imageUrl?: string;
  inStock?: boolean;
  stockQuantity?: number;
}

export type UpdateProductPayload = Partial<CreateProductPayload>;
