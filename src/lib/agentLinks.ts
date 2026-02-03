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
  workflowUrl?: string;
  n8nWebhookUrl?: string;
  socialProfiles?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    tiktok?: string;
    twitter?: string;
    youtube?: string;
  };
}

// Agent-specific configurations
// NOTE: No hardcoded external URLs - users configure their own links via Settings
// Social media and external service links ONLY connect to user's own accounts
export const agentConfigs: Record<string, AgentConfig> = {
  julia: {
    slug: "julia",
    name: "Receptionist Julia",
    // User configures their own email, phone, booking URL, etc.
  },
  nicole: {
    slug: "nicole",
    name: "Executive Assistant Nicole",
  },
  halle: {
    slug: "halle",
    name: "Legal Associate Halle",
  },
  george: {
    slug: "george",
    name: "Social Media Manager George",
    // Social profiles configured by user
  },
  arnie: {
    slug: "arnie",
    name: "Blog Writer Arnie",
  },
  brad: {
    slug: "brad",
    name: "Sales Associate Brad",
  },
  sam: {
    slug: "sam",
    name: "Life Coach Sam",
  },
  jerry: {
    slug: "jerry",
    name: "Financial Planner Jerry",
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
        workflowUrl: userSettings.workflowUrl || baseConfig.workflowUrl,
        n8nWebhookUrl: userSettings.n8nWebhookUrl || baseConfig.n8nWebhookUrl,
        socialProfiles: {
          instagram: userSettings.instagram || baseConfig.socialProfiles?.instagram,
          facebook: userSettings.facebook || baseConfig.socialProfiles?.facebook,
          linkedin: userSettings.linkedin || baseConfig.socialProfiles?.linkedin,
          tiktok: userSettings.tiktok || baseConfig.socialProfiles?.tiktok,
          twitter: userSettings.twitter || baseConfig.socialProfiles?.twitter,
          youtube: userSettings.youtube || baseConfig.socialProfiles?.youtube,
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
  if (config.socialProfiles?.youtube) {
    socialItems.push({
      label: "YouTube",
      href: config.socialProfiles.youtube,
      iconKey: "Youtube",
      description: "Upload to YouTube",
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
  // Phone call link
  if (config.phoneNumber) {
    crmItems.push({
      label: "Call",
      href: `tel:${config.phoneNumber.replace(/\D/g, "")}`,
      iconKey: "Phone",
      description: "Make phone call",
      enabled: true,
    });
    crmItems.push({
      label: "WhatsApp",
      href: `https://wa.me/${config.phoneNumber.replace(/\D/g, "")}?text=Hello%20from%2024TWELVE`,
      iconKey: "MessageCircle",
      description: "Send WhatsApp message",
      enabled: true,
    });
    crmItems.push({
      label: "SMS",
      href: `sms:${config.phoneNumber.replace(/\D/g, "")}`,
      iconKey: "MessageSquare",
      description: "Send SMS message",
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

  // Workflows category
  const workflowItems: AgentLinkItem[] = [];
  if (config.workflowUrl) {
    workflowItems.push({
      label: "Workflow Dashboard",
      href: config.workflowUrl,
      iconKey: "Workflow",
      description: "Open workflow automation",
      enabled: true,
    });
  }
  if (config.n8nWebhookUrl) {
    workflowItems.push({
      label: "n8n Workflows",
      href: config.n8nWebhookUrl,
      iconKey: "Zap",
      description: "Trigger n8n automation",
      enabled: true,
    });
  }
  if (workflowItems.length > 0) {
    categories.push({
      category: "Workflows",
      iconKey: "Zap",
      items: workflowItems,
    });
  }

  return categories;
}
