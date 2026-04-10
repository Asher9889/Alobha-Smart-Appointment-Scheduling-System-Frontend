import { type Slot } from '../types';
import SlotCard from '../components/SlotCard';

interface SlotsProps {
  slots: Slot[];
  onBook: (slotId: string) => void;
}

export default function Slots({ slots, onBook }: SlotsProps) {
  // Group slots by date for a better presentation
  const groupedSlots = slots.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = [];
    }
    acc[slot.date].push(slot);
    return acc;
  }, {} as Record<string, Slot[]>);

  const dates = Object.keys(groupedSlots).sort();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Available Slots</h1>
        <p className="text-muted-foreground mt-2">
          Select and book your preferred appointment time.
        </p>
      </div>

      <div className="space-y-10">
        {dates.map((date) => {
          const dateObj = new Date(date);
          const dateDisplay = dateObj.toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

          return (
            <section key={date}>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">{dateDisplay}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {groupedSlots[date].map((slot) => (
                  <SlotCard key={slot.id} slot={slot} onBook={onBook} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
