import { useState, useEffect, forwardRef } from "react";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { Button } from "@/components/ui/button";
import { X, Download, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

export const PWAInstallPrompt = forwardRef<HTMLDivElement>(function PWAInstallPrompt(_, ref) {
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if user has dismissed the prompt before
    const wasDismissed = localStorage.getItem("pwa-install-dismissed");
    if (wasDismissed) {
      const dismissedAt = parseInt(wasDismissed, 10);
      // Show again after 7 days
      if (Date.now() - dismissedAt < 7 * 24 * 60 * 60 * 1000) {
        setDismissed(true);
      }
    }

    // Show prompt after a delay for better UX
    const timer = setTimeout(() => {
      setVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem("pwa-install-dismissed", Date.now().toString());
  };

  const handleInstall = async () => {
    const success = await install();
    if (success) {
      setDismissed(true);
    }
  };

  // Don't show if already installed, dismissed, or not installable
  if (isInstalled || dismissed || !isInstallable || !visible) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn(
        "fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50",
        "bg-card border border-border rounded-xl shadow-lg p-4",
        "animate-in slide-in-from-bottom-5 duration-300"
      )}
    >
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4 text-muted-foreground" />
      </button>

      <div className="flex gap-3">
        <div className="shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
          <Smartphone className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm">Install 24Twelve</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Add to your home screen for quick access
          </p>
        </div>
      </div>

      <div className="flex gap-2 mt-3">
        <Button
          variant="outline"
          size="sm"
          onClick={handleDismiss}
          className="flex-1"
        >
          Not now
        </Button>
        <Button size="sm" onClick={handleInstall} className="flex-1 gap-1">
          <Download className="w-3 h-3" />
          Install
        </Button>
      </div>
    </div>
  );
});
