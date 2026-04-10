import axiosInstance from '../lib/axios';

export const endPoints = {
  appointments: {
    book: {
      url: '/appointments',
      method: 'POST',
    },
    getAll: {
      url: '/appointments',
      method: 'GET',
    },
  },
} as const;

export interface BookSlotParams {
  slotId: string;
}

export interface BookSlotResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
    isBooked: boolean;
    bookedBy: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const bookSlot = async (params: BookSlotParams): Promise<BookSlotResponse> => {
  const { url, method } = endPoints.appointments.book;
  const response = await axiosInstance({
    url,
    method,
    data: params,
  });
  return response.data;
};

export interface AppointmentItem {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  bookedBy: string;
  createdAt: string;
  updatedAt?: string;
}

export interface GetAppointmentsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: AppointmentItem[];
}

export const getAppointments = async (): Promise<GetAppointmentsResponse> => {
  const { url, method } = endPoints.appointments.getAll;
  const response = await axiosInstance({
    url,
    method,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
  return response.data;
};
