import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, CheckCircle, XCircle, Megaphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DashboardHeader from "./DashboardHeader";
import { format } from "date-fns";

interface PlayerProfile {
  full_name: string;
  age: number;
  position: string;
  experience_years: number;
  performance_rating: number;
  photo_url: string | null;
}

interface PlayerStatus {
  is_selected: boolean;
  selected_at: string | null;
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export default function PlayerDashboard() {
  const [profile, setProfile] = useState<PlayerProfile | null>(null);
  const [status, setStatus] = useState<PlayerStatus | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchPlayerData();
      fetchAnnouncements();
    }
  }, [user]);

  const fetchPlayerData = async () => {
    try {
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user!.id)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);

      // Fetch selection status
      const { data: statusData, error: statusError } = await supabase
        .from("players")
        .select("is_selected, selected_at")
        .eq("profile_id", user!.id)
        .single();

      if (statusError) throw statusError;
      setStatus(statusData);
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

  const fetchAnnouncements = async () => {
    try {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      setAnnouncements(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <DashboardHeader onSignOut={signOut} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Player Dashboard
          </h1>
          <p className="text-muted-foreground">View your profile and tournament status</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Profile Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{profile?.full_name}</CardTitle>
                  <CardDescription>{profile?.position}</CardDescription>
                </div>
                <Trophy className="h-12 w-12 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Age</p>
                  <p className="text-lg font-semibold">{profile?.age} years</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Experience</p>
                  <p className="text-lg font-semibold">{profile?.experience_years} years</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Performance Rating</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-primary h-2 rounded-full transition-all"
                      style={{ width: `${(profile?.performance_rating || 0) * 10}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold">{profile?.performance_rating}/10</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Selection Status Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Tournament Status
                {status?.is_selected ? (
                  <CheckCircle className="h-5 w-5 text-success" />
                ) : (
                  <XCircle className="h-5 w-5 text-muted-foreground" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8">
                {status?.is_selected ? (
                  <>
                    <Badge className="mb-4 bg-success text-lg px-4 py-2">
                      ✓ Selected for Tournament
                    </Badge>
                    <p className="text-muted-foreground">
                      Congratulations! You have been selected for the tournament squad.
                    </p>
                    {status.selected_at && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Selected on {format(new Date(status.selected_at), "PPP")}
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <Badge variant="secondary" className="mb-4 text-lg px-4 py-2">
                      Not Selected Yet
                    </Badge>
                    <p className="text-muted-foreground">
                      You are currently not in the tournament squad. Keep training!
                    </p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Announcements */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Megaphone className="h-6 w-6 text-primary" />
            Latest Announcements
          </h2>
          <div className="space-y-4">
            {announcements.length === 0 ? (
              <Card className="shadow-md">
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">No announcements yet</p>
                </CardContent>
              </Card>
            ) : (
              announcements.map((announcement) => (
                <Card key={announcement.id} className="shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{announcement.title}</CardTitle>
                    <CardDescription>
                      {format(new Date(announcement.created_at), "PPP 'at' p")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground whitespace-pre-wrap">{announcement.content}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
