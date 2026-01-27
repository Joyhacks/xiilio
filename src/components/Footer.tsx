import { Twitter, Instagram, Linkedin, Youtube, Facebook, Github } from "lucide-react";
import logo from "@/assets/logo-24twelve.png";
import qrCode from "@/assets/qr-code.png";

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/24twelve", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com/24twelve", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/company/24twelve", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com/@24twelve", label: "YouTube" },
  { icon: Facebook, href: "https://facebook.com/24twelve", label: "Facebook" },
  { icon: Github, href: "https://github.com/24twelve", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="py-12 bg-card border-t border-border/50">
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
              <a href="#agents" className="hover:text-foreground transition-colors">
                AI Agents
              </a>
              <a href="#features" className="hover:text-foreground transition-colors">
                Features
              </a>
              <a href="/pricing" className="hover:text-foreground transition-colors">
                Pricing
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                API Docs
              </a>
            </nav>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Company</h4>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                About Us
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Careers
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Blog
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Contact
              </a>
            </nav>
          </div>

          {/* QR Code & Social */}
          <div className="space-y-4">
            <div className="flex flex-col items-center md:items-start gap-2">
              <img src={qrCode} alt="Scan to connect" className="h-20 w-20 rounded-lg" />
              <p className="text-xs text-muted-foreground">Scan to connect</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright & Legal */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <p>© 2025 24Twelve. All rights reserved.</p>
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Status
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-300"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
