import { Link, useLocation } from "react-router-dom";
import { Home, Users, CreditCard, BookOpen, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/#agents", label: "Agents", icon: Users, isHash: true },
  { href: "/pricing", label: "Pricing", icon: CreditCard },
  { href: "/docs", label: "Docs", icon: BookOpen },
  { href: "/settings", label: "More", icon: Settings },
];

export function BottomNav() {
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    if (href.startsWith("/#")) return location.pathname === "/" && location.hash === `#${href.split("#")[1]}`;
    return location.pathname === href;
  };

  const handleClick = (e: React.MouseEvent, item: typeof navItems[0]) => {
    if (item.isHash && location.pathname === "/") {
      e.preventDefault();
      const hash = item.href.split("#")[1];
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
      style={{ paddingBottom: "var(--safe-area-bottom)" }}
    >
      <div className="flex items-stretch justify-around">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          const content = (
            <div className={cn(
              "flex flex-col items-center justify-center gap-0.5 min-h-[56px] w-full px-1 transition-colors",
              active ? "text-primary" : "text-muted-foreground"
            )}>
              <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 2} />
              <span className="text-[10px] font-medium leading-none">{item.label}</span>
              {active && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-b-full bg-primary" />
              )}
            </div>
          );

          if (item.isHash) {
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleClick(e, item)}
                className="relative flex-1"
              >
                {content}
              </a>
            );
          }

          return (
            <Link key={item.href} to={item.href} className="relative flex-1">
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
