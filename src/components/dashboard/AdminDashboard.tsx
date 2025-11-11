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
    <div className="min-h-screen bg-gradient-hero">
      <DashboardHeader onSignOut={signOut} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">Manage tournament players and announcements</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Players</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{players.length}</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Selected Players</CardTitle>
              <UserCheck className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">
                {selectedCount} / {maxPlayers}
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Squad Status</CardTitle>
              <Trophy className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                {selectedCount === maxPlayers ? (
                  <Badge className="bg-success">Complete</Badge>
                ) : (
                  <Badge variant="secondary">{maxPlayers - selectedCount} spots left</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="mb-6 flex gap-4">
          <Button onClick={() => setAnnouncementOpen(true)} className="shadow-md">
            <Megaphone className="mr-2 h-4 w-4" />
            Post Announcement
          </Button>
        </div>

        {/* Players Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-4">All Players</h2>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            </div>
          ) : players.length === 0 ? (
            <Card className="shadow-md">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No players registered yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
