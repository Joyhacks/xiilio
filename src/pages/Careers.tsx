import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Heart, 
  Zap, 
  Globe, 
  Coffee,
  Sparkles 
} from "lucide-react";
import { ScrollToTop } from "@/components/ScrollToTop";

const openPositions = [
  {
    title: "Senior AI/ML Engineer",
    department: "Engineering",
    location: "San Francisco / Remote",
    type: "Full-time",
    tags: ["AI", "Python", "TensorFlow"],
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "San Francisco",
    type: "Full-time",
    tags: ["Figma", "UI/UX", "Design Systems"],
  },
  {
    title: "Full Stack Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    tags: ["React", "Node.js", "TypeScript"],
  },
  {
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "New York / Remote",
    type: "Full-time",
    tags: ["B2B SaaS", "Account Management"],
  },
  {
    title: "Developer Relations Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    tags: ["API", "Developer Experience"],
  },
];

const perks = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health, dental, and vision insurance for you and your family.",
  },
  {
    icon: Zap,
    title: "Equity",
    description: "Competitive equity packages so you share in our success.",
  },
  {
    icon: Globe,
    title: "Remote-First",
    description: "Work from anywhere with flexible hours and async communication.",
  },
  {
    icon: Coffee,
    title: "Learning Budget",
    description: "$2,000 annual budget for courses, conferences, and books.",
  },
];

export default function Careers() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-hero">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="outline" className="mb-6 bg-primary/10 text-primary border-primary/30">
                <Sparkles className="w-3 h-3 mr-1" />
                We're Hiring!
              </Badge>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Build the Future of <span className="text-gradient">AI Automation</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Join our team of innovators, dreamers, and builders creating the next generation of AI-powered business tools.
              </p>
            </div>
          </div>
        </section>

        {/* Perks Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <h2 className="font-display text-3xl font-bold text-center mb-12">Why Join 24TWELVE?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {perks.map((perk) => (
                <div key={perk.title} className="p-6 glass-card rounded-2xl text-center hover:scale-[1.02] transition-all duration-300">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <perk.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{perk.title}</h3>
                  <p className="text-sm text-muted-foreground">{perk.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <h2 className="font-display text-3xl font-bold text-center mb-4">Open Positions</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              We're looking for talented individuals who are passionate about AI and want to make a real impact.
            </p>
            
            <div className="max-w-3xl mx-auto space-y-4">
              {openPositions.map((position) => (
                <div
                  key={position.title}
                  className="p-6 bg-card rounded-xl border border-border/50 hover:border-border transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-display text-lg font-semibold mb-2">{position.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {position.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {position.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {position.type}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {position.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="outline" className="shrink-0 gap-2">
                      Apply Now <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-display text-2xl font-bold mb-4">Don't See the Right Fit?</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              We're always looking for talented people. Send us your resume and let's chat.
            </p>
            <Button variant="hero" asChild>
              <Link to="/contact">
                Get in Touch <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
}
