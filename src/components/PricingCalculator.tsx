import { useState, useMemo } from "react";
import { Calculator, Users, MessageSquare, Sparkles } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const BASE_PRICE_PER_AGENT = 25;
const PRICE_PER_1K_CONVERSATIONS = 10;
const VOICE_ADDON = 30;
const API_ADDON = 20;
const ANALYTICS_ADDON = 15;

export function PricingCalculator() {
  const [agents, setAgents] = useState(3);
  const [conversations, setConversations] = useState(5);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [apiEnabled, setApiEnabled] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  const estimate = useMemo(() => {
    const base = agents * BASE_PRICE_PER_AGENT;
    const convCost = conversations * PRICE_PER_1K_CONVERSATIONS;
    const addons =
      (voiceEnabled ? VOICE_ADDON : 0) +
      (apiEnabled ? API_ADDON : 0) +
      (analyticsEnabled ? ANALYTICS_ADDON : 0);
    return base + convCost + addons;
  }, [agents, conversations, voiceEnabled, apiEnabled, analyticsEnabled]);

  const recommendedPlan = useMemo(() => {
    if (agents <= 2 && conversations <= 1) return "Starter";
    if (agents <= 5 && conversations <= 10) return "Pro";
    return "Enterprise";
  }, [agents, conversations]);

  return (
    <div className="max-w-3xl mx-auto mt-16 mb-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4">
          <Calculator className="w-4 h-4 text-primary" />
          <span className="text-sm text-foreground/80">Pricing Calculator</span>
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
          Estimate your monthly cost
        </h2>
        <p className="text-sm text-muted-foreground">
          Adjust the sliders to see a personalized price estimate
        </p>
      </div>

      <div className="rounded-2xl border border-border/50 bg-card p-6 md:p-8 space-y-8">
        {/* Agents slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">AI Agents</span>
            </div>
            <Badge variant="outline" className="text-primary border-primary/30">
              {agents} agent{agents !== 1 ? "s" : ""}
            </Badge>
          </div>
          <Slider
            value={[agents]}
            onValueChange={(v) => setAgents(v[0])}
            min={1}
            max={20}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>1</span>
            <span>10</span>
            <span>20</span>
          </div>
        </div>

        {/* Conversations slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                Monthly Conversations
              </span>
            </div>
            <Badge variant="outline" className="text-primary border-primary/30">
              {conversations}k
            </Badge>
          </div>
          <Slider
            value={[conversations]}
            onValueChange={(v) => setConversations(v[0])}
            min={1}
            max={50}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>1k</span>
            <span>25k</span>
            <span>50k</span>
          </div>
        </div>

        {/* Add-ons */}
        <div className="space-y-4 pt-4 border-t border-border/50">
          <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Add-ons
          </h4>
          <div className="grid gap-3">
            {[
              { label: "Voice Conversations", price: VOICE_ADDON, enabled: voiceEnabled, toggle: setVoiceEnabled },
              { label: "API Access", price: API_ADDON, enabled: apiEnabled, toggle: setApiEnabled },
              { label: "Analytics Dashboard", price: ANALYTICS_ADDON, enabled: analyticsEnabled, toggle: setAnalyticsEnabled },
            ].map((addon) => (
              <div key={addon.label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={addon.enabled}
                    onCheckedChange={addon.toggle}
                  />
                  <span className="text-sm text-foreground">{addon.label}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  +${addon.price}/mo
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Result */}
        <div className="rounded-xl bg-primary/10 border border-primary/20 p-5 text-center space-y-2">
          <p className="text-sm text-muted-foreground">Estimated monthly cost</p>
          <div className="flex items-baseline justify-center gap-1">
            <span className="font-display text-4xl font-bold text-foreground">
              ${estimate}
            </span>
            <span className="text-muted-foreground">/month</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Recommended plan:{" "}
            <span
              className={cn(
                "font-semibold",
                recommendedPlan === "Pro" ? "text-primary" : "text-foreground"
              )}
            >
              {recommendedPlan}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
