import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Get JWT token from authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create Supabase client with the user's token
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    // Get the authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      console.error("Auth error:", authError);
      return new Response(
        JSON.stringify({ error: "Unauthorized - please sign in" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Exporting data for user: ${user.id}`);

    // Fetch all user data from different tables
    const [profileResult, linksResult, memoryResult] = await Promise.all([
      supabase
        .from("user_profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle(),
      supabase
        .from("user_links")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle(),
      supabase
        .from("user_memory")
        .select("*")
        .eq("user_id", user.id),
    ]);

    // Compile the export data
    const exportData = {
      export_info: {
        generated_at: new Date().toISOString(),
        user_id: user.id,
        email: user.email,
        export_version: "1.0",
        format: "GDPR Data Export",
      },
      account: {
        email: user.email,
        created_at: user.created_at,
        last_sign_in_at: user.last_sign_in_at,
        email_confirmed_at: user.email_confirmed_at,
      },
      profile: profileResult.data ? {
        full_name: profileResult.data.full_name,
        company_name: profileResult.data.company_name,
        role_use_case: profileResult.data.role_use_case,
        primary_goal: profileResult.data.primary_goal,
        industry: profileResult.data.industry,
        target_audience: profileResult.data.target_audience,
        preferred_tone: profileResult.data.preferred_tone,
        timezone: profileResult.data.timezone,
        personalization_enabled: profileResult.data.personalization_enabled,
        data_consent: profileResult.data.data_consent,
        onboarding_completed: profileResult.data.onboarding_completed,
        created_at: profileResult.data.created_at,
        updated_at: profileResult.data.updated_at,
      } : null,
      external_links: linksResult.data ? {
        facebook_url: linksResult.data.facebook_url,
        instagram_url: linksResult.data.instagram_url,
        tiktok_url: linksResult.data.tiktok_url,
        linkedin_url: linksResult.data.linkedin_url,
        whatsapp_phone_e164: linksResult.data.whatsapp_phone_e164,
        whatsapp_prefill_message: linksResult.data.whatsapp_prefill_message,
        inbox_url: linksResult.data.inbox_url,
        default_email_to: linksResult.data.default_email_to,
        created_at: linksResult.data.created_at,
        updated_at: linksResult.data.updated_at,
      } : null,
      personalization_memory: memoryResult.data?.map((entry) => ({
        memory_type: entry.memory_type,
        text_summary: entry.text_summary,
        structured_data: entry.structured_data,
        created_at: entry.created_at,
        updated_at: entry.updated_at,
      })) || [],
      data_summary: {
        profile_exists: !!profileResult.data,
        links_configured: !!linksResult.data,
        memory_entries_count: memoryResult.data?.length || 0,
      },
    };

    console.log(`Export completed for user ${user.id}: ${JSON.stringify(exportData.data_summary)}`);

    return new Response(JSON.stringify(exportData, null, 2), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="24twelve-data-export-${new Date().toISOString().split('T')[0]}.json"`,
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
