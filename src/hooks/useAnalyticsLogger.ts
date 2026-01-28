import { useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

interface LogActivityParams {
  agentSlug: string;
  activityType: "conversation" | "message" | "voice";
  summary: string;
  details?: Json;
}

export function useAnalyticsLogger() {
  const conversationIdRef = useRef<string | null>(null);
  const messageCountRef = useRef(0);

  /**
   * Log an activity to the agent_activity_history table
   * Only logs for authenticated users (RLS requires user_id)
   */
  const logActivity = useCallback(async ({
    agentSlug,
    activityType,
    summary,
    details,
  }: LogActivityParams) => {
    try {
      // Get current user - only log if authenticated
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // Skip logging for unauthenticated users (RLS would block anyway)
        return;
      }

      const { error } = await supabase
        .from("agent_activity_history")
        .insert([{
          agent_slug: agentSlug,
          activity_type: activityType,
          summary,
          details: details || null,
          user_id: user.id,
        }]);

      if (error) {
        console.error("Failed to log activity:", error);
      }
    } catch (err) {
      console.error("Error logging activity:", err);
    }
  }, []);

  /**
   * Start a new conversation session
   */
  const startConversation = useCallback((agentSlug: string) => {
    conversationIdRef.current = crypto.randomUUID();
    messageCountRef.current = 0;

    logActivity({
      agentSlug,
      activityType: "conversation",
      summary: `Started a conversation`,
      details: {
        conversationId: conversationIdRef.current,
        startedAt: new Date().toISOString(),
      },
    });

    return conversationIdRef.current;
  }, [logActivity]);

  /**
   * Log a text message exchange
   */
  const logMessage = useCallback((
    agentSlug: string,
    role: "user" | "assistant",
    contentPreview: string,
    isVoice: boolean = false
  ) => {
    messageCountRef.current += 1;
    const preview = contentPreview.slice(0, 100) + (contentPreview.length > 100 ? "..." : "");

    logActivity({
      agentSlug,
      activityType: "message",
      summary: role === "user" 
        ? `User: "${preview}"` 
        : `Agent replied: "${preview}"`,
      details: {
        conversationId: conversationIdRef.current,
        role,
        messageNumber: messageCountRef.current,
        isVoice,
        contentLength: contentPreview.length,
      },
    });
  }, [logActivity]);

  /**
   * Log a voice interaction (PTT or full voice mode)
   */
  const logVoiceInteraction = useCallback((
    agentSlug: string,
    type: "ptt_start" | "ptt_end" | "voice_mode_start" | "voice_mode_end",
    durationMs?: number
  ) => {
    const summaries: Record<string, string> = {
      ptt_start: "Started push-to-talk recording",
      ptt_end: `Completed voice message${durationMs ? ` (${(durationMs / 1000).toFixed(1)}s)` : ""}`,
      voice_mode_start: "Entered full voice conversation mode",
      voice_mode_end: "Exited voice conversation mode",
    };

    logActivity({
      agentSlug,
      activityType: "voice",
      summary: summaries[type],
      details: {
        conversationId: conversationIdRef.current,
        voiceEventType: type,
        durationMs,
      },
    });
  }, [logActivity]);

  /**
   * End the current conversation and log summary
   */
  const endConversation = useCallback((agentSlug: string) => {
    if (messageCountRef.current > 0) {
      logActivity({
        agentSlug,
        activityType: "conversation",
        summary: `Conversation ended with ${messageCountRef.current} messages`,
        details: {
          conversationId: conversationIdRef.current,
          totalMessages: messageCountRef.current,
          endedAt: new Date().toISOString(),
        },
      });
    }

    conversationIdRef.current = null;
    messageCountRef.current = 0;
  }, [logActivity]);

  return {
    logActivity,
    startConversation,
    logMessage,
    logVoiceInteraction,
    endConversation,
    currentConversationId: conversationIdRef.current,
  };
}
