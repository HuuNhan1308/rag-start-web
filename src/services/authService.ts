import axios from 'axios';
import type { LoginRequest, LoginResponse } from '../types/auth';

// Create a separate axios instance for auth (no interceptors)
const authClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await authClient.post<LoginResponse>('/auth/loginAdmin', credentials);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Token management
export const getToken = (): string | null => {
  return localStorage.getItem('access_token');
};

export const setToken = (token: string): void => {
  localStorage.setItem('access_token', token);
};

export const removeToken = (): void => {
  localStorage.removeItem('access_token');
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};
