import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';
import { registerUser, type RegisterParams, type RegisterResponse, type ApiErrorResponse } from '../api/auth.api';

export const useRegister = () => {
  return useMutation<RegisterResponse, AxiosError<ApiErrorResponse>, RegisterParams>({
    mutationFn: (params: RegisterParams) => registerUser(params),
    onSuccess: (data) => {
      toast.success(data.message || 'Registered successfully');
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Failed to register');
    },
  });
};

export default useRegister;
