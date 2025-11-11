import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, Megaphone, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="inline-block p-4 bg-gradient-primary rounded-full shadow-glow mb-4">
            <Trophy className="w-16 h-16 text-primary-foreground" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Football Tournament
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional player management system for tournament organization
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" onClick={() => navigate("/auth")} className="shadow-lg text-lg px-8">
              Sign In / Sign Up
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/announcements")}
              className="shadow-md text-lg px-8"
            >
              <Megaphone className="mr-2 h-5 w-5" />
              View Announcements
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">System Features</h2>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="inline-block p-3 bg-primary/10 rounded-full">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Player Management</h3>
              <p className="text-muted-foreground">
                Comprehensive player profiles with performance tracking and selection management
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="inline-block p-3 bg-primary/10 rounded-full">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Tournament Selection</h3>
              <p className="text-muted-foreground">
                Admin dashboard for selecting and managing tournament squad members
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="inline-block p-3 bg-primary/10 rounded-full">
                <Megaphone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Announcements</h3>
              <p className="text-muted-foreground">
                Real-time updates and announcements for all tournament participants
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="shadow-xl bg-gradient-dark text-primary-foreground">
          <CardContent className="py-12 text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Join the tournament management system today and experience seamless player coordination
            </p>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate("/auth")}
              className="shadow-lg text-lg px-8"
            >
              Get Started Now
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Index;
