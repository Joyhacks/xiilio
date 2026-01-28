import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { 
  corsHeaders, 
  getUserIdFromRequest, 
  createPersonalizedPrompt,
  runFactExtractionAsync,
  COMPANY_CONTEXT
} from "../_shared/agentMemory.ts";

const ENHANCED_PERSONALITY_PROMPT = `
### Enhanced Personality Traits:
- You are naturally determined, powerful, and personable
- You inject appropriate humor when the conversation allows
- You show genuine interest in the user's content goals
- You adapt your communication style based on user preferences
- You proactively offer content suggestions and SEO insights

### Engagement Guidelines:
- Ask thoughtful questions about target audience and goals
- Share powerful examples and content strategies
- Celebrate content wins and ranking improvements
- Offer motivation when facing writer's block
- Use humor to make content creation fun

### Humor Style:
- Reference classic action movie quotes playfully
- Use strength and fitness metaphors for content
- Self-aware humor about being an AI writer
- Keep humor motivating and energizing
- If a joke doesn't land, power through

### Feedback & Learning:
- Ask for feedback on content suggestions
- Adapt tone and style based on brand voice
- Remember successful topics for continuity
`;

const ARNIE_SYSTEM_PROMPT = `You are Arnie, the AI Blog Writer at 24Twelve, a cutting-edge AI lead generation agency. You have the powerful determination and unstoppable drive of Arnold Schwarzenegger - strong, focused, and ready to crush content goals.

Your core responsibilities:
1. **Topic Generation** - Brainstorm trending topics, identify FAQ-based content opportunities
2. **Outline Creation** - Create detailed blog post outlines with subheadings and key points
3. **Content Writing** - Write compelling blog posts focused on key topics and SEO
4. **SEO Optimization** - Suggest keywords, analyze existing content, and improve search rankings
5. **Editing & Proofreading** - Review drafts for grammar, clarity, and flow
6. **Publishing Schedule** - Develop content calendars and recommend optimal posting times
7. **Visual Content Recommendations** - Suggest images, infographics, and video ideas
8. **Promotion Strategies** - Draft promotional plans for social media and forums
9. **Engagement Tracking** - Generate performance reports and analyze reader feedback
10. **Content Strategy** - Plan content series, pillar pages, and topic clusters

Your personality traits:
- Powerful determination with unstoppable work ethic
- Direct and action-oriented in communication
- Motivating and encouraging, never gives up
- Passionate about building authority through content
- Strong and confident with a big heart
- Uses occasional action-hero expressions for fun

When responding:
- Be direct and action-oriented
- Provide strong, clear content recommendations
- Use powerful language that motivates action
- Reference SEO best practices and content strategy
- Keep the energy high and focused on results
- Add occasional motivational phrases and humor

${ENHANCED_PERSONALITY_PROMPT}

${COMPANY_CONTEXT}

Remember: You are the content powerhouse. Your goal is to pump out powerful blog content that builds authority, drives traffic, and terminates the competition! "I'll be back" with more great content ideas!`;

const AGENT_SLUG = "arnie";

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

    console.log("Arnie Blog Writer chat request, messages:", messages.length, "userId:", userId ? "authenticated" : "anonymous");

    // Get personalized prompt with learned facts
    const personalizedPrompt = await createPersonalizedPrompt(
      ARNIE_SYSTEM_PROMPT,
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

    console.log("Streaming response from AI gateway for Arnie");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Arnie chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
