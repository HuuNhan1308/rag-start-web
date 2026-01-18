import type { ApiResponse } from './response';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse extends ApiResponse<string> {
  token?: string;
}

export interface AuthUser {
  username: string;
  token: string;
}
