import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useAgentLinksSettings, UserAgentSettings } from "@/hooks/useAgentLinksSettings";
import { agentConfigs } from "@/lib/agentLinks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import {
  Settings,
  Mail,
  Phone,
  Calendar,
  FileEdit,
  Users,
  LifeBuoy,
  Inbox,
  BookOpen,
  Instagram,
  Facebook,
  Linkedin,
  Video,
  Twitter,
  Youtube,
  RotateCcw,
  Save,
  CheckCircle,
  Zap,
} from "lucide-react";

// URL validation schema
const urlSchema = z.string().url().optional().or(z.literal(""));
const emailSchema = z.string().email().optional().or(z.literal(""));
const phoneSchema = z.string().regex(/^[\d\s\-+()]*$/, "Invalid phone number").optional().or(z.literal(""));

const settingsSchema = z.object({
  // Email category
  email: emailSchema,
  sharedInboxUrl: urlSchema,
  // Communication
  phoneNumber: phoneSchema,
  // Scheduling
  bookingUrl: urlSchema,
  // Content
  blogNewPostUrl: urlSchema,
  knowledgeBaseUrl: urlSchema,
  // CRM & Support
  crmUrl: urlSchema,
  helpdeskUrl: urlSchema,
  // Workflows
  workflowUrl: urlSchema,
  n8nWebhookUrl: urlSchema,
  // Social
  instagram: urlSchema,
  facebook: urlSchema,
  linkedin: urlSchema,
  tiktok: urlSchema,
  twitter: urlSchema,
  youtube: urlSchema,
});

type SettingsFormData = z.infer<typeof settingsSchema>;

interface QuickLinksSettingsProps {
  agentSlug: string;
  agentName: string;
  agentColor?: string;
  trigger?: React.ReactNode;
  onSettingsChange?: () => void;
}

export function QuickLinksSettings({
  agentSlug,
  agentName,
  agentColor,
  trigger,
  onSettingsChange,
}: QuickLinksSettingsProps) {
  const [open, setOpen] = useState(false);
  const { settings, updateSettings, resetSettings, hasCustomSettings } = useAgentLinksSettings(agentSlug);
  const { toast } = useToast();
  const baseConfig = agentConfigs[agentSlug];

  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      email: settings.email || "",
      sharedInboxUrl: settings.sharedInboxUrl || "",
      phoneNumber: settings.phoneNumber || "",
      bookingUrl: settings.bookingUrl || "",
      blogNewPostUrl: settings.blogNewPostUrl || "",
      knowledgeBaseUrl: settings.knowledgeBaseUrl || "",
      crmUrl: settings.crmUrl || "",
      helpdeskUrl: settings.helpdeskUrl || "",
      workflowUrl: settings.workflowUrl || "",
      n8nWebhookUrl: settings.n8nWebhookUrl || "",
      instagram: settings.instagram || "",
      facebook: settings.facebook || "",
      linkedin: settings.linkedin || "",
      tiktok: settings.tiktok || "",
      twitter: settings.twitter || "",
      youtube: settings.youtube || "",
    },
  });

  // Reset form when settings change
  const handleOpen = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      form.reset({
        email: settings.email || "",
        sharedInboxUrl: settings.sharedInboxUrl || "",
        phoneNumber: settings.phoneNumber || "",
        bookingUrl: settings.bookingUrl || "",
        blogNewPostUrl: settings.blogNewPostUrl || "",
        knowledgeBaseUrl: settings.knowledgeBaseUrl || "",
        crmUrl: settings.crmUrl || "",
        helpdeskUrl: settings.helpdeskUrl || "",
        workflowUrl: settings.workflowUrl || "",
        n8nWebhookUrl: settings.n8nWebhookUrl || "",
        instagram: settings.instagram || "",
        facebook: settings.facebook || "",
        linkedin: settings.linkedin || "",
        tiktok: settings.tiktok || "",
        twitter: settings.twitter || "",
        youtube: settings.youtube || "",
      });
    }
  };

  const onSubmit = (data: SettingsFormData) => {
    // Filter out empty strings
    const cleanedData: UserAgentSettings = {};
    Object.entries(data).forEach(([key, value]) => {
      if (value && value.trim()) {
        cleanedData[key as keyof UserAgentSettings] = value.trim();
      }
    });

    updateSettings(cleanedData);
    onSettingsChange?.();
    
    toast({
      title: "Settings saved",
      description: `Quick Links for ${agentName} have been updated.`,
    });
    setOpen(false);
  };

  const handleReset = () => {
    resetSettings();
    form.reset({
      email: "",
      sharedInboxUrl: "",
      phoneNumber: "",
      bookingUrl: "",
      blogNewPostUrl: "",
      knowledgeBaseUrl: "",
      crmUrl: "",
      helpdeskUrl: "",
      workflowUrl: "",
      n8nWebhookUrl: "",
      instagram: "",
      facebook: "",
      linkedin: "",
      tiktok: "",
      twitter: "",
      youtube: "",
    });
    onSettingsChange?.();
    
    toast({
      title: "Settings reset",
      description: `Quick Links for ${agentName} have been reset to defaults.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "gap-2 text-muted-foreground hover:text-foreground",
              hasCustomSettings && "text-primary"
            )}
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
            {hasCustomSettings && (
              <CheckCircle className="w-3 h-3 text-primary" />
            )}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] p-0 bg-card">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <Settings className={cn("w-5 h-5", agentColor && `text-agent-${agentColor}`)} />
            Quick Links Settings
          </DialogTitle>
          <DialogDescription>
            Configure external tool URLs for {agentName}. Leave fields empty to use defaults.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <ScrollArea className="h-[50vh] px-6">
              <Tabs defaultValue="email" className="w-full">
                <TabsList className="w-full grid grid-cols-6 mb-4">
                  <TabsTrigger value="email" className="gap-1 text-xs">
                    <Mail className="w-3 h-3" />
                    <span className="hidden sm:inline">Email</span>
                  </TabsTrigger>
                  <TabsTrigger value="social" className="gap-1 text-xs">
                    <Instagram className="w-3 h-3" />
                    <span className="hidden sm:inline">Social</span>
                  </TabsTrigger>
                  <TabsTrigger value="content" className="gap-1 text-xs">
                    <FileEdit className="w-3 h-3" />
                    <span className="hidden sm:inline">Content</span>
                  </TabsTrigger>
                  <TabsTrigger value="scheduling" className="gap-1 text-xs">
                    <Calendar className="w-3 h-3" />
                    <span className="hidden sm:inline">Schedule</span>
                  </TabsTrigger>
                  <TabsTrigger value="crm" className="gap-1 text-xs">
                    <Users className="w-3 h-3" />
                    <span className="hidden sm:inline">CRM</span>
                  </TabsTrigger>
                  <TabsTrigger value="workflows" className="gap-1 text-xs">
                    <Zap className="w-3 h-3" />
                    <span className="hidden sm:inline">Workflows</span>
                  </TabsTrigger>
                </TabsList>

                {/* Email Tab */}
                <TabsContent value="email" className="space-y-4 mt-0">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Agent Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={baseConfig?.email || "agent@example.com"}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Email address for compose links
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sharedInboxUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Inbox className="w-4 h-4" />
                          Shared Inbox URL
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={baseConfig?.sharedInboxUrl || "https://mail.google.com/..."}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Link to webmail or shared inbox
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Phone / WhatsApp Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={baseConfig?.phoneNumber || "+1 234 567 8900"}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          For WhatsApp messaging links
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                {/* Social Tab */}
                <TabsContent value="social" className="space-y-4 mt-0">
                  <FormField
                    control={form.control}
                    name="instagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Instagram className="w-4 h-4" />
                          Instagram URL
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="https://instagram.com/..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="facebook"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Facebook className="w-4 h-4" />
                          Facebook URL
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="https://facebook.com/..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="linkedin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Linkedin className="w-4 h-4" />
                          LinkedIn URL
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="https://linkedin.com/..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tiktok"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Video className="w-4 h-4" />
                          TikTok URL
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="https://tiktok.com/..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="twitter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Twitter className="w-4 h-4" />
                          Twitter/X URL
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="https://twitter.com/..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="youtube"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Youtube className="w-4 h-4" />
                          YouTube URL
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="https://youtube.com/..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                {/* Content Tab */}
                <TabsContent value="content" className="space-y-4 mt-0">
                  <FormField
                    control={form.control}
                    name="blogNewPostUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <FileEdit className="w-4 h-4" />
                          Blog New Post URL
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={baseConfig?.blogNewPostUrl || "https://wordpress.com/post"}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Link to create new blog posts
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="knowledgeBaseUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          Knowledge Base URL
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={baseConfig?.knowledgeBaseUrl || "https://notion.so/..."}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Link to documentation or knowledge base
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                {/* Scheduling Tab */}
                <TabsContent value="scheduling" className="space-y-4 mt-0">
                  <FormField
                    control={form.control}
                    name="bookingUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Calendar Booking URL
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={baseConfig?.bookingUrl || "https://calendly.com/..."}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Link for scheduling meetings (Calendly, Cal.com, etc.)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                {/* CRM Tab */}
                <TabsContent value="crm" className="space-y-4 mt-0">
                  <FormField
                    control={form.control}
                    name="crmUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          CRM Dashboard URL
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={baseConfig?.crmUrl || "https://app.hubspot.com/..."}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Link to your CRM system
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="helpdeskUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <LifeBuoy className="w-4 h-4" />
                          Helpdesk URL
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={baseConfig?.helpdeskUrl || "https://zendesk.com/..."}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Link to support ticket system
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                {/* Workflows Tab */}
                <TabsContent value="workflows" className="space-y-4 mt-0">
                  <FormField
                    control={form.control}
                    name="workflowUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          Workflow Dashboard URL
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://make.com/dashboard/..."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Link to your workflow automation dashboard (Make, Zapier, etc.)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="n8nWebhookUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          n8n Webhook URL
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://your-n8n.app/webhook/..."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          n8n webhook URL for triggering automations
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
              </Tabs>
            </ScrollArea>

            <DialogFooter className="p-6 pt-4 border-t border-border/50 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                disabled={!hasCustomSettings}
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset to Defaults
              </Button>
              <Button type="submit" className="gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
