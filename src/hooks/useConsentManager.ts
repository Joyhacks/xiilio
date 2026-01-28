import { useState, useEffect, useCallback } from "react";

export type ConsentPreferences = {
  necessary: boolean; // Always true, required for app function
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
};

const CONSENT_STORAGE_KEY = "gdpr_consent";
const CONSENT_VERSION = "1.1"; // Updated version for new marketing field

interface StoredConsent {
  version: string;
  preferences: ConsentPreferences;
  timestamp: string;
}

const defaultPreferences: ConsentPreferences = {
  necessary: true,
  analytics: false,
  functional: false,
  marketing: false,
};

export function useConsentManager() {
  const [preferences, setPreferences] = useState<ConsentPreferences>(defaultPreferences);
  const [hasConsented, setHasConsented] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load consent from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (stored) {
        const parsed: StoredConsent = JSON.parse(stored);
        // Check version match
        if (parsed.version === CONSENT_VERSION) {
          setPreferences(parsed.preferences);
          setHasConsented(true);
        } else {
          // Version mismatch, need re-consent
          setHasConsented(false);
        }
      } else {
        setHasConsented(false);
      }
    } catch {
      setHasConsented(false);
    }
    setIsLoading(false);
  }, []);

  const saveConsent = useCallback((newPreferences: ConsentPreferences) => {
    const stored: StoredConsent = {
      version: CONSENT_VERSION,
      preferences: { ...newPreferences, necessary: true }, // Always keep necessary
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(stored));
    setPreferences(stored.preferences);
    setHasConsented(true);
  }, []);

  const acceptAll = useCallback(() => {
    saveConsent({
      necessary: true,
      analytics: true,
      functional: true,
      marketing: true,
    });
  }, [saveConsent]);

  const acceptNecessaryOnly = useCallback(() => {
    saveConsent({
      necessary: true,
      analytics: false,
      functional: false,
      marketing: false,
    });
  }, [saveConsent]);

  const updatePreferences = useCallback((partial: Partial<ConsentPreferences>) => {
    saveConsent({ ...preferences, ...partial, necessary: true });
  }, [preferences, saveConsent]);

  const resetConsent = useCallback(() => {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
    setPreferences(defaultPreferences);
    setHasConsented(false);
  }, []);

  const canTrack = useCallback((type: keyof ConsentPreferences) => {
    if (type === "necessary") return true;
    return hasConsented === true && preferences[type] === true;
  }, [hasConsented, preferences]);

  return {
    preferences,
    hasConsented,
    isLoading,
    acceptAll,
    acceptNecessaryOnly,
    updatePreferences,
    resetConsent,
    canTrack,
  };
}
