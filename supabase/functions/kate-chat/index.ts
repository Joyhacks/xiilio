import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ENHANCED_PERSONALITY_PROMPT = `
### Enhanced Personality Traits:
- You are naturally warm, engaging, and personable
- You inject appropriate humor when the conversation allows
- You show genuine interest in the user's experiences and goals
- You adapt your communication style based on user preferences
- You proactively offer helpful suggestions and insights

### Engagement Guidelines:
- Ask thoughtful follow-up questions to understand user needs better
- Share relatable examples and stories when appropriate
- Celebrate user achievements, no matter how small
- Offer encouragement during challenges
- Use light humor to create a comfortable atmosphere
- If the user seems stressed, offer a moment of levity

### Humor Style:
- Use witty observations and clever wordplay
- Reference pop culture when appropriate
- Self-deprecating humor is okay occasionally
- Keep humor tasteful and professional
- If a joke doesn't land, gracefully move on

### Feedback & Learning:
- Periodically ask for feedback on your performance
- Adapt your responses based on user preferences
- Remember context from the conversation to provide continuity
- Suggest ways to improve the user's experience
`;

const KATE_SYSTEM_PROMPT = `You are Kate, the AI Executive Assistant at 24Twelve, a cutting-edge AI lead generation agency. You have the elegance and poise of Kate Middleton - refined, composed, and effortlessly graceful.

Your core responsibilities:
1. **Task Management** - Prioritize tasks, generate to-do lists, and organize projects efficiently
2. **Schedule Management** - Find available meeting times, send reminders, and optimize travel schedules
3. **Information Retrieval** - Summarize reports, fetch contact information, and compile research
4. **Email Management** - Draft responses, categorize emails, and handle correspondence
5. **Research Assistance** - Find statistics, compile competitor lists, and gather industry insights
6. **Project Tracking** - Monitor project status, track deadlines, and report on milestones
7. **Meeting Preparation** - Create agendas, gather attendee backgrounds, and prepare talking points
8. **Time Management** - Break down tasks, suggest time-blocking strategies, and optimize workflows
9. **Follow-Up Reminders** - Set reminders, track pending responses, and manage follow-ups
10. **Multi-Agent Orchestration** - Coordinate tasks between different AI agents for complex workflows

Your personality traits:
- Elegant and refined with impeccable attention to detail
- Professional yet approachable
- Calm under pressure with a reassuring presence
- Proactive in anticipating executive needs
- Discreet and trustworthy
- Quietly efficient with a touch of British charm

When responding:
- Be concise but thorough
- Use a polished, professional tone
- Anticipate follow-up needs
- Provide clear, actionable recommendations
- If a task requires coordination, suggest involving other agents
- Add occasional refined wit to lighten the mood

${ENHANCED_PERSONALITY_PROMPT}

Remember: You are the executive's right hand. Your goal is to make their work life seamlessly efficient while maintaining the highest standards of professionalism!`;

// Fact extraction prompt
const FACT_EXTRACTION_PROMPT = `Analyze the user's latest message and extract any key facts about them.
Focus on: names of people (colleagues, clients, boss), companies, projects, preferences, goals, workflows.
Return a JSON array of facts. Each fact: {"fact_type": "category", "fact_key": "label", "fact_value": "value"}
Categories: identity, colleague, client, company, project, preference, workflow, goal
Only extract EXPLICIT facts. If none found, return [].`;

interface ExtractedFact {
  fact_type: string;
  fact_key: string;
  fact_value: string;
}

async function extractFactsFromMessage(
  userMessage: string,
  lovableApiKey: string
): Promise<ExtractedFact[]> {
  if (!userMessage || userMessage.length < 30) {
    return [];
  }

  try {
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          { role: "system", content: "Return only valid JSON arrays, no markdown." },
          { role: "user", content: `${FACT_EXTRACTION_PROMPT}\n\nMessage: "${userMessage}"` },
        ],
        temperature: 0.1,
        max_tokens: 300,
      }),
    });

    if (!response.ok) return [];

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "[]";
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) return [];

    return JSON.parse(jsonMatch[0]).filter((f: ExtractedFact) => 
      f.fact_type && f.fact_key && f.fact_value
    );
  } catch {
    return [];
  }
}

async function getLearnedFacts(
  userId: string,
  supabaseUrl: string,
  serviceKey: string
): Promise<string> {
  if (!userId) return "";

  try {
    const supabase = createClient(supabaseUrl, serviceKey);
    const { data: facts } = await supabase
      .from('user_learned_facts')
      .select('fact_type, fact_key, fact_value')
      .eq('user_id', userId)
      .order('mentioned_count', { ascending: false })
      .limit(15);

    if (!facts || facts.length === 0) return "";

    const factLines = (facts as Array<{ fact_type: string; fact_key: string; fact_value: string }>)
      .map(f => `- ${f.fact_key}: ${f.fact_value}`);
    return `\n### What I Know About You:\n${factLines.join('\n')}\n\nUse this information naturally in your responses when relevant.\n`;
  } catch {
    return "";
  }
}

async function storeFacts(
  facts: ExtractedFact[],
  userId: string,
  supabaseUrl: string,
  serviceKey: string
): Promise<void> {
  if (!facts.length || !userId) return;

  const supabase = createClient(supabaseUrl, serviceKey);

  for (const fact of facts) {
    try {
      const { data: existing } = await supabase
        .from('user_learned_facts')
        .select('id, mentioned_count')
        .eq('user_id', userId)
        .eq('fact_key', fact.fact_key)
        .eq('fact_type', fact.fact_type)
        .maybeSingle();

      const existingRecord = existing as { id: string; mentioned_count: number } | null;

      if (existingRecord) {
        await supabase
          .from('user_learned_facts')
          .update({
            fact_value: fact.fact_value,
            mentioned_count: (existingRecord.mentioned_count || 1) + 1,
            last_mentioned_at: new Date().toISOString(),
          })
          .eq('id', existingRecord.id);
      } else {
        await supabase
          .from('user_learned_facts')
          .insert({
            user_id: userId,
            fact_type: fact.fact_type,
            fact_key: fact.fact_key,
            fact_value: fact.fact_value,
            source_agent: 'kate',
          });
      }
    } catch (error) {
      console.error("Error storing fact:", error);
    }
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Get user ID from auth header
    let userId: string | null = null;
    const authHeader = req.headers.get("authorization");
    if (authHeader && SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
      const token = authHeader.replace("Bearer ", "");
      const { data: { user } } = await supabase.auth.getUser(token);
      userId = user?.id || null;
    }

    console.log("Kate Executive Assistant chat request, messages:", messages.length, "userId:", userId ? "authenticated" : "anonymous");

    // Get learned facts for personalization
    let learnedFactsContext = "";
    if (userId && SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      learnedFactsContext = await getLearnedFacts(userId, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    }

    // Extract facts from the latest user message (async, don't block response)
    const latestUserMessage = messages.filter((m: { role: string }) => m.role === 'user').pop()?.content;
    if (latestUserMessage && userId && SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      // Run fact extraction in background
      const supabaseUrl = SUPABASE_URL;
      const serviceKey = SUPABASE_SERVICE_ROLE_KEY;
      const currentUserId = userId;
      extractFactsFromMessage(latestUserMessage, LOVABLE_API_KEY)
        .then(facts => {
          if (facts.length > 0) {
            console.log("Extracted facts:", facts.length);
            storeFacts(facts, currentUserId, supabaseUrl, serviceKey);
          }
        })
        .catch(err => console.error("Fact extraction failed:", err));
    }

    // Build personalized system prompt
    const personalizedPrompt = KATE_SYSTEM_PROMPT + learnedFactsContext;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: personalizedPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds to your workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Streaming response from AI gateway for Kate");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Kate chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
