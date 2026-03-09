export type AuthUserRole = 'customer' | 'pharmacist' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: AuthUserRole;
}

export interface LoginUserPayload {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  accessToken: string;
  tokenType: 'Bearer';
  expiresIn: number;
  user: AuthUser;
}
