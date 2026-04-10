import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';
import { cancelAppointment, type CancelAppointmentResponse, type ApiErrorResponse } from '../api/appointments.api';

export const useCancelAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation<CancelAppointmentResponse, AxiosError<ApiErrorResponse>, string>({
    mutationFn: (slotId: string) => cancelAppointment(slotId),
    onSuccess: (data) => {
      toast.success(data.message || 'Appointment cancelled');
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      queryClient.invalidateQueries({ queryKey: ['slots'] });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Failed to cancel appointment');
    },
  });
};

export default useCancelAppointment;
