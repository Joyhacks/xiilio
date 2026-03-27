import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Calendar } from "lucide-react";
import { ScrollToTop } from "@/components/ScrollToTop";

function CalendlyEmbed() {
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      try { document.body.removeChild(script); } catch {}
    };
  }, []);

  return (
    <div
      className="calendly-inline-widget w-full"
      data-url="https://calendly.com/itsgotime-24twelve?background_color=1a1410&text_color=e8dcc8&primary_color=c49a3c&hide_gdpr_banner=1"
      style={{ minWidth: "280px", height: isMobile ? "580px" : "700px" }}
    />
  );
}

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "hello@24twelve.ai",
    href: "mailto:hello@24twelve.ai",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (555) 24-TWELVE",
    href: "tel:+15552412353",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "San Francisco, CA",
    href: null,
  },
  {
    icon: Clock,
    title: "Support Hours",
    value: "24/7 AI Support",
    href: null,
  },
];

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent! 📬",
      description: "We'll get back to you within 24 hours.",
    });
    
    setFormData({ name: "", email: "", company: "", message: "" });
    setIsSubmitting(false);
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact 24Twelve",
    description: "Get in touch with the 24Twelve team for questions about AI automation.",
    mainEntity: {
      "@type": "Organization",
      name: "24Twelve",
      email: "hello@24twelve.ai",
      telephone: "+1-555-24-TWELVE",
      address: {
        "@type": "PostalAddress",
        addressLocality: "San Francisco",
        addressRegion: "CA",
        addressCountry: "US",
      },
    },
  };

  return (
    <>
      <SEO
        title="Contact Us"
        description="Have questions? Contact the 24Twelve team. We'd love to hear from you and help with your AI automation needs."
        keywords="contact 24Twelve, AI support, business automation help, customer service"
        canonical="/contact"
        structuredData={contactSchema}
      />
      <div className="min-h-screen bg-background">
        <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-hero">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Get in <span className="text-gradient">Touch</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Have questions? We'd love to hear from you. Send us a message or book a call directly.
              </p>
              <Button variant="hero" size="lg" asChild>
                <a href="https://calendly.com/itsgotime-24twelve" target="_blank" rel="noopener noreferrer">
                  <Clock className="w-5 h-5 mr-2" /> Schedule a Call
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Calendly Embed Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground/80">Book directly</span>
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">Schedule a Call</h2>
                <p className="text-muted-foreground">Pick a time that works for you — no back-and-forth needed.</p>
              </div>
              <div className="glass-luxury rounded-2xl overflow-hidden">
                <CalendlyEmbed />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
              {/* Contact Form */}
              <div className="glass-luxury rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <MessageSquare className="w-6 h-6 text-primary" />
                  <h2 className="font-display text-2xl font-bold">Send a Message</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input
                      id="company"
                      placeholder="Acme Inc."
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>
                  
                  <Button type="submit" variant="hero" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl font-bold mb-4">Contact Information</h2>
                  <p className="text-muted-foreground">
                    Reach out to us through any of the following channels. Our team is ready to help you get started with AI automation.
                  </p>
                </div>
                
                <div className="space-y-4">
                  {contactInfo.map((info) => (
                    <div key={info.title} className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border/50">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <info.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{info.title}</p>
                        {info.href ? (
                          <a href={info.href} className="font-medium hover:text-primary transition-colors">
                            {info.value}
                          </a>
                        ) : (
                          <p className="font-medium">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-muted/30 rounded-2xl border border-border/50">
                  <h3 className="font-semibold mb-2">Looking for support?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our AI agents provide 24/7 support. Chat with Julia, our receptionist, for immediate assistance.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="/agent/julia">Chat with Julia</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <ScrollToTop />
      </div>
    </>
  );
}
