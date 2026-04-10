import { useState } from 'react';
import type { Slot } from '../types';
import SlotCard from '../components/SlotCard';
import { useSlots } from '../hooks/useSlots';
import { useBookSlot } from '../hooks/useBookSlot';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export default function Slots() {
  // Default to today
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  const { data, isLoading, isError, error } = useSlots(selectedDate);
  const { mutate: bookSlot } = useBookSlot();

  // Read slots from our actual real API response payload
  const realSlots = data?.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Available Slots</h1>
          <p className="text-muted-foreground mt-2">
            Select and book your preferred appointment time.
          </p>
        </div>
        
        <div className="w-full md:w-64">
          <Label htmlFor="date-picker">Select Date</Label>
          <Input 
            type="date" 
            id="date-picker" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-10">
        <section>
          {isLoading && (
            <div className="text-center py-12">
              <span className="text-muted-foreground animate-pulse">Loading slots...</span>
            </div>
          )}
          
          {isError && (
            <div className="bg-destructive/15 text-destructive p-4 rounded-md">
              Failed to load slots for this date. {error?.message}
            </div>
          )}

          {!isLoading && !isError && realSlots.length === 0 && (
            <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed">
              <span className="text-muted-foreground">No available slots found for {selectedDate}.</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {!isLoading && realSlots.map((slot: Slot) => {
              const uniqueIdentifier = slot._id || slot.id;
              return (
                <SlotCard key={uniqueIdentifier} slot={slot} onBook={(id) => bookSlot({ slotId: id })} />
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
