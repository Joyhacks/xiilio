// Shared memory utilities for all agent chat functions
// Handles fact extraction, storage, and retrieval for personalization

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

export { corsHeaders };

interface ExtractedFact {
  fact_type: string;
  fact_key: string;
  fact_value: string;
}

const FACT_EXTRACTION_PROMPT = `Analyze the user's latest message and extract any key facts about them.
Focus on: names of people (colleagues, clients, boss), companies, projects, preferences, goals, workflows.
Return a JSON array of facts. Each fact: {"fact_type": "category", "fact_key": "label", "fact_value": "value"}
Categories: identity, colleague, client, company, project, preference, workflow, goal
Only extract EXPLICIT facts. If none found, return [].`;

// Get authenticated user ID from request
export async function getUserIdFromRequest(
  req: Request,
  supabaseUrl: string,
  serviceKey: string
): Promise<string | null> {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;

  try {
    const supabase = createClient(supabaseUrl, serviceKey);
    const token = authHeader.replace("Bearer ", "");
    const { data: { user } } = await supabase.auth.getUser(token);
    return user?.id || null;
  } catch {
    return null;
  }
}

// Extract facts from a user message using AI
export async function extractFactsFromMessage(
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
      f.fact_type && f.fact_key && f.fact_value &&
      f.fact_key.length < 100 && f.fact_value.length < 500
    );
  } catch {
    return [];
  }
}

// Store extracted facts in the database
export async function storeFacts(
  facts: ExtractedFact[],
  userId: string,
  agentSlug: string,
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
            source_agent: agentSlug,
          });
      }
    } catch (error) {
      console.error("Error storing fact:", error);
    }
  }
}

// Retrieve learned facts for a user
export async function getLearnedFacts(
  userId: string,
  supabaseUrl: string,
  serviceKey: string,
  limit: number = 15
): Promise<string> {
  if (!userId) return "";

  try {
    const supabase = createClient(supabaseUrl, serviceKey);
    const { data: facts } = await supabase
      .from('user_learned_facts')
      .select('fact_type, fact_key, fact_value')
      .eq('user_id', userId)
      .order('mentioned_count', { ascending: false })
      .limit(limit);

    if (!facts || facts.length === 0) return "";

    const factLines = (facts as Array<{ fact_type: string; fact_key: string; fact_value: string }>)
      .map(f => `- ${f.fact_key}: ${f.fact_value}`);
    return `\n### What I Know About You:\n${factLines.join('\n')}\n\nUse this information naturally in your responses when relevant.\n`;
  } catch {
    return "";
  }
}

// Run fact extraction asynchronously (fire and forget)
export function runFactExtractionAsync(
  latestUserMessage: string,
  userId: string,
  agentSlug: string,
  lovableApiKey: string,
  supabaseUrl: string,
  serviceKey: string
): void {
  if (!latestUserMessage || !userId) return;

  extractFactsFromMessage(latestUserMessage, lovableApiKey)
    .then(facts => {
      if (facts.length > 0) {
        console.log(`[${agentSlug}] Extracted ${facts.length} facts`);
        storeFacts(facts, userId, agentSlug, supabaseUrl, serviceKey);
      }
    })
    .catch(err => console.error(`[${agentSlug}] Fact extraction failed:`, err));
}

// Create a personalized system prompt with learned facts
export async function createPersonalizedPrompt(
  basePrompt: string,
  userId: string | null,
  supabaseUrl: string | undefined,
  serviceKey: string | undefined
): Promise<string> {
  if (!userId || !supabaseUrl || !serviceKey) {
    return basePrompt;
  }

  const learnedFacts = await getLearnedFacts(userId, supabaseUrl, serviceKey);
  return basePrompt + learnedFacts;
}
