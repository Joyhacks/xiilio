import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TeamAgentsSection } from "@/components/TeamAgentsSection";
import { AgentsSection } from "@/components/AgentsSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <TeamAgentsSection />
      <AgentsSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
