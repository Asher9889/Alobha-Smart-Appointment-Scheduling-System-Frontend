export interface Slot {
  id: string;
  _id?: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface Appointment {
  id: string;
  slotId?: string;
  userId?: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked?: boolean;
  bookedBy?: string;
  createdAt: string;
  updatedAt?: string;
}

// Keeping it simple since there's no backend yet
export type User = {
  id: string;
  name: string;
  email: string;
}
