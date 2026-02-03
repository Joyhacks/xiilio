import { DigitalClock } from "@/components/DigitalClock";
import { WeatherWidget } from "@/components/WeatherWidget";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface HeaderProps {
  agentSlug?: string | null;
  agentColor?: string;
}

export function Header({ agentSlug = null, agentColor }: HeaderProps) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-primary/10">
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="flex items-center justify-between h-16">
          {/* Left: Back Button + Weather Widget */}
          <div className="flex items-center gap-2">
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

          {/* Absolutely Centered Clock */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="hidden md:block">
              <DigitalClock />
            </div>
            <div className="md:hidden">
              <DigitalClock compact />
            </div>
          </div>

          {/* Right: Empty space for balance */}
          <div className="w-[100px]" />
        </div>
      </div>
    </header>
  );
}
