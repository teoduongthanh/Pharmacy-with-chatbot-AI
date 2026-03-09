'use client';

import { useCallback, useEffect, useState } from 'react';

import { productService } from '@/services/productService';
import type { Product, ProductQueryParams } from '@/types/product';
import { getErrorMessage } from '@/utils/error';

interface UseProductsOptions {
  enabled?: boolean;
  query?: ProductQueryParams;
}

interface UseProductsResult {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useProducts(options: UseProductsOptions = {}): UseProductsResult {
  const { enabled = true, query = {} } = options;

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await productService.getProducts(query);
      setProducts(data);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to load products.'));
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    void fetchProducts();
  }, [enabled, fetchProducts]);

  return {
    products,
    isLoading,
    error,
    refetch: fetchProducts,
  };
}
