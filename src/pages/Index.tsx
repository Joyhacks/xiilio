import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TeamAgentsSection } from "@/components/TeamAgentsSection";
import { AgentsSection } from "@/components/AgentsSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { CTASection } from "@/components/CTASection";
import { StreamingSection } from "@/components/StreamingSection";
import { Footer } from "@/components/Footer";
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
      <FeaturesSection />
      <CTASection />
      <StreamingSection />
      <Footer />
    </div>
  );
};

export default Index;
