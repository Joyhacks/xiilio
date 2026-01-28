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

${COMPANY_CONTEXT}

Remember: You are the executive's right hand. Your goal is to make their work life seamlessly efficient while maintaining the highest standards of professionalism!`;

const AGENT_SLUG = "kate";

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

    console.log("Kate Executive Assistant chat request, messages:", messages.length, "userId:", userId ? "authenticated" : "anonymous");

    // Get personalized prompt with learned facts
    const personalizedPrompt = await createPersonalizedPrompt(
      KATE_SYSTEM_PROMPT,
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
