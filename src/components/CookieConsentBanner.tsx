import { useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, Settings, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useConsentManager, ConsentPreferences } from "@/hooks/useConsentManager";

export const CookieConsentBanner = forwardRef<HTMLDivElement>(function CookieConsentBanner(_, ref) {
  const {
    preferences,
    hasConsented,
    isLoading,
    acceptAll,
    acceptNecessaryOnly,
    updatePreferences,
  } = useConsentManager();

  const [showDetails, setShowDetails] = useState(false);
  const [tempPrefs, setTempPrefs] = useState<ConsentPreferences>({
    ...preferences,
    marketing: preferences.marketing ?? false,
  });

  // Don't render if already consented or still loading
  if (isLoading || hasConsented) {
    return null;
  }

  const handleSavePreferences = () => {
    updatePreferences(tempPrefs);
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed bottom-16 md:bottom-0 left-0 right-0 z-50 p-4 md:p-6"
      >
        <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
          {/* Main banner */}
          <div className="p-4 md:p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/10 shrink-0">
                <Cookie className="w-6 h-6 text-primary" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  We value your privacy
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We use cookies to enhance your browsing experience, analyze site traffic, 
                  and personalize content. By clicking "Accept All", you consent to our use 
                  of cookies in accordance with our{" "}
                  <a href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <Button
                onClick={acceptAll}
                className="bg-primary hover:bg-primary/90"
              >
                Accept All
              </Button>
              <Button
                variant="outline"
                onClick={acceptNecessaryOnly}
              >
                Necessary Only
              </Button>
              <Button
                variant="ghost"
                onClick={() => setShowDetails(!showDetails)}
                className="gap-2"
              >
                <Settings className="w-4 h-4" />
                Manage Preferences
              </Button>
            </div>
          </div>

          {/* Expanded preferences panel */}
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="border-t border-border overflow-hidden"
              >
                <div className="p-4 md:p-6 space-y-4 bg-muted/30">
                  {/* Necessary cookies */}
                  <div className="flex items-center justify-between p-4 rounded-lg bg-background border border-border">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-primary" />
                      <div>
                        <Label className="font-medium">Essential Cookies</Label>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Required for basic site functionality. Cannot be disabled.
                        </p>
                      </div>
                    </div>
                    <Switch checked disabled />
                  </div>

                  {/* Analytics cookies */}
                  <div className="flex items-center justify-between p-4 rounded-lg bg-background border border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent/30 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                      </div>
                      <div>
                        <Label className="font-medium">Analytics Cookies</Label>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Help us understand how you use our site to improve your experience.
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={tempPrefs.analytics}
                      onCheckedChange={(checked) =>
                        setTempPrefs({ ...tempPrefs, analytics: checked })
                      }
                    />
                  </div>

                  {/* Functional cookies */}
                  <div className="flex items-center justify-between p-4 rounded-lg bg-background border border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-secondary/30 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-secondary" />
                      </div>
                      <div>
                        <Label className="font-medium">Functional Cookies</Label>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Enable personalized features and remember your preferences.
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={tempPrefs.functional}
                      onCheckedChange={(checked) =>
                        setTempPrefs({ ...tempPrefs, functional: checked })
                      }
                    />
                  </div>

                  {/* Marketing cookies */}
                  <div className="flex items-center justify-between p-4 rounded-lg bg-background border border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/30 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <div>
                        <Label className="font-medium">Marketing Cookies</Label>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Used for targeted advertising and measuring campaign effectiveness.
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={tempPrefs.marketing}
                      onCheckedChange={(checked) =>
                        setTempPrefs({ ...tempPrefs, marketing: checked })
                      }
                    />
                  </div>

                  {/* Save preferences */}
                  <div className="flex justify-end pt-2">
                    <Button onClick={handleSavePreferences}>
                      Save Preferences
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
});
