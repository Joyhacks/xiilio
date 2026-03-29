import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SectionTransition } from "@/components/SectionTransition";
import { TeamAgentsSection } from "@/components/TeamAgentsSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { FAQSection } from "@/components/FAQSection";
import { CTASection } from "@/components/CTASection";
import { StreamingSection } from "@/components/StreamingSection";
import { UserSocialSection } from "@/components/UserSocialSection";
import { Footer } from "@/components/Footer";
import { SecuritySection } from "@/components/SecuritySection";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SEO } from "@/components/SEO";
import { useUXTracking } from "@/hooks/useUXTracking";
import { PullToRefresh } from "@/components/PullToRefresh";
import { useCallback } from "react";

// Trigger GitHub sync
const Index = () => {
  useUXTracking();

  const handleRefresh = useCallback(async () => {
    // Simulate a refresh — reload data or just wait
    await new Promise((resolve) => setTimeout(resolve, 800));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <SEO canonical="/" />
      <PullToRefresh onRefresh={handleRefresh}>
        <div className="min-h-screen bg-background pb-20 md:pb-0">
          <Header />
          <Hero />
          <SectionTransition from="#0c1709" to="hsl(var(--background))" />
          <TeamAgentsSection />
          <HowItWorksSection />
          <FAQSection />
          <CTASection />
          <StreamingSection />
          <SecuritySection />
          <UserSocialSection />
          <SectionTransition from="hsl(var(--background))" to="#0c1709" />
          <Footer />
          <ScrollToTop />
        </div>
      </PullToRefresh>
    </>
  );
};

export default Index;
