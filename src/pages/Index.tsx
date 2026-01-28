import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TeamAgentsSection } from "@/components/TeamAgentsSection";
import { AgentsSection } from "@/components/AgentsSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { CTASection } from "@/components/CTASection";
import { StreamingSection } from "@/components/StreamingSection";
import { Footer } from "@/components/Footer";
import { AuthOverlay } from "@/components/auth/AuthOverlay";
import { useAuthGate } from "@/hooks/useAuthGate";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { loading } = useAuth();
  const { showAuthOverlay, authMessage, openAuthOverlay, closeAuthOverlay, checkFirstVisit } = useAuthGate();
  const [hasCheckedFirstVisit, setHasCheckedFirstVisit] = useState(false);

  // Check for first visit and show overlay
  useEffect(() => {
    if (!loading && !hasCheckedFirstVisit) {
      setHasCheckedFirstVisit(true);
      if (checkFirstVisit()) {
        openAuthOverlay();
      }
    }
  }, [loading, hasCheckedFirstVisit, checkFirstVisit, openAuthOverlay]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <TeamAgentsSection />
      <AgentsSection />
      <FeaturesSection />
      <CTASection />
      <StreamingSection />
      <Footer />

      <AuthOverlay
        isOpen={showAuthOverlay}
        onClose={closeAuthOverlay}
        message={authMessage || undefined}
      />
    </div>
  );
};

export default Index;
