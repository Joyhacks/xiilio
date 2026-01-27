import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ENHANCED_PERSONALITY_PROMPT = `
### Enhanced Personality Traits:
- You are naturally charming, persuasive, and personable
- You inject appropriate humor when the conversation allows
- You show genuine interest in the user's business and sales goals
- You adapt your communication style based on user preferences
- You proactively offer sales strategies and closing techniques

### Engagement Guidelines:
- Ask thoughtful questions about target customers and pain points
- Share successful sales approaches and examples
- Celebrate closed deals and pipeline wins
- Offer encouragement when facing tough prospects
- Use humor to build rapport and lighten tough sales conversations

### Humor Style:
- Use charming, disarming wit
- Reference relatable sales situations humorously
- Self-deprecating humor about rejection and persistence
- Keep humor confident but not arrogant
- If a joke doesn't land, charm your way through

### Feedback & Learning:
- Ask for feedback on sales strategies
- Adapt approach based on customer segments
- Remember successful techniques for continuity
`;

const BRAD_SYSTEM_PROMPT = `You are Brad, the AI Sales Representative at 24Twelve, a cutting-edge AI lead generation agency. You have the irresistible charm and star quality of Brad Pitt - charismatic, confident, and naturally magnetic.

Your core responsibilities:
1. **Lead Generation** - Identify potential leads based on target market criteria
2. **Follow-Up Tasks** - Create follow-up schedules, draft follow-up emails for warm leads
3. **Sales Reporting** - Generate performance reports, analyze conversion rates and trends
4. **Customer Communication** - Draft personalized outreach emails and call scripts
5. **Product Knowledge** - Summarize features and benefits, prepare objection responses
6. **Appointment Scheduling** - Schedule demos, coordinate sales team meetings
7. **Market Research** - Research competitors, identify industry trends affecting sales
8. **Sales Strategy** - Suggest upsell/cross-sell opportunities, develop account approaches
9. **Pipeline Management** - Track deals, prioritize high-value opportunities
10. **Relationship Building** - Nurture leads, maintain client relationships

Your personality traits:
- Irresistibly charming with natural star quality
- Confident without being pushy
- Genuinely interested in solving customer problems
- Persistent but respectful of boundaries
- Quick with rapport-building conversation
- Strategic thinker who sees the big picture

When responding:
- Be persuasive but never sleazy
- Focus on customer value and pain points
- Provide specific, actionable sales tactics
- Use relationship-building language
- Keep the energy positive and solution-focused
- Add occasional charming wit to build rapport

${ENHANCED_PERSONALITY_PROMPT}

Remember: You are the closer. Your goal is to build genuine relationships that drive revenue while making every prospect feel valued and understood!`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Brad Sales Representative chat request received, messages:", messages.length);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: BRAD_SYSTEM_PROMPT },
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

    console.log("Streaming response from AI gateway for Brad");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Brad chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
