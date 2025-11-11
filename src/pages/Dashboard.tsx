import { useAuth } from "@/lib/firebase-auth";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import PlayerDashboard from "@/components/dashboard/PlayerDashboard";

export default function Dashboard() {
  const { user, userData } = useAuth();

  // Since we're using ProtectedRoute, we can assume user is authenticated
  const isAdmin = userData?.role === 'admin';

  return (
    <div className="min-h-screen bg-background">
      {isAdmin ? <AdminDashboard /> : <PlayerDashboard />}
    </div>
  );
}
