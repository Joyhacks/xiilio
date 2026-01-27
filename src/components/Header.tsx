import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-24twelve.png";

export function Header() {
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
            <a
              href="#pricing"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </a>
            <a
              href="#docs"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Docs
            </a>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button variant="hero" size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
