import { useQuery } from '@tanstack/react-query';
import { getAvailableSlots } from '../api/slots.api';

export const useSlots = (date: string) => {
  return useQuery({
    queryKey: ['slots', date],
    queryFn: () => getAvailableSlots(date),
    staleTime: 0,
    gcTime: 0,
  });
};
