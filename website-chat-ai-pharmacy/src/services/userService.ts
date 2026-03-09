import type { ApiSuccessResponse } from '@/types/api';
import type { CreateUserPayload, UpdateUserPayload, User } from '@/types/user';
import { unwrapApiData } from '@/utils/api';

import { apiClient } from './apiClient';

const USERS_ENDPOINT = '/users';

export const userService = {
  async getUsers(): Promise<User[]> {
    const response = await apiClient.get<ApiSuccessResponse<User[]> | User[]>(USERS_ENDPOINT);
    return unwrapApiData(response);
  },

  async getUserById(userId: string): Promise<User> {
    const response = await apiClient.get<ApiSuccessResponse<User> | User>(`${USERS_ENDPOINT}/${userId}`);
    return unwrapApiData(response);
  },

  async createUser(payload: CreateUserPayload): Promise<User> {
    const response = await apiClient.post<ApiSuccessResponse<User> | User, CreateUserPayload>(USERS_ENDPOINT, payload);
    return unwrapApiData(response);
  },

  async updateUser(userId: string, payload: UpdateUserPayload): Promise<User> {
    const response = await apiClient.put<ApiSuccessResponse<User> | User, UpdateUserPayload>(`${USERS_ENDPOINT}/${userId}`, payload);
    return unwrapApiData(response);
  },

  async deleteUser(userId: string): Promise<void> {
    await apiClient.delete<void>(`${USERS_ENDPOINT}/${userId}`);
  },
};
