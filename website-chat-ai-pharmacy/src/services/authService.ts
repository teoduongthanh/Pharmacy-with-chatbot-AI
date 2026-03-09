import type { ApiSuccessResponse } from '@/types/api';
import type { LoginUserPayload, LoginUserResponse } from '@/types/auth';
import { unwrapApiData } from '@/utils/api';
import { setAuthToken } from '@/utils/storage';

import { apiClient } from './apiClient';

const LOGIN_USER_ENDPOINT = '/login/user';

export const authService = {
  async loginUser(payload: LoginUserPayload): Promise<LoginUserResponse> {
    const response = await apiClient.post<ApiSuccessResponse<LoginUserResponse> | LoginUserResponse, LoginUserPayload>(
      LOGIN_USER_ENDPOINT,
      payload,
      { withAuth: false }
    );

    const data = unwrapApiData(response);
    setAuthToken(data.accessToken);
    return data;
  },
};
