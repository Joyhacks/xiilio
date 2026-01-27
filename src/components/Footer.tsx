import logo from "@/assets/logo-24twelve.png";
import qrCode from "@/assets/qr-code.png";

export function Footer() {
  return (
    <footer className="py-12 bg-card border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} alt="24TWELVE - AI Lead Generation Agency" className="h-10 w-auto" />
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Contact
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Status
            </a>
          </nav>

          {/* QR Code */}
          <div className="flex flex-col items-center gap-2">
            <img src={qrCode} alt="Scan to connect" className="h-20 w-20 rounded-lg" />
            <p className="text-xs text-muted-foreground">Scan to connect</p>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2025 24Twelve. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
