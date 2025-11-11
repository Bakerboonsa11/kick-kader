import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, UserCheck, LogOut, Megaphone, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PlayerCard from "./PlayerCard";
import AnnouncementDialog from "./AnnouncementDialog";
import DashboardHeader from "./DashboardHeader";

interface Player {
  id: string;
  profile_id: string;
  is_selected: boolean;
  profiles: {
    full_name: string;
    age: number;
    position: string;
    experience_years: number;
    performance_rating: number;
    photo_url: string | null;
  };
}

export default function AdminDashboard() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [announcementOpen, setAnnouncementOpen] = useState(false);
  const { signOut } = useAuth();
  const { toast } = useToast();

  const selectedCount = players.filter((p) => p.is_selected).length;
  const maxPlayers = 23;

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const { data, error } = await supabase
        .from("players")
        .select(`
          id,
          profile_id,
          is_selected,
          profiles (
            full_name,
            age,
            position,
            experience_years,
            performance_rating,
            photo_url
          )
        `)
        .order("is_selected", { ascending: false });

      if (error) throw error;
      setPlayers(data as Player[]);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePlayerSelection = async (playerId: string, currentStatus: boolean) => {
    if (!currentStatus && selectedCount >= maxPlayers) {
      toast({
        variant: "destructive",
        title: "Squad Full",
        description: `Maximum of ${maxPlayers} players can be selected.`,
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("players")
        .update({
          is_selected: !currentStatus,
          selected_at: !currentStatus ? new Date().toISOString() : null,
        })
        .eq("id", playerId);

      if (error) throw error;

      await fetchPlayers();
      
      toast({
        title: !currentStatus ? "Player Selected" : "Player Unselected",
        description: !currentStatus
          ? "Player added to tournament squad."
          : "Player removed from tournament squad.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <DashboardHeader onSignOut={signOut} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-10">
          <h1 className="text-5xl font-black mb-3 bg-gradient-ultra bg-clip-text text-transparent">
            Admin Command Center
          </h1>
          <p className="text-muted-foreground text-lg">Elite tournament management dashboard</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-10">
          <Card className="shadow-xl hover:shadow-glow transition-all duration-300 border-2 border-primary/20 bg-card/80 backdrop-blur-sm group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground">Total Players</CardTitle>
              <Users className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-foreground">{players.length}</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-xl hover:shadow-glow transition-all duration-300 border-2 border-success/20 bg-card/80 backdrop-blur-sm group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground">Selected Squad</CardTitle>
              <UserCheck className="h-5 w-5 text-success group-hover:scale-110 transition-transform" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black bg-gradient-primary bg-clip-text text-transparent">
                {selectedCount} / {maxPlayers}
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-xl hover:shadow-gold transition-all duration-300 border-2 border-secondary/20 bg-card/80 backdrop-blur-sm group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground">Squad Status</CardTitle>
              <Trophy className="h-5 w-5 text-secondary group-hover:scale-110 transition-transform" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">
                {selectedCount === maxPlayers ? (
                  <Badge className="bg-gradient-primary shadow-glow text-base px-3 py-1">Complete</Badge>
                ) : (
                  <Badge variant="secondary" className="text-base px-3 py-1">{maxPlayers - selectedCount} spots left</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="mb-8 flex gap-4">
          <Button onClick={() => setAnnouncementOpen(true)} className="bg-gradient-primary hover:opacity-90 shadow-glow text-base px-6 py-6 hover:scale-105 transition-all">
            <Megaphone className="mr-2 h-5 w-5" />
            Post Announcement
          </Button>
        </div>

        {/* Players Grid */}
        <div>
          <h2 className="text-3xl font-black mb-6 text-foreground">Player Registry</h2>
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent shadow-glow"></div>
            </div>
          ) : players.length === 0 ? (
            <Card className="shadow-xl border-2 border-primary/10 bg-card/80 backdrop-blur-sm">
              <CardContent className="py-16 text-center">
                <p className="text-muted-foreground text-lg">No players registered yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {players.map((player) => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  onToggleSelect={() => togglePlayerSelection(player.id, player.is_selected)}
                  isAdmin={true}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <AnnouncementDialog
        open={announcementOpen}
        onOpenChange={setAnnouncementOpen}
        onSuccess={fetchPlayers}
      />
    </div>
  );
}
