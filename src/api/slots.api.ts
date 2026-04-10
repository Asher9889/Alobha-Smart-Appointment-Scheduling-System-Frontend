import axiosInstance from '../lib/axios';
import { type Slot } from '../types';

export const endPoints = {
  slots: {
    getAvailable: {
      url: '/slots',
      method: 'GET',
    },
  },
} as const;

export interface GetSlotsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Slot[];
}

export const getAvailableSlots = async (date: string): Promise<GetSlotsResponse> => {
  const { url, method } = endPoints.slots.getAvailable;
  const response = await axiosInstance({
    url,
    method,
    params: { date },
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    }
  });
  return response.data;
};
