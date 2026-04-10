import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';
import { bookSlot, type BookSlotParams, type BookSlotResponse } from '../api/appointments.api';
import type { ApiErrorResponse } from '../api/auth.api';

export const useBookSlot = () => {
  const queryClient = useQueryClient();

  return useMutation<BookSlotResponse, AxiosError<ApiErrorResponse>, BookSlotParams>({
    mutationFn: (params: BookSlotParams) => bookSlot(params),
    onSuccess: (data) => {
      // Show toaster success
      toast.success(data.message || 'Slot booked successfully!');
      // Refresh available slots
      queryClient.invalidateQueries({ queryKey: ['slots'] });
    },
    onError: (error) => {
      // Show toaster error
      toast.error(error?.response?.data?.message || 'Failed to book slot');
    },
  });
};
