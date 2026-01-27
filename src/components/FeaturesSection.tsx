import { Bot, Shield, Zap, Globe, Clock, Workflow } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Bot,
    title: "Intelligent Automation",
    description:
      "AI agents learn your business processes and automate repetitive tasks with precision.",
    gradient: "from-primary to-secondary",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-grade encryption and compliance with SOC 2, GDPR, and HIPAA standards.",
    gradient: "from-agent-booking to-primary",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Sub-second response times ensure your agents work as fast as your business moves.",
    gradient: "from-agent-reminder to-agent-tasks",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description:
      "Deploy agents across time zones and languages to serve customers worldwide.",
    gradient: "from-agent-analytics to-primary",
  },
  {
    icon: Clock,
    title: "24/7 Operations",
    description:
      "Your AI workforce never sleeps, ensuring round-the-clock business continuity.",
    gradient: "from-secondary to-agent-email",
  },
  {
    icon: Workflow,
    title: "Seamless Integration",
    description:
      "Connect with 500+ apps including Slack, Salesforce, HubSpot, and more.",
    gradient: "from-agent-calls to-agent-analytics",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 bg-gradient-hero">
      <div className="absolute inset-0 circuit-pattern opacity-20" />

      <div className="relative container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Built for <span className="text-gradient">Modern Business</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to transform your operations with AI-powered
            automation.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl glass-card transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_60px_hsl(210_40%_70%/0.12)] animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br",
                  feature.gradient
                )}
              >
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
