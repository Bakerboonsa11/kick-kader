import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, ArrowLeft, Megaphone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

interface Announcement {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAnnouncements(data || []);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
              <Trophy className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Football Tournament</h1>
              <p className="text-xs text-muted-foreground">Announcements</p>
            </div>
          </div>
          
          <Button variant="outline" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent flex items-center gap-3">
            <Megaphone className="h-10 w-10 text-primary" />
            Tournament Announcements
          </h1>
          <p className="text-muted-foreground">Stay updated with the latest tournament news</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          </div>
        ) : announcements.length === 0 ? (
          <Card className="shadow-lg">
            <CardContent className="py-12 text-center">
              <Megaphone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No announcements yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="bg-gradient-hero rounded-t-lg">
                  <CardTitle className="text-2xl">{announcement.title}</CardTitle>
                  <CardDescription className="text-base">
                    {format(new Date(announcement.created_at), "PPPP 'at' p")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-foreground text-lg whitespace-pre-wrap leading-relaxed">
                    {announcement.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
