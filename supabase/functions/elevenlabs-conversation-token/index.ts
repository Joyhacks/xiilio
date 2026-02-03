import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Public ElevenLabs Agent IDs for each agent type
const AGENT_IDS: Record<string, string> = {
  receptionist: "agent_1201kfbaa8ygf1b93g0p4290nx67", // Julia
  assistant: "agent_7301kfb9x9h7e4p9ptaxvrn3mv57",    // Nicole
  legal: "agent_7201kfbc66gef8srn8dx0kzd7rgs",        // Halle
  social: "agent_2101kfbaxvp2f8atvytzszwqe7br",       // George
  writer: "agent_2301kfbbajyrffrbzq7k3n9qm6ff",       // Arnie
  sales: "agent_4001kfbd4szefvvbfgh30wvpzbbr",        // Brad
  coach: "agent_2701kfbvg113fhgaw1k0mjavt6h8",        // Sam
  finance: "agent_5501kfbw5b2wfgtstg4wdaxxqxw2",      // Jerry
};

// Friendly agent display names (used for fallback discovery)
const AGENT_TYPE_TO_NAME: Record<string, string> = {
  receptionist: "Julia",
  assistant: "Nicole",
  legal: "Halle",
  social: "George",
  writer: "Arnie",
  sales: "Brad",
  coach: "Sam",
  finance: "Jerry",
};

type ElevenLabsAgentListItem = {
  agent_id: string;
  name?: string;
  archived?: boolean;
};

async function listConvAiAgents(apiKey: string, search?: string) {
  const url = new URL("https://api.elevenlabs.io/v1/convai/agents");
  url.searchParams.set("page_size", "50");
  url.searchParams.set("archived", "false");
  if (search) url.searchParams.set("search", search);

  const resp = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "xi-api-key": apiKey,
    },
  });

  const text = await resp.text();
  if (!resp.ok) {
    throw new Error(`Failed to list ElevenLabs agents [${resp.status}]: ${text}`);
  }

  const json = JSON.parse(text) as { agents?: ElevenLabsAgentListItem[] };
  const agents = (json.agents || []).filter((a) => !a.archived);
  return agents;
}

function pickBestAgentByName(agents: ElevenLabsAgentListItem[], wantedName: string) {
  const wanted = wantedName.trim().toLowerCase();
  const exact = agents.filter((a) => (a.name || "").trim().toLowerCase() === wanted);
  if (exact.length === 1) return exact[0];

  const contains = agents.filter((a) => (a.name || "").toLowerCase().includes(wanted));
  if (contains.length === 1) return contains[0];

  return null;
}

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
    let agentId = AGENT_IDS[agentType];

    console.log(`Agent type: ${agentType}, Using ID: ${agentId ? agentId.substring(0, 20) + '...' : 'NONE'}`);

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

    const getSignedUrl = async (id: string) => {
      return await fetch(
        `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${id}`,
        {
          method: "GET",
          headers: {
            "xi-api-key": ELEVENLABS_API_KEY,
          },
        }
      );
    };

    // Get a signed URL from ElevenLabs
    let response = await getSignedUrl(agentId);

    // If the hardcoded agent id isn't found (common when API key belongs to a different ElevenLabs workspace),
    // try to discover the agent by name so voice calls keep working without code changes.
    if (!response.ok && response.status === 404) {
      const errorText = await response.text();
      console.error(`ElevenLabs API error: 404 - ${errorText}`);

      const wantedName = AGENT_TYPE_TO_NAME[agentType];
      console.log(`Attempting fallback agent discovery for type: ${agentType} (name: ${wantedName})`);

      try {
        // First try searching by the expected display name (e.g. Nicole)
        const searchAgents = wantedName
          ? await listConvAiAgents(ELEVENLABS_API_KEY, wantedName)
          : [];

        // If search yields nothing, fall back to listing all agents (first page)
        const allAgents = searchAgents.length
          ? searchAgents
          : await listConvAiAgents(ELEVENLABS_API_KEY);

        console.log(`Found ${allAgents.length} non-archived ElevenLabs agents for this API key`);

        if (allAgents.length === 0) {
          return new Response(
            JSON.stringify({
              error:
                "No ElevenLabs Conversational AI agents found for this API key. Create an agent in ElevenLabs Conversational AI (with Liberty voice for Nicole) and try again.",
            }),
            {
              status: 404,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }

        let picked: ElevenLabsAgentListItem | null = null;

        if (wantedName) {
          picked = pickBestAgentByName(allAgents, wantedName);
        }

        if (!picked && searchAgents.length === 1) {
          picked = searchAgents[0];
        }

        if (!picked) {
          const preview = allAgents.slice(0, 8).map((a) => ({ agent_id: a.agent_id, name: a.name }));
          return new Response(
            JSON.stringify({
              error:
                "The configured ElevenLabs agent ID was not found, and a matching agent could not be auto-detected. Please ensure your agent is named correctly (e.g. 'Nicole') or provide the agent ID.",
              available_agents_preview: preview,
            }),
            {
              status: 404,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }

        agentId = picked.agent_id;
        console.log(`Fallback selected agent id: ${agentId.substring(0, 20)}... (${picked.name || "unnamed"})`);
        response = await getSignedUrl(agentId);
      } catch (fallbackError) {
        console.error("Fallback discovery failed:", fallbackError);
        return new Response(
          JSON.stringify({
            error:
              "Failed to get conversation token from ElevenLabs (agent not found, and fallback discovery failed).",
          }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`ElevenLabs API error: ${response.status} - ${errorText}`);
      return new Response(
        JSON.stringify({ error: "Failed to get conversation token from ElevenLabs" }),
        {
          status: response.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
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
