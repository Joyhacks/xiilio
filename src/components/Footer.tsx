import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo-24twelve.png";
import qrCode from "@/assets/qr-code.png";
import { CookiePreferencesModal } from "@/components/CookiePreferencesModal";

interface SocialLink {
  name: string;
  href: string;
  color: string;
  icon: React.ReactNode;
}

const socialLinks: SocialLink[] = [
  {
    name: "Twitter",
    href: "https://twitter.com/24twelve",
    color: "bg-[#1DA1F2] hover:bg-[#1a8cd8]",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com/24twelve",
    color: "bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737] hover:opacity-90",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/24twelve",
    color: "bg-[#0A66C2] hover:bg-[#094d92]",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@24twelve",
    color: "bg-[#FF0000] hover:bg-[#cc0000]",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com/24twelve",
    color: "bg-[#1877F2] hover:bg-[#1466d2]",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/24twelve",
    color: "bg-[#181717] hover:bg-[#333]",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
];

export function Footer() {
  const [cookieModalOpen, setCookieModalOpen] = useState(false);

  return (
    <>
    <footer className="py-12 glass-luxury border-t border-primary/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <img src={logo} alt="24TWELVE - AI Lead Generation Agency" className="h-10 w-auto" />
            <p className="text-sm text-muted-foreground">
              AI-powered agents that automate your business operations and drive growth.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Product</h4>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="/#agents" className="hover:text-foreground transition-colors">
                AI Agents
              </a>
              <a href="/#features" className="hover:text-foreground transition-colors">
                Features
              </a>
              <Link to="/pricing" className="hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link to="/docs" className="hover:text-foreground transition-colors">
                API Docs
              </Link>
            </nav>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Company</h4>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
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

          {/* QR Code & App Downloads */}
          <div className="space-y-4">
            <div className="flex flex-col items-center md:items-start gap-3">
              <img src={qrCode} alt="Scan to connect" className="h-20 w-20 rounded-lg" />
              <p className="text-xs text-muted-foreground">Scan to connect</p>
              
              {/* App Store Badges */}
              <div className="flex flex-col gap-2 mt-2">
                <a
                  href="https://apps.apple.com/app/24twelve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-3 py-2 bg-black rounded-lg border border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300"
                >
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-[8px] text-white/70 leading-none">Download on the</span>
                    <span className="text-sm text-white font-semibold leading-tight">App Store</span>
                  </div>
                </a>
                
                <a
                  href="https://play.google.com/store/apps/details?id=com.twentyfourtwelve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-3 py-2 bg-black rounded-lg border border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M3.609 1.814L13.792 12 3.61 22.186a2.372 2.372 0 0 1-.497-1.478V3.292c0-.534.178-1.027.496-1.478z"/>
                    <path fill="#FBBC04" d="M17.7 8.108l-3.908 3.891 3.908 3.892 4.399-2.502a2.093 2.093 0 0 0 0-3.78L17.7 8.108z"/>
                    <path fill="#4285F4" d="M3.609 1.814A2.38 2.38 0 0 1 5.024 1.5l.116.004L17.7 8.108l-3.908 3.891L3.609 1.814z"/>
                    <path fill="#34A853" d="M3.609 22.186L13.792 12l3.908 3.891L5.14 22.496l-.116.004a2.38 2.38 0 0 1-1.415-.314z"/>
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-[8px] text-white/70 leading-none">GET IT ON</span>
                    <span className="text-sm text-white font-semibold leading-tight">Google Play</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Badges */}
        <div className="py-6 border-t border-border/50">
          <p className="text-center text-sm text-muted-foreground mb-4">Follow us on social media</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105",
                  social.color
                )}
              >
                {social.icon}
                <span>{social.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-6 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright & Legal */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} 24Twelve. All rights reserved.</p>
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