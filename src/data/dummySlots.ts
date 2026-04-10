import { type Slot } from '../types';

const generateMockSlots = (): Slot[] => {
  const slots: Slot[] = [];
  let idCounter = 1;
  const today = new Date();

  // Create slots for the next 7 days
  for (let d = 0; d < 7; d++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + d);
    const dateStr = currentDate.toISOString().split('T')[0];

    // 8 slots per day from 9:00 AM to 5:00 PM
    for (let h = 9; h < 17; h++) {
      const startTime = `${h.toString().padStart(2, '0')}:00`;
      const endTime = `${(h + 1).toString().padStart(2, '0')}:00`;

      slots.push({
        id: `slot-${idCounter++}`,
        date: dateStr,
        startTime,
        endTime,
        // ~20% chance to be already booked
        isBooked: Math.random() < 0.2,
      });
    }
  }
  return slots;
};

export const initialSlots: Slot[] = generateMockSlots();
