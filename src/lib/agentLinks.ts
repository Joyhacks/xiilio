// Agent External Links Configuration
// Data-driven system for per-agent quick links

import { UserAgentSettings } from "@/hooks/useAgentLinksSettings";

export interface AgentLinkItem {
  label: string;
  href: string;
  iconKey: string;
  description?: string;
  enabled?: boolean;
}

export interface AgentLinkCategory {
  category: string;
  iconKey: string;
  items: AgentLinkItem[];
}

export interface AgentConfig {
  slug: string;
  name: string;
  email?: string;
  phoneNumber?: string;
  bookingUrl?: string;
  blogNewPostUrl?: string;
  crmUrl?: string;
  helpdeskUrl?: string;
  sharedInboxUrl?: string;
  knowledgeBaseUrl?: string;
  socialProfiles?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    tiktok?: string;
    twitter?: string;
  };
}

// Agent-specific configurations
export const agentConfigs: Record<string, AgentConfig> = {
  julia: {
    slug: "julia",
    name: "Receptionist Julia",
    email: "julia@24twelve.ai",
    phoneNumber: "+1234567890",
    bookingUrl: "https://calendly.com/24twelve/reception",
    sharedInboxUrl: "https://mail.google.com/mail/u/0/#inbox",
  },
  kate: {
    slug: "kate",
    name: "Executive Assistant Kate",
    email: "kate@24twelve.ai",
    bookingUrl: "https://calendly.com/24twelve/executive",
    crmUrl: "https://app.hubspot.com/contacts",
  },
  halle: {
    slug: "halle",
    name: "Legal Associate Halle",
    email: "halle@24twelve.ai",
    knowledgeBaseUrl: "https://notion.so/legal-docs",
  },
  george: {
    slug: "george",
    name: "Social Media Manager George",
    email: "george@24twelve.ai",
    blogNewPostUrl: "https://wordpress.com/post",
    socialProfiles: {
      instagram: "https://www.instagram.com/",
      facebook: "https://www.facebook.com/",
      linkedin: "https://www.linkedin.com/",
      tiktok: "https://www.tiktok.com/",
      twitter: "https://twitter.com/compose/tweet",
    },
  },
  arnie: {
    slug: "arnie",
    name: "Blog Writer Arnie",
    email: "arnie@24twelve.ai",
    blogNewPostUrl: "https://wordpress.com/post",
  },
  brad: {
    slug: "brad",
    name: "Sales Associate Brad",
    email: "brad@24twelve.ai",
    phoneNumber: "+1234567891",
    bookingUrl: "https://calendly.com/24twelve/sales-demo",
    crmUrl: "https://app.hubspot.com/sales",
    socialProfiles: {
      linkedin: "https://www.linkedin.com/",
    },
  },
  sam: {
    slug: "sam",
    name: "Life Coach Sam",
    email: "sam@24twelve.ai",
    bookingUrl: "https://calendly.com/24twelve/coaching-session",
  },
  jerry: {
    slug: "jerry",
    name: "Financial Planner Jerry",
    email: "jerry@24twelve.ai",
    bookingUrl: "https://calendly.com/24twelve/financial-review",
    crmUrl: "https://app.hubspot.com/contacts",
  },
};

// Default/fallback links
const defaultLinks: AgentLinkCategory[] = [
  {
    category: "Email",
    iconKey: "Mail",
    items: [
      {
        label: "Compose Email",
        href: "#",
        iconKey: "Send",
        description: "Send a new email",
        enabled: false,
      },
    ],
  },
];

// Build links for a specific agent based on their config and optional user settings
export function getAgentLinks(
  agentSlug: string,
  userSettings?: UserAgentSettings
): AgentLinkCategory[] {
  const baseConfig = agentConfigs[agentSlug];
  
  if (!baseConfig) {
    return defaultLinks;
  }

  // Merge user settings with base config
  const config: AgentConfig = userSettings
    ? {
        ...baseConfig,
        email: userSettings.email || baseConfig.email,
        phoneNumber: userSettings.phoneNumber || baseConfig.phoneNumber,
        bookingUrl: userSettings.bookingUrl || baseConfig.bookingUrl,
        blogNewPostUrl: userSettings.blogNewPostUrl || baseConfig.blogNewPostUrl,
        crmUrl: userSettings.crmUrl || baseConfig.crmUrl,
        helpdeskUrl: userSettings.helpdeskUrl || baseConfig.helpdeskUrl,
        sharedInboxUrl: userSettings.sharedInboxUrl || baseConfig.sharedInboxUrl,
        knowledgeBaseUrl: userSettings.knowledgeBaseUrl || baseConfig.knowledgeBaseUrl,
        socialProfiles: {
          instagram: userSettings.instagram || baseConfig.socialProfiles?.instagram,
          facebook: userSettings.facebook || baseConfig.socialProfiles?.facebook,
          linkedin: userSettings.linkedin || baseConfig.socialProfiles?.linkedin,
          tiktok: userSettings.tiktok || baseConfig.socialProfiles?.tiktok,
          twitter: userSettings.twitter || baseConfig.socialProfiles?.twitter,
        },
      }
    : baseConfig;

  const categories: AgentLinkCategory[] = [];

  // Email category
  const emailItems: AgentLinkItem[] = [];
  if (config.email) {
    emailItems.push({
      label: "Compose Email",
      href: `mailto:${config.email}?subject=Hello%20from%2024TWELVE`,
      iconKey: "Send",
      description: "Send a new email",
      enabled: true,
    });
  } else {
    emailItems.push({
      label: "Compose Email",
      href: "#",
      iconKey: "Send",
      description: "Email not configured",
      enabled: false,
    });
  }
  if (config.sharedInboxUrl) {
    emailItems.push({
      label: "Shared Inbox",
      href: config.sharedInboxUrl,
      iconKey: "Inbox",
      description: "View shared mailbox",
      enabled: true,
    });
  }
  categories.push({
    category: "Email",
    iconKey: "Mail",
    items: emailItems,
  });

  // Social category
  const socialItems: AgentLinkItem[] = [];
  if (config.socialProfiles?.instagram) {
    socialItems.push({
      label: "Instagram",
      href: config.socialProfiles.instagram,
      iconKey: "Instagram",
      description: "Post to Instagram",
      enabled: true,
    });
  }
  if (config.socialProfiles?.facebook) {
    socialItems.push({
      label: "Facebook",
      href: config.socialProfiles.facebook,
      iconKey: "Facebook",
      description: "Post to Facebook",
      enabled: true,
    });
  }
  if (config.socialProfiles?.linkedin) {
    socialItems.push({
      label: "LinkedIn",
      href: config.socialProfiles.linkedin,
      iconKey: "Linkedin",
      description: "Post to LinkedIn",
      enabled: true,
    });
  }
  if (config.socialProfiles?.tiktok) {
    socialItems.push({
      label: "TikTok",
      href: config.socialProfiles.tiktok,
      iconKey: "Video",
      description: "Create TikTok",
      enabled: true,
    });
  }
  if (config.socialProfiles?.twitter) {
    socialItems.push({
      label: "Twitter/X",
      href: config.socialProfiles.twitter,
      iconKey: "Twitter",
      description: "Post to Twitter",
      enabled: true,
    });
  }
  // Add placeholder if no social profiles
  if (socialItems.length === 0) {
    socialItems.push({
      label: "Social Profiles",
      href: "#",
      iconKey: "Share2",
      description: "No social profiles configured",
      enabled: false,
    });
  }
  categories.push({
    category: "Social",
    iconKey: "Share2",
    items: socialItems,
  });

  // Content category
  const contentItems: AgentLinkItem[] = [];
  if (config.blogNewPostUrl) {
    contentItems.push({
      label: "New Blog Post",
      href: config.blogNewPostUrl,
      iconKey: "FileEdit",
      description: "Create a new blog post",
      enabled: true,
    });
  } else {
    contentItems.push({
      label: "New Blog Post",
      href: "#",
      iconKey: "FileEdit",
      description: "Blog not configured",
      enabled: false,
    });
  }
  if (config.knowledgeBaseUrl) {
    contentItems.push({
      label: "Knowledge Base",
      href: config.knowledgeBaseUrl,
      iconKey: "BookOpen",
      description: "Access knowledge base",
      enabled: true,
    });
  }
  categories.push({
    category: "Content",
    iconKey: "FileText",
    items: contentItems,
  });

  // Scheduling category
  const schedulingItems: AgentLinkItem[] = [];
  if (config.bookingUrl) {
    schedulingItems.push({
      label: "Book Meeting",
      href: config.bookingUrl,
      iconKey: "Calendar",
      description: "Schedule a meeting",
      enabled: true,
    });
  } else {
    schedulingItems.push({
      label: "Book Meeting",
      href: "#",
      iconKey: "Calendar",
      description: "Calendar not configured",
      enabled: false,
    });
  }
  categories.push({
    category: "Scheduling",
    iconKey: "CalendarDays",
    items: schedulingItems,
  });

  // CRM/Support category
  const crmItems: AgentLinkItem[] = [];
  if (config.crmUrl) {
    crmItems.push({
      label: "CRM Dashboard",
      href: config.crmUrl,
      iconKey: "Users",
      description: "Open CRM dashboard",
      enabled: true,
    });
  }
  if (config.helpdeskUrl) {
    crmItems.push({
      label: "Helpdesk",
      href: config.helpdeskUrl,
      iconKey: "LifeBuoy",
      description: "View support tickets",
      enabled: true,
    });
  }
  if (config.phoneNumber) {
    crmItems.push({
      label: "WhatsApp",
      href: `https://wa.me/${config.phoneNumber.replace(/\D/g, "")}?text=Hello%20from%2024TWELVE`,
      iconKey: "MessageCircle",
      description: "Send WhatsApp message",
      enabled: true,
    });
  }
  // Add placeholder if no CRM items
  if (crmItems.length === 0) {
    crmItems.push({
      label: "CRM Dashboard",
      href: "#",
      iconKey: "Users",
      description: "CRM not configured",
      enabled: false,
    });
  }
  categories.push({
    category: "CRM & Support",
    iconKey: "Headphones",
    items: crmItems,
  });

  return categories;
}
