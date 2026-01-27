import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, Sparkles } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "The Future of AI Agents in Business Automation",
    excerpt: "Discover how AI agents are revolutionizing the way businesses operate, from customer service to internal operations.",
    category: "AI Trends",
    date: "Jan 25, 2026",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: 2,
    title: "How to Integrate AI Agents with Your Existing Workflow",
    excerpt: "A step-by-step guide to seamlessly integrating AI agents into your current business processes without disruption.",
    category: "Guides",
    date: "Jan 22, 2026",
    readTime: "12 min read",
    featured: false,
  },
  {
    id: 3,
    title: "Case Study: How Acme Corp Saved 40+ Hours Per Week",
    excerpt: "Learn how Acme Corporation implemented 24TWELVE's AI agents and dramatically reduced their operational overhead.",
    category: "Case Studies",
    date: "Jan 18, 2026",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: 4,
    title: "Understanding AI Agent Collaboration Workflows",
    excerpt: "Explore how multiple AI agents can work together to handle complex, multi-step business processes.",
    category: "Deep Dives",
    date: "Jan 15, 2026",
    readTime: "10 min read",
    featured: false,
  },
  {
    id: 5,
    title: "Security Best Practices for AI-Powered Automation",
    excerpt: "Essential security considerations when deploying AI agents in your organization's sensitive workflows.",
    category: "Security",
    date: "Jan 12, 2026",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: 6,
    title: "The ROI of AI Automation: What to Expect",
    excerpt: "A comprehensive breakdown of the return on investment businesses typically see with AI automation.",
    category: "Business",
    date: "Jan 10, 2026",
    readTime: "9 min read",
    featured: false,
  },
];

export default function Blog() {
  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-hero">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
                24TWELVE <span className="text-gradient">Blog</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Insights, guides, and updates from the world of AI automation
              </p>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-12 bg-background">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <div className="p-8 glass-luxury rounded-2xl hover:scale-[1.01] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                    <Badge variant="outline">{featuredPost.category}</Badge>
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {featuredPost.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                    <Button variant="ghost" className="gap-2">
                      Read Article <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Blog Grid */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-6">
            <h2 className="font-display text-2xl font-bold mb-8">Latest Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-card rounded-xl border border-border/50 p-6 hover:border-border transition-colors"
                >
                  <Badge variant="outline" className="mb-4">{post.category}</Badge>
                  <h3 className="font-display text-lg font-semibold mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-display text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Subscribe to our newsletter for the latest AI automation insights and updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button variant="hero">Subscribe</Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
