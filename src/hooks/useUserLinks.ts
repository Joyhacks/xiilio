import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface UserLinks {
  facebook_url?: string | null;
  instagram_url?: string | null;
  tiktok_url?: string | null;
  linkedin_url?: string | null;
  whatsapp_phone_e164?: string | null;
  whatsapp_prefill_message?: string | null;
  inbox_url?: string | null;
  default_email_to?: string | null;
  email_subject_template?: string | null;
  email_body_template?: string | null;
}

export function useUserLinks() {
  const { user, isAuthenticated } = useAuth();
  const [links, setLinks] = useState<UserLinks | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLinks() {
      if (!isAuthenticated || !user?.id) {
        setLinks(null);
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("user_links")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) {
          console.error("Error fetching user links:", error);
          setLinks(null);
        } else {
          setLinks(data);
        }
      } catch (err) {
        console.error("Error fetching user links:", err);
        setLinks(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLinks();
  }, [isAuthenticated, user?.id]);

  // Generate WhatsApp URL from phone number
  const getWhatsAppUrl = () => {
    if (!links?.whatsapp_phone_e164) return null;
    const phone = links.whatsapp_phone_e164.replace(/\D/g, "");
    const message = links.whatsapp_prefill_message 
      ? `?text=${encodeURIComponent(links.whatsapp_prefill_message)}`
      : "";
    return `https://wa.me/${phone}${message}`;
  };

  return {
    links,
    isLoading,
    whatsappUrl: getWhatsAppUrl(),
    hasWhatsApp: !!links?.whatsapp_phone_e164,
  };
}
