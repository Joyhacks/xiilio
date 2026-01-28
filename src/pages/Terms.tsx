import { motion } from "framer-motion";
import { 
  FileText, CheckCircle, User, Shield, Bot, Scale,
  AlertTriangle, XCircle, Gavel, RefreshCw, Mail
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
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

export default function Terms() {
  const lastUpdated = "January 28, 2026";
  const effectiveDate = "January 28, 2026";

  return (
    <>
      <SEO
        title="Terms of Service"
        description="Terms of Service for 24Twelve AI agent platform. Understand your rights, responsibilities, and our service policies."
        keywords="terms of service, user agreement, service terms, AI agent terms, 24Twelve terms"
        canonical="/terms"
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
              <FileText className="w-4 h-4" />
              Terms of Service
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Please read these terms carefully before using the 24Twelve platform 
              and AI agent services.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 text-sm text-muted-foreground">
              <span>Effective: {effectiveDate}</span>
              <span className="hidden sm:block">•</span>
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>

          {/* Agreement Notice */}
          <div className="p-6 rounded-2xl bg-accent/10 border border-accent/20 mb-12">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-accent" />
              Agreement to Terms
            </h3>
            <p className="text-sm text-muted-foreground">
              By accessing or using 24Twelve ("the Service"), you agree to be bound by these 
              Terms of Service. If you disagree with any part of these terms, you may not 
              access the Service. These terms apply to all visitors, users, and others who 
              access or use the Service.
            </p>
          </div>

          {/* Main Content */}
          <div className="prose prose-invert max-w-none">
            <Section icon={FileText} title="1. Description of Service">
              <p>
                24Twelve is an AI-powered platform that provides:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong className="text-foreground">AI Agent Team:</strong> A suite of 
                  specialized AI agents designed to assist with various business tasks 
                  including reception, executive assistance, legal guidance, social media 
                  management, content writing, sales support, life coaching, and financial 
                  planning.
                </li>
                <li>
                  <strong className="text-foreground">Text & Voice Interaction:</strong> The 
                  ability to communicate with AI agents via text chat and voice conversation.
                </li>
                <li>
                  <strong className="text-foreground">Personalization Features:</strong> 
                  Customizable agent behaviors based on your preferences and business context.
                </li>
                <li>
                  <strong className="text-foreground">Integration Tools:</strong> Quick access 
                  links to external platforms and communication channels.
                </li>
              </ul>
            </Section>

            <Section icon={User} title="2. User Accounts">
              <p>
                When you create an account with us, you must provide accurate, complete, 
                and current information. You are responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
                <li>Ensuring your account information remains accurate and up-to-date</li>
              </ul>
              <p className="mt-4">
                You must be at least 18 years old to use this Service. By using the Service, 
                you represent that you meet this age requirement.
              </p>
              <p className="mt-4">
                We reserve the right to refuse service, terminate accounts, or remove content 
                at our sole discretion.
              </p>
            </Section>

            <Section icon={CheckCircle} title="3. Acceptable Use">
              <p>
                You agree to use the Service only for lawful purposes and in accordance with 
                these Terms. You agree NOT to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Use the Service in any way that violates applicable laws or regulations</li>
                <li>Attempt to gain unauthorized access to any part of the Service</li>
                <li>Use the Service to transmit harmful code, malware, or viruses</li>
                <li>Interfere with or disrupt the Service or its infrastructure</li>
                <li>Attempt to reverse engineer, decompile, or extract source code</li>
                <li>Use automated systems to access the Service without permission</li>
                <li>Impersonate any person or entity or misrepresent your affiliation</li>
                <li>Collect or harvest user data without authorization</li>
                <li>Use the Service to spam, harass, or harm others</li>
              </ul>
            </Section>

            <Section icon={Bot} title="4. AI Agent Usage & Limitations">
              <p>
                Our AI agents are designed to assist and augment your capabilities, but 
                they have important limitations you must understand:
              </p>
              <div className="space-y-4 mt-4">
                <div className="p-4 rounded-lg bg-card border border-border">
                  <h4 className="font-medium text-foreground mb-2">Not Professional Advice</h4>
                  <p className="text-sm">
                    AI agent responses are for informational purposes only and do not constitute 
                    professional legal, financial, medical, or other specialized advice. Always 
                    consult qualified professionals for important decisions.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border">
                  <h4 className="font-medium text-foreground mb-2">Accuracy Limitations</h4>
                  <p className="text-sm">
                    While we strive for accuracy, AI agents may occasionally provide incorrect, 
                    incomplete, or outdated information. You are responsible for verifying any 
                    critical information before acting on it.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border">
                  <h4 className="font-medium text-foreground mb-2">No Guarantees</h4>
                  <p className="text-sm">
                    We do not guarantee that AI agent suggestions will achieve any particular 
                    outcome. Results may vary based on individual circumstances.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border">
                  <h4 className="font-medium text-foreground mb-2">Content Responsibility</h4>
                  <p className="text-sm">
                    You are solely responsible for reviewing, editing, and approving any content 
                    generated by AI agents before publishing or using it externally.
                  </p>
                </div>
              </div>
            </Section>

            <Section icon={Shield} title="5. Intellectual Property">
              <p>
                <strong className="text-foreground">Our Property:</strong> The Service, including 
                its original content, features, and functionality, is owned by 24Twelve and is 
                protected by international copyright, trademark, and other intellectual property laws.
              </p>
              <p className="mt-4">
                <strong className="text-foreground">Your Content:</strong> You retain all rights 
                to any content you submit to the Service. By using the Service, you grant us a 
                limited license to use your content solely to provide and improve the Service.
              </p>
              <p className="mt-4">
                <strong className="text-foreground">AI-Generated Content:</strong> Content 
                generated by our AI agents in response to your prompts is licensed to you for 
                your personal or business use. You may use, modify, and distribute AI-generated 
                content, subject to applicable laws and these Terms.
              </p>
              <p className="mt-4">
                <strong className="text-foreground">Feedback:</strong> Any feedback, suggestions, 
                or ideas you provide about the Service may be used by us without obligation to you.
              </p>
            </Section>

            <Section icon={AlertTriangle} title="6. Disclaimer of Warranties">
              <p>
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY 
                KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Implied warranties of merchantability and fitness for a particular purpose</li>
                <li>Warranties of non-infringement</li>
                <li>Warranties that the Service will be uninterrupted, error-free, or secure</li>
                <li>Warranties regarding the accuracy or reliability of any information obtained</li>
              </ul>
              <p className="mt-4">
                We do not warrant that the Service will meet your specific requirements or 
                expectations, or that any errors will be corrected.
              </p>
            </Section>

            <Section icon={XCircle} title="7. Limitation of Liability">
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, 24TWELVE AND ITS AFFILIATES, OFFICERS, 
                DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Any indirect, incidental, special, consequential, or punitive damages</li>
                <li>Loss of profits, revenue, data, or business opportunities</li>
                <li>Damages arising from your use of or inability to use the Service</li>
                <li>Damages arising from AI agent responses or recommendations</li>
                <li>Any actions taken based on information provided by AI agents</li>
              </ul>
              <p className="mt-4">
                Our total liability for any claims arising from the Service shall not exceed 
                the amount you paid us in the twelve (12) months preceding the claim.
              </p>
            </Section>

            <Section icon={Scale} title="8. Indemnification">
              <p>
                You agree to defend, indemnify, and hold harmless 24Twelve and its affiliates 
                from any claims, damages, losses, liabilities, and expenses (including legal 
                fees) arising from:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Your use of the Service</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any third-party rights</li>
                <li>Any content you submit to the Service</li>
                <li>Your use of AI-generated content</li>
              </ul>
            </Section>

            <Section icon={XCircle} title="9. Termination">
              <p>
                We may terminate or suspend your account and access to the Service immediately, 
                without prior notice or liability, for any reason, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Breach of these Terms</li>
                <li>Conduct that we determine is harmful to other users or the Service</li>
                <li>Request by law enforcement or government agencies</li>
                <li>Discontinuation of the Service or any portion thereof</li>
              </ul>
              <p className="mt-4">
                Upon termination, your right to use the Service will immediately cease. You may 
                request export of your data prior to termination in accordance with our{" "}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>.
              </p>
            </Section>

            <Section icon={Gavel} title="10. Governing Law & Disputes">
              <p>
                These Terms shall be governed by and construed in accordance with applicable laws, 
                without regard to conflict of law principles.
              </p>
              <p className="mt-4">
                Any disputes arising from these Terms or the Service shall be resolved through:
              </p>
              <ol className="list-decimal pl-6 space-y-2 mt-3">
                <li>
                  <strong className="text-foreground">Informal Resolution:</strong> We encourage 
                  you to contact us first to resolve any issues amicably.
                </li>
                <li>
                  <strong className="text-foreground">Binding Arbitration:</strong> If informal 
                  resolution fails, disputes will be resolved through binding arbitration.
                </li>
                <li>
                  <strong className="text-foreground">Class Action Waiver:</strong> You agree to 
                  resolve disputes on an individual basis and waive the right to participate in 
                  class actions.
                </li>
              </ol>
            </Section>

            <Section icon={RefreshCw} title="11. Changes to Terms">
              <p>
                We reserve the right to modify these Terms at any time. We will provide notice 
                of material changes by:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Posting the updated Terms on this page</li>
                <li>Updating the "Last updated" date</li>
                <li>Sending email notification for significant changes</li>
              </ul>
              <p className="mt-4">
                Your continued use of the Service after changes become effective constitutes 
                acceptance of the revised Terms. If you do not agree to the new Terms, you 
                must stop using the Service.
              </p>
            </Section>

            <Section icon={Mail} title="12. Contact Information">
              <p>
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="mt-4 p-4 rounded-lg bg-card border border-border">
                <p className="text-foreground font-medium">24Twelve Legal Team</p>
                <p className="text-sm mt-2">
                  Email: <a href="mailto:legal@24twelve.ai" className="text-primary hover:underline">
                    legal@24twelve.ai
                  </a>
                </p>
                <p className="text-sm mt-1">
                  For general inquiries:{" "}
                  <Link to="/contact" className="text-primary hover:underline">
                    Contact page
                  </Link>
                </p>
              </div>
            </Section>

            {/* Related Documents */}
            <div className="mt-12 p-6 rounded-2xl bg-muted/50 border border-border">
              <h3 className="font-semibold text-foreground mb-4">Related Documents</h3>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/privacy" 
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
                >
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">Privacy Policy</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
      </div>
    </>
  );
}
