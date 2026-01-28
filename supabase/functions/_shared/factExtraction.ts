// Shared utility for extracting facts from conversation messages
// Used by agent chat functions to learn about users

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

interface ExtractedFact {
  fact_type: string;
  fact_key: string;
  fact_value: string;
}

interface Message {
  role: string;
  content: string;
}

const FACT_EXTRACTION_PROMPT = `Analyze the following conversation and extract key facts about the user. 
Focus on:
- identity: name, title, role
- colleague: names of people they work with
- client: names of clients or customers mentioned
- company: company names, organizations
- project: project names, initiatives
- preference: preferences, likes, dislikes
- workflow: how they work, tools they use
- goal: their goals, objectives, targets

Return a JSON array of facts. Each fact should have:
- fact_type: one of the categories above
- fact_key: a short label (e.g., "Manager name", "Preferred tool")
- fact_value: the actual value (e.g., "Sarah Johnson", "Slack")

Only extract EXPLICIT facts clearly stated by the user. Do not infer or assume.
If no facts are found, return an empty array.

Example output:
[
  {"fact_type": "colleague", "fact_key": "Manager name", "fact_value": "Sarah Johnson"},
  {"fact_type": "project", "fact_key": "Current project", "fact_value": "Q1 Marketing Campaign"}
]

Conversation to analyze:`;

export async function extractFactsFromConversation(
  messages: Message[],
  lovableApiKey: string
): Promise<ExtractedFact[]> {
  if (!messages || messages.length < 2) {
    return [];
  }

  // Only analyze user messages
  const userMessages = messages
    .filter(m => m.role === 'user')
    .map(m => m.content)
    .join('\n---\n');

  if (userMessages.length < 50) {
    return []; // Not enough content to extract facts
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
          { 
            role: "system", 
            content: "You are a fact extraction assistant. Return only valid JSON arrays, no markdown or explanation."
          },
          { 
            role: "user", 
            content: `${FACT_EXTRACTION_PROMPT}\n\n${userMessages}`
          },
        ],
        temperature: 0.1,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      console.error("Fact extraction API error:", response.status);
      return [];
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "[]";
    
    // Parse the JSON response
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      return [];
    }

    const facts = JSON.parse(jsonMatch[0]) as ExtractedFact[];
    
    // Validate and filter facts
    return facts.filter(f => 
      f.fact_type && 
      f.fact_key && 
      f.fact_value &&
      f.fact_key.length < 100 &&
      f.fact_value.length < 500
    );
  } catch (error) {
    console.error("Fact extraction error:", error);
    return [];
  }
}

export async function storeExtractedFacts(
  facts: ExtractedFact[],
  userId: string,
  agentSlug: string,
  supabaseUrl: string,
  supabaseServiceKey: string
): Promise<void> {
  if (!facts.length || !userId) {
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  for (const fact of facts) {
    try {
      // Check if fact already exists
      const { data: existing } = await supabase
        .from('user_learned_facts')
        .select('id, mentioned_count')
        .eq('user_id', userId)
        .eq('fact_key', fact.fact_key)
        .eq('fact_type', fact.fact_type)
        .maybeSingle();

      if (existing) {
        // Update existing fact
        await supabase
          .from('user_learned_facts')
          .update({
            fact_value: fact.fact_value,
            mentioned_count: (existing.mentioned_count || 1) + 1,
            last_mentioned_at: new Date().toISOString(),
          })
          .eq('id', existing.id);
      } else {
        // Insert new fact
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
      console.error("Error storing fact:", fact.fact_key, error);
    }
  }
}

export async function getLearnedFactsForUser(
  userId: string,
  supabaseUrl: string,
  supabaseServiceKey: string,
  limit: number = 20
): Promise<string> {
  if (!userId) {
    return "";
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const { data: facts } = await supabase
      .from('user_learned_facts')
      .select('fact_type, fact_key, fact_value')
      .eq('user_id', userId)
      .order('mentioned_count', { ascending: false })
      .order('last_mentioned_at', { ascending: false })
      .limit(limit);

    if (!facts || facts.length === 0) {
      return "";
    }

    // Format facts as a readable context block
    const factLines = facts.map(f => `- ${f.fact_key}: ${f.fact_value}`);
    
    return `
### What I Know About You:
${factLines.join('\n')}

Use this information to personalize your responses and reference past conversations naturally.
`;
  } catch (error) {
    console.error("Error loading facts:", error);
    return "";
  }
}
