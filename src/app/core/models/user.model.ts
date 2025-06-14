export interface User {
  id: number;
  username: string;
  email: string;
  roles: Role[];
}

export enum Role {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_TECHNICIEN = 'ROLE_TECHNICIEN',
  ROLE_USER = 'ROLE_USER'
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
  roles?: string[];
}

export interface AuthResponse {
  token: string;
}