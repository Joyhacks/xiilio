import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, Shield, BarChart3, Sparkles, Megaphone, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useConsentManager, ConsentPreferences } from "@/hooks/useConsentManager";
import { cn } from "@/lib/utils";

interface CookiePreferencesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CookieCategoryProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  alwaysOn?: boolean;
}

function CookieCategory({
  icon,
  title,
  description,
  checked,
  disabled,
  onCheckedChange,
  alwaysOn,
}: CookieCategoryProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-4 p-4 rounded-xl border transition-colors",
        checked
          ? "bg-primary/5 border-primary/20"
          : "bg-muted/30 border-border"
      )}
    >
      <div
        className={cn(
          "p-2.5 rounded-lg shrink-0",
          checked ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
        )}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Label className="font-semibold text-foreground">{title}</Label>
          {alwaysOn && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase tracking-wider">
              Required
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
      <Switch
        checked={checked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
        className="shrink-0 mt-1"
      />
    </div>
  );
}

export function CookiePreferencesModal({
  open,
  onOpenChange,
}: CookiePreferencesModalProps) {
  const {
    preferences,
    hasConsented,
    acceptAll,
    acceptNecessaryOnly,
    updatePreferences,
  } = useConsentManager();

  const [tempPrefs, setTempPrefs] = useState<ConsentPreferences>(preferences);
  const [saved, setSaved] = useState(false);

  // Sync temp prefs when modal opens or preferences change
  useEffect(() => {
    if (open) {
      setTempPrefs(preferences);
      setSaved(false);
    }
  }, [open, preferences]);

  const handleSave = () => {
    updatePreferences(tempPrefs);
    setSaved(true);
    setTimeout(() => {
      onOpenChange(false);
    }, 800);
  };

  const handleAcceptAll = () => {
    acceptAll();
    setSaved(true);
    setTimeout(() => {
      onOpenChange(false);
    }, 800);
  };

  const handleRejectOptional = () => {
    acceptNecessaryOnly();
    setSaved(true);
    setTimeout(() => {
      onOpenChange(false);
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10">
              <Cookie className="w-5 h-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl">Cookie Preferences</DialogTitle>
              <DialogDescription className="mt-1">
                Customize how we use cookies on your device
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4 space-y-3">
          {/* Essential */}
          <CookieCategory
            icon={<Shield className="w-5 h-5" />}
            title="Essential"
            description="Required for core functionality like authentication, security, and navigation. These cannot be disabled."
            checked={true}
            disabled
            alwaysOn
          />

          {/* Analytics */}
          <CookieCategory
            icon={<BarChart3 className="w-5 h-5" />}
            title="Analytics"
            description="Help us understand how you use our platform to improve performance and user experience."
            checked={tempPrefs.analytics}
            onCheckedChange={(checked) =>
              setTempPrefs({ ...tempPrefs, analytics: checked })
            }
          />

          {/* Functional */}
          <CookieCategory
            icon={<Sparkles className="w-5 h-5" />}
            title="Functional"
            description="Enable personalized features, remember your preferences, and provide enhanced functionality."
            checked={tempPrefs.functional}
            onCheckedChange={(checked) =>
              setTempPrefs({ ...tempPrefs, functional: checked })
            }
          />

          {/* Marketing */}
          <CookieCategory
            icon={<Megaphone className="w-5 h-5" />}
            title="Marketing"
            description="Used to deliver relevant ads and measure the effectiveness of our marketing campaigns."
            checked={tempPrefs.marketing}
            onCheckedChange={(checked) =>
              setTempPrefs({ ...tempPrefs, marketing: checked })
            }
          />
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-border space-y-3">
          <AnimatePresence mode="wait">
            {saved ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center justify-center gap-2 py-3 text-primary"
              >
                <Check className="w-5 h-5" />
                <span className="font-medium">Preferences saved!</span>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col sm:flex-row gap-2"
              >
                <Button onClick={handleSave} className="flex-1">
                  Save My Preferences
                </Button>
                <Button
                  variant="outline"
                  onClick={handleAcceptAll}
                  className="flex-1"
                >
                  Accept All
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {!saved && (
            <Button
              variant="ghost"
              onClick={handleRejectOptional}
              className="w-full text-muted-foreground hover:text-foreground"
            >
              Reject Optional Cookies
            </Button>
          )}

          <p className="text-xs text-center text-muted-foreground pt-2">
            Learn more about our cookie usage in our{" "}
            <a href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
