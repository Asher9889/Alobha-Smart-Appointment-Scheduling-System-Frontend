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
import { useAppointments } from './hooks/useAppointments';
import type { Slot, Appointment } from './types';

function App() {
  const [slots, setSlots] = useState<Slot[]>(initialSlots);
  const { data: appointmentsResp } = useAppointments();
  const backendAppointments = appointmentsResp?.data || initialAppointments;

  const handleCancel = (appointmentId: string) => {
    const currentAppointments = backendAppointments;
    const appointmentToCancel = currentAppointments.find((apt: any) => apt.id === appointmentId);
    if (!appointmentToCancel) return;

    // 1. Remove from appointments
    setAppointments((prev) => prev.filter((apt) => apt.id !== appointmentId));

    // 2. Update slot to be available again
    // Try to find matching slot by date & startTime to free it up locally
    setSlots((prevSlots) =>
      prevSlots.map((slot) =>
        slot.date === appointmentToCancel.date && slot.startTime === appointmentToCancel.startTime
          ? { ...slot, isBooked: false }
          : slot
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
              element={<MyAppointments appointments={backendAppointments} slots={slots} onCancel={handleCancel} />}
            />
          </Route>
        </Routes>
      </main>
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
