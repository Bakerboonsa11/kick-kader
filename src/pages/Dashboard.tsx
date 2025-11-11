import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import PlayerDashboard from "@/components/dashboard/PlayerDashboard";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {userRole === "admin" ? <AdminDashboard /> : <PlayerDashboard />}
    </div>
  );
}
