import { useState, useEffect, useCallback } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

interface UsePWAInstallReturn {
  isInstallable: boolean;
  isInstalled: boolean;
  isIOS: boolean;
  install: () => Promise<boolean>;
}

export function usePWAInstall(): UsePWAInstallReturn {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  // Check if running on iOS
  const isIOS = typeof window !== "undefined" && 
    /iPad|iPhone|iPod/.test(navigator.userAgent) && 
    !(window as any).MSStream;

  useEffect(() => {
    // Check if already installed
    const checkInstalled = () => {
      const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
      const isInWebApp = (navigator as any).standalone === true;
      setIsInstalled(isStandalone || isInWebApp);
    };

    checkInstalled();

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    // Listen for successful install
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const install = useCallback(async (): Promise<boolean> => {
    if (!installPrompt) return false;

    try {
      await installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      
      if (outcome === "accepted") {
        setInstallPrompt(null);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Install prompt error:", error);
      return false;
    }
  }, [installPrompt]);

  return {
    isInstallable: !!installPrompt,
    isInstalled,
    isIOS,
    install,
  };
}
