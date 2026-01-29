// User Social Media Section - Displays logged-in user's configured social links
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useUserLinks } from "@/hooks/useUserLinks";
import { useAuth } from "@/hooks/useAuth";
import { SocialLinks, SocialLinksConfig } from "@/components/SocialLinks";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";

export function UserSocialSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const { isAuthenticated } = useAuth();
  const { links, isLoading } = useUserLinks();

  // Only show if user is logged in
  if (!isAuthenticated) {
    return null;
  }

  // Wait for links to load
  if (isLoading) {
    return null;
  }

  // Build config from user_links table
  const socialConfig: SocialLinksConfig = {
    facebook: links?.facebook_url || undefined,
    instagram: links?.instagram_url || undefined,
    tiktok: links?.tiktok_url || undefined,
    linkedin: links?.linkedin_url || undefined,
    x: links?.x_url || undefined,
    youtube: links?.youtube_url || undefined,
    whatsapp: links?.whatsapp_phone_e164 
      ? `https://wa.me/${links.whatsapp_phone_e164.replace(/\D/g, "")}` 
      : undefined,
  };

  // Check if user has any links configured
  const hasLinks = Object.values(socialConfig).some(Boolean);

  return (
    <section 
      className="py-4 md:py-6 bg-muted/10 border-t border-border/50"
      aria-labelledby="user-social-section-title"
    >
      <div 
        ref={ref}
        className={cn(
          "container mx-auto px-6 transition-all duration-700 ease-out",
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        )}
      >
        <div className="text-center mb-6">
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
            Your accounts
          </p>
          <h2 
            id="user-social-section-title"
            className="font-display text-2xl font-bold text-foreground"
          >
            Connect on Social Media
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          {hasLinks ? (
            <SocialLinks 
              config={socialConfig} 
              platforms={["linkedin", "instagram", "x", "facebook", "youtube", "tiktok"]}
            />
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                You haven't configured your social media links yet.
              </p>
              <Link 
                to="/settings" 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Settings className="w-4 h-4" />
                Configure Links
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
