import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Circuit pattern background */}
      <div className="absolute inset-0 circuit-pattern opacity-30" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      
      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50 backdrop-blur-sm mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">AI-Powered Business Automation</span>
        </div>

        {/* Main heading */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <span className="text-gradient">24TWELVE</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-foreground/90 max-w-3xl mx-auto mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Your AI Agent Suite That Works
        </p>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          24 hours a day, 12 months a year. Automate bookings, calls, emails, reminders, and more with intelligent AI agents.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Button variant="hero" size="xl">
            <Zap className="w-5 h-5" />
            Get Started Free
          </Button>
          <Button variant="glass" size="xl">
            See How It Works
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-20 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-display font-bold text-gradient">10K+</div>
            <div className="text-sm text-muted-foreground mt-1">Tasks Automated</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-display font-bold text-gradient">99.9%</div>
            <div className="text-sm text-muted-foreground mt-1">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-display font-bold text-gradient">500+</div>
            <div className="text-sm text-muted-foreground mt-1">Happy Businesses</div>
          </div>
        </div>
      </div>
    </section>
  );
}
