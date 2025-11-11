import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserCheck, UserX, Trophy } from "lucide-react";

interface PlayerCardProps {
  player: {
    id: string;
    is_selected: boolean;
    profiles: {
      full_name: string;
      age: number;
      position: string;
      experience_years: number;
      performance_rating: number;
      photo_url: string | null;
    };
  };
  onToggleSelect: () => void;
  isAdmin: boolean;
}

export default function PlayerCard({ player, onToggleSelect, isAdmin }: PlayerCardProps) {
  return (
    <Card className="shadow-xl hover:shadow-glow transition-all duration-500 group border-2 border-primary/10 hover:border-primary/30 bg-card/80 backdrop-blur-sm">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl group-hover:text-primary transition-colors font-bold">
              {player.profiles.full_name}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1 font-semibold">{player.profiles.position}</p>
          </div>
          {player.is_selected && (
            <Badge className="bg-gradient-primary shadow-glow animate-glow-pulse">
              <Trophy className="h-3 w-3 mr-1" />
              Selected
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-5">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="p-3 rounded-lg bg-gradient-dark border border-primary/10">
            <p className="text-muted-foreground text-xs">Age</p>
            <p className="font-bold text-lg text-foreground">{player.profiles.age} years</p>
          </div>
          <div className="p-3 rounded-lg bg-gradient-dark border border-primary/10">
            <p className="text-muted-foreground text-xs">Experience</p>
            <p className="font-bold text-lg text-foreground">{player.profiles.experience_years} years</p>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground mb-2 font-semibold">Performance Rating</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-gradient-dark rounded-full h-3 border border-primary/20 overflow-hidden">
              <div
                className="bg-gradient-primary h-3 rounded-full transition-all shadow-glow"
                style={{ width: `${player.profiles.performance_rating * 10}%` }}
              />
            </div>
            <span className="text-sm font-bold text-primary">{player.profiles.performance_rating}/10</span>
          </div>
        </div>
        
        {isAdmin && (
          <Button
            onClick={onToggleSelect}
            variant={player.is_selected ? "outline" : "default"}
            className={`w-full mt-2 transition-all duration-300 ${
              player.is_selected 
                ? "border-2 border-destructive/50 hover:bg-destructive/10 text-destructive" 
                : "bg-gradient-primary hover:opacity-90 shadow-glow hover:scale-105"
            }`}
          >
            {player.is_selected ? (
              <>
                <UserX className="mr-2 h-4 w-4" />
                Remove
              </>
            ) : (
              <>
                <UserCheck className="mr-2 h-4 w-4" />
                Select Player
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
