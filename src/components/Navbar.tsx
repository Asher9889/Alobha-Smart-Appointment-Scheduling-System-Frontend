import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="border-b bg-background h-16 flex items-center shrink-0">
      <div className="container mx-auto px-4 flex justify-between items-center h-full">
        <Link to="/slots" className="text-xl font-semibold tracking-tight">
          Alobha Booking
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/slots" className="hover:text-primary transition-colors">
            Slots
          </Link>
          <Link to="/appointments" className="hover:text-primary transition-colors">
            My Appointments
          </Link>
          <Link to="/login" className="hover:text-primary transition-colors">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
