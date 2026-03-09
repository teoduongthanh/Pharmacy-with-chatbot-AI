'use client';

import ProductList from '@/components/ProductList';
import UserList from '@/components/UserList';
import { useProducts } from '@/hooks/useProducts';
import { useUsers } from '@/hooks/useUsers';

export default function ApiDemoPage() {
  const {
    users,
    isLoading: isUsersLoading,
    error: usersError,
    refetch: refetchUsers,
  } = useUsers();

  const {
    products,
    isLoading: isProductsLoading,
    error: productsError,
    refetch: refetchProducts,
  } = useProducts();

  return (
    <main className="mx-auto max-w-5xl space-y-8 px-4 py-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Scalable API Service Architecture Demo</h1>
        <p className="mt-2 text-sm text-slate-600">
          Component → Hook → Service Layer → API Client → Backend API
        </p>
      </header>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Users</h2>
          <button
            type="button"
            onClick={() => void refetchUsers()}
            className="rounded-md bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-700"
          >
            Refresh Users
          </button>
        </div>
        <UserList
          users={users}
          isLoading={isUsersLoading}
          error={usersError}
          onRetry={() => void refetchUsers()}
        />
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Products</h2>
          <button
            type="button"
            onClick={() => void refetchProducts()}
            className="rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700"
          >
            Refresh Products
          </button>
        </div>
        <ProductList
          products={products}
          isLoading={isProductsLoading}
          error={productsError}
          onRetry={() => void refetchProducts()}
        />
      </section>
    </main>
  );
}
