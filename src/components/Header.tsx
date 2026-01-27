import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HeaderQuickLinks } from "@/components/HeaderQuickLinks";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, ArrowLeft } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import logo from "@/assets/logo-24twelve-transparent.png";

interface HeaderProps {
  agentSlug?: string | null;
  agentColor?: string;
}

export function Header({ agentSlug = null, agentColor }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const navLinks = [
    { href: "/#agents", label: "Agents", isHash: true },
    { href: "/#features", label: "Features", isHash: true },
    { href: "/pricing", label: "Pricing", isHash: false },
    { href: "/docs", label: "Docs", isHash: false },
    { href: "/about", label: "About", isHash: false },
    { href: "/contact", label: "Contact", isHash: false },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-primary/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Back/Home Button + Logo */}
          <div className="flex items-center gap-2">
            {!isHomePage && (
              <Link to="/">
                <Button variant="ghost" size="icon" className="mr-1">
                  <ArrowLeft className="h-5 w-5" />
                  <span className="sr-only">Back to Home</span>
                </Button>
              </Link>
            )}
            <Link to="/" className="flex items-center">
              <img src={logo} alt="24TWELVE - AI Lead Generation Agency" className="h-10 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.slice(0, 4).map((link) =>
              link.isHash ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA + Quick Links + Theme Toggle */}
          <div className="hidden md:flex items-center gap-2">
            <HeaderQuickLinks agentSlug={agentSlug} agentColor={agentColor} />
            <ThemeToggle />
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Link to="/pricing">
              <Button variant="hero" size="sm">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] glass-luxury p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile Menu Header */}
                  <div className="flex items-center justify-between p-4 border-b border-primary/10">
                    <Link to="/" onClick={() => setIsOpen(false)}>
                      <img src={logo} alt="24TWELVE" className="h-8 w-auto" />
                    </Link>
                  </div>

                  {/* Mobile Navigation Links */}
                  <nav className="flex-1 py-6 px-4">
                    <div className="space-y-1">
                      {/* Home Link */}
                      <SheetClose asChild>
                        <Link
                          to="/"
                          className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:bg-primary/10 transition-colors"
                        >
                          <Home className="h-5 w-5 text-primary" />
                          <span className="font-medium">Home</span>
                        </Link>
                      </SheetClose>

                      {navLinks.map((link) => (
                        <SheetClose asChild key={link.href}>
                          {link.isHash ? (
                            <a
                              href={link.href}
                              className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                            >
                              <span>{link.label}</span>
                            </a>
                          ) : (
                            <Link
                              to={link.href}
                              className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                            >
                              <span>{link.label}</span>
                            </Link>
                          )}
                        </SheetClose>
                      ))}
                    </div>
                  </nav>

                  {/* Mobile Menu Footer */}
                  <div className="p-4 border-t border-primary/10 space-y-3">
                    <SheetClose asChild>
                      <Button variant="ghost" className="w-full justify-center">
                        Sign In
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/pricing" className="block">
                        <Button variant="hero" className="w-full">
                          Get Started
                        </Button>
                      </Link>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
