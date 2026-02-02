import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Play } from "lucide-react";
import logo from "@/assets/logo-xilio-hero-3d.png";
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
      <section className="relative flex items-center justify-center overflow-hidden pt-16 md:pt-18 pb-4 md:pb-6" style={{ backgroundColor: '#161e0c' }}>
        {/* Solid background matching logo's exact corner color */}
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{ backgroundColor: '#161e0c' }}
        />
        {/* Circuit pattern background */}
        <div className="absolute inset-0 circuit-pattern opacity-15" />
        
        {/* Luxurious gradient orbs - matched to logo */}
        <div className="absolute top-1/4 left-1/4 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-[#121a08]/30 rounded-full blur-[60px] md:blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-[#0e1506]/28 rounded-full blur-[50px] md:blur-[80px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#2a2208]/15 rounded-full blur-[80px] md:blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        
        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
          {/* Logo with edge-blending overlay */}
          <div className="mb-2 md:mb-3 relative">
            {/* Matched gold glow to logo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-40 h-40 md:w-72 md:h-72 lg:w-96 lg:h-96 bg-[#252008]/35 rounded-full blur-3xl md:blur-[80px] animate-pulse-glow" />
            </div>
            {/* Logo container with edge masking */}
            <div className="relative inline-block">
              <img 
                src={logo} 
                alt="Xilio - Working 24twelve" 
                className="relative h-[15.2rem] md:h-[21.3rem] lg:h-[24.4rem] w-auto mx-auto"
                loading="eager"
              />
              {/* Edge-blending gradient overlay */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 60% 55% at 50% 48%, transparent 0%, transparent 35%, #161e0c 70%, #161e0c 100%)'
                }}
              />
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full glass-card mb-3 md:mb-4 shimmer">
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
