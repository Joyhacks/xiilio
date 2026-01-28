import { useState, useRef, useCallback, useEffect } from "react";
import { getUserVoiceSettings, saveUserVoiceSettings } from "@/lib/voiceConfig";

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

// Map agent types to Web Speech API voice preferences
const AGENT_VOICE_PREFERENCES: Record<string, { lang: string; gender: "male" | "female" }> = {
  receptionist: { lang: "en-US", gender: "female" },
  assistant: { lang: "en-US", gender: "female" },
  legal: { lang: "en-US", gender: "male" },
  social: { lang: "en-US", gender: "male" },
  writer: { lang: "en-US", gender: "male" },
  sales: { lang: "en-US", gender: "male" },
  coach: { lang: "en-US", gender: "male" },
  finance: { lang: "en-US", gender: "male" },
};

function selectVoice(agentType: string): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  const prefs = AGENT_VOICE_PREFERENCES[agentType] || { lang: "en-US", gender: "female" };
  
  // Try to find a voice matching language and gender preference
  const langVoices = voices.filter(v => v.lang.startsWith(prefs.lang.split("-")[0]));
  
  // Prefer voices that match gender hint in name
  const genderHint = prefs.gender === "female" ? /female|woman|samantha|victoria|karen|susan/i : /male|man|daniel|james|david|alex/i;
  const genderMatch = langVoices.find(v => genderHint.test(v.name));
  if (genderMatch) return genderMatch;
  
  // Fall back to any English voice
  if (langVoices.length > 0) return langVoices[0];
  
  // Last resort: any voice
  return voices[0] || null;
}

export function useAgentTTS({
  agentType,
  onSpeakStart,
  onSpeakEnd,
}: UseAgentTTSOptions): UseAgentTTSReturn {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState(() => getUserVoiceSettings());
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Ensure voices are loaded
  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      stop();
    };
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setIsSpeaking(false);
    setIsLoading(false);
    onSpeakEnd?.();
  }, [onSpeakEnd]);

  const speak = useCallback(async (text: string) => {
    if (!text.trim()) return;
    if (!window.speechSynthesis) {
      console.warn("Web Speech API not supported");
      return;
    }
    
    // Stop any current playback
    stop();
    
    setIsLoading(true);

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;
    
    // Configure voice
    const voice = selectVoice(agentType);
    if (voice) {
      utterance.voice = voice;
    }
    
    utterance.rate = settings.speed;
    utterance.volume = settings.volume;
    utterance.pitch = 1;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsLoading(false);
      onSpeakStart?.();
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      utteranceRef.current = null;
      onSpeakEnd?.();
    };

    utterance.onerror = (event) => {
      if (event.error !== "canceled") {
        console.error("Speech synthesis error:", event.error);
      }
      setIsSpeaking(false);
      setIsLoading(false);
      utteranceRef.current = null;
      onSpeakEnd?.();
    };

    window.speechSynthesis.speak(utterance);
  }, [agentType, settings.volume, settings.speed, onSpeakStart, onSpeakEnd, stop]);

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
  }, [settings]);

  const setSpeed = useCallback((speed: number) => {
    const clampedSpeed = Math.max(0.8, Math.min(1.5, speed));
    const newSettings = { ...settings, speed: clampedSpeed };
    setSettings(newSettings);
    saveUserVoiceSettings(newSettings);
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
