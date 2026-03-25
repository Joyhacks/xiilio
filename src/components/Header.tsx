import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HeaderQuickLinks } from "@/components/HeaderQuickLinks";
import { LanguageSelector } from "@/components/LanguageSelector";
import { DigitalClock } from "@/components/DigitalClock";
import { WeatherWidget } from "@/components/WeatherWidget";
import { Link, useLocation } from "react-router-dom";
import { Menu, Home, ArrowLeft, Settings, LogOut, BarChart3, Download, LayoutDashboard, Share2 } from "lucide-react";
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
import { useUserLinks } from "@/hooks/useUserLinks";
import { AuthOverlay } from "@/components/auth/AuthOverlay";
import { siWhatsapp } from "simple-icons";
import xilioLogo from "@/assets/logo-xilio-new.png";

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
  const { whatsappUrl } = useUserLinks();

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
    
    if (isHomePage) {
      e.preventDefault();
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleSignIn = () => {
    setAuthTab('signin');
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
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-primary/10" style={{ paddingTop: 'var(--safe-area-top)', paddingLeft: 'var(--safe-area-left)', paddingRight: 'var(--safe-area-right)' }}>
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="flex items-center justify-between h-16 gap-1">
            {/* Left: Back Button + Weather Widget */}
            <div className="flex items-center gap-2 shrink-0">
              {!isHomePage && (
                <Link to="/">
                  <Button variant="ghost" size="icon" className="mr-1">
                    <ArrowLeft className="h-5 w-5" />
                    <span className="sr-only">Back to Home</span>
                  </Button>
                </Link>
              )}
              <Link to="/">
                <WeatherWidget compact />
              </Link>
            </div>

            {/* Center Clock - flex on mobile, absolute on desktop */}
            <div className="flex-1 flex justify-center min-w-0 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:flex-none">
              <div className="hidden md:block">
                <DigitalClock />
              </div>
              <div className="md:hidden">
                <DigitalClock compact />
              </div>
            </div>

            {/* Desktop: Quick Links + Share + WhatsApp + Language + Auth */}
            <div className="hidden md:flex items-center gap-1.5 shrink-0">
              <HeaderQuickLinks agentSlug={agentSlug} agentColor={agentColor} />
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: '24TWELVE - AI Agent Team',
                      text: 'Check out 24TWELVE - AI agents that automate your business!',
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-[#0EA5E9] hover:bg-[#0284C7] transition-colors"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4 text-white" />
              </button>
              <a
                href={whatsappUrl || "https://wa.me/12345678900"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-[#25D366] hover:bg-[#20BD5A] transition-colors"
                aria-label="WhatsApp"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  fill="white"
                >
                  <path d={siWhatsapp.path} />
                </svg>
              </a>
              <LanguageSelector />
              
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

            {/* Mobile: Share + WhatsApp only (nav moved to bottom bar) */}
            <div className="flex md:hidden items-center gap-1.5 shrink-0">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: '24TWELVE - AI Agent Team',
                      text: 'Check out 24TWELVE - AI agents that automate your business!',
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-[#0EA5E9] transition-colors"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4 text-white" />
              </button>
              <a
                href={whatsappUrl || "https://wa.me/12345678900"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-[#25D366] transition-colors"
                aria-label="WhatsApp"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="white"
                >
                  <path d={siWhatsapp.path} />
                </svg>
              </a>
            </div>

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

                    <nav className="flex-1 py-6 px-4">
                      <div className="space-y-1">
                        <SheetClose asChild>
                          <Link
                            to="/"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:bg-primary/10 transition-colors"
                          >
                            <Home className="h-5 w-5 text-primary" />
                            <span className="font-medium">Home</span>
                          </Link>
                        </SheetClose>

                        {navLinks.map((link, index) => (
                          <SheetClose asChild key={link.href}>
                            {link.isHash ? (
                              <a
                                href={link.href}
                                onClick={(e) => {
                                  handleSmoothScroll(e, link.href);
                                  setTimeout(() => setIsOpen(false), 150);
                                }}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200"
                                style={{ animationDelay: `${(index + 1) * 50}ms` }}
                              >
                                <span>{link.label}</span>
                              </a>
                            ) : (
                              <Link
                                to={link.href}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200"
                                style={{ animationDelay: `${(index + 1) * 50}ms` }}
                              >
                                <span>{link.label}</span>
                              </Link>
                            )}
                          </SheetClose>
                        ))}

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
                            onClick={handleSignIn}
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
