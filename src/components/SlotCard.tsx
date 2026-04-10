import { motion } from 'framer-motion';
import { type Slot } from '../types';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';

interface SlotCardProps {
  slot: Slot;
  onBook: (slotId: string) => void;
}

export default function SlotCard({ slot, onBook }: SlotCardProps) {
  // Format date
  const dateObj = new Date(slot.date);
  const dateDisplay = dateObj.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Card className={`h-full flex flex-col ${slot.isBooked ? 'opacity-60 bg-muted/50' : 'bg-card'}`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{dateDisplay}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-3">
          <div className="text-2xl font-bold tracking-tight">
            {slot.startTime}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            until {slot.endTime}
          </p>
          <div className="mt-4">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${slot.isBooked
                  ? 'bg-destructive/10 text-destructive'
                  : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                }`}
            >
              {slot.isBooked ? 'Booked' : 'Available'}
            </span>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            variant={slot.isBooked ? "secondary" : "default"}
            disabled={slot.isBooked}
            onClick={() => onBook(slot.id)}
          >
            {slot.isBooked ? 'Unavailable' : 'Book'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
