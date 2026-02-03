import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import logoTransparent from "@/assets/logo-24twelve-transparent.png";
import heroLogo from "@/assets/logo-xilio-new.png";
import { CookiePreferencesModal } from "@/components/CookiePreferencesModal";
import { useUserLinks } from "@/hooks/useUserLinks";
import {
  siX,
  siInstagram,
  siYoutube,
  siFacebook,
  siGithub,
  siTiktok,
  siWhatsapp,
  siGoogleassistant,
} from "simple-icons";

// Simple Icons SVG renderer
const SimpleIcon = ({ 
  icon, 
  className 
}: { 
  icon: { path: string; title: string }; 
  className?: string 
}) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    className={cn("w-4 h-4", className)}
    fill="currentColor"
    aria-label={icon.title}
  >
    <path d={icon.path} />
  </svg>
);

// Official LinkedIn SVG path
const siLinkedin = {
  path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  title: "LinkedIn"
};

interface SocialLink {
  name: string;
  href: string;
  color: string;
  icon: { path: string; title: string };
}

const baseSocialLinks: SocialLink[] = [
  {
    name: "X",
    href: "https://x.com/24twelve",
    color: "bg-card hover:bg-muted border border-border",
    icon: siX,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/24twelve",
    color: "bg-card hover:bg-muted border border-border",
    icon: siInstagram,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/24twelve",
    color: "bg-card hover:bg-muted border border-border",
    icon: siLinkedin,
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@24twelve",
    color: "bg-card hover:bg-muted border border-border",
    icon: siYoutube,
  },
  {
    name: "Facebook",
    href: "https://facebook.com/24twelve",
    color: "bg-card hover:bg-muted border border-border",
    icon: siFacebook,
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@24twelve",
    color: "bg-card hover:bg-muted border border-border",
    icon: siTiktok,
  },
  {
    name: "GitHub",
    href: "https://github.com/24twelve",
    color: "bg-card hover:bg-muted border border-border",
    icon: siGithub,
  },
];

export function Footer() {
  const [cookieModalOpen, setCookieModalOpen] = useState(false);
  const { whatsappUrl, hasWhatsApp } = useUserLinks();

  // Build social links dynamically, adding WhatsApp only if user has configured it
  const socialLinks = useMemo(() => {
    const links = [...baseSocialLinks];
    
    if (hasWhatsApp && whatsappUrl) {
      links.push({
        name: "WhatsApp",
        href: whatsappUrl,
        color: "bg-card hover:bg-muted border border-border",
        icon: siWhatsapp,
      });
    }
    
    return links;
  }, [hasWhatsApp, whatsappUrl]);

  return (
    <>
      <footer className="py-4 border-t border-primary/10 -mt-4" style={{ backgroundColor: '#0d1a0b' }}>
        <div className="container mx-auto px-6">
          {/* Main Footer Content - All in one row on desktop */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-4">
            {/* Logo & Description */}
            <div className="lg:max-w-xs">
              <img 
                src={logoTransparent} 
                alt="24TWELVE" 
                className="h-8 w-auto dark:invert-0 invert mb-2" 
              />
              <p className="text-xs text-muted-foreground leading-relaxed">
                AI-powered agents that automate your business operations 24/7.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-wrap gap-8">
              {/* Company */}
              <div>
                <h4 className="font-semibold text-foreground text-sm mb-2">Company</h4>
                <nav className="flex flex-col gap-1.5 text-xs text-muted-foreground">
                  <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
                  <Link to="/careers" className="hover:text-foreground transition-colors">Careers</Link>
                  <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
                  <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
                  <a href="https://affiliates.24twelve.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Affiliates</a>
                </nav>
              </div>

              {/* Product */}
              <div>
                <h4 className="font-semibold text-foreground text-sm mb-2">Product</h4>
                <nav className="flex flex-col gap-1.5 text-xs text-muted-foreground">
                  <a href="/#agents" className="hover:text-foreground transition-colors">AI Agents</a>
                  <a href="/#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
                  <Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
                  <Link to="/docs" className="hover:text-foreground transition-colors">API Docs</Link>
                  <Link to="/faq" className="hover:text-foreground transition-colors">FAQ</Link>
                </nav>
              </div>

              {/* Get the App */}
              <div>
                <h4 className="font-semibold text-foreground text-sm mb-2">Get the App</h4>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex gap-2">
                    <a
                      href="https://apps.apple.com/app/24twelve"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity"
                      aria-label="Download on the App Store"
                    >
                      <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-7 w-auto" />
                    </a>
                    <a
                      href="https://play.google.com/store/apps/details?id=com.twentyfourtwelve"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity"
                      aria-label="Get it on Google Play"
                    >
                      <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-7 w-auto" />
                    </a>
                  </div>
                  <div className="flex items-center justify-center gap-12 mt-6">
                    <a
                      href="https://assistant.google.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity hover:scale-105"
                      aria-label="Try on Google Assistant"
                    >
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <svg
                          role="img"
                          viewBox="0 0 24 24"
                          className="w-7 h-7"
                          aria-label="Google Assistant"
                        >
                          <defs>
                            <linearGradient id="assistant-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#4285F4" />
                              <stop offset="25%" stopColor="#EA4335" />
                              <stop offset="50%" stopColor="#FBBC05" />
                              <stop offset="75%" stopColor="#34A853" />
                              <stop offset="100%" stopColor="#4285F4" />
                            </linearGradient>
                          </defs>
                          <path fill="url(#assistant-gradient)" d={siGoogleassistant.path} />
                        </svg>
                      </div>
                    </a>
                    <a
                      href="https://www.apple.com/siri/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity hover:scale-105"
                      aria-label="Try with Siri"
                    >
                      <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-sm overflow-hidden" style={{ background: 'linear-gradient(135deg, #FF2D55 0%, #AF52DE 25%, #5856D6 50%, #007AFF 75%, #34C759 100%)' }}>
                        <svg
                          role="img"
                          viewBox="0 0 24 24"
                          className="w-7 h-7"
                          fill="white"
                          aria-label="Siri"
                        >
                          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Centered Xiilio Logo - matching Hero style */}
          <div className="flex justify-center py-3">
            <div className="relative inline-block overflow-hidden rounded-lg" style={{ backgroundColor: '#0d1a0b' }}>
              <img 
                src={heroLogo} 
                alt="Xiilio" 
                className="h-[7rem] w-auto opacity-90 -rotate-[7deg] scale-110" 
              />
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 90% 85% at 50% 50%, transparent 0%, transparent 40%, #0d1a0b 75%, #0d1a0b 100%)'
                }}
              />
            </div>
          </div>

          {/* Social Media - Compact icons only */}
          <div className="flex flex-wrap items-center justify-center gap-2 py-3 border-t border-border/30">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full bg-card hover:bg-muted border border-border text-foreground transition-all hover:scale-110"
                aria-label={`Follow us on ${social.name}`}
              >
                <SimpleIcon icon={social.icon} className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>

          {/* Bottom Section - Copyright & Legal */}
          <div className="pt-3 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} 24Twelve. All rights reserved.</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
              <Link to="/cookies" className="hover:text-foreground transition-colors">Cookies</Link>
              <Link to="/privacy#ccpa" className="hover:text-foreground transition-colors">CCPA</Link>
            </div>
          </div>
        </div>
      </footer>

      <CookiePreferencesModal
        open={cookieModalOpen}
        onOpenChange={setCookieModalOpen}
      />
    </>
  );
}
