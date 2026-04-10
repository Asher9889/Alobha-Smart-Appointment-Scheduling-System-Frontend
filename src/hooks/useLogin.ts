import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { loginUser, type LoginParams, type LoginResponse, type ApiErrorResponse } from '../api/auth.api';
import { useAuth } from '../context/AuthContext';

export const useLogin = () => {
  const { setAuth } = useAuth();
  
  return useMutation<LoginResponse, AxiosError<ApiErrorResponse>, LoginParams>({
    mutationFn: (params: LoginParams) => loginUser(params),
    onSuccess: (data) => {
      // Auth Persistence handling
      if (data.success && data.data) {
        setAuth(data.data.token, data.data.user);
      }
    },
  });
};
