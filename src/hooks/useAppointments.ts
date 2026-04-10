import { useQuery } from '@tanstack/react-query';
import { getAppointments, type GetAppointmentsResponse } from '../api/appointments.api';

export const useAppointments = () => {
  return useQuery({
    queryKey: ['appointments'],
    queryFn: () => getAppointments(),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};

export default useAppointments;
