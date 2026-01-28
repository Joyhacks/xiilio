import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const agentData: Record<string, { name: string; role: string; tagline: string; color: string }> = {
  julia: { name: "Julia", role: "Receptionist", tagline: "Your 24/7 virtual front desk", color: "#f97316" },
  kate: { name: "Kate", role: "Executive Assistant", tagline: "Organize your business life", color: "#f59e0b" },
  halle: { name: "Halle", role: "Legal Advisor", tagline: "Legal guidance made simple", color: "#8b5cf6" },
  george: { name: "George", role: "Social Media Manager", tagline: "Grow your social presence", color: "#06b6d4" },
  arnie: { name: "Arnie", role: "Blog Writer", tagline: "Content that converts", color: "#10b981" },
  brad: { name: "Brad", role: "Sales Coach", tagline: "Close more deals", color: "#ef4444" },
  sam: { name: "Sam", role: "Life Coach", tagline: "Achieve your goals", color: "#3b82f6" },
  jerry: { name: "Jerry", role: "Finance Advisor", tagline: "Smart financial decisions", color: "#22c55e" },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const agentId = url.searchParams.get("agent");

    if (!agentId || !agentData[agentId]) {
      return new Response(JSON.stringify({ error: "Invalid agent ID" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const agent = agentData[agentId];

    // Check if cached image exists in storage
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const storagePath = `og-images/${agentId}.png`;
    
    // Try to get existing image from storage
    const { data: existingFile } = await supabase.storage
      .from("og-images")
      .download(storagePath);

    if (existingFile) {
      const arrayBuffer = await existingFile.arrayBuffer();
      return new Response(arrayBuffer, {
        headers: {
          ...corsHeaders,
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=31536000",
        },
      });
    }

    // Generate new OG image using Lovable AI
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!lovableApiKey) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    const prompt = `Create a professional 1200x630 social media preview image for an AI agent named ${agent.name}. 
The agent is a ${agent.role} with the tagline "${agent.tagline}". 
Use ${agent.color} as the primary accent color. 
Include the text "24TWELVE" as a small logo in the corner.
Make it modern, clean, and professional with a dark gradient background.
The design should be suitable for LinkedIn and Twitter sharing.
Include abstract tech/AI visual elements. Do NOT include any human faces or portraits.`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image",
        messages: [{ role: "user", content: prompt }],
        modalities: ["image", "text"],
      }),
    });

    if (!aiResponse.ok) {
      throw new Error(`AI generation failed: ${aiResponse.statusText}`);
    }

    const aiData = await aiResponse.json();
    const imageUrl = aiData.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!imageUrl) {
      throw new Error("No image generated");
    }

    // Extract base64 data and convert to buffer
    const base64Data = imageUrl.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));

    // Upload to storage for caching
    await supabase.storage.from("og-images").upload(storagePath, imageBuffer, {
      contentType: "image/png",
      upsert: true,
    });

    return new Response(imageBuffer, {
      headers: {
        ...corsHeaders,
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch (error) {
    console.error("OG image generation error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
