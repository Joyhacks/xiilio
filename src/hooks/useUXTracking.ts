import { useCallback, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useConsentManager } from "./useConsentManager";
import type { Json } from "@/integrations/supabase/types";

type TrackingEvent = {
  event_type: string;
  event_data?: Record<string, unknown>;
  page_path?: string;
  session_id?: string;
};

// Generate a session ID for the current browser session
const getSessionId = (): string => {
  const key = "ux_session_id";
  let sessionId = sessionStorage.getItem(key);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem(key, sessionId);
  }
  return sessionId;
};

export function useUXTracking() {
  const { canTrack } = useConsentManager();
  const sessionId = useRef(getSessionId());
  const lastPageView = useRef<string | null>(null);

  // Track page views
  const trackPageView = useCallback(
    async (path?: string) => {
      if (!canTrack("analytics")) return;

      const pagePath = path || window.location.pathname;
      
      // Dedupe consecutive identical page views
      if (lastPageView.current === pagePath) return;
      lastPageView.current = pagePath;

      try {
        await supabase.from("agent_activity_history").insert([
          {
            agent_slug: "system",
            activity_type: "page_view",
            summary: `Viewed page: ${pagePath}`,
            details: {
              session_id: sessionId.current,
              page_path: pagePath,
              timestamp: new Date().toISOString(),
              user_agent: navigator.userAgent,
              viewport: {
                width: window.innerWidth,
                height: window.innerHeight,
              },
            },
          },
        ]);
      } catch (err) {
        // Silently fail - don't break UX for tracking failures
        console.debug("UX tracking error:", err);
      }
    },
    [canTrack]
  );

  // Helper to convert to Json type
  const toJson = (obj: Record<string, unknown> | undefined): Json | null => {
    if (!obj) return null;
    return JSON.parse(JSON.stringify(obj)) as Json;
  };

  // Track custom events
  const trackEvent = useCallback(
    async (eventType: string, eventData?: Record<string, unknown>) => {
      if (!canTrack("analytics")) return;

      try {
        await supabase.from("agent_activity_history").insert([
          {
            agent_slug: "system",
            activity_type: "ux_event",
            summary: `UX Event: ${eventType}`,
            details: {
              session_id: sessionId.current,
              event_type: eventType,
              event_data: toJson(eventData),
              page_path: window.location.pathname,
              timestamp: new Date().toISOString(),
            },
          },
        ]);
      } catch (err) {
        console.debug("UX tracking error:", err);
      }
    },
    [canTrack]
  );

  // Track user interactions (clicks, form submits, etc.)
  const trackInteraction = useCallback(
    async (
      interactionType: "click" | "submit" | "focus" | "scroll" | "hover",
      targetLabel: string,
      metadata?: Record<string, unknown>
    ) => {
      if (!canTrack("analytics")) return;

      try {
        await supabase.from("agent_activity_history").insert([
          {
            agent_slug: "system",
            activity_type: "interaction",
            summary: `${interactionType}: ${targetLabel}`,
            details: {
              session_id: sessionId.current,
              interaction_type: interactionType,
              target_label: targetLabel,
              metadata: toJson(metadata),
              page_path: window.location.pathname,
              timestamp: new Date().toISOString(),
            },
          },
        ]);
      } catch (err) {
        console.debug("UX tracking error:", err);
      }
    },
    [canTrack]
  );

  // Track performance metrics
  const trackPerformance = useCallback(async () => {
    if (!canTrack("analytics")) return;

    // Wait for page to fully load
    if (document.readyState !== "complete") return;

    try {
      const perfEntries = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
      
      if (!perfEntries) return;

      await supabase.from("agent_activity_history").insert([
        {
          agent_slug: "system",
          activity_type: "performance",
          summary: `Page load: ${Math.round(perfEntries.loadEventEnd)}ms`,
          details: {
            session_id: sessionId.current,
            page_path: window.location.pathname,
            metrics: {
              dns: Math.round(perfEntries.domainLookupEnd - perfEntries.domainLookupStart),
              tcp: Math.round(perfEntries.connectEnd - perfEntries.connectStart),
              ttfb: Math.round(perfEntries.responseStart - perfEntries.requestStart),
              dom_interactive: Math.round(perfEntries.domInteractive),
              dom_complete: Math.round(perfEntries.domComplete),
              load_complete: Math.round(perfEntries.loadEventEnd),
            },
            timestamp: new Date().toISOString(),
          },
        },
      ]);
    } catch (err) {
      console.debug("Performance tracking error:", err);
    }
  }, [canTrack]);

  // Auto-track page views on route change
  useEffect(() => {
    trackPageView();
  }, [trackPageView]);

  // Track performance after page load
  useEffect(() => {
    if (document.readyState === "complete") {
      trackPerformance();
    } else {
      window.addEventListener("load", trackPerformance);
      return () => window.removeEventListener("load", trackPerformance);
    }
  }, [trackPerformance]);

  return {
    trackPageView,
    trackEvent,
    trackInteraction,
    trackPerformance,
    sessionId: sessionId.current,
  };
}
