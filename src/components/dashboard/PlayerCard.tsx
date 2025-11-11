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
    <Card className="shadow-md hover:shadow-xl transition-all duration-300 group">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl group-hover:text-primary transition-colors">
              {player.profiles.full_name}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{player.profiles.position}</p>
          </div>
          {player.is_selected && (
            <Badge className="bg-success">
              <Trophy className="h-3 w-3 mr-1" />
              Selected
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-muted-foreground">Age</p>
            <p className="font-semibold">{player.profiles.age} years</p>
          </div>
          <div>
            <p className="text-muted-foreground">Experience</p>
            <p className="font-semibold">{player.profiles.experience_years} years</p>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground mb-2">Performance</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-muted rounded-full h-2">
              <div
                className="bg-gradient-primary h-2 rounded-full transition-all"
                style={{ width: `${player.profiles.performance_rating * 10}%` }}
              />
            </div>
            <span className="text-sm font-semibold">{player.profiles.performance_rating}/10</span>
          </div>
        </div>
        
        {isAdmin && (
          <Button
            onClick={onToggleSelect}
            variant={player.is_selected ? "outline" : "default"}
            className="w-full mt-2"
          >
            {player.is_selected ? (
              <>
                <UserX className="mr-2 h-4 w-4" />
                Unselect
              </>
            ) : (
              <>
                <UserCheck className="mr-2 h-4 w-4" />
                Select
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
