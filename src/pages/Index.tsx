import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TeamAgentsSection } from "@/components/TeamAgentsSection";
import { AgentsSection } from "@/components/AgentsSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { FAQSection } from "@/components/FAQSection";
import { CTASection } from "@/components/CTASection";
import { StreamingSection } from "@/components/StreamingSection";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { useUXTracking } from "@/hooks/useUXTracking";

const Index = () => {
  // Initialize UX tracking for the page
  useUXTracking();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <TeamAgentsSection />
      <AgentsSection />
      <HowItWorksSection />
      <FAQSection />
      <CTASection />
      <StreamingSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
