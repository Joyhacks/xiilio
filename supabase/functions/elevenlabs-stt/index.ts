import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { encode as base64Encode } from "https://deno.land/std@0.168.0/encoding/base64.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");
    
    if (!ELEVENLABS_API_KEY) {
      console.error("ELEVENLABS_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "ElevenLabs API key not configured" }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Get form data with audio file
    const formData = await req.formData();
    const audioFile = formData.get("audio") as File;
    const languageCode = formData.get("language") as string || "eng";

    if (!audioFile) {
      return new Response(
        JSON.stringify({ error: "Audio file is required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log(`Transcribing audio: ${audioFile.name}, size: ${audioFile.size} bytes`);

    // Create form data for ElevenLabs API
    const apiFormData = new FormData();
    apiFormData.append("file", audioFile, audioFile.name || "audio.webm");
    apiFormData.append("model_id", "scribe_v1");
    apiFormData.append("language_code", languageCode);

    const response = await fetch("https://api.elevenlabs.io/v1/speech-to-text", {
      method: "POST",
      headers: {
        "xi-api-key": ELEVENLABS_API_KEY,
      },
      body: apiFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`ElevenLabs STT error: ${response.status} - ${errorText}`);
      return new Response(
        JSON.stringify({ error: "Failed to transcribe audio", details: errorText }),
        { 
          status: response.status, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const transcription = await response.json();
    console.log(`Transcription result: ${transcription.text?.length || 0} chars`);

    return new Response(
      JSON.stringify({ 
        text: transcription.text || "",
        words: transcription.words || [],
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error transcribing audio:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: String(error) }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
