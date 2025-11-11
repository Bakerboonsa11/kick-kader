import { Button } from "@/components/ui/button";
import { Trophy, LogOut, Megaphone } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  onSignOut: () => void;
}

export default function DashboardHeader({ onSignOut }: DashboardHeaderProps) {
  const navigate = useNavigate();
  
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
            <Trophy className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg">Football Tournament</h1>
            <p className="text-xs text-muted-foreground">Player Management</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/announcements")}
            className="gap-2"
          >
            <Megaphone className="h-4 w-4" />
            Announcements
          </Button>
          <Button variant="outline" size="sm" onClick={onSignOut} className="gap-2">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
}
