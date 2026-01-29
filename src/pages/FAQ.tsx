import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SEO } from "@/components/SEO";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What are AI agents and how do they work?",
    answer:
      "AI agents are specialized virtual assistants powered by advanced language models. Each agent is trained for a specific role—like sales, content creation, legal, or finance—and can handle tasks, answer questions, and automate workflows in their domain. They learn from your preferences to provide increasingly personalized support.",
  },
  {
    question: "How do I get started with 24TWELVE?",
    answer:
      "Getting started is easy! Simply create an account, complete a quick onboarding questionnaire about your business needs, and you'll immediately have access to your AI agent team. No technical setup required—just start chatting with any agent to begin.",
  },
  {
    question: "Can I try the AI agents before subscribing?",
    answer:
      "Yes! We offer a 14-day free trial on all plans so you can experience the full capabilities of your AI team. Explore different agents, test workflows, and see how they can transform your business operations before committing.",
  },
  {
    question: "What's included in each pricing plan?",
    answer:
      "Our Starter plan includes 2 AI agents and 1,000 conversations/month—perfect for small teams. The Pro plan offers 5 agents, 10,000 conversations, voice features, and API access. Enterprise plans include unlimited agents, custom training, and dedicated support. All plans include a 14-day free trial.",
  },
  {
    question: "Can the AI agents work together on complex tasks?",
    answer:
      "Absolutely! Our agents are designed for collaboration. The Executive Assistant can orchestrate multi-agent workflows—for example, coordinating a product launch across content creation, social media, sales outreach, and legal review. This team approach ensures comprehensive, professional results.",
  },
  {
    question: "Is my data secure with AI agents?",
    answer:
      "Security is our top priority. We use bank-grade encryption for all data, comply with SOC 2, GDPR, and HIPAA standards, and never share your information with third parties. Your conversations and business data remain completely private and protected.",
  },
  {
    question: "Can I customize how the agents communicate?",
    answer:
      "Yes! During onboarding, you can set your preferred communication tone (professional, friendly, casual), and each agent adapts to your style. Pro and Enterprise plans offer deeper customization including custom instructions and specialized training for your industry.",
  },
  {
    question: "Do the agents work 24/7?",
    answer:
      "Yes, your AI team never sleeps! Agents are available around the clock to handle tasks, respond to queries, and keep your business running smoothly—even across different time zones. You'll always have support when you need it.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const FAQ = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: accordionRef, isVisible: accordionVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <>
      <SEO
        title="FAQ - 24TWELVE AI Agents"
        description="Frequently asked questions about 24TWELVE AI agents. Learn about pricing, features, security, and how to get started."
        canonical="/faq"
        structuredData={faqSchema}
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6">
            {/* Section header */}
            <div
              ref={headerRef}
              className={cn(
                "text-center mb-12 transition-all duration-700 ease-out",
                headerVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
            >
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                Frequently Asked <span className="text-gradient">Questions</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to know about getting started with your AI agent team.
              </p>
            </div>

            {/* FAQ Accordion */}
            <div
              ref={accordionRef}
              className={cn(
                "max-w-3xl mx-auto transition-all duration-700 ease-out",
                accordionVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              )}
            >
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="glass-card rounded-xl border-none px-6 data-[state=open]:shadow-lg transition-shadow duration-300"
                  >
                    <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:text-primary hover:no-underline py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
};

export default FAQ;
