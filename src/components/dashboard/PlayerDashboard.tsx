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
    <div className="min-h-screen bg-gradient-dark">
      <DashboardHeader onSignOut={signOut} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-10">
          <h1 className="text-5xl font-black mb-3 bg-gradient-ultra bg-clip-text text-transparent">
            Player Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">Your tournament profile and status</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Profile Card */}
          <Card className="shadow-2xl border-2 border-primary/20 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-3xl font-black text-foreground">{profile?.full_name}</CardTitle>
                  <CardDescription className="text-lg font-semibold">{profile?.position}</CardDescription>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-primary rounded-full blur-lg opacity-50 animate-glow-pulse"></div>
                  <Trophy className="relative h-14 w-14 text-primary" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-gradient-dark border-2 border-primary/10">
                  <p className="text-sm text-muted-foreground font-semibold">Age</p>
                  <p className="text-2xl font-black text-foreground">{profile?.age} years</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-dark border-2 border-primary/10">
                  <p className="text-sm text-muted-foreground font-semibold">Experience</p>
                  <p className="text-2xl font-black text-foreground">{profile?.experience_years} years</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-3 font-semibold">Performance Rating</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gradient-dark rounded-full h-4 border-2 border-primary/20 overflow-hidden">
                    <div
                      className="bg-gradient-primary h-4 rounded-full transition-all shadow-glow"
                      style={{ width: `${(profile?.performance_rating || 0) * 10}%` }}
                    />
                  </div>
                  <span className="text-lg font-black text-primary">{profile?.performance_rating}/10</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Selection Status Card */}
          <Card className="shadow-2xl border-2 border-primary/20 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl font-black">
                Tournament Status
                {status?.is_selected ? (
                  <CheckCircle className="h-7 w-7 text-success" />
                ) : (
                  <XCircle className="h-7 w-7 text-muted-foreground" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-10">
                {status?.is_selected ? (
                  <>
                    <div className="relative inline-block mb-6">
                      <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-xl opacity-70 animate-glow-pulse"></div>
                      <Badge className="relative bg-gradient-primary shadow-glow text-xl px-8 py-3 font-black">
                        ✓ SELECTED
                      </Badge>
                    </div>
                    <p className="text-lg text-foreground font-semibold mb-3">
                      Congratulations! You're in the elite squad.
                    </p>
                    {status.selected_at && (
                      <p className="text-sm text-muted-foreground">
                        Selected on {format(new Date(status.selected_at), "PPP")}
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <Badge variant="secondary" className="mb-6 text-xl px-8 py-3 font-bold">
                      Pending Selection
                    </Badge>
                    <p className="text-lg text-muted-foreground font-semibold">
                      Keep training hard! Selection is ongoing.
                    </p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Announcements */}
        <div className="mt-12">
          <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
            <Megaphone className="h-8 w-8 text-primary" />
            Latest Updates
          </h2>
          <div className="space-y-6">
            {announcements.length === 0 ? (
              <Card className="shadow-xl border-2 border-primary/10 bg-card/80 backdrop-blur-sm">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground text-lg">No announcements yet</p>
                </CardContent>
              </Card>
            ) : (
              announcements.map((announcement) => (
                <Card key={announcement.id} className="shadow-xl hover:shadow-glow transition-all duration-300 border-2 border-primary/10 bg-card/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">{announcement.title}</CardTitle>
                    <CardDescription className="text-base">
                      {format(new Date(announcement.created_at), "PPP 'at' p")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground whitespace-pre-wrap text-base leading-relaxed">{announcement.content}</p>
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
