import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, Megaphone, Award, Sparkles, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-info/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-gradient-ultra rounded-full blur-xl opacity-70 animate-glow-pulse"></div>
            <div className="relative p-6 bg-gradient-primary rounded-full shadow-glow animate-float">
              <Trophy className="w-20 h-20 text-primary-foreground" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-7xl md:text-8xl font-black bg-gradient-ultra bg-clip-text text-transparent animate-fade-in leading-tight">
              ULTRA TOURNAMENT
            </h1>
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-secondary animate-pulse" />
              <p className="text-2xl font-bold text-secondary">
                Premium Player Management
              </p>
              <Sparkles className="w-6 h-6 text-secondary animate-pulse" />
            </div>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Experience next-generation tournament organization with cutting-edge technology and unmatched performance
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
            <Button 
              size="lg" 
              onClick={() => navigate("/auth")} 
              className="bg-gradient-primary hover:opacity-90 shadow-glow text-xl px-10 py-7 rounded-2xl group transition-all hover:scale-105"
            >
              <Zap className="mr-2 h-6 w-6 group-hover:rotate-12 transition-transform" />
              Launch Dashboard
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/announcements")}
              className="border-2 border-primary/50 hover:bg-primary/10 backdrop-blur-sm text-xl px-10 py-7 rounded-2xl hover:scale-105 transition-all"
            >
              <Megaphone className="mr-2 h-6 w-6" />
              Latest Updates
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Premium Features
          </h2>
          <p className="text-xl text-muted-foreground">
            Powered by cutting-edge technology
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="bg-card/50 backdrop-blur-md border-2 border-primary/20 shadow-xl hover:shadow-glow hover:scale-105 transition-all duration-500 group">
            <CardContent className="pt-8 text-center space-y-6">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <div className="relative p-4 bg-gradient-dark rounded-2xl">
                  <Users className="w-12 h-12 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground">Elite Profiles</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Advanced player analytics with real-time performance tracking and AI-powered insights
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-md border-2 border-secondary/20 shadow-xl hover:shadow-gold hover:scale-105 transition-all duration-500 group">
            <CardContent className="pt-8 text-center space-y-6">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-secondary rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <div className="relative p-4 bg-gradient-dark rounded-2xl">
                  <Award className="w-12 h-12 text-secondary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground">Smart Selection</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Intelligent squad management with automated recommendations and strategic planning tools
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-md border-2 border-info/20 shadow-xl hover:shadow-glow hover:scale-105 transition-all duration-500 group">
            <CardContent className="pt-8 text-center space-y-6">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <div className="relative p-4 bg-gradient-dark rounded-2xl">
                  <Megaphone className="w-12 h-12 text-info" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground">Instant Updates</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Lightning-fast notifications and announcements delivered in real-time to all participants
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <Card className="bg-gradient-ultra border-0 shadow-2xl overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-dark opacity-90"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-10"></div>
          </div>
          <CardContent className="py-20 text-center space-y-8 relative z-10">
            <div className="inline-block p-3 bg-gradient-primary rounded-full shadow-glow mb-4 animate-glow-pulse">
              <Trophy className="w-10 h-10 text-primary-foreground" />
            </div>
            <h2 className="text-5xl font-black text-primary-foreground">
              Ready for Excellence?
            </h2>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
              Join the elite tournament management platform trusted by professionals worldwide
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/auth")}
              className="bg-gradient-secondary hover:opacity-90 text-secondary-foreground shadow-gold text-xl px-12 py-8 rounded-2xl hover:scale-110 transition-all duration-300"
            >
              <Sparkles className="mr-2 h-6 w-6" />
              Start Your Journey
              <Sparkles className="ml-2 h-6 w-6" />
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Index;
