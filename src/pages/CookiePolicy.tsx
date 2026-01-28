import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Cookie, Shield, BarChart3, Settings, Megaphone, 
  Clock, Info, ExternalLink
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CookiePreferencesModal } from "@/components/CookiePreferencesModal";

interface CookieInfo {
  name: string;
  provider: string;
  purpose: string;
  duration: string;
  type: "necessary" | "analytics" | "functional" | "marketing";
}

const cookies: CookieInfo[] = [
  // Necessary Cookies
  {
    name: "sb-*-auth-token",
    provider: "24Twelve",
    purpose: "Stores authentication session tokens to keep you logged in securely across page visits.",
    duration: "Session / 1 year",
    type: "necessary"
  },
  {
    name: "cookie-consent",
    provider: "24Twelve",
    purpose: "Remembers your cookie consent preferences so we don't ask you again on every visit.",
    duration: "1 year",
    type: "necessary"
  },
  {
    name: "theme",
    provider: "24Twelve",
    purpose: "Stores your preferred theme (light/dark mode) for consistent visual experience.",
    duration: "1 year",
    type: "necessary"
  },
  // Analytics Cookies
  {
    name: "analytics-session",
    provider: "24Twelve",
    purpose: "Tracks anonymous page views and interaction patterns to help us improve the platform.",
    duration: "30 minutes",
    type: "analytics"
  },
  {
    name: "performance-metrics",
    provider: "24Twelve",
    purpose: "Collects performance data (page load times, errors) to optimize user experience.",
    duration: "Session",
    type: "analytics"
  },
  // Functional Cookies
  {
    name: "language",
    provider: "24Twelve",
    purpose: "Remembers your preferred language setting for content display.",
    duration: "1 year",
    type: "functional"
  },
  {
    name: "agent-preferences",
    provider: "24Twelve",
    purpose: "Stores your AI agent customization settings and conversation preferences.",
    duration: "1 year",
    type: "functional"
  },
  {
    name: "sidebar-state",
    provider: "24Twelve",
    purpose: "Remembers whether you prefer the sidebar expanded or collapsed.",
    duration: "1 year",
    type: "functional"
  },
  // Marketing Cookies
  {
    name: "campaign-source",
    provider: "24Twelve",
    purpose: "Tracks which marketing campaign brought you to our site to measure effectiveness.",
    duration: "30 days",
    type: "marketing"
  },
  {
    name: "referral",
    provider: "24Twelve",
    purpose: "Identifies referral sources for our affiliate and partnership programs.",
    duration: "90 days",
    type: "marketing"
  }
];

const cookieCategories = [
  {
    type: "necessary" as const,
    icon: Shield,
    title: "Strictly Necessary",
    description: "Essential for the website to function. Cannot be disabled.",
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  },
  {
    type: "analytics" as const,
    icon: BarChart3,
    title: "Analytics",
    description: "Help us understand how visitors interact with our website.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    type: "functional" as const,
    icon: Settings,
    title: "Functional",
    description: "Enable personalized features and remember your preferences.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10"
  },
  {
    type: "marketing" as const,
    icon: Megaphone,
    title: "Marketing",
    description: "Used to measure advertising campaign effectiveness.",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10"
  }
];

const CookieTable = ({ type, cookies }: { type: string; cookies: CookieInfo[] }) => {
  const filtered = cookies.filter(c => c.type === type);
  if (filtered.length === 0) return null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-medium text-foreground">Cookie Name</th>
            <th className="text-left py-3 px-4 font-medium text-foreground hidden sm:table-cell">Provider</th>
            <th className="text-left py-3 px-4 font-medium text-foreground">Purpose</th>
            <th className="text-left py-3 px-4 font-medium text-foreground">Duration</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((cookie, index) => (
            <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
              <td className="py-3 px-4 font-mono text-xs text-primary">{cookie.name}</td>
              <td className="py-3 px-4 text-muted-foreground hidden sm:table-cell">{cookie.provider}</td>
              <td className="py-3 px-4 text-muted-foreground">{cookie.purpose}</td>
              <td className="py-3 px-4 text-muted-foreground whitespace-nowrap">
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {cookie.duration}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function CookiePolicy() {
  const lastUpdated = "January 28, 2026";
  const [cookieModalOpen, setCookieModalOpen] = useState(false);

  return (
    <>
      <SEO
        title="Cookie Policy"
        description="Learn about the cookies 24Twelve uses, their purposes, and how to manage your preferences. We respect your privacy and give you full control."
        keywords="cookie policy, cookies, privacy, tracking, GDPR, consent, 24Twelve"
        canonical="/cookies"
      />
      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Cookie className="w-4 h-4" />
                Cookie Policy
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                How We Use Cookies
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We use cookies to enhance your experience, analyze usage, and assist in our 
                marketing efforts. Here's everything you need to know about the cookies we use.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Last updated: {lastUpdated}
              </p>
            </div>

            {/* What are Cookies */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="p-6 rounded-2xl bg-accent/10 border border-accent/20">
                <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Info className="w-5 h-5 text-accent" />
                  What Are Cookies?
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cookies are small text files stored on your device when you visit a website. 
                  They help websites remember your preferences, keep you logged in, and provide 
                  personalized experiences. Some cookies are essential for the site to function, 
                  while others help us improve our services or deliver relevant content.
                </p>
              </div>
            </motion.section>

            {/* Cookie Categories Overview */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl font-semibold text-foreground mb-6">Cookie Categories</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {cookieCategories.map((category) => (
                  <div 
                    key={category.type}
                    className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg ${category.bgColor} flex items-center justify-center flex-shrink-0`}>
                        <category.icon className={`w-5 h-5 ${category.color}`} />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-1">{category.title}</h3>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Detailed Cookie Tables */}
            {cookieCategories.map((category) => (
              <motion.section
                key={category.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl ${category.bgColor} flex items-center justify-center`}>
                    <category.icon className={`w-5 h-5 ${category.color}`} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">{category.title} Cookies</h2>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-card overflow-hidden">
                  <CookieTable type={category.type} cookies={cookies} />
                </div>
              </motion.section>
            ))}

            {/* Managing Cookies */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl font-semibold text-foreground mb-4">Managing Your Cookie Preferences</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  You have full control over which cookies you accept. Here are your options:
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <h4 className="font-medium text-foreground mb-2">Cookie Banner</h4>
                    <p className="text-sm">
                      When you first visit our site, you can customize your preferences using 
                      the cookie consent banner that appears at the bottom of the page.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <h4 className="font-medium text-foreground mb-2">Footer Settings</h4>
                    <p className="text-sm">
                      You can update your preferences anytime by clicking "Cookie Settings" 
                      in the website footer.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <h4 className="font-medium text-foreground mb-2">Browser Settings</h4>
                    <p className="text-sm">
                      Most browsers allow you to block or delete cookies through their settings. 
                      Note that blocking essential cookies may affect site functionality.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <h4 className="font-medium text-foreground mb-2">Opt-Out Tools</h4>
                    <p className="text-sm">
                      For analytics and advertising cookies, you can use industry opt-out tools 
                      like the NAI Consumer Opt-Out or DAA WebChoices.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Third-Party Cookies */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl font-semibold text-foreground mb-4">Third-Party Cookies</h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  Some cookies on our site are set by third-party services that appear on our pages. 
                  We do not control these cookies and they are subject to the respective third party's 
                  privacy policy.
                </p>
                <p>
                  Third-party services we may use include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong className="text-foreground">Authentication Services:</strong> For secure login functionality
                  </li>
                  <li>
                    <strong className="text-foreground">Voice Services:</strong> For text-to-speech and speech recognition features
                  </li>
                  <li>
                    <strong className="text-foreground">AI Services:</strong> For powering our intelligent agents
                  </li>
                </ul>
                <p className="text-sm">
                  For more information about how we use third-party services, please see our{" "}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>.
                </p>
              </div>
            </motion.section>

            {/* Updates to Policy */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="p-6 rounded-2xl bg-muted/50 border border-border">
                <h3 className="font-semibold text-foreground mb-2">Updates to This Policy</h3>
                <p className="text-sm text-muted-foreground">
                  We may update this Cookie Policy from time to time to reflect changes in our 
                  practices or for legal, operational, or regulatory reasons. We encourage you 
                  to periodically review this page for the latest information.
                </p>
              </div>
            </motion.section>

            {/* Manage Preferences CTA */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 text-center">
                <h3 className="font-semibold text-foreground mb-2">Manage Your Preferences</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Update your cookie consent settings at any time.
                </p>
                <Button onClick={() => setCookieModalOpen(true)} className="gap-2">
                  <Settings className="w-4 h-4" />
                  Open Cookie Settings
                </Button>
              </div>
            </motion.section>

            {/* Contact & Links */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-2xl font-semibold text-foreground mb-4">Questions?</h2>
              <p className="text-muted-foreground mb-6">
                If you have questions about our use of cookies, please contact us.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/contact">
                  <Button variant="outline" className="gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Contact Us
                  </Button>
                </Link>
                <Link to="/privacy">
                  <Button variant="outline" className="gap-2">
                    <Shield className="w-4 h-4" />
                    Privacy Policy
                  </Button>
                </Link>
              </div>
            </motion.section>
          </motion.div>
        </main>

        <Footer />
      </div>

      <CookiePreferencesModal
        open={cookieModalOpen}
        onOpenChange={setCookieModalOpen}
      />
    </>
  );
}
