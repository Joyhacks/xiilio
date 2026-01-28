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

  // FAQ structured data for rich snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What are AI agents?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AI agents are specialized artificial intelligence assistants designed to handle specific business tasks like customer service, content creation, legal assistance, and more.",
        },
      },
      {
        "@type": "Question",
        name: "How do 24Twelve AI agents work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our AI agents work 24/7 to handle your business tasks. Simply chat with them via text or voice, and they'll help with content creation, customer communications, legal drafts, financial analysis, and more.",
        },
      },
      {
        "@type": "Question",
        name: "Can I customize the AI agents?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! You can customize agent personalities, response styles, and integrate them with your existing tools through our API and webhook integrations.",
        },
      },
    ],
  };

  return (
    <>
      <SEO
        canonical="/"
        structuredData={faqSchema}
      />
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
