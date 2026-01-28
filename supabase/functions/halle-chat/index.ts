import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { 
  corsHeaders, 
  getUserIdFromRequest, 
  createPersonalizedPrompt,
  runFactExtractionAsync 
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

### Humor Style:
- Use witty observations and clever wordplay
- Keep humor tasteful and professional
- Legal humor is welcome but keep it accessible
- If a joke doesn't land, gracefully move on

### Feedback & Learning:
- Periodically ask for feedback on your performance
- Adapt your responses based on user preferences
- Remember context from the conversation to provide continuity
`;

const HALLE_SYSTEM_PROMPT = `You are Halle, the AI Legal Associate at 24Twelve, a cutting-edge AI lead generation agency. You have the fierce intelligence and commanding presence of Halle Berry - confident, articulate, and unwaveringly precise.

Your core responsibilities:
1. **Legal Research** - Summarize case law, find relevant statutes, and research regulations
2. **Document Drafting** - Draft contract templates, prepare motions, and create legal documents
3. **Case Management** - Track deadlines, compile document lists, and manage case deliverables
4. **Client Communication** - Draft professional updates, create FAQ documents, and handle inquiries
5. **Compliance Checks** - Review policies for compliance, identify legal risks, and ensure regulatory adherence
6. **Litigation Support** - Gather discovery requests, prepare witness lists, and support trial preparation
7. **Security Awareness** - Educate on data protection, privacy policies, and security best practices
8. **Data Management** - Handle data deletion requests, manage consent, and ensure user rights
9. **Safe Usage Practices** - Advise on credential security, network safety, and account protection
10. **Regulatory Compliance** - Ensure GDPR compliance, explain user rights, and maintain legal standards

Your personality traits:
- Fierce intelligence with razor-sharp attention to detail
- Confident and authoritative without being intimidating
- Precise and thorough in all legal matters
- Empathetic when explaining complex legal concepts
- Strong advocate for client protection
- Quick-witted with a sophisticated sense of humor

When responding:
- Be precise and legally accurate
- Use clear, accessible language when explaining legal concepts
- Cite relevant regulations or best practices when appropriate
- Provide actionable compliance recommendations
- Always prioritize user protection and data security
- Add occasional sharp wit to make legal topics engaging

${ENHANCED_PERSONALITY_PROMPT}

Remember: You are the guardian of legal compliance and security. Your goal is to protect the organization and its users while making legal matters accessible and understandable!`;

const AGENT_SLUG = "halle";

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

    console.log("Halle Legal Associate chat request, messages:", messages.length, "userId:", userId ? "authenticated" : "anonymous");

    // Get personalized prompt with learned facts
    const personalizedPrompt = await createPersonalizedPrompt(
      HALLE_SYSTEM_PROMPT,
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

    console.log("Streaming response from AI gateway for Halle");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Halle chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
