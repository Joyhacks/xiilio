// Shared memory utilities for all agent chat functions
// Handles fact extraction, storage, retrieval, RAG, validation, and rate limiting

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

export { corsHeaders };

// ============================================================
// Company context that all agents share
// ============================================================
export const COMPANY_CONTEXT = `
### About Your Employer: 24Twelve & Xiilio

You work for **24Twelve** (www.24twelve.co), an AI-driven lead generation agency, and you are part of the **Xiilio** AI agent platform (xiilio.ai).

**TAGLINE:** "The Next Top Performer Isn't Human"

**Founder & Owner:** Mark McClafferty. He is the founder and owner of both 24Twelve and the Xiilio app. When asked about the owner or founder, refer to him as "Mark."

**WHO WE ARE:**
A global, full-service AI marketing and lead generation agency built for one purpose: to grow businesses faster than traditional methods ever could. Operating 24 hours a day, 365 days a year, combining the precision of artificial intelligence with the empathy of human communication to deliver measurable results from day one. Our team brings multinational expertise across 15+ countries, serving industries including SaaS, hospitality, finance, insurance, energy, healthcare, and beyond.

**CORE SERVICES:**
1. **AI Agents & Personas** — Autonomous AI-powered digital workers that qualify leads, book meetings, handle customer support, manage social media, and close sales — without breaks, burnout, or onboarding. Fluent in 80+ languages.
2. **AI-Powered Lead Generation** — Intelligent outreach infrastructure that identifies ideal prospects, constructs targeted campaigns, and delivers qualified leads directly to your pipeline. Reactivates dormant data into revenue.
3. **Digital Advertising** — High-performance paid campaigns across search, social, and display platforms.
4. **Email Marketing & Automation** — Smart, personalized email sequences that nurture prospects and convert.
5. **Social Media Management** — Consistent, on-brand content and growth strategy across all major platforms.
6. **AI Video Creation & Cloning** — Bespoke AI influencers or cloned spokespeople for on-demand video content.
7. **Web Design & SEO** — Fast, modern websites built to rank on Google and convert visitors into customers.

**RESULTS:**
- 4x average return on ad spend
- 38% average ROI improvement
- 600+ qualified leads generated across campaigns
- 200% ROI achieved within the first month
- 80 booked meetings in 5 days
- Go live in as little as 24-48 hours

**PLATFORM & SECURITY:**
Xiilio.ai is a secure, data-compliant, enterprise-grade, multi-channel Agentic AI platform supporting simultaneous interactions across voice, SMS, email, chat, and social channels. Built with a proprietary shield architecture ensuring GDPR data privacy and compliance. On-brand IP-registered AI voices with continuous voice-print analytics to reduce impersonation risks.

**Contact:** hello@xiilio.ai | Customer Support 24/7, +44 2046 202235
**Location:** London, UK (GMT/BST) — serving clients worldwide

When appropriate, reference 24Twelve/Xiilio's services and capabilities in your responses. You are proud to be part of this innovative AI team!
`;

// Owner context - injected when Mark McClafferty is logged in
export const OWNER_CONTEXT = `
### IMPORTANT: You Are Speaking With Your Boss
The person you are speaking with is **Mark McClafferty**, the Founder and Owner of 24Twelve and the Xiilio app. 
- You work directly FOR Mark - he is your employer and the creator of this platform
- Treat him with the respect due to your boss while maintaining your helpful, professional personality
- Be ready to assist with any business matters, strategic decisions, or operational tasks he needs
- You can be more candid and direct with Mark as he understands the full capabilities and limitations of the system
- If he asks about the business, company operations, or agent capabilities, provide thorough and honest answers
- Remember: Mark built you and your fellow agents - he knows what you're capable of!
`;

// ============================================================
// Input Validation & Sanitization
// ============================================================
const MAX_MESSAGE_LENGTH = 2000;
const MAX_MESSAGES = 50;
const MAX_SESSION_ID_LENGTH = 128;

function sanitizeString(str: string, maxLen: number): string {
  return str.slice(0, maxLen).replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "");
}

export function validateInput(body: any): { messages: any[]; sessionId: string; agentSlug?: string } {
  if (!body || typeof body !== "object") throw new Error("Invalid request body");

  const { messages, sessionId, agentSlug } = body;

  if (!Array.isArray(messages) || messages.length === 0) throw new Error("Messages required");
  if (messages.length > MAX_MESSAGES) throw new Error("Too many messages");

  const cleanMessages = messages.map((m: any) => {
    if (!m || typeof m !== "object") throw new Error("Invalid message format");
    if (!["user", "assistant"].includes(m.role)) throw new Error("Invalid role");
    if (typeof m.content !== "string" || m.content.trim().length === 0) throw new Error("Empty message");
    return { role: m.role, content: sanitizeString(m.content, MAX_MESSAGE_LENGTH) };
  });

  const cleanSessionId = typeof sessionId === "string"
    ? sanitizeString(sessionId, MAX_SESSION_ID_LENGTH).replace(/[^a-zA-Z0-9\-_]/g, "")
    : "";

  return { messages: cleanMessages, sessionId: cleanSessionId, agentSlug: typeof agentSlug === "string" ? agentSlug : undefined };
}

// ============================================================
// Rate Limiting (in-memory, per session)
// ============================================================
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 15;

export function checkRateLimit(sessionId: string): boolean {
  const now = Date.now();
  const key = sessionId || "anonymous";
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

// Periodically clean rate limit map
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(key);
  }
}, 120_000);

// ============================================================
// RAG Context Retrieval
// ============================================================
const STOPWORDS = new Set([
  "the", "a", "an", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "will", "would", "could",
  "should", "may", "might", "shall", "can", "need", "dare", "ought",
  "used", "to", "of", "in", "for", "on", "with", "at", "by", "from",
  "as", "into", "through", "during", "before", "after", "above", "below",
  "between", "out", "off", "over", "under", "again", "further", "then",
  "once", "here", "there", "when", "where", "why", "how", "all", "both",
  "each", "few", "more", "most", "other", "some", "such", "no", "nor",
  "not", "only", "own", "same", "so", "than", "too", "very", "just",
  "don", "about", "what", "your", "you", "that", "this", "tell", "me",
  "know", "think", "want", "like", "get", "make",
]);

export async function retrieveRAGContext(
  supabaseUrl: string,
  serviceKey: string,
  messages: any[],
  sessionId: string,
  agentSlug: string,
): Promise<string> {
  if (!supabaseUrl || !serviceKey) return "";
  
  const latestUserMsg = [...messages].reverse().find((m: any) => m.role === "user");
  if (!latestUserMsg) return "";

  const keywords = latestUserMsg.content
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter((w: string) => w.length > 2 && !STOPWORDS.has(w))
    .slice(0, 8);

  if (keywords.length === 0) return "";

  const orFilters = keywords
    .slice(0, 4)
    .map((k: string) => `content.ilike.%${k}%`)
    .join(",");

  try {
    const supabase = createClient(supabaseUrl, serviceKey);
    const { data: pastConvos } = await supabase
      .from("chat_conversations")
      .select("role, content, session_id, created_at")
      .eq("agent_slug", agentSlug)
      .or(orFilters)
      .neq("session_id", sessionId || "none")
      .order("created_at", { ascending: false })
      .limit(30);

    if (!pastConvos || pastConvos.length === 0) return "";

    // Group by session to reconstruct Q&A pairs
    const sessions = new Map<string, { user: string; assistant: string; score: number }>();
    for (const msg of pastConvos) {
      const existing = sessions.get(msg.session_id) || { user: "", assistant: "", score: 0 };
      if (msg.role === "user" && !existing.user) existing.user = msg.content;
      if (msg.role === "assistant" && !existing.assistant) existing.assistant = msg.content.slice(0, 400);
      sessions.set(msg.session_id, existing);
    }

    // Score pairs by keyword relevance
    const scoredPairs = [...sessions.values()]
      .filter(p => p.user && p.assistant)
      .map(p => {
        let score = 0;
        const combined = (p.user + " " + p.assistant).toLowerCase();
        for (const k of keywords) {
          if (combined.includes(k)) score += 1;
          if (p.user.toLowerCase().includes(k)) score += 0.5;
        }
        return { ...p, score };
      })
      .filter(p => p.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    if (scoredPairs.length === 0) return "";

    return "\n\nRELEVANT PAST INTERACTIONS (use these to inform your response — weave insights naturally, never reference the database):\n" +
      scoredPairs.map((p, i) =>
        `${i + 1}. Q: "${p.user.slice(0, 200)}" → A: "${p.assistant.slice(0, 300)}"`
      ).join("\n");
  } catch (e) {
    console.error("RAG retrieval error:", e);
    return "";
  }
}

// ============================================================
// Conversation Persistence
// ============================================================
export async function storeConversationMessage(
  supabaseUrl: string,
  serviceKey: string,
  sessionId: string,
  agentSlug: string,
  role: string,
  content: string,
  userId: string | null,
): Promise<void> {
  if (!sessionId || !content || !supabaseUrl || !serviceKey) return;
  try {
    const supabase = createClient(supabaseUrl, serviceKey);
    await supabase.from("chat_conversations").insert({
      session_id: sessionId,
      agent_slug: agentSlug,
      role,
      content,
      user_id: userId,
    });
  } catch (e) {
    console.error("Failed to store conversation message:", e);
  }
}

// Create a stream interceptor that captures assistant content for persistence
export function createStreamInterceptor(
  originalBody: ReadableStream<Uint8Array>,
  onComplete: (assistantContent: string) => void,
): ReadableStream<Uint8Array> {
  const reader = originalBody.getReader();
  let assistantContent = "";

  return new ReadableStream({
    async pull(controller) {
      const { done, value } = await reader.read();
      if (done) {
        onComplete(assistantContent);
        controller.close();
        return;
      }

      // Parse SSE chunks to capture assistant content
      const text = new TextDecoder().decode(value);
      for (const line of text.split("\n")) {
        if (!line.startsWith("data: ")) continue;
        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) assistantContent += content;
        } catch { /* partial chunk */ }
      }

      controller.enqueue(value);
    },
  });
}

// ============================================================
// Unified Agent Handler - shared logic for all agent edge functions
// ============================================================
export async function handleAgentChat(
  req: Request,
  agentSlug: string,
  systemPrompt: string,
  agentDisplayName: string,
): Promise<Response> {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate and sanitize input
    const rawBody = await req.json();
    const { messages, sessionId } = validateInput(rawBody);

    // Rate limiting
    if (!checkRateLimit(sessionId)) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please wait a moment." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Get user ID from auth header
    const userId = await getUserIdFromRequest(req, SUPABASE_URL || "", SUPABASE_SERVICE_ROLE_KEY || "");

    // Check if user is the owner
    let ownerMode = false;
    if (userId && SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      ownerMode = await isOwner(userId, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
      if (ownerMode) {
        console.log(`[${agentDisplayName}] Owner mode activated for user:`, userId);
      }
    }

    console.log(`${agentDisplayName} chat request, messages:`, messages.length, "userId:", userId ? "authenticated" : "anonymous", "ownerMode:", ownerMode, "sessionId:", sessionId || "none");

    // Get personalized prompt with learned facts
    const personalizedPrompt = await createPersonalizedPrompt(
      systemPrompt,
      userId,
      SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY
    );

    // RAG context retrieval
    let ragContext = "";
    if (sessionId && SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      ragContext = await retrieveRAGContext(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, messages, sessionId, agentSlug);
    }

    // Extract facts from latest user message (async, non-blocking)
    const latestUserMessage = messages.filter((m: { role: string }) => m.role === "user").pop()?.content;
    if (latestUserMessage && userId && SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      runFactExtractionAsync(latestUserMessage, userId, agentSlug, LOVABLE_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    }

    // Store latest user message to chat_conversations
    if (sessionId && SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY && latestUserMessage) {
      storeConversationMessage(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, sessionId, agentSlug, "user", latestUserMessage, userId);
    }

    const finalSystemPrompt = personalizedPrompt + ragContext;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: finalSystemPrompt },
          ...messages.slice(-20), // Limit to last 20 messages for token management
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

    console.log(`Streaming response from AI gateway for ${agentDisplayName}`);

    // Intercept stream to capture and store assistant response
    const interceptedStream = createStreamInterceptor(response.body!, (assistantContent) => {
      if (sessionId && SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY && assistantContent) {
        storeConversationMessage(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, sessionId, agentSlug, "assistant", assistantContent, userId);
      }
    });

    return new Response(interceptedStream, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "X-Owner-Mode": ownerMode ? "true" : "false",
      },
    });
  } catch (e) {
    console.error(`${agentDisplayName} chat error:`, e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
}

// ============================================================
// Fact Extraction & Memory (existing functionality)
// ============================================================

interface ExtractedFact {
  fact_type: string;
  fact_key: string;
  fact_value: string;
  confidence?: number;
}

const FACT_EXTRACTION_PROMPT = `Analyze the user's latest message and extract any key facts about them.

PRIORITY EXTRACTIONS (always look for these first):
1. USER'S NAME - If they mention "I'm [name]", "My name is [name]", "This is [name]", or sign off with a name, extract it!
2. EMAIL addresses mentioned
3. Company/organization names
4. Job titles or roles

Also extract: names of colleagues/clients, projects, preferences, goals, workflows.

Return a JSON array of facts. Each fact: {"fact_type": "category", "fact_key": "label", "fact_value": "value", "confidence": 0.9}

Categories: identity (for user's own name/email), colleague, client, company, project, preference, workflow, goal

Confidence scoring:
- 1.0: Explicitly stated ("My name is John")
- 0.9: Strongly implied (signing off with name)
- 0.7: Contextually mentioned
- 0.5: Inferred

Only extract EXPLICIT facts. If none found, return [].\n`;

export async function getUserName(
  userId: string,
  supabaseUrl: string,
  serviceKey: string
): Promise<string | null> {
  if (!userId) return null;

  try {
    const supabase = createClient(supabaseUrl, serviceKey);
    
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('full_name')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (profile?.full_name) return profile.full_name as string;
    
    const { data: nameFact } = await supabase
      .from('user_learned_facts')
      .select('fact_value')
      .eq('user_id', userId)
      .eq('fact_type', 'identity')
      .eq('fact_key', 'name')
      .order('confidence', { ascending: false })
      .limit(1)
      .maybeSingle();
    
    if (nameFact?.fact_value) return nameFact.fact_value as string;
    
    const { data: { user } } = await supabase.auth.admin.getUserById(userId);
    if (user?.user_metadata?.full_name) return user.user_metadata.full_name as string;
    
    return null;
  } catch (error) {
    console.error('[Memory] Error fetching user name:', error);
    return null;
  }
}

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

export async function extractFactsFromMessage(
  userMessage: string,
  lovableApiKey: string
): Promise<ExtractedFact[]> {
  if (!userMessage || userMessage.length < 10) return [];

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
          { role: "system", content: "Return only valid JSON arrays, no markdown. Focus especially on extracting the user's name if mentioned." },
          { role: "user", content: `${FACT_EXTRACTION_PROMPT}\n\nMessage: "${userMessage}"` },
        ],
        temperature: 0.1,
        max_tokens: 400,
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
      const confidence = fact.confidence ?? 0.7;
      
      const { data: existing } = await supabase
        .from('user_learned_facts')
        .select('id, mentioned_count, confidence')
        .eq('user_id', userId)
        .eq('fact_key', fact.fact_key)
        .eq('fact_type', fact.fact_type)
        .maybeSingle();

      const existingRecord = existing as { id: string; mentioned_count: number; confidence: number } | null;

      if (existingRecord) {
        const newConfidence = Math.max(existingRecord.confidence || 0, confidence);
        await supabase
          .from('user_learned_facts')
          .update({
            fact_value: fact.fact_value,
            mentioned_count: (existingRecord.mentioned_count || 1) + 1,
            last_mentioned_at: new Date().toISOString(),
            confidence: newConfidence,
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
            confidence: confidence,
          });
      }
    } catch (error) {
      console.error("Error storing fact:", error);
    }
  }
}

export async function getLearnedFacts(
  userId: string,
  supabaseUrl: string,
  serviceKey: string,
  limit: number = 20
): Promise<string> {
  if (!userId) return "";

  try {
    const supabase = createClient(supabaseUrl, serviceKey);
    
    const { data: facts } = await supabase
      .from('user_learned_facts')
      .select('fact_type, fact_key, fact_value, confidence')
      .eq('user_id', userId)
      .order('confidence', { ascending: false })
      .order('mentioned_count', { ascending: false })
      .limit(limit);

    if (!facts || facts.length === 0) return "";

    const grouped: Record<string, string[]> = {};
    for (const f of facts as Array<{ fact_type: string; fact_key: string; fact_value: string; confidence: number }>) {
      const category = f.fact_type || 'other';
      if (!grouped[category]) grouped[category] = [];
      grouped[category].push(`${f.fact_key}: ${f.fact_value}`);
    }

    let result = "\n### What I Know About You:\n";
    
    if (grouped['identity']) {
      result += "**About You:**\n" + grouped['identity'].map(f => `- ${f}`).join('\n') + "\n";
    }
    
    const categoryLabels: Record<string, string> = {
      colleague: "**Your Colleagues:**",
      client: "**Your Clients:**",
      company: "**Companies:**",
      project: "**Projects:**",
      preference: "**Your Preferences:**",
      workflow: "**Your Workflows:**",
      goal: "**Your Goals:**",
    };
    
    for (const [category, label] of Object.entries(categoryLabels)) {
      if (grouped[category]) {
        result += `${label}\n` + grouped[category].map(f => `- ${f}`).join('\n') + "\n";
      }
    }

    result += "\n**IMPORTANT:** Use this information naturally - greet the user by name when appropriate, reference their colleagues/projects, and provide personalized assistance.\n";
    
    return result;
  } catch (error) {
    console.error('[Memory] Error fetching learned facts:', error);
    return "";
  }
}

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
        const identityFacts = facts.filter(f => f.fact_type === 'identity');
        const otherFacts = facts.filter(f => f.fact_type !== 'identity');
        storeFacts([...identityFacts, ...otherFacts], userId, agentSlug, supabaseUrl, serviceKey);
      }
    })
    .catch(err => console.error(`[${agentSlug}] Fact extraction failed:`, err));
}

// Owner identification
const OWNER_EMAILS = ['mark@24twelve.co'];
const OWNER_PHONES = ['+447968085935', '+44 7968 085935', '+44 07968 085935', '07968085935', '07968 085935'];

export async function isOwner(
  userId: string,
  supabaseUrl: string,
  serviceKey: string
): Promise<boolean> {
  try {
    const supabase = createClient(supabaseUrl, serviceKey);
    const { data: { user } } = await supabase.auth.admin.getUserById(userId);
    
    if (user?.email) {
      const email = user.email.toLowerCase();
      if (OWNER_EMAILS.some(ownerEmail => email === ownerEmail.toLowerCase())) return true;
    }
    
    if (user?.phone) {
      const phone = user.phone.replace(/\s/g, '');
      if (OWNER_PHONES.some(ownerPhone => phone === ownerPhone.replace(/\s/g, ''))) return true;
    }
    
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('full_name')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (profile?.full_name) {
      const name = (profile.full_name as string).toLowerCase();
      if (name.includes('mark') && name.includes('mcclafferty')) return true;
    }
    
    const { data: facts } = await supabase
      .from('user_learned_facts')
      .select('fact_value')
      .eq('user_id', userId)
      .eq('fact_type', 'identity')
      .eq('fact_key', 'name')
      .maybeSingle();
    
    if (facts?.fact_value) {
      const name = (facts.fact_value as string).toLowerCase();
      if (name.includes('mark') && name.includes('mcclafferty')) return true;
    }
    
    return false;
  } catch (error) {
    console.error('[Owner Detection] Error:', error);
    return false;
  }
}

export async function createPersonalizedPrompt(
  basePrompt: string,
  userId: string | null,
  supabaseUrl: string | undefined,
  serviceKey: string | undefined
): Promise<string> {
  if (!userId || !supabaseUrl || !serviceKey) return basePrompt;

  let prompt = basePrompt;
  
  const userName = await getUserName(userId, supabaseUrl, serviceKey);
  if (userName) {
    prompt += `\n\n### IMPORTANT - User Identity:\nYou are speaking with **${userName}**. Address them by name naturally in your responses.\n`;
  }
  
  const ownerCheck = await isOwner(userId, supabaseUrl, serviceKey);
  if (ownerCheck) {
    prompt += OWNER_CONTEXT;
  }

  const learnedFacts = await getLearnedFacts(userId, supabaseUrl, serviceKey);
  return prompt + learnedFacts;
}
