import { Button } from "@/components/ui/button";
import { Trophy, LogOut, Megaphone, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  onSignOut: () => void;
}

export default function DashboardHeader({ onSignOut }: DashboardHeaderProps) {
  const navigate = useNavigate();
  
  return (
    <header className="border-b border-primary/20 bg-gradient-dark backdrop-blur-xl sticky top-0 z-50 shadow-xl">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary rounded-full blur-md opacity-70 animate-glow-pulse"></div>
            <div className="relative w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
              <Trophy className="w-7 h-7 text-primary-foreground" />
            </div>
          </div>
          <div>
            <h1 className="font-black text-xl bg-gradient-primary bg-clip-text text-transparent">
              ULTRA TOURNAMENT
            </h1>
            <p className="text-xs text-secondary flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Premium Management
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/announcements")}
            className="gap-2 hover:bg-primary/10 border border-primary/20"
          >
            <Megaphone className="h-4 w-4 text-primary" />
            <span className="text-foreground">Updates</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onSignOut} 
            className="gap-2 border-destructive/50 hover:bg-destructive/10 text-destructive"
          >
            <LogOut className="h-4 w-4" />
            Exit
          </Button>
        </div>
      </div>
    </header>
  );
}
