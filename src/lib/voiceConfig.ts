// Voice configuration for each agent type
export interface AgentVoiceConfig {
  voiceId: string;
  voiceName: string;
  modelId?: string;
  settings?: {
    stability?: number;
    similarityBoost?: number;
    style?: number;
    useSpeakerBoost?: boolean;
  };
}

// ElevenLabs voice IDs mapped to agent types
export const AGENT_VOICE_CONFIG: Record<string, AgentVoiceConfig> = {
  receptionist: {
    voiceId: "EXAVITQu4vr4xnSDxMaL", // Sarah
    voiceName: "Sarah",
    settings: { stability: 0.5, similarityBoost: 0.75, style: 0.3 },
  },
  assistant: {
    voiceId: "XrExE9yKIg1WjnnlVkGX", // Matilda
    voiceName: "Matilda",
    settings: { stability: 0.5, similarityBoost: 0.75, style: 0.3 },
  },
  legal: {
    voiceId: "onwK4e9ZLuTAKqWW03F9", // Daniel
    voiceName: "Daniel",
    settings: { stability: 0.6, similarityBoost: 0.8, style: 0.2 },
  },
  social: {
    voiceId: "cjVigY5qzO86Huf0OWal", // Eric
    voiceName: "Eric",
    settings: { stability: 0.4, similarityBoost: 0.7, style: 0.5 },
  },
  writer: {
    voiceId: "JBFqnCBsd6RMkjVDRZzb", // George
    voiceName: "George",
    settings: { stability: 0.5, similarityBoost: 0.75, style: 0.4 },
  },
  sales: {
    voiceId: "TX3LPaxmHKxFdv7VOQHJ", // Liam
    voiceName: "Liam",
    settings: { stability: 0.45, similarityBoost: 0.75, style: 0.4 },
  },
  coach: {
    voiceId: "N2lVS1w4EtoT3dr4eOWO", // Callum
    voiceName: "Callum",
    settings: { stability: 0.5, similarityBoost: 0.75, style: 0.35 },
  },
  finance: {
    voiceId: "iP95p4xoKVk53GoZ742B", // Chris
    voiceName: "Chris",
    settings: { stability: 0.6, similarityBoost: 0.8, style: 0.2 },
  },
};

export function getAgentVoiceConfig(agentType: string): AgentVoiceConfig {
  return AGENT_VOICE_CONFIG[agentType] || AGENT_VOICE_CONFIG.assistant;
}

// Voice state machine types
export type VoiceState = 
  | "idle" 
  | "recording" 
  | "transcribing" 
  | "sending" 
  | "speaking" 
  | "error";

// User voice settings (persisted)
export interface UserVoiceSettings {
  autoSpeak: boolean;
  volume: number;
}

const VOICE_SETTINGS_KEY = "user_voice_settings";

export function getUserVoiceSettings(): UserVoiceSettings {
  try {
    const stored = localStorage.getItem(VOICE_SETTINGS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to load voice settings:", e);
  }
  return { autoSpeak: true, volume: 1.0 };
}

export function saveUserVoiceSettings(settings: UserVoiceSettings): void {
  try {
    localStorage.setItem(VOICE_SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error("Failed to save voice settings:", e);
  }
}
