import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import logoTransparent from "@/assets/logo-24twelve-transparent.png";
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
      <footer className="py-16 glass-luxury border-t border-primary/10">
        <div className="container mx-auto px-6">
        {/* Logo & Description */}
        <div className="text-center mb-10">
          <img 
            src={logoTransparent} 
            alt="24TWELVE - AI Lead Generation Agency" 
            className="h-12 w-auto mx-auto dark:invert-0 invert mb-4" 
          />
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
            AI-powered agents that automate your business operations and drive growth around the clock.
          </p>
        </div>

        {/* Company & Product Side-by-Side */}
        <div className="flex flex-wrap justify-center gap-16 mb-10">
          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-lg text-center">Company</h4>
            <nav className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
              <Link to="/about" className="hover:text-foreground transition-colors">
                About Us
              </Link>
              <Link to="/careers" className="hover:text-foreground transition-colors">
                Careers
              </Link>
              <Link to="/blog" className="hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link to="/contact" className="hover:text-foreground transition-colors">
                Contact
              </Link>
              <a 
                href="https://affiliates.24twelve.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Affiliates
              </a>
            </nav>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-lg text-center">Product</h4>
            <nav className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
              <a href="/#agents" className="hover:text-foreground transition-colors">
                AI Agents
              </a>
              <a href="/#how-it-works" className="hover:text-foreground transition-colors">
                How It Works
              </a>
              <Link to="/pricing" className="hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link to="/docs" className="hover:text-foreground transition-colors">
                API Docs
              </Link>
              <Link to="/faq" className="hover:text-foreground transition-colors">
                FAQ
              </Link>
            </nav>
          </div>
        </div>

        {/* Get the App - Centered */}
        <div className="text-center mb-10">
          <h4 className="font-semibold text-foreground text-lg mb-4">Get the App</h4>
          <div className="flex flex-wrap justify-center gap-3">
            {/* App Store Badge */}
            <a
              href="https://apps.apple.com/app/24twelve"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center hover:opacity-80 transition-opacity"
              aria-label="Download on the App Store"
            >
              <img 
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                alt="Download on the App Store" 
                className="h-10 w-auto"
              />
            </a>
            
            {/* Google Play Badge */}
            <a
              href="https://play.google.com/store/apps/details?id=com.twentyfourtwelve"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center hover:opacity-80 transition-opacity"
              aria-label="Get it on Google Play"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                alt="Get it on Google Play" 
                className="h-10 w-auto"
              />
            </a>
          </div>
        </div>

          {/* Social Media Badges */}
          <div className="py-8 border-t border-border/50">
            <p className="text-center text-sm text-muted-foreground mb-6">Follow us on social media</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-full text-foreground text-sm font-medium",
                    "transition-all duration-300 hover:scale-105",
                    social.color
                  )}
                  aria-label={`Follow us on ${social.name}`}
                >
                  <SimpleIcon icon={social.icon} />
                  <span>{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright & Legal */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} 24Twelve. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link to="/cookies" className="hover:text-foreground transition-colors">
                Cookie Settings
              </Link>
              <Link to="/privacy#ccpa" className="hover:text-foreground transition-colors">
                Do Not Sell My Info
              </Link>
              <Link to="/contact" className="hover:text-foreground transition-colors">
                Contact
              </Link>
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
