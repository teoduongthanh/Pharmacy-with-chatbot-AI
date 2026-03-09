export type UserRole = 'customer' | 'pharmacist' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role?: UserRole;
  avatarUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  role?: UserRole;
}

export type UpdateUserPayload = Partial<CreateUserPayload>;
