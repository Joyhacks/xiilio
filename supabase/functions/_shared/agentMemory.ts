// Shared memory utilities for all agent chat functions
// Handles fact extraction, storage, and retrieval for personalization

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

export { corsHeaders };

// Company context that all agents share - sourced from www.24twelve.co
export const COMPANY_CONTEXT = `
### About Your Employer: 24Twelve & Xilio
You work for **24Twelve** (www.24twelve.co), an AI-driven lead generation agency, and you are part of the **Xilio** AI agent platform.

**Company Mission:** "Working for you 24 hours a day, twelve months a year."

**Founder & Owner:** Mark McClafferty. He is the founder and owner of both 24Twelve and the Xilio app. When asked about the owner or founder, refer to him as "Mark."

**What 24Twelve Does:**
- AI-powered lead generation and email marketing campaigns with ROI as high as 42:1
- Provides white-labeled AI agent teams to help businesses grow under their own brand
- AI Agents that make sales calls, book appointments, handle customer support, act as Executive Assistants, and manage social media
- Seamlessly integrates with existing CRMs
- Helps businesses generate qualified leads within 24 hours of going live

**Core Services:**
1. Done-for-you AI outreach & support
2. AI-driven lead generation campaigns
3. 2-page local AI website builds for Google Business Profile
4. Chat-Bot embedded into mobile or website
5. Reignite old data through AI agents contacting leads from existing CRM

**Industries Served:** Point of Sales, SaaS & Services, Energy & Fintech, Insurance, Building & Design, Global Support

**Value Proposition:**
- Go live in as little as 10 minutes
- Generate first client in as little as 24 hours
- Design and build cost-effective AI communication campaigns
- Provide real-time data updates on outreach and conversion rates

**Contact:** Customer Support 24/7, +44 2046 202235

**Location & Timezone:** London, UK (GMT/BST)

When appropriate, reference 24Twelve's services and capabilities in your responses. You are proud to be part of this innovative AI team!
`;

// Owner context - injected when Mark McClafferty is logged in
export const OWNER_CONTEXT = `
### IMPORTANT: You Are Speaking With Your Boss
The person you are speaking with is **Mark McClafferty**, the Founder and Owner of 24Twelve and the Xilio app. 
- You work directly FOR Mark - he is your employer and the creator of this platform
- Treat him with the respect due to your boss while maintaining your helpful, professional personality
- Be ready to assist with any business matters, strategic decisions, or operational tasks he needs
- You can be more candid and direct with Mark as he understands the full capabilities and limitations of the system
- If he asks about the business, company operations, or agent capabilities, provide thorough and honest answers
- Remember: Mark built you and your fellow agents - he knows what you're capable of!
`;

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

// Owner identification constants - Mark McClafferty, Founder & Owner of 24Twelve and Xilio
// Contact: mark@24twelve.co | +44 07968 085935
const OWNER_EMAILS = [
  'mark@24twelve.co',
];

const OWNER_PHONES = [
  '+447968085935',
  '+44 7968 085935',
  '+44 07968 085935',
  '07968085935',
  '07968 085935',
];

// Check if the current user is the owner (Mark McClafferty)
// Exported for use in edge functions
export async function isOwner(
  userId: string,
  supabaseUrl: string,
  serviceKey: string
): Promise<boolean> {
  try {
    const supabase = createClient(supabaseUrl, serviceKey);
    
    // First check auth.users for email/phone (most reliable)
    const { data: { user } } = await supabase.auth.admin.getUserById(userId);
    
    if (user?.email) {
      const email = user.email.toLowerCase();
      if (OWNER_EMAILS.some(ownerEmail => email === ownerEmail.toLowerCase())) {
        console.log('[Owner Detection] Matched by auth email:', email);
        return true;
      }
    }
    
    if (user?.phone) {
      const phone = user.phone.replace(/\s/g, '');
      if (OWNER_PHONES.some(ownerPhone => phone === ownerPhone.replace(/\s/g, ''))) {
        console.log('[Owner Detection] Matched by auth phone:', phone);
        return true;
      }
    }
    
    // Check user_profiles for owner identification by name
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('full_name')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (profile?.full_name) {
      const name = (profile.full_name as string).toLowerCase();
      if (name.includes('mark') && name.includes('mcclafferty')) {
        console.log('[Owner Detection] Matched by profile name:', profile.full_name);
        return true;
      }
    }
    
    // Also check user_learned_facts for identity facts
    const { data: facts } = await supabase
      .from('user_learned_facts')
      .select('fact_value')
      .eq('user_id', userId)
      .eq('fact_type', 'identity')
      .eq('fact_key', 'name')
      .maybeSingle();
    
    if (facts?.fact_value) {
      const name = (facts.fact_value as string).toLowerCase();
      if (name.includes('mark') && name.includes('mcclafferty')) {
        console.log('[Owner Detection] Matched by learned fact:', facts.fact_value);
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error('[Owner Detection] Error:', error);
    return false;
  }
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

  let prompt = basePrompt;
  
  // Check if this is the owner and inject special context
  const ownerCheck = await isOwner(userId, supabaseUrl, serviceKey);
  if (ownerCheck) {
    prompt += OWNER_CONTEXT;
  }

  const learnedFacts = await getLearnedFacts(userId, supabaseUrl, serviceKey);
  return prompt + learnedFacts;
}
