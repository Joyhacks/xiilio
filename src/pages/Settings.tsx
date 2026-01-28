import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, Link as LinkIcon, Brain, ArrowLeft, Save, Trash2, Loader2,
  Facebook, Instagram, Linkedin, MessageCircle, Mail, Inbox,
  Sparkles, Shield, Download, FileJson
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { LearnedFactsViewer } from '@/components/LearnedFactsViewer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { goalOptions, toneOptions, roleOptions } from '@/lib/authValidation';

// TikTok icon component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

interface UserProfile {
  full_name: string | null;
  company_name: string | null;
  role_use_case: string | null;
  primary_goal: string | null;
  industry: string | null;
  target_audience: string | null;
  preferred_tone: string | null;
  timezone: string | null;
  personalization_enabled: boolean;
}

interface UserLinks {
  facebook_url: string | null;
  instagram_url: string | null;
  tiktok_url: string | null;
  linkedin_url: string | null;
  whatsapp_phone_e164: string | null;
  whatsapp_prefill_message: string | null;
  inbox_url: string | null;
  default_email_to: string | null;
}

export default function Settings() {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [clearingMemory, setClearingMemory] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [memoryCount, setMemoryCount] = useState(0);

  const [profile, setProfile] = useState<UserProfile>({
    full_name: '',
    company_name: '',
    role_use_case: '',
    primary_goal: '',
    industry: '',
    target_audience: '',
    preferred_tone: 'professional',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    personalization_enabled: true,
  });

  const [links, setLinks] = useState<UserLinks>({
    facebook_url: '',
    instagram_url: '',
    tiktok_url: '',
    linkedin_url: '',
    whatsapp_phone_e164: '',
    whatsapp_prefill_message: '',
    inbox_url: '',
    default_email_to: '',
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/');
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Load user data
  useEffect(() => {
    async function loadData() {
      if (!user) return;

      try {
        // Load profile
        const { data: profileData } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (profileData) {
          setProfile({
            full_name: profileData.full_name || '',
            company_name: profileData.company_name || '',
            role_use_case: profileData.role_use_case || '',
            primary_goal: profileData.primary_goal || '',
            industry: profileData.industry || '',
            target_audience: profileData.target_audience || '',
            preferred_tone: profileData.preferred_tone || 'professional',
            timezone: profileData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
            personalization_enabled: profileData.personalization_enabled ?? true,
          });
        }

        // Load links
        const { data: linksData } = await supabase
          .from('user_links')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (linksData) {
          setLinks({
            facebook_url: linksData.facebook_url || '',
            instagram_url: linksData.instagram_url || '',
            tiktok_url: linksData.tiktok_url || '',
            linkedin_url: linksData.linkedin_url || '',
            whatsapp_phone_e164: linksData.whatsapp_phone_e164 || '',
            whatsapp_prefill_message: linksData.whatsapp_prefill_message || '',
            inbox_url: linksData.inbox_url || '',
            default_email_to: linksData.default_email_to || '',
          });
        }

        // Count memory entries
        const { count } = await supabase
          .from('user_memory')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        setMemoryCount(count || 0);
      } catch (error) {
        console.error('Error loading settings:', error);
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      loadData();
    }
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);

    try {
      await supabase.from('user_profiles').upsert({
        user_id: user.id,
        ...profile,
      });

      toast({
        title: 'Profile saved',
        description: 'Your profile has been updated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveLinks = async () => {
    if (!user) return;
    setSaving(true);

    try {
      await supabase.from('user_links').upsert({
        user_id: user.id,
        facebook_url: links.facebook_url || null,
        instagram_url: links.instagram_url || null,
        tiktok_url: links.tiktok_url || null,
        linkedin_url: links.linkedin_url || null,
        whatsapp_phone_e164: links.whatsapp_phone_e164 || null,
        whatsapp_prefill_message: links.whatsapp_prefill_message || null,
        inbox_url: links.inbox_url || null,
        default_email_to: links.default_email_to || null,
      });

      toast({
        title: 'Links saved',
        description: 'Your external links have been updated.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save links. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleClearMemory = async () => {
    if (!user) return;
    setClearingMemory(true);

    try {
      await supabase
        .from('user_memory')
        .delete()
        .eq('user_id', user.id);

      setMemoryCount(0);
      toast({
        title: 'Memory cleared',
        description: 'All your personalization data has been deleted.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to clear memory. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setClearingMemory(false);
    }
  };

  const handleExportData = async () => {
    if (!user) return;
    setExporting(true);

    try {
      const { data, error } = await supabase.functions.invoke('export-user-data');
      
      if (error) throw error;

      // Create a blob and trigger download
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `24twelve-data-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: 'Data exported',
        description: 'Your data has been downloaded as a JSON file.',
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: 'Export failed',
        description: 'Failed to export your data. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setExporting(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Settings</h1>
              <p className="text-muted-foreground">Manage your profile, links, and data</p>
            </div>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile" className="gap-2">
                <User className="w-4 h-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="links" className="gap-2">
                <LinkIcon className="w-4 h-4" />
                Links
              </TabsTrigger>
              <TabsTrigger value="memory" className="gap-2">
                <Brain className="w-4 h-4" />
                Memory
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <div className="p-6 rounded-2xl bg-card border border-border/50 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input
                      value={profile.full_name || ''}
                      onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Company/Brand</Label>
                    <Input
                      value={profile.company_name || ''}
                      onChange={(e) => setProfile({ ...profile, company_name: e.target.value })}
                      placeholder="Acme Inc."
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Role/Use Case</Label>
                    <Select
                      value={profile.role_use_case || ''}
                      onValueChange={(value) => setProfile({ ...profile, role_use_case: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roleOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Primary Goal</Label>
                    <Select
                      value={profile.primary_goal || ''}
                      onValueChange={(value) => setProfile({ ...profile, primary_goal: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select goal" />
                      </SelectTrigger>
                      <SelectContent>
                        {goalOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Industry</Label>
                    <Input
                      value={profile.industry || ''}
                      onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
                      placeholder="Technology, Healthcare, etc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Target Audience</Label>
                    <Input
                      value={profile.target_audience || ''}
                      onChange={(e) => setProfile({ ...profile, target_audience: e.target.value })}
                      placeholder="Small business owners, etc."
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Preferred Tone</Label>
                    <Select
                      value={profile.preferred_tone || 'professional'}
                      onValueChange={(value) => setProfile({ ...profile, preferred_tone: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {toneOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Input
                      value={profile.timezone || ''}
                      onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                    />
                  </div>
                </div>

                <Button onClick={handleSaveProfile} disabled={saving} className="w-full sm:w-auto">
                  {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Save Profile
                </Button>
              </div>
            </TabsContent>

            {/* Links Tab */}
            <TabsContent value="links">
              <div className="p-6 rounded-2xl bg-card border border-border/50 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Social Media Links
                  </h3>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Facebook className="w-4 h-4 text-[#1877F2]" />
                        Facebook
                      </Label>
                      <Input
                        value={links.facebook_url || ''}
                        onChange={(e) => setLinks({ ...links, facebook_url: e.target.value })}
                        placeholder="https://facebook.com/yourpage"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Instagram className="w-4 h-4 text-[#E4405F]" />
                        Instagram
                      </Label>
                      <Input
                        value={links.instagram_url || ''}
                        onChange={(e) => setLinks({ ...links, instagram_url: e.target.value })}
                        placeholder="https://instagram.com/yourprofile"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <TikTokIcon className="w-4 h-4" />
                        TikTok
                      </Label>
                      <Input
                        value={links.tiktok_url || ''}
                        onChange={(e) => setLinks({ ...links, tiktok_url: e.target.value })}
                        placeholder="https://tiktok.com/@yourprofile"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                        LinkedIn
                      </Label>
                      <Input
                        value={links.linkedin_url || ''}
                        onChange={(e) => setLinks({ ...links, linkedin_url: e.target.value })}
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    WhatsApp
                  </h3>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Phone Number (E.164)</Label>
                      <Input
                        value={links.whatsapp_phone_e164 || ''}
                        onChange={(e) => setLinks({ ...links, whatsapp_phone_e164: e.target.value })}
                        placeholder="+1234567890"
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label>Default Message Template</Label>
                      <Textarea
                        value={links.whatsapp_prefill_message || ''}
                        onChange={(e) => setLinks({ ...links, whatsapp_prefill_message: e.target.value })}
                        placeholder="Hi! I'd like to learn more..."
                        rows={2}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Settings
                  </h3>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Default Email</Label>
                      <Input
                        value={links.default_email_to || ''}
                        onChange={(e) => setLinks({ ...links, default_email_to: e.target.value })}
                        placeholder="contact@yourcompany.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Inbox className="w-4 h-4" />
                        Inbox URL
                      </Label>
                      <Input
                        value={links.inbox_url || ''}
                        onChange={(e) => setLinks({ ...links, inbox_url: e.target.value })}
                        placeholder="https://mail.google.com/..."
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={handleSaveLinks} disabled={saving} className="w-full sm:w-auto">
                  {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Save Links
                </Button>
              </div>
            </TabsContent>

            {/* Memory Tab */}
            <TabsContent value="memory">
              <div className="space-y-6">
                {/* Personalization Toggle Card */}
                <div className="p-6 rounded-2xl bg-card border border-border/50 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Brain className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">Personalization Memory</h3>
                          <p className="text-sm text-muted-foreground">
                            {memoryCount} memory {memoryCount === 1 ? 'entry' : 'entries'} stored
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={profile.personalization_enabled}
                        onCheckedChange={(checked) => {
                          setProfile({ ...profile, personalization_enabled: checked });
                          handleSaveProfile();
                        }}
                      />
                    </div>

                    <div className="p-4 rounded-lg bg-muted/50 border border-border">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <div className="text-sm text-muted-foreground">
                          <p className="font-medium text-foreground mb-1">How we use your data</p>
                          <p>
                            Agents learn facts from your conversations—names, projects, preferences—to personalize future responses.
                            You can view, edit, or delete any learned fact below.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Clear Memory Section */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" disabled={memoryCount === 0 || clearingMemory}>
                        {clearingMemory ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4 mr-2" />
                        )}
                        Clear All Memory
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Clear personalization memory?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete all stored memory entries used for personalization.
                          Your profile and links will remain intact. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleClearMemory}>
                          Yes, clear memory
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

                {/* Learned Facts Viewer */}
                <div className="p-6 rounded-2xl bg-card border border-border/50">
                  <LearnedFactsViewer />
                </div>

                {/* Data Export Section */}
                <div className="p-6 rounded-2xl bg-card border border-border/50">
                  <div className="flex items-start gap-3">
                    <FileJson className="w-5 h-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-foreground mb-1">Export Your Data (GDPR)</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Download all your stored data in JSON format. This includes your profile, 
                        external links, learned facts, and personalization memory.
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={handleExportData} 
                        disabled={exporting}
                        className="gap-2"
                      >
                        {exporting ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Download className="w-4 h-4" />
                        )}
                        {exporting ? 'Exporting...' : 'Download My Data'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
