import { type Appointment, type Slot } from '../types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';

interface MyAppointmentsProps {
  appointments: Appointment[];
  slots: Slot[];
  onCancel: (appointmentId: string) => void;
}

export default function MyAppointments({ appointments, slots, onCancel }: MyAppointmentsProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Appointments</h1>
        <p className="text-muted-foreground mt-2">
          Manage your upcoming and past bookings.
        </p>
      </div>

      {appointments.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed">
          <h3 className="text-lg font-medium text-muted-foreground">No appointments booked yet.</h3>
          <p className="text-sm text-muted-foreground mt-1">Visit the slots page to book one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((apt) => {
            const slot = slots.find((s) => s.id === apt.slotId);
            if (!slot) return null;

            const dateObj = new Date(slot.date);
            const dateDisplay = dateObj.toLocaleDateString(undefined, {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            });

            return (
              <motion.div
                key={apt.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full flex flex-col border-primary/20 bg-primary/5">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Appointment</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 pb-3 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Date:</span>
                      <span className="font-medium">{dateDisplay}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Time:</span>
                      <span className="font-medium">
                        {slot.startTime} - {slot.endTime}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={() => onCancel(apt.id)}
                    >
                      Cancel Appointment
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
