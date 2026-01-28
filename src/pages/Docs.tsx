import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { 
  Search, 
  Book, 
  Code, 
  Zap, 
  Settings, 
  Shield, 
  HelpCircle,
  ArrowRight,
  ExternalLink 
} from "lucide-react";

const docCategories = [
  {
    icon: Zap,
    title: "Getting Started",
    description: "Quick start guide to set up your first AI agent in minutes.",
    links: ["Quick Start", "Installation", "First Agent", "Basic Configuration"],
  },
  {
    icon: Book,
    title: "Agent Guides",
    description: "Comprehensive guides for each AI agent and their capabilities.",
    links: ["Julia - Receptionist", "Kate - Assistant", "Halle - Legal", "All Agents →"],
  },
  {
    icon: Code,
    title: "API Reference",
    description: "Complete API documentation for developers and integrations.",
    links: ["REST API", "Webhooks", "SDKs", "Authentication"],
  },
  {
    icon: Settings,
    title: "Configuration",
    description: "Customize and configure agents to match your workflow.",
    links: ["Agent Settings", "Personality Tuning", "Workflows", "Integrations"],
  },
  {
    icon: Shield,
    title: "Security",
    description: "Security best practices and compliance documentation.",
    links: ["Data Privacy", "SOC 2 Compliance", "GDPR", "Access Control"],
  },
  {
    icon: HelpCircle,
    title: "Troubleshooting",
    description: "Common issues and solutions to keep your agents running smoothly.",
    links: ["Common Issues", "Error Codes", "Performance", "Support"],
  },
];

const popularArticles = [
  "How to integrate with Slack",
  "Setting up email automation with Arnie",
  "Customizing agent responses",
  "Understanding agent collaboration",
  "Rate limits and quotas",
];

export default function Docs() {
  return (
    <>
      <SEO
        title="Documentation"
        description="Everything you need to build, deploy, and manage your AI agents. Complete guides, API reference, and troubleshooting."
        keywords="24Twelve documentation, AI agents API, developer docs, integration guides"
        canonical="/docs"
      />
      <div className="min-h-screen bg-background">
        <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-hero border-b border-border/50">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
                <span className="text-gradient">Documentation</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Everything you need to build, deploy, and manage your AI agents
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search documentation..."
                  className="pl-12 h-12 text-lg bg-card border-border"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-4 bg-muted/30 border-b border-border/50">
          <div className="container mx-auto px-6">
            <div className="flex items-center gap-6 overflow-x-auto py-2 text-sm">
              <span className="text-muted-foreground shrink-0">Quick links:</span>
              {["Quick Start", "API Reference", "Agents Guide", "Integrations", "FAQ"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="shrink-0 text-foreground hover:text-primary transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Documentation Categories */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {docCategories.map((category) => (
                <div
                  key={category.title}
                  className="p-6 glass-card rounded-2xl hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">{category.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                  <ul className="space-y-2">
                    {category.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-sm text-primary hover:underline flex items-center gap-1"
                        >
                          {link}
                          {link.includes("→") ? null : <ArrowRight className="w-3 h-3" />}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Articles */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl font-bold mb-6">Popular Articles</h2>
              <div className="space-y-3">
                {popularArticles.map((article) => (
                  <a
                    key={article}
                    href="#"
                    className="flex items-center justify-between p-4 bg-card rounded-lg border border-border/50 hover:border-border transition-colors group"
                  >
                    <span className="font-medium">{article}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Help CTA */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-display text-2xl font-bold mb-4">Need Help?</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
              <Button variant="outline" className="gap-2">
                <ExternalLink className="w-4 h-4" />
                Join Discord Community
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <ScrollToTop />
      </div>
    </>
  );
}
