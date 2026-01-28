import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HeaderQuickLinks } from "@/components/HeaderQuickLinks";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, ArrowLeft, Settings, LogOut, User, BarChart3, Download, LayoutDashboard } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { AuthOverlay } from "@/components/auth/AuthOverlay";
import logo from "@/assets/logo-24twelve-transparent.png";

interface HeaderProps {
  agentSlug?: string | null;
  agentColor?: string;
}

export function Header({ agentSlug = null, agentColor }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthOverlay, setShowAuthOverlay] = useState(false);
  const [authTab, setAuthTab] = useState<'signin' | 'signup'>('signin');
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { user, isAuthenticated, signOut } = useAuth();

  const navLinks = [
    { href: "/#agents", label: "Agents", isHash: true },
    { href: "/#how-it-works", label: "How It Works", isHash: true },
    { href: "/#faq", label: "FAQ", isHash: true },
    { href: "/pricing", label: "Pricing", isHash: false },
    { href: "/docs", label: "Docs", isHash: false },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const hash = href.split('#')[1];
    if (!hash) return;
    
    // If we're on the home page, prevent default and scroll smoothly
    if (isHomePage) {
      e.preventDefault();
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    // If not on home page, the default behavior (navigation) will occur
  };

  const handleSignIn = () => {
    setAuthTab('signin');
    setShowAuthOverlay(true);
  };

  const handleGetStarted = () => {
    if (isAuthenticated) {
      // Already signed in, go to pricing
      return;
    }
    setAuthTab('signup');
    setShowAuthOverlay(true);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  const userInitials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.slice(0, 2).toUpperCase() || 'U';

  return (
    <>
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
              {navLinks.map((link) =>
                link.isHash ? (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
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

            {/* Desktop CTA + Quick Links + Theme Toggle + Language */}
            <div className="hidden md:flex items-center gap-2">
              <HeaderQuickLinks agentSlug={agentSlug} agentColor={agentColor} />
              <LanguageSelector />
              <ThemeToggle />
              
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/20 text-primary text-xs">
                          {userInitials}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium text-foreground">
                        {user?.user_metadata?.full_name || 'User'}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user?.email}
                      </p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="flex items-center gap-2">
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/analytics" className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Analytics
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" size="sm" onClick={handleSignIn}>
                  Sign In
                </Button>
              )}
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

                    {/* User Info (if authenticated) */}
                    {isAuthenticated && (
                      <div className="p-4 border-b border-primary/10">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary/20 text-primary">
                              {userInitials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground truncate">
                              {user?.user_metadata?.full_name || 'User'}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {user?.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

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
                                onClick={(e) => handleSmoothScroll(e, link.href)}
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

                        {/* Install App Link */}
                        <SheetClose asChild>
                          <Link
                            to="/install"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                          >
                            <Download className="h-5 w-5" />
                            <span>Install App</span>
                          </Link>
                        </SheetClose>

                        {isAuthenticated && (
                          <>
                            <SheetClose asChild>
                              <Link
                                to="/dashboard"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                              >
                                <LayoutDashboard className="h-5 w-5" />
                                <span>Dashboard</span>
                              </Link>
                            </SheetClose>
                            <SheetClose asChild>
                              <Link
                                to="/analytics"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                              >
                                <BarChart3 className="h-5 w-5" />
                                <span>Analytics</span>
                              </Link>
                            </SheetClose>
                            <SheetClose asChild>
                              <Link
                                to="/settings"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                              >
                                <Settings className="h-5 w-5" />
                                <span>Settings</span>
                              </Link>
                            </SheetClose>
                          </>
                        )}
                      </div>
                    </nav>

                    {/* Mobile Menu Footer */}
                    <div className="p-4 border-t border-primary/10 space-y-3">
                      {isAuthenticated ? (
                        <SheetClose asChild>
                          <Button 
                            variant="ghost" 
                            className="w-full justify-center text-destructive hover:text-destructive"
                            onClick={handleSignOut}
                          >
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign Out
                          </Button>
                        </SheetClose>
                      ) : (
                        <SheetClose asChild>
                          <Button 
                            variant="ghost" 
                            className="w-full justify-center"
                            onClick={() => {
                              setIsOpen(false);
                              handleSignIn();
                            }}
                          >
                            Sign In
                          </Button>
                        </SheetClose>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <AuthOverlay
        isOpen={showAuthOverlay}
        onClose={() => setShowAuthOverlay(false)}
        defaultTab={authTab}
      />
    </>
  );
}
