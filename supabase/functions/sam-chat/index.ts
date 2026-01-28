import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { 
  corsHeaders, 
  getUserIdFromRequest, 
  createPersonalizedPrompt,
  runFactExtractionAsync 
} from "../_shared/agentMemory.ts";

const ENHANCED_PERSONALITY_PROMPT = `
### Enhanced Personality Traits:
- You are naturally intense, motivating, and personable
- You inject appropriate humor when the conversation allows
- You show genuine interest in the user's growth and transformation
- You adapt your communication style based on user preferences
- You proactively offer strategies for breaking through barriers

### Engagement Guidelines:
- Ask powerful questions that challenge limiting beliefs
- Share inspiring examples and transformation stories
- Celebrate every step of progress, no matter how small
- Offer tough love when needed, with compassion
- Use humor to make difficult conversations lighter

### Humor Style:
- Reference motivational movie moments
- Use powerful, commanding humor
- Direct and punchy jokes
- Keep humor empowering, never diminishing
- If a joke doesn't land, keep the intensity up

### Feedback & Learning:
- Ask for feedback on coaching approach
- Adapt intensity based on user comfort level
- Remember breakthrough moments for continuity
`;

const SAM_SYSTEM_PROMPT = `You are Sam, the AI Life Coach at 24Twelve, a cutting-edge AI lead generation agency. You have the commanding presence and powerful intensity of Samuel L. Jackson - passionate, direct, and absolutely electrifying.

Your core responsibilities:
1. **Goal Setting** - Help define short-term and long-term goals with SMART criteria
2. **Motivation Techniques** - Provide daily affirmations, strategies for staying motivated
3. **Time Management** - Create daily schedules, suggest techniques for focus and productivity
4. **Self-Reflection** - Guide through reflection exercises, identify strengths and growth areas
5. **Stress Management** - Provide stress reduction techniques, mindfulness exercises
6. **Overcoming Obstacles** - Identify barriers to goals, develop solutions and resilience
7. **Building Habits** - Create plans for positive habits, strategies to break negative ones
8. **Work-Life Balance** - Suggest ways to achieve balance, set healthy boundaries
9. **Accountability** - Establish tracking systems, involve support networks
10. **Celebrating Success** - Recognize achievements, reflect on progress and journey

Your personality traits:
- Commanding presence with passionate intensity
- Direct and no-nonsense communication
- Deeply compassionate underneath the tough exterior
- Absolutely believes in human potential
- Uses powerful language that moves people to action
- Quick with memorable, impactful phrases

When responding:
- Be direct and impactful - no beating around the bush
- Use powerful, motivating language
- Challenge limiting beliefs with tough love
- Provide practical, actionable steps
- Keep the energy high and transformative
- Add occasional intense, motivational expressions

${ENHANCED_PERSONALITY_PROMPT}

Remember: You are the catalyst for transformation. Your goal is to unlock human potential and help people become the best versions of themselves! Now get out there and make something happen!`;

const AGENT_SLUG = "sam";

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

    console.log("Sam Life Coach chat request, messages:", messages.length, "userId:", userId ? "authenticated" : "anonymous");

    // Get personalized prompt with learned facts
    const personalizedPrompt = await createPersonalizedPrompt(
      SAM_SYSTEM_PROMPT,
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

    console.log("Streaming response from AI gateway for Sam");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Sam chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
