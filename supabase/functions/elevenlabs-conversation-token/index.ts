import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Server-side agent ID mapping - never exposed to client
// These are the ElevenLabs Conversational AI Agent IDs for each agent type
const AGENT_IDS: Record<string, string> = {
  receptionist: Deno.env.get("ELEVENLABS_AGENT_RECEPTIONIST") || "",
  assistant: Deno.env.get("ELEVENLABS_AGENT_ASSISTANT") || "",
  legal: Deno.env.get("ELEVENLABS_AGENT_LEGAL") || "",
  social: Deno.env.get("ELEVENLABS_AGENT_SOCIAL") || "",
  writer: Deno.env.get("ELEVENLABS_AGENT_WRITER") || "",
  sales: Deno.env.get("ELEVENLABS_AGENT_SALES") || "",
  coach: Deno.env.get("ELEVENLABS_AGENT_COACH") || "",
  finance: Deno.env.get("ELEVENLABS_AGENT_FINANCE") || "",
};

// Default/fallback agent ID if specific agent not configured
const DEFAULT_AGENT_ID = Deno.env.get("ELEVENLABS_DEFAULT_AGENT_ID") || "";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY_1") || Deno.env.get("ELEVENLABS_API_KEY");
    
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

    const { agentType } = await req.json();

    if (!agentType) {
      return new Response(
        JSON.stringify({ error: "Agent type is required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Look up the agent ID server-side
    const specificAgentId = AGENT_IDS[agentType];
    const agentId = specificAgentId || DEFAULT_AGENT_ID;

    console.log(`Agent type: ${agentType}, Specific ID found: ${!!specificAgentId}, Using ID: ${agentId ? agentId.substring(0, 15) + '...' : 'NONE'}`);

    if (!agentId) {
      console.error(`No agent ID configured for type: ${agentType}`);
      return new Response(
        JSON.stringify({ error: "Voice agent not configured for this agent type" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log(`Generating conversation token for agent type: ${agentType}`);

    // Get a conversation token from ElevenLabs
    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${agentId}`,
      {
        method: "GET",
        headers: {
          "xi-api-key": ELEVENLABS_API_KEY,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`ElevenLabs API error: ${response.status} - ${errorText}`);
      return new Response(
        JSON.stringify({ error: "Failed to get conversation token from ElevenLabs" }),
        { 
          status: response.status, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const data = await response.json();
    console.log("Successfully generated signed URL");

    return new Response(
      JSON.stringify({ signed_url: data.signed_url }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error generating conversation token:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
