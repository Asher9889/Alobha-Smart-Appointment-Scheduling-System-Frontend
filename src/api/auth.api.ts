import axiosInstance from '../lib/axios';

export const endPoints = {
  auth: {
    login: {
      url: '/auth/login',
      method: 'POST',
    },
    register: {
      url: '/auth/register',
      method: 'POST',
    },
  },
} as const;

export interface LoginParams {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface RegisterParams {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: User;
}

export interface ApiErrorResponse {
  success: boolean;
  statusCode: number;
  message: string;
  errors?: any[];
}

export const loginUser = async (params: LoginParams): Promise<LoginResponse> => {
  const { url, method } = endPoints.auth.login;
  const response = await axiosInstance({
    url,
    method,
    data: params,
  });
  return response.data;
};

export const registerUser = async (params: RegisterParams): Promise<RegisterResponse> => {
  const { url, method } = endPoints.auth.register;
  const response = await axiosInstance({
    url,
    method,
    data: params,
  });
  return response.data;
};
