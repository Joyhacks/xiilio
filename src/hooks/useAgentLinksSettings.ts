import { useState, useEffect, useCallback } from "react";
import { AgentConfig } from "@/lib/agentLinks";

const STORAGE_KEY = "24twelve-agent-links-settings";

export interface UserAgentSettings {
  email?: string;
  phoneNumber?: string;
  bookingUrl?: string;
  blogNewPostUrl?: string;
  crmUrl?: string;
  helpdeskUrl?: string;
  sharedInboxUrl?: string;
  knowledgeBaseUrl?: string;
  workflowUrl?: string;
  n8nWebhookUrl?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  tiktok?: string;
  twitter?: string;
  youtube?: string;
}

export type AllAgentSettings = Record<string, UserAgentSettings>;

function loadSettings(): AllAgentSettings {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to load agent link settings:", e);
  }
  return {};
}

function saveSettings(settings: AllAgentSettings): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error("Failed to save agent link settings:", e);
  }
}

export function useAgentLinksSettings(agentSlug: string) {
  const [allSettings, setAllSettings] = useState<AllAgentSettings>(loadSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load settings on mount
  useEffect(() => {
    setAllSettings(loadSettings());
    setIsLoaded(true);
  }, []);

  // Get settings for current agent
  const agentSettings = allSettings[agentSlug] || {};

  // Update settings for current agent
  const updateSettings = useCallback(
    (newSettings: UserAgentSettings) => {
      setAllSettings((prev) => {
        const updated = {
          ...prev,
          [agentSlug]: newSettings,
        };
        saveSettings(updated);
        return updated;
      });
    },
    [agentSlug]
  );

  // Reset settings for current agent
  const resetSettings = useCallback(() => {
    setAllSettings((prev) => {
      const updated = { ...prev };
      delete updated[agentSlug];
      saveSettings(updated);
      return updated;
    });
  }, [agentSlug]);

  // Check if there are any custom settings
  const hasCustomSettings = Object.keys(agentSettings).some(
    (key) => agentSettings[key as keyof UserAgentSettings]
  );

  return {
    settings: agentSettings,
    updateSettings,
    resetSettings,
    hasCustomSettings,
    isLoaded,
  };
}

// Merge user settings with base agent config
export function mergeAgentConfig(
  baseConfig: AgentConfig,
  userSettings: UserAgentSettings
): AgentConfig {
  return {
    ...baseConfig,
    email: userSettings.email || baseConfig.email,
    phoneNumber: userSettings.phoneNumber || baseConfig.phoneNumber,
    bookingUrl: userSettings.bookingUrl || baseConfig.bookingUrl,
    blogNewPostUrl: userSettings.blogNewPostUrl || baseConfig.blogNewPostUrl,
    crmUrl: userSettings.crmUrl || baseConfig.crmUrl,
    helpdeskUrl: userSettings.helpdeskUrl || baseConfig.helpdeskUrl,
    sharedInboxUrl: userSettings.sharedInboxUrl || baseConfig.sharedInboxUrl,
    knowledgeBaseUrl: userSettings.knowledgeBaseUrl || baseConfig.knowledgeBaseUrl,
    workflowUrl: userSettings.workflowUrl || baseConfig.workflowUrl,
    n8nWebhookUrl: userSettings.n8nWebhookUrl || baseConfig.n8nWebhookUrl,
    socialProfiles: {
      instagram: userSettings.instagram || baseConfig.socialProfiles?.instagram,
      facebook: userSettings.facebook || baseConfig.socialProfiles?.facebook,
      linkedin: userSettings.linkedin || baseConfig.socialProfiles?.linkedin,
      tiktok: userSettings.tiktok || baseConfig.socialProfiles?.tiktok,
      twitter: userSettings.twitter || baseConfig.socialProfiles?.twitter,
      youtube: userSettings.youtube || baseConfig.socialProfiles?.youtube,
    },
  };
}
