import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

export function CTASection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="relative py-6 md:py-8 bg-background overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/8 rounded-full blur-[80px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[60px]" />
      </div>

      <div className="relative container mx-auto px-6">
        <div
          ref={ref}
          className={cn(
            "max-w-4xl mx-auto text-center glass-luxury rounded-3xl p-8 md:p-10 transition-all duration-700 ease-out",
            isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-12 scale-95"
          )}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card mb-6 shimmer">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground/80">
              Start automating today
            </span>
          </div>

          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Ready to put your business on{" "}
            <span className="text-gradient">autopilot?</span>
          </h2>

          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already saving 40+ hours per week with
            our AI agent platform. No coding required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl" asChild>
              <Link to="/pricing">
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <a href="https://calendly.com/itsgotime-24twelve" target="_blank" rel="noopener noreferrer">Schedule Demo</a>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            14-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}
