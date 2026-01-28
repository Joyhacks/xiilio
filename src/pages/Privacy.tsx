import { motion } from "framer-motion";
import { 
  Shield, Database, Eye, Trash2, Download, Lock, 
  Mail, Globe, Clock, Users, FileText, AlertCircle
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Section = ({ 
  icon: Icon, 
  title, 
  children 
}: { 
  icon: React.ElementType; 
  title: string; 
  children: React.ReactNode;
}) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-10"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
    </div>
    <div className="pl-13 text-muted-foreground leading-relaxed space-y-4">
      {children}
    </div>
  </motion.section>
);

export default function Privacy() {
  const lastUpdated = "January 28, 2026";

  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Learn how 24Twelve protects your privacy. We're committed to transparency about data collection, usage, and your rights under GDPR."
        keywords="privacy policy, data protection, GDPR, user rights, data security, 24Twelve privacy"
        canonical="/privacy"
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
              <Shield className="w-4 h-4" />
              Privacy Policy
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Your Privacy Matters
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              At 24Twelve, we are committed to protecting your privacy and ensuring 
              transparency about how we collect, use, and safeguard your data.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Summary Card */}
          <div className="p-6 rounded-2xl bg-accent/10 border border-accent/20 mb-12">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-accent" />
              Quick Summary
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                We only collect data you explicitly provide or consent to
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Your data is stored securely and never sold to third parties
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                You can export or delete your data at any time
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                We use cookies only with your explicit consent
              </li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="prose prose-invert max-w-none">
            <Section icon={Database} title="1. Information We Collect">
              <p>
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong className="text-foreground">Account Information:</strong> Email address, 
                  name, and password when you create an account.
                </li>
                <li>
                  <strong className="text-foreground">Profile Data:</strong> Company name, industry, 
                  role, primary goals, and communication preferences during onboarding.
                </li>
                <li>
                  <strong className="text-foreground">External Links:</strong> Social media URLs, 
                  WhatsApp number, and email templates you configure for quick access.
                </li>
                <li>
                  <strong className="text-foreground">Conversation Data:</strong> Messages exchanged 
                  with our AI agents to provide personalized assistance.
                </li>
                <li>
                  <strong className="text-foreground">Analytics Data:</strong> Page views, 
                  interaction patterns, and performance metrics (only with your consent).
                </li>
              </ul>
            </Section>

            <Section icon={Eye} title="2. How We Use Your Information">
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Provide, maintain, and improve our AI agent services</li>
                <li>Personalize your experience based on your preferences and history</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices, security alerts, and support messages</li>
                <li>Respond to your comments, questions, and customer service requests</li>
                <li>Analyze usage patterns to improve our platform (with consent)</li>
                <li>Comply with legal obligations and enforce our terms</li>
              </ul>
            </Section>

            <Section icon={Lock} title="3. Data Security">
              <p>
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong className="text-foreground">Encryption:</strong> All data is encrypted 
                  in transit (TLS 1.3) and at rest (AES-256).
                </li>
                <li>
                  <strong className="text-foreground">Access Control:</strong> Strict role-based 
                  access controls limit who can access your data.
                </li>
                <li>
                  <strong className="text-foreground">Infrastructure:</strong> Our services run 
                  on secure, SOC 2 compliant cloud infrastructure.
                </li>
                <li>
                  <strong className="text-foreground">Monitoring:</strong> 24/7 security monitoring 
                  and regular vulnerability assessments.
                </li>
                <li>
                  <strong className="text-foreground">Password Security:</strong> Passwords are 
                  hashed using industry-standard algorithms and never stored in plain text.
                </li>
              </ul>
            </Section>

            <Section icon={Clock} title="4. Data Retention">
              <p>
                We retain your personal data only for as long as necessary to provide 
                our services and fulfill the purposes outlined in this policy:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong className="text-foreground">Account Data:</strong> Retained while your 
                  account is active, deleted within 30 days of account deletion.
                </li>
                <li>
                  <strong className="text-foreground">Conversation History:</strong> Stored for 
                  personalization purposes, deletable at any time via Settings.
                </li>
                <li>
                  <strong className="text-foreground">Analytics Data:</strong> Anonymized and 
                  aggregated after 90 days.
                </li>
                <li>
                  <strong className="text-foreground">Legal Compliance:</strong> Some data may 
                  be retained longer if required by law.
                </li>
              </ul>
            </Section>

            <Section icon={Users} title="5. Your Rights (GDPR & Global)">
              <p>
                Depending on your location, you may have the following rights regarding 
                your personal data:
              </p>
              <div className="grid gap-4 mt-4 sm:grid-cols-2">
                <div className="p-4 rounded-lg bg-card border border-border">
                  <h4 className="font-medium text-foreground mb-2">Right to Access</h4>
                  <p className="text-sm">
                    Request a copy of all personal data we hold about you.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border">
                  <h4 className="font-medium text-foreground mb-2">Right to Rectification</h4>
                  <p className="text-sm">
                    Correct inaccurate or incomplete personal data.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border">
                  <h4 className="font-medium text-foreground mb-2">Right to Erasure</h4>
                  <p className="text-sm">
                    Request deletion of your personal data ("right to be forgotten").
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border">
                  <h4 className="font-medium text-foreground mb-2">Right to Portability</h4>
                  <p className="text-sm">
                    Export your data in a machine-readable format (JSON).
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border">
                  <h4 className="font-medium text-foreground mb-2">Right to Object</h4>
                  <p className="text-sm">
                    Object to processing of your data for certain purposes.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border">
                  <h4 className="font-medium text-foreground mb-2">Right to Restrict</h4>
                  <p className="text-sm">
                    Request limitation of processing under certain conditions.
                  </p>
                </div>
              </div>
            </Section>

            <Section icon={Download} title="6. Exporting Your Data">
              <p>
                You can download all your stored data at any time through your account settings:
              </p>
              <ol className="list-decimal pl-6 space-y-2 mt-3">
                <li>Navigate to <strong className="text-foreground">Settings</strong></li>
                <li>Go to the <strong className="text-foreground">Memory</strong> tab</li>
                <li>Click <strong className="text-foreground">"Download My Data"</strong></li>
                <li>A JSON file containing all your data will be downloaded</li>
              </ol>
              <p className="mt-4">
                The export includes your profile information, external links, personalization 
                memory, and account metadata.
              </p>
              <div className="mt-4">
                <Link to="/settings">
                  <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    Go to Settings
                  </Button>
                </Link>
              </div>
            </Section>

            <Section icon={Trash2} title="7. Deleting Your Data">
              <p>
                You have multiple options for data deletion:
              </p>
              <div className="space-y-4 mt-4">
                <div className="p-4 rounded-lg bg-card border border-border">
                  <h4 className="font-medium text-foreground mb-2">Clear Personalization Memory</h4>
                  <p className="text-sm mb-2">
                    Delete all conversation summaries and personalization data while keeping 
                    your account active.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Settings → Memory → Clear All Memory
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border">
                  <h4 className="font-medium text-foreground mb-2">Delete Your Account</h4>
                  <p className="text-sm mb-2">
                    Permanently delete your account and all associated data. This action 
                    is irreversible.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Contact us at privacy@24twelve.ai to request account deletion
                  </p>
                </div>
              </div>
            </Section>

            <Section icon={Globe} title="8. Cookies & Tracking">
              <p>
                We use cookies and similar technologies with your explicit consent:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong className="text-foreground">Essential Cookies:</strong> Required for 
                  basic functionality (authentication, security). Cannot be disabled.
                </li>
                <li>
                  <strong className="text-foreground">Analytics Cookies:</strong> Help us understand 
                  how you use our platform. Opt-in only.
                </li>
                <li>
                  <strong className="text-foreground">Functional Cookies:</strong> Remember your 
                  preferences for a personalized experience. Opt-in only.
                </li>
              </ul>
              <p className="mt-4">
                You can manage your cookie preferences at any time using the cookie consent 
                banner or by clearing your browser cookies.
              </p>
            </Section>

            <Section icon={FileText} title="9. Third-Party Services">
              <p>
                We use the following third-party services to operate our platform:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong className="text-foreground">Cloud Infrastructure:</strong> Secure hosting 
                  and database services (SOC 2 compliant).
                </li>
                <li>
                  <strong className="text-foreground">AI Services:</strong> Language models for 
                  agent conversations (data not used for training).
                </li>
                <li>
                  <strong className="text-foreground">Voice Services:</strong> Text-to-speech and 
                  speech-to-text processing.
                </li>
              </ul>
              <p className="mt-4">
                We do not sell your data to third parties. Data shared with service providers 
                is subject to strict confidentiality agreements.
              </p>
            </Section>

            <Section icon={Mail} title="10. Contact Us">
              <p>
                If you have questions about this Privacy Policy or wish to exercise your 
                data rights, please contact us:
              </p>
              <div className="mt-4 p-4 rounded-lg bg-card border border-border">
                <p className="text-foreground font-medium">24Twelve Privacy Team</p>
                <p className="text-sm mt-2">
                  Email: <a href="mailto:privacy@24twelve.ai" className="text-primary hover:underline">
                    privacy@24twelve.ai
                  </a>
                </p>
                <p className="text-sm mt-1">
                  Response time: Within 30 days as required by GDPR
                </p>
              </div>
              <p className="mt-4">
                For general inquiries, you can also reach us through our{" "}
                <Link to="/contact" className="text-primary hover:underline">
                  Contact page
                </Link>.
              </p>
            </Section>

            {/* Policy Updates Notice */}
            <div className="mt-12 p-6 rounded-2xl bg-muted/50 border border-border">
              <h3 className="font-semibold text-foreground mb-2">Policy Updates</h3>
              <p className="text-sm text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of 
                any material changes by posting the new policy on this page and updating 
                the "Last updated" date. We encourage you to review this policy periodically.
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
      </div>
    </>
  );
}
