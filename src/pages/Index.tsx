import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TeamAgentsSection } from "@/components/TeamAgentsSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { FAQSection } from "@/components/FAQSection";
import { CTASection } from "@/components/CTASection";
import { StreamingSection } from "@/components/StreamingSection";
import { UserSocialSection } from "@/components/UserSocialSection";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SEO } from "@/components/SEO";
import { useUXTracking } from "@/hooks/useUXTracking";

const Index = () => {
  // Initialize UX tracking for the page
  useUXTracking();


  return (
    <>
      <SEO canonical="/" />
      <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <TeamAgentsSection />
      <HowItWorksSection />
      <FAQSection />
      <CTASection />
      <StreamingSection />
      <UserSocialSection />
      <Footer />
      <ScrollToTop />
      </div>
    </>
  );
};

export default Index;
