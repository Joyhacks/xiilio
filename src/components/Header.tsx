import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HeaderQuickLinks } from "@/components/HeaderQuickLinks";
import { LanguageSelector } from "@/components/LanguageSelector";
import { DigitalClock } from "@/components/DigitalClock";
import { WeatherWidget } from "@/components/WeatherWidget";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Settings, LogOut, BarChart3, LayoutDashboard, Share2 } from "lucide-react";
import { NotificationCenter } from "@/components/NotificationCenter";
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
import { siWhatsapp } from "@/lib/simpleIcons";
import { toast } from "sonner";

const SHARE_PAYLOAD = {
  title: "Xiilio — AI Agent Team",
  text: "Check out Xiilio — AI agents that automate your business!",
};

async function handleShare() {
  const url = window.location.href;
  try {
    if (navigator.share) {
      await navigator.share({ ...SHARE_PAYLOAD, url });
      return;
    }
    await navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  } catch (err: any) {
    if (err?.name === "AbortError") return;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Could not share link");
    }
  }
}

interface HeaderProps {
  agentSlug?: string | null;
  agentColor?: string;
}

export function Header({ agentSlug = null, agentColor }: HeaderProps) {
  const [showAuthOverlay, setShowAuthOverlay] = useState(false);
  const [authTab, setAuthTab] = useState<'signin' | 'signup'>('signin');
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { user, isAuthenticated, signOut } = useAuth();
  const { whatsappUrl } = useUserLinks();

  const handleSignIn = () => {
    setAuthTab('signin');
    setShowAuthOverlay(true);
  };

  const handleSignOut = async () => {
    await signOut();
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
                  <Button variant="ghost" size="icon" className="mr-1 min-h-0">
                    <ArrowLeft className="h-5 w-5" />
                    <span className="sr-only">Back to Home</span>
                  </Button>
                </Link>
              )}
              <Link to="/" className="hidden sm:block">
                <WeatherWidget compact />
              </Link>
            </div>

            {/* Center Clock */}
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
                onClick={handleShare}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-[#0EA5E9] transition-colors hover:bg-[#0284C7]"
                aria-label="Share link"
                title="Share this page"
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
                <svg role="img" viewBox="0 0 24 24" className="w-5 h-5" fill="white">
                  <path d={siWhatsapp.path} />
                </svg>
              </a>
              <LanguageSelector />
              <NotificationCenter />

              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full min-h-0">
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
                <Button variant="ghost" size="sm" onClick={handleSignIn} className="min-h-0">
                  Sign In
                </Button>
              )}
            </div>

            {/* Mobile: Notification + Share + WhatsApp + Sign-in */}
            <div className="flex md:hidden items-center gap-1.5 shrink-0">
              <NotificationCenter />
              <button
                onClick={handleShare}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-[#0EA5E9] transition-colors active:bg-[#0284C7]"
                aria-label="Share link"
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
                <svg role="img" viewBox="0 0 24 24" className="w-4 h-4" fill="white">
                  <path d={siWhatsapp.path} />
                </svg>
              </a>
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full min-h-0 w-9 h-9">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback className="bg-primary/20 text-primary text-[10px]">
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
                <Button variant="ghost" size="icon" onClick={handleSignIn} className="min-h-0 w-9 h-9 text-xs">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-muted text-muted-foreground text-[10px]">
                      IN
                    </AvatarFallback>
                  </Avatar>
                </Button>
              )}
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
