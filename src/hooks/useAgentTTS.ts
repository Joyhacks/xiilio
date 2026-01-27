import { useState, useRef, useCallback, useEffect } from "react";
import { getAgentVoiceConfig, getUserVoiceSettings, saveUserVoiceSettings } from "@/lib/voiceConfig";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

interface UseAgentTTSOptions {
  agentType: string;
  onSpeakStart?: () => void;
  onSpeakEnd?: () => void;
}

interface UseAgentTTSReturn {
  isSpeaking: boolean;
  isLoading: boolean;
  autoSpeak: boolean;
  volume: number;
  speed: number;
  speak: (text: string) => Promise<void>;
  stop: () => void;
  setAutoSpeak: (enabled: boolean) => void;
  setVolume: (volume: number) => void;
  setSpeed: (speed: number) => void;
}

export function useAgentTTS({
  agentType,
  onSpeakStart,
  onSpeakEnd,
}: UseAgentTTSOptions): UseAgentTTSReturn {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState(() => getUserVoiceSettings());

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stop();
    };
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsSpeaking(false);
    setIsLoading(false);
    onSpeakEnd?.();
  }, [onSpeakEnd]);

  const speak = useCallback(async (text: string) => {
    if (!text.trim()) return;
    
    // Stop any current playback
    stop();
    
    const voiceConfig = getAgentVoiceConfig(agentType);
    
    setIsLoading(true);
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/elevenlabs-tts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
          body: JSON.stringify({
            text: text.slice(0, 2000), // Limit text length
            voiceId: voiceConfig.voiceId,
            agentType,
          }),
          signal: abortControllerRef.current.signal,
        }
      );

      if (!response.ok) {
        throw new Error(`TTS request failed: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      const audio = new Audio(audioUrl);
      audio.volume = settings.volume;
      audio.playbackRate = settings.speed;
      audioRef.current = audio;

      audio.onplay = () => {
        setIsSpeaking(true);
        setIsLoading(false);
        onSpeakStart?.();
      };

      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        setIsSpeaking(false);
        audioRef.current = null;
        onSpeakEnd?.();
      };

      audio.onerror = () => {
        URL.revokeObjectURL(audioUrl);
        setIsSpeaking(false);
        setIsLoading(false);
        audioRef.current = null;
        onSpeakEnd?.();
        console.error("Audio playback error");
      };

      await audio.play();
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.log("TTS request aborted");
      } else {
        console.error("TTS error:", error);
      }
      setIsSpeaking(false);
      setIsLoading(false);
    }
  }, [agentType, settings.volume, onSpeakStart, onSpeakEnd, stop]);

  const setAutoSpeak = useCallback((enabled: boolean) => {
    const newSettings = { ...settings, autoSpeak: enabled };
    setSettings(newSettings);
    saveUserVoiceSettings(newSettings);
  }, [settings]);

  const setVolume = useCallback((volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    const newSettings = { ...settings, volume: clampedVolume };
    setSettings(newSettings);
    saveUserVoiceSettings(newSettings);
    
    // Update current audio if playing
    if (audioRef.current) {
      audioRef.current.volume = clampedVolume;
    }
  }, [settings]);

  const setSpeed = useCallback((speed: number) => {
    const clampedSpeed = Math.max(0.8, Math.min(1.5, speed));
    const newSettings = { ...settings, speed: clampedSpeed };
    setSettings(newSettings);
    saveUserVoiceSettings(newSettings);
    
    // Update current audio if playing
    if (audioRef.current) {
      audioRef.current.playbackRate = clampedSpeed;
    }
  }, [settings]);

  return {
    isSpeaking,
    isLoading,
    autoSpeak: settings.autoSpeak,
    volume: settings.volume,
    speed: settings.speed,
    speak,
    stop,
    setAutoSpeak,
    setVolume,
    setSpeed,
  };
}
