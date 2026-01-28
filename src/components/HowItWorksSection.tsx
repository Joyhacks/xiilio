import { UserPlus, MessageSquare, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Your Account",
    description:
      "Sign up in seconds and tell us about your business. We'll personalize your AI team based on your goals and industry.",
    gradient: "from-primary to-secondary",
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "Meet Your Agents",
    description:
      "Chat with specialized AI agents for sales, content, legal, finance, and more. Each one is trained for their specific role.",
    gradient: "from-secondary to-accent",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Scale Your Business",
    description:
      "Let your AI team handle tasks 24/7 while you focus on growth. Track progress and optimize workflows effortlessly.",
    gradient: "from-accent to-primary",
  },
];

export function HowItWorksSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: stepsRef, isVisible: stepsVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="how-it-works" className="relative py-16 bg-background">
      <div className="absolute inset-0 circuit-pattern opacity-10" />

      <div className="relative container mx-auto px-6">
        {/* Section header */}
        <div
          ref={headerRef}
          className={cn(
            "text-center mb-16 transition-all duration-700 ease-out",
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get started with your AI agent team in three simple steps.
          </p>
        </div>

        {/* Steps */}
        <div
          ref={stepsRef}
          className={cn(
            "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto transition-all duration-700 ease-out",
            stepsVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          )}
        >
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative group"
            >
              {/* Connector line (hidden on mobile and after last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-border to-transparent" />
              )}

              <div className="relative p-8 rounded-2xl glass-card transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_60px_hsl(210_40%_70%/0.12)]">
                {/* Step number */}
                <div className="absolute -top-4 -left-2 font-display text-6xl font-bold text-primary/10">
                  {step.number}
                </div>

                {/* Icon */}
                <div
                  className={cn(
                    "relative w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-br",
                    step.gradient
                  )}
                >
                  <step.icon className="w-7 h-7 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
