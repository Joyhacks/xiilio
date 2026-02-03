import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavMenuProps {
  className?: string;
}

export function NavMenu({ className }: NavMenuProps) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

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

  return (
    <div className={cn("glass-card rounded-xl p-3 md:p-4", className)}>
      <nav className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
        {navLinks.map((link) =>
          link.isHash ? (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {link.label}
            </a>
          ) : (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {link.label}
            </Link>
          )
        )}
      </nav>
    </div>
  );
}
