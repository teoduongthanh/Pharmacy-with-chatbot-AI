'use client';

import { useCallback, useEffect, useState } from 'react';

import { userService } from '@/services/userService';
import type { User } from '@/types/user';
import { getErrorMessage } from '@/utils/error';

interface UseUsersOptions {
  enabled?: boolean;
}

interface UseUsersResult {
  users: User[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useUsers(options: UseUsersOptions = {}): UseUsersResult {
  const { enabled = true } = options;

  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to load users.'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    void fetchUsers();
  }, [enabled, fetchUsers]);

  return {
    users,
    isLoading,
    error,
    refetch: fetchUsers,
  };
}
