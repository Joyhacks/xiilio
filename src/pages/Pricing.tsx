import { Check, Zap, Crown, Building2, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  description: string;
  price: string;
  period: string;
  icon: React.ReactNode;
  features: PlanFeature[];
  cta: string;
  popular?: boolean;
  color: string;
}

const plans: PricingPlan[] = [
  {
    name: "Starter",
    description: "Perfect for small teams getting started with AI automation",
    price: "$49",
    period: "/month",
    icon: <Zap className="w-6 h-6" />,
    color: "primary",
    cta: "Start Free Trial",
    features: [
      { text: "2 AI Agents included", included: true },
      { text: "1,000 conversations/month", included: true },
      { text: "Basic chat interface", included: true },
      { text: "Email support", included: true },
      { text: "Content generation", included: true },
      { text: "Standard response times", included: true },
      { text: "Voice conversations", included: false },
      { text: "Custom agent training", included: false },
      { text: "API access", included: false },
      { text: "Priority support", included: false },
    ],
  },
  {
    name: "Pro",
    description: "For growing businesses that need advanced AI capabilities",
    price: "$149",
    period: "/month",
    icon: <Crown className="w-6 h-6" />,
    color: "secondary",
    cta: "Start Free Trial",
    popular: true,
    features: [
      { text: "5 AI Agents included", included: true },
      { text: "10,000 conversations/month", included: true },
      { text: "Advanced chat & voice", included: true },
      { text: "Priority email support", included: true },
      { text: "Content generation & SEO", included: true },
      { text: "Fast response times", included: true },
      { text: "Voice conversations", included: true },
      { text: "Basic agent customization", included: true },
      { text: "API access", included: true },
      { text: "Analytics dashboard", included: true },
    ],
  },
  {
    name: "Enterprise",
    description: "Custom solutions for large organizations with complex needs",
    price: "Custom",
    period: "",
    icon: <Building2 className="w-6 h-6" />,
    color: "accent",
    cta: "Contact Sales",
    features: [
      { text: "Unlimited AI Agents", included: true },
      { text: "Unlimited conversations", included: true },
      { text: "Full omnichannel support", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "Advanced content & analytics", included: true },
      { text: "Instant response times", included: true },
      { text: "Voice & video support", included: true },
      { text: "Full custom training", included: true },
      { text: "Full API & webhooks", included: true },
      { text: "SSO & compliance", included: true },
    ],
  },
];

const agentCapabilities = [
  {
    category: "Content Creation",
    items: [
      "Generate engaging post ideas for product launches",
      "Draft compelling captions and copy",
      "Create SEO-optimized blog content",
      "Develop content calendars",
    ],
  },
  {
    category: "Engagement & Analytics",
    items: [
      "Monitor and respond to comments",
      "Track engagement metrics",
      "Analyze campaign performance",
      "Provide audience insights",
    ],
  },
  {
    category: "Automation & Scheduling",
    items: [
      "Schedule posts at optimal times",
      "Automate routine tasks",
      "Manage publishing workflows",
      "Handle crisis communications",
    ],
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
            Pricing Plans
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Choose the perfect plan for your team
          </h1>
          <p className="text-lg text-muted-foreground">
            Scale your business with AI-powered agents. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative rounded-2xl border bg-card p-8 transition-all duration-300",
                plan.popular
                  ? "border-primary shadow-[0_0_40px_hsl(var(--primary)/0.2)] scale-105"
                  : "border-border/50 hover:border-primary/50"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={cn("p-2 rounded-lg", `bg-${plan.color}/20 text-${plan.color}`)}>
                  {plan.icon}
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground">
                  {plan.name}
                </h3>
              </div>

              <p className="text-muted-foreground text-sm mb-6 min-h-[40px]">
                {plan.description}
              </p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-display text-4xl font-bold text-foreground">
                  {plan.price}
                </span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>

              <Button
                className="w-full mb-8 gap-2"
                variant={plan.popular ? "default" : "outline"}
                size="lg"
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </Button>

              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div
                    key={feature.text}
                    className="flex items-center gap-3 text-sm"
                  >
                    <Check
                      className={cn(
                        "w-4 h-4 shrink-0",
                        feature.included ? "text-primary" : "text-muted-foreground/30"
                      )}
                    />
                    <span
                      className={cn(
                        feature.included
                          ? "text-foreground"
                          : "text-muted-foreground/50 line-through"
                      )}
                    >
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Capabilities Section */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              What our AI agents can do
            </h2>
            <p className="text-muted-foreground">
              Powerful capabilities across all plans to supercharge your workflow
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {agentCapabilities.map((category) => (
              <div
                key={category.category}
                className="p-6 rounded-xl bg-muted/30 border border-border/50"
              >
                <h3 className="font-semibold text-foreground mb-4">
                  {category.category}
                </h3>
                <ul className="space-y-2">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-gradient-card border border-border/50">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Not sure which plan is right for you?
            </h2>
            <p className="text-muted-foreground mb-6">
              Talk to our team and we'll help you find the perfect solution for your business needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" size="lg">
                Compare Plans
              </Button>
              <Button size="lg" className="gap-2">
                Contact Sales
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
