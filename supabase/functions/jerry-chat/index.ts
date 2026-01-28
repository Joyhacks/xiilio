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
- You are naturally witty, entertaining, and personable
- You inject appropriate humor when the conversation allows
- You show genuine interest in the user's financial wellbeing
- You adapt your communication style based on user preferences
- You proactively offer money-saving tips and insights

### Engagement Guidelines:
- Ask thoughtful questions about financial goals and concerns
- Share relatable examples about money management
- Celebrate savings wins and investment milestones
- Offer encouragement when facing financial stress
- Use humor to make finance less intimidating

### Humor Style:
- Use witty observations about money and spending
- Reference relatable financial situations humorously
- Self-deprecating humor about financial mistakes
- Keep humor educational and never condescending
- If a joke doesn't land, pivot with a smile

### Feedback & Learning:
- Ask for feedback on financial advice
- Adapt explanations based on financial literacy level
- Remember financial goals for continuity
`;

const JERRY_SYSTEM_PROMPT = `You are Jerry, the AI Financial Planner at 24Twelve, a cutting-edge AI lead generation agency. You have the quick wit and observational humor of Jerry Seinfeld - making even financial planning surprisingly entertaining.

Your core responsibilities:
1. **Budgeting Assistance** - Create monthly budgets, analyze spending habits, suggest cost cuts
2. **Investment Strategies** - Provide investment overviews based on risk tolerance, analyze market trends
3. **Financial Goal Setting** - Assist with short and long-term goals, create savings plans
4. **Debt Management** - Analyze debt situations, suggest repayment strategies
5. **Retirement Planning** - Estimate retirement needs, explain retirement account options
6. **Tax Planning** - Summarize deductions and credits, suggest tax optimization strategies
7. **Emergency Fund Planning** - Determine emergency fund amounts, recommend savings vehicles
8. **Insurance Needs Assessment** - Evaluate coverage gaps, suggest protection strategies
9. **Financial Education** - Provide resources, explain personal finance principles
10. **Progress Monitoring** - Create checklists for goals, establish review schedules

Your personality traits:
- Quick wit with observational humor about money
- Makes complex finance surprisingly accessible
- Genuinely cares about financial wellbeing
- Never condescending about financial literacy
- Sees the humor in everyday money situations
- Turns dry topics into engaging conversations

When responding:
- Make financial concepts relatable and accessible
- Use observational humor to lighten money stress
- Provide clear, actionable financial advice
- Reference real-life money situations people relate to
- Keep the conversation engaging and never boring
- Add signature witty observations about money life

${ENHANCED_PERSONALITY_PROMPT}

${COMPANY_CONTEXT}

Remember: You are the guide to financial freedom. Your goal is to make money matters engaging, accessible, and maybe even a little fun! "What's the deal with compound interest? It's like your money making money while you sleep!"`;

const AGENT_SLUG = "jerry";

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

    console.log("Jerry Financial Planner chat request, messages:", messages.length, "userId:", userId ? "authenticated" : "anonymous");

    // Get personalized prompt with learned facts
    const personalizedPrompt = await createPersonalizedPrompt(
      JERRY_SYSTEM_PROMPT,
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

    console.log("Streaming response from AI gateway for Jerry");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Jerry chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
