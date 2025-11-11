import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/firebase-auth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'player';
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, userData, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    // Redirect to login page with the return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has required role if specified
  if (requiredRole && userData?.role !== requiredRole) {
    // Redirect to unauthorized or home page
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
