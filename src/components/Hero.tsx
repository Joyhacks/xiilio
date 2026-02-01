import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Play } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-xylo.png";
import { AgentDemoModal } from "@/components/AgentDemoModal";
import { AuthOverlay } from "@/components/auth/AuthOverlay";
import { useAuth } from "@/hooks/useAuth";

export function Hero() {
  const { isAuthenticated } = useAuth();
  const [showAuthOverlay, setShowAuthOverlay] = useState(false);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      // Navigate to pricing if already authenticated
      window.location.href = '/pricing';
    } else {
      setShowAuthOverlay(true);
    }
  };

  return (
    <>
      <section className="relative flex items-center justify-center overflow-hidden bg-gradient-hero pt-20 md:pt-24 pb-6 md:pb-8">
        {/* Circuit pattern background */}
        <div className="absolute inset-0 circuit-pattern opacity-30" />
        
        {/* Luxurious gradient orbs - smaller on mobile */}
        <div className="absolute top-1/4 left-1/4 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-primary/15 rounded-full blur-[60px] md:blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-accent/15 rounded-full blur-[50px] md:blur-[80px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-secondary/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        
        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
          {/* Logo with glow effect */}
          <div className="mb-4 md:mb-6 relative">
            {/* Glow backdrop */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-32 h-32 md:w-64 md:h-64 lg:w-80 lg:h-80 bg-primary/20 rounded-full blur-2xl md:blur-3xl animate-pulse-glow" />
            </div>
            <img 
              src={logo} 
              alt="Xylo - AI Agent Suite" 
              className="relative h-32 md:h-48 lg:h-56 w-auto mx-auto drop-shadow-2xl"
              style={{ filter: "drop-shadow(0 0 20px hsl(var(--primary) / 0.4))" }}
              loading="eager"
            />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full glass-card mb-4 md:mb-6 shimmer">
            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
            <span className="text-xs md:text-sm text-foreground/80">Meet Your AI Agent Team</span>
          </div>

          
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-10 px-2">
            Specialized AI agents ready to handle tasks, manage communications, and grow your business around the clock.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <Button variant="hero" size="lg" className="w-full sm:w-auto md:size-xl" onClick={handleGetStarted}>
              <Zap className="w-4 h-4 md:w-5 md:h-5" />
              Get Started Free
            </Button>
            <AgentDemoModal
              trigger={
                <Button variant="glass" size="lg" className="w-full sm:w-auto md:size-xl">
                  <Play className="w-4 h-4 md:w-5 md:h-5" />
                  Take A Tour
                </Button>
              }
            />
          </div>

        </div>
      </section>

      <AuthOverlay
        isOpen={showAuthOverlay}
        onClose={() => setShowAuthOverlay(false)}
        defaultTab="signup"
      />
    </>
  );
}
