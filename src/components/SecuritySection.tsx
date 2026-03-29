import { Shield, Lock, Eye, Server, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";

const securityFeatures = [
  {
    icon: Shield,
    title: "GDPR Compliant",
    description: "Full data protection compliance across EU and international regulations.",
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "All data encrypted in transit and at rest with AES-256 standards.",
  },
  {
    icon: Eye,
    title: "Privacy First",
    description: "User data is never sold or shared. Complete transparency in data handling.",
  },
  {
    icon: Server,
    title: "SOC 2 Compliant",
    description: "Enterprise-grade infrastructure with continuous security monitoring.",
  },
];

export function SecuritySection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.05 });

  return (
    <section className="relative py-12 md:py-24 bg-background">
      <div className="relative container mx-auto px-6">
        <div
          ref={headerRef}
          className={cn(
            "text-center mb-16 transition-all duration-700 ease-out",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-primary font-medium mb-4">
            Platform & Security
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Enterprise-Grade{" "}
            <span className="text-gradient">Security</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Built on a secure foundation so your data and your clients' data stay protected at every layer.
          </p>
          <Button variant="outline" size="lg" asChild>
            <a href="/docs/security-compliance-guide.pdf" download>
              <Download className="w-5 h-5 mr-2" />
              Download Security & Compliance Guide
            </a>
          </Button>
        </div>

        <div
          ref={gridRef}
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto transition-all duration-700 ease-out delay-150",
            gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}
        >
          {securityFeatures.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-primary/10">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2 uppercase tracking-wide">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
