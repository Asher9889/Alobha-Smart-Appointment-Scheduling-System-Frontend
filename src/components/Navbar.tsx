import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="border-b bg-background h-16 flex items-center shrink-0">
      <div className="container mx-auto px-4 flex justify-between items-center h-full">
        <Link to="/slots" className="text-xl font-semibold tracking-tight">
          Alobha Booking
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium">
          {user ? (
            <>
              <Link to="/slots" className="hover:text-primary transition-colors">
                Slots
              </Link>
              <Link to="/appointments" className="hover:text-primary transition-colors">
                My Appointments
              </Link>
              <div className="flex items-center gap-4 bg-muted/50 px-3 py-1.5 rounded-full ml-2">
                <span className="font-semibold text-primary">{user.name}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button variant="default" size="sm">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
