import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Slots from './pages/Slots';
import MyAppointments from './pages/MyAppointments';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from './components/ui/sonner';

import { initialSlots } from './data/dummySlots';
import { initialAppointments } from './data/dummyAppointments';
import type { Slot, Appointment } from './types';

function App() {
  const [slots, setSlots] = useState<Slot[]>(initialSlots);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);

  const handleCancel = (appointmentId: string) => {
    const appointmentToCancel = appointments.find((apt) => apt.id === appointmentId);
    if (!appointmentToCancel) return;

    // 1. Remove from appointments
    setAppointments((prev) => prev.filter((apt) => apt.id !== appointmentId));

    // 2. Update slot to be available again
    setSlots((prevSlots) =>
      prevSlots.map((slot) =>
        slot.id === appointmentToCancel.slotId ? { ...slot, isBooked: false } : slot
      )
    );
  };

  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Navigate to="/slots" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/slots" element={<Slots />} />
            <Route 
              path="/appointments" 
              element={<MyAppointments appointments={appointments} slots={slots} onCancel={handleCancel} />} 
            />
          </Route>
        </Routes>
      </main>
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
