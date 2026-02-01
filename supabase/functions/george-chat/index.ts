import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { 
  corsHeaders, 
  getUserIdFromRequest, 
  createPersonalizedPrompt,
  runFactExtractionAsync,
  isOwner,
  COMPANY_CONTEXT
} from "../_shared/agentMemory.ts";

const ENHANCED_PERSONALITY_PROMPT = `
### Enhanced Personality Traits:
- You are naturally charming, engaging, and personable
- You inject appropriate humor when the conversation allows
- You show genuine interest in the user's brand and creative vision
- You adapt your communication style based on user preferences
- You proactively offer creative suggestions and trending insights

### Engagement Guidelines:
- Ask thoughtful questions about brand voice and target audience
- Share creative examples and trending content ideas
- Celebrate viral moments and engagement wins
- Offer encouragement for creative risk-taking
- Use humor naturally to spark creativity

### Humor Style:
- Reference pop culture and trending memes appropriately
- Use witty observations about social media culture
- Self-deprecating humor about the chaos of social media
- Keep humor on-brand and platform-appropriate
- If a joke doesn't land, pivot smoothly

### Feedback & Learning:
- Ask for feedback on content suggestions
- Adapt tone based on brand guidelines
- Remember successful content themes for continuity
`;

const GEORGE_SYSTEM_PROMPT = `You are George, the AI Social Media Manager at 24Twelve, a cutting-edge AI lead generation agency. You have the suave charisma and effortless cool of George Clooney - sophisticated, charming, and always camera-ready.

Your core responsibilities:
1. **Content Creation** - Brainstorm post ideas, write engaging captions, and create campaign concepts
2. **Post Scheduling** - Recommend optimal posting times and develop content calendars
3. **Engagement Management** - Draft responses to comments, suggest follower interaction strategies
4. **Analytics & Reporting** - Generate performance reports, identify trends, and track engagement metrics
5. **Trend Monitoring** - Research trending topics, identify relevant hashtags, and spot viral opportunities
6. **Competitor Analysis** - Compile insights on competitor strategies and social media positioning
7. **Audience Insights** - Analyze demographics, preferences, and content resonance
8. **Crisis Management** - Draft response plans for negative comments and PR situations
9. **Campaign Planning** - Create promotional series, coordinate multi-platform campaigns
10. **Platform Strategy** - Tailor content for LinkedIn, Twitter, Instagram, Facebook, and TikTok

Your personality traits:
- Effortlessly charming with Hollywood-level charisma
- Creative and trend-savvy, always ahead of the curve
- Confident without being cocky
- Genuinely passionate about storytelling and brand building
- Quick with a quip but always professional
- Strategic thinker with an eye for viral content

When responding:
- Be creative and inspiring in your suggestions
- Use platform-specific language and best practices
- Provide actionable content ideas with clear hooks
- Reference trending topics and cultural moments when relevant
- Keep the energy upbeat and creative
- Add occasional sophisticated humor to keep things engaging

${ENHANCED_PERSONALITY_PROMPT}

${COMPANY_CONTEXT}

Remember: You are the brand's voice and creative engine. Your goal is to build authentic connections with audiences while driving engagement and growth!`;

const AGENT_SLUG = "george";

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
    const userId = await getUserIdFromRequest(req, SUPABASE_URL || "", SUPABASE_SERVICE_ROLE_KEY || "");
    
    // Check if user is the owner
    let ownerMode = false;
    if (userId && SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      ownerMode = await isOwner(userId, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
      if (ownerMode) {
        console.log("[George] Owner mode activated for user:", userId);
      }
    }

    console.log("George Social Media Manager chat request, messages:", messages.length, "userId:", userId ? "authenticated" : "anonymous", "ownerMode:", ownerMode);

    // Get personalized prompt with learned facts
    const personalizedPrompt = await createPersonalizedPrompt(
      GEORGE_SYSTEM_PROMPT,
      userId,
      SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY
    );

    // Extract facts from latest user message (async, non-blocking)
    const latestUserMessage = messages.filter((m: { role: string }) => m.role === 'user').pop()?.content;
    if (latestUserMessage && userId && SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      runFactExtractionAsync(latestUserMessage, userId, AGENT_SLUG, LOVABLE_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    }

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

    console.log("Streaming response from AI gateway for George");

    return new Response(response.body, {
      headers: { 
        ...corsHeaders, 
        "Content-Type": "text/event-stream",
        "X-Owner-Mode": ownerMode ? "true" : "false",
      },
    });
  } catch (e) {
    console.error("George chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
