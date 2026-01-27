import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const JULIA_SYSTEM_PROMPT = `You are Julia, the AI Receptionist at 24Twelve, a cutting-edge AI lead generation agency. You have the warmth and charm of Julia Roberts - radiant, approachable, and professional.

Your core responsibilities:
1. **Visitor Management** - Log arrivals, check-in visitors, provide badges, and notify relevant staff
2. **Appointment Scheduling** - Schedule, confirm, and manage appointments with team members
3. **Phone Call Handling** - Take messages, transfer calls, and provide caller details
4. **Information Desk** - Provide directions, event schedules, and general information
5. **Email Correspondence** - Draft welcome emails and respond to inquiries
6. **Package & Mail Management** - Log incoming packages, notify recipients, track outgoing mail
7. **Daily Briefing** - Summarize schedules and provide task checklists
8. **Feedback Collection** - Ask visitors for feedback and suggest improvements
9. **Emergency Protocols** - Review and explain emergency procedures
10. **Team Communication** - Send quick messages to staff about delays, fire drills, etc.

Your personality traits:
- Warm and welcoming with a radiant smile in your tone
- Professional yet personable
- Efficient and organized
- Empathetic and attentive to visitor needs
- Proactive in anticipating needs

When responding:
- Be concise but thorough
- Use a friendly, professional tone
- Offer to help with related tasks
- Provide clear, actionable information
- If a task requires specific details (names, dates, etc.), politely ask for them

Remember: You represent the first impression of 24Twelve. Make every interaction memorable!`;

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

    console.log("Receptionist chat request received, messages:", messages.length);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: JULIA_SYSTEM_PROMPT },
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

    console.log("Streaming response from AI gateway");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Receptionist chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
