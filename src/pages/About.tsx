import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Target, Lightbulb, Rocket, ArrowRight } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "We're on a mission to democratize AI automation for businesses of all sizes.",
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "Constantly pushing boundaries to deliver cutting-edge AI solutions.",
  },
  {
    icon: Users,
    title: "Human-Centered",
    description: "Technology should amplify human potential, not replace it.",
  },
  {
    icon: Rocket,
    title: "Results-Focused",
    description: "Every feature we build is designed to drive real business outcomes.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-hero">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                About <span className="text-gradient">24TWELVE</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                We're building the future of business automation with AI agents that work 24 hours a day, 12 months a year.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-3xl font-bold mb-6">Our Story</h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  24TWELVE was born from a simple observation: businesses spend too much time on repetitive tasks that could be automated. Our founders, with decades of combined experience in AI and enterprise software, set out to change that.
                </p>
                <p>
                  We've assembled a team of world-class engineers, designers, and AI specialists who share a common vision: making powerful AI automation accessible to everyone.
                </p>
                <p>
                  Today, 24TWELVE powers thousands of businesses worldwide, helping them save time, reduce costs, and focus on what matters most—growing their business and serving their customers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <div key={value.title} className="p-6 glass-card rounded-2xl hover:scale-[1.02] transition-all duration-300">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-display text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of businesses already using 24TWELVE to automate their operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/pricing">
                  Get Started <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="glass" size="lg" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
}
