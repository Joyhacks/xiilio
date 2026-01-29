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
      <footer className="py-2 bg-muted/30 border-t border-border/50">
        <div className="container mx-auto px-4">
          {/* Compact single-row layout */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Logo + Copyright */}
            <div className="flex items-center gap-3">
              <img 
                src={logoTransparent} 
                alt="24TWELVE" 
                className="h-5 w-auto dark:invert-0 invert" 
              />
              <span className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} 24Twelve
              </span>
            </div>

            {/* Navigation Links - Inline */}
            <nav className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
              <Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
              <Link to="/docs" className="hover:text-foreground transition-colors">Docs</Link>
              <Link to="/faq" className="hover:text-foreground transition-colors">FAQ</Link>
              <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
              <span className="text-border">|</span>
              <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            </nav>

            {/* Social Icons - Compact */}
            <div className="flex items-center gap-2">
              {socialLinks.slice(0, 5).map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-full text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <SimpleIcon icon={social.icon} className="w-3.5 h-3.5" />
                </a>
              ))}
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
