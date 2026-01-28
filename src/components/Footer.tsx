import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo-24twelve.png";
import { CookiePreferencesModal } from "@/components/CookiePreferencesModal";
import {
  siX,
  siInstagram,
  siYoutube,
  siFacebook,
  siGithub,
  siTiktok,
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

const socialLinks: SocialLink[] = [
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

  return (
    <>
      <footer className="py-16 glass-luxury border-t border-primary/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Logo & Description */}
            <div className="space-y-4">
              <img 
                src={logo} 
                alt="24TWELVE - AI Lead Generation Agency" 
                className="h-12 w-auto" 
              />
              <p className="text-sm text-muted-foreground leading-relaxed">
                AI-powered agents that automate your business operations and drive growth around the clock.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground text-lg">Product</h4>
              <nav className="flex flex-col gap-3 text-sm text-muted-foreground">
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
                <Link to="/install" className="hover:text-foreground transition-colors flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Install App
                </Link>
              </nav>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground text-lg">Company</h4>
              <nav className="flex flex-col gap-3 text-sm text-muted-foreground">
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
              </nav>
            </div>

            {/* App Downloads */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground text-lg">Get the App</h4>
              <div className="flex flex-col gap-3">
                <a
                  href="https://apps.apple.com/app/24twelve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-4 py-3 bg-black text-white rounded-xl border border-white/20 hover:bg-black/90 hover:scale-[1.02] transition-all duration-300"
                  aria-label="Download on the App Store"
                >
                  <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] text-white/70 leading-none">Download on the</span>
                    <span className="text-sm font-semibold leading-tight">App Store</span>
                  </div>
                </a>
                
                <a
                  href="https://play.google.com/store/apps/details?id=com.twentyfourtwelve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-4 py-3 bg-black text-white rounded-xl border border-white/20 hover:bg-black/90 hover:scale-[1.02] transition-all duration-300"
                  aria-label="Get it on Google Play"
                >
                  <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M3.609 1.814L13.792 12 3.61 22.186a2.372 2.372 0 0 1-.497-1.478V3.292c0-.534.178-1.027.496-1.478z"/>
                    <path fill="#FBBC04" d="M17.7 8.108l-3.908 3.891 3.908 3.892 4.399-2.502a2.093 2.093 0 0 0 0-3.78L17.7 8.108z"/>
                    <path fill="#4285F4" d="M3.609 1.814A2.38 2.38 0 0 1 5.024 1.5l.116.004L17.7 8.108l-3.908 3.891L3.609 1.814z"/>
                    <path fill="#34A853" d="M3.609 22.186L13.792 12l3.908 3.891L5.14 22.496l-.116.004a2.38 2.38 0 0 1-1.415-.314z"/>
                  </svg>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] text-white/70 leading-none uppercase tracking-wider">Get it on</span>
                    <span className="text-sm font-semibold leading-tight">Google Play</span>
                  </div>
                </a>
              </div>
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
              <button
                onClick={() => setCookieModalOpen(true)}
                className="hover:text-foreground transition-colors"
              >
                Cookie Settings
              </button>
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
