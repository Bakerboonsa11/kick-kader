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
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <header className="border-b border-primary/20 bg-gradient-dark backdrop-blur-xl shadow-xl relative z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-md opacity-70 animate-glow-pulse"></div>
              <div className="relative w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
                <Trophy className="w-7 h-7 text-primary-foreground" />
              </div>
            </div>
            <div>
              <h1 className="font-black text-xl bg-gradient-primary bg-clip-text text-transparent">ULTRA TOURNAMENT</h1>
              <p className="text-xs text-muted-foreground">Official Announcements</p>
            </div>
          </div>
          
          <Button variant="outline" size="sm" onClick={() => navigate("/")} className="border-primary/50 hover:bg-primary/10">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back Home
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="mb-12 text-center">
          <div className="inline-block relative mb-6">
            <div className="absolute inset-0 bg-gradient-primary rounded-full blur-2xl opacity-40 animate-glow-pulse"></div>
            <Megaphone className="relative h-16 w-16 text-primary mx-auto" />
          </div>
          <h1 className="text-6xl font-black mb-4 bg-gradient-ultra bg-clip-text text-transparent">
            Official Updates
          </h1>
          <p className="text-muted-foreground text-xl">Stay informed with the latest tournament news</p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent shadow-glow"></div>
          </div>
        ) : announcements.length === 0 ? (
          <Card className="shadow-2xl border-2 border-primary/20 bg-card/80 backdrop-blur-sm">
            <CardContent className="py-20 text-center">
              <Megaphone className="h-16 w-16 text-muted-foreground mx-auto mb-6 opacity-50" />
              <p className="text-muted-foreground text-xl">No announcements yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8 max-w-4xl mx-auto">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="shadow-2xl hover:shadow-glow transition-all duration-500 border-2 border-primary/20 bg-card/80 backdrop-blur-sm group">
                <CardHeader className="bg-gradient-hero rounded-t-lg border-b border-primary/10 pb-6">
                  <CardTitle className="text-3xl font-black text-foreground group-hover:text-primary transition-colors">
                    {announcement.title}
                  </CardTitle>
                  <CardDescription className="text-base font-semibold text-muted-foreground">
                    {format(new Date(announcement.created_at), "PPPP 'at' p")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-8 pb-8">
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
