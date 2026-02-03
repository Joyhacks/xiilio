import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Default voice IDs for different agent types
const VOICE_MAP: Record<string, string> = {
  receptionist: "EXAVITQu4vr4xnSDxMaL", // Sarah - warm and welcoming
  assistant: "iBo5PWT1qLiEyqhM7TrG", // Liberty X
  legal: "onwK4e9ZLuTAKqWW03F9", // Daniel - authoritative
  social: "cjVigY5qzO86Huf0OWal", // Eric - energetic
  writer: "JBFqnCBsd6RMkjVDRZzb", // George - creative
  sales: "TX3LPaxmHKxFdv7VOQHJ", // Liam - persuasive
  coach: "N2lVS1w4EtoT3dr4eOWO", // Callum - motivational
  finance: "iP95p4xoKVk53GoZ742B", // Chris - analytical
  default: "EXAVITQu4vr4xnSDxMaL", // Sarah
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");
    
    if (!ELEVENLABS_API_KEY) {
      console.error("ELEVENLABS_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "ElevenLabs API key not configured" }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const { text, voiceId, agentType } = await req.json();

    if (!text) {
      return new Response(
        JSON.stringify({ error: "Text is required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Use provided voiceId, or map from agentType, or use default
    const selectedVoice = voiceId || VOICE_MAP[agentType] || VOICE_MAP.default;

    console.log(`Generating TTS for text (${text.length} chars) with voice: ${selectedVoice}`);

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${selectedVoice}?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: {
          "xi-api-key": ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_turbo_v2_5",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.3,
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`ElevenLabs TTS error: ${response.status} - ${errorText}`);
      return new Response(
        JSON.stringify({ error: "Failed to generate speech" }),
        { 
          status: response.status, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const audioBuffer = await response.arrayBuffer();
    console.log(`Generated audio: ${audioBuffer.byteLength} bytes`);

    return new Response(audioBuffer, {
      headers: {
        ...corsHeaders,
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (error) {
    console.error("Error generating TTS:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
