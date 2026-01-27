import { Button } from "@/components/ui/button";
import { HeaderQuickLinks } from "@/components/HeaderQuickLinks";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-24twelve-transparent.png";

interface HeaderProps {
  agentSlug?: string | null;
  agentColor?: string;
}

export function Header({ agentSlug = null, agentColor }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} alt="24TWELVE - AI Lead Generation Agency" className="h-10 w-auto" />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#agents"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Agents
            </a>
            <a
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <Link
              to="/pricing"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              to="/docs"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Docs
            </Link>
          </nav>

          {/* CTA + Quick Links + Theme Toggle */}
          <div className="flex items-center gap-2">
            <HeaderQuickLinks agentSlug={agentSlug} agentColor={agentColor} />
            <ThemeToggle />
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Sign In
            </Button>
            <Link to="/pricing">
              <Button variant="hero" size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
