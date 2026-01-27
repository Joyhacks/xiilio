// ElevenLabs Voice Agent IDs for each agent type
// These should be configured with your own ElevenLabs agent IDs
// Create agents at: https://elevenlabs.io/conversational-ai

export interface VoiceAgentConfig {
  agentId: string;
  voiceName: string;
  description: string;
}

// Map agent types to their ElevenLabs configurations
// Replace these placeholder IDs with your actual ElevenLabs Agent IDs
export const VOICE_AGENT_CONFIGS: Record<string, VoiceAgentConfig> = {
  receptionist: {
    agentId: "", // Set your Receptionist agent ID
    voiceName: "Julia",
    description: "Friendly and professional front desk assistant",
  },
  assistant: {
    agentId: "", // Set your Executive Assistant agent ID
    voiceName: "Kate",
    description: "Organized and efficient executive assistant",
  },
  legal: {
    agentId: "", // Set your Legal Advisor agent ID
    voiceName: "Halle",
    description: "Precise and knowledgeable legal counsel",
  },
  social: {
    agentId: "", // Set your Social Media Manager agent ID
    voiceName: "George",
    description: "Creative and engaging social media expert",
  },
  writer: {
    agentId: "", // Set your Content Writer agent ID
    voiceName: "Arnie",
    description: "Creative and articulate content creator",
  },
  sales: {
    agentId: "", // Set your Sales Associate agent ID
    voiceName: "Brad",
    description: "Persuasive and personable sales professional",
  },
  coach: {
    agentId: "", // Set your Life Coach agent ID
    voiceName: "Sam",
    description: "Supportive and motivating life coach",
  },
  finance: {
    agentId: "", // Set your Financial Planner agent ID
    voiceName: "Jerry",
    description: "Analytical and trustworthy financial advisor",
  },
};

// Get voice config for an agent type
export function getVoiceAgentConfig(agentType: string): VoiceAgentConfig | null {
  return VOICE_AGENT_CONFIGS[agentType] || null;
}

// Check if an agent type has a configured voice agent
export function hasVoiceAgent(agentType: string): boolean {
  const config = VOICE_AGENT_CONFIGS[agentType];
  return !!config && !!config.agentId && config.agentId.trim().length > 0;
}

// Local storage key for custom agent IDs (user overrides)
export const CUSTOM_AGENT_ID_KEY = "elevenlabs_custom_agent_id";

// Get the effective agent ID (custom override or preset)
export function getEffectiveAgentId(agentType: string): string {
  // First check for custom override
  const customId = localStorage.getItem(`${CUSTOM_AGENT_ID_KEY}_${agentType}`);
  if (customId && customId.trim()) {
    return customId;
  }
  
  // Fall back to preset
  const config = VOICE_AGENT_CONFIGS[agentType];
  return config?.agentId || "";
}

// Save a custom agent ID for an agent type
export function saveCustomAgentId(agentType: string, agentId: string): void {
  if (agentId.trim()) {
    localStorage.setItem(`${CUSTOM_AGENT_ID_KEY}_${agentType}`, agentId.trim());
  } else {
    localStorage.removeItem(`${CUSTOM_AGENT_ID_KEY}_${agentType}`);
  }
}
