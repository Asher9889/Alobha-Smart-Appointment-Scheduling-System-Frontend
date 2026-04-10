import { motion } from 'framer-motion';
import type { Slot } from '../types';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';

interface SlotCardProps {
  slot: Slot;
  onBook: (slotId: string) => void;
}

export default function SlotCard({ slot, onBook }: SlotCardProps) {
  // ISO date parsing
  const dateObj = new Date(slot.date || slot.startTime);
  const startTimeObj = new Date(slot.startTime);
  const endTimeObj = new Date(slot.endTime);

  const dateDisplay = dateObj.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const formatTime = (d: Date) => {
    return d.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const formattedStartTime = formatTime(startTimeObj);
  const formattedEndTime = formatTime(endTimeObj);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Card className={`h-full flex flex-col border-primary/10 bg-card ${slot.isBooked ? 'opacity-60 bg-muted/50' : 'hover:border-primary/30 transition-colors'}`}>
        <CardHeader className="pb-3 border-b">
          <CardTitle className="text-lg">{dateDisplay}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-3 pt-5">
          <div className="text-2xl font-bold tracking-tight text-primary">
            {formattedStartTime}
          </div>
          <p className="text-sm text-muted-foreground mt-1 font-medium">
            until {formattedEndTime}
          </p>
          <div className="mt-4">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                slot.isBooked
                  ? 'bg-destructive/10 text-destructive'
                  : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
              }`}
            >
              {slot.isBooked ? 'Booked' : 'Available'}
            </span>
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <Button
            className="w-full"
            variant={slot.isBooked ? "secondary" : "default"}
            disabled={slot.isBooked}
            onClick={() => onBook(slot._id || slot.id)}
          >
            {slot.isBooked ? 'Unavailable' : 'Book'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
