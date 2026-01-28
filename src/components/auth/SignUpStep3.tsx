import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Facebook, Instagram, Linkedin, MessageCircle, Mail, Inbox, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { signUpStep3Schema, SignUpStep3Data } from '@/lib/authValidation';

// TikTok icon component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

interface SignUpStep3Props {
  onComplete: (data: SignUpStep3Data) => void;
  isLoading: boolean;
}

export function SignUpStep3({ onComplete, isLoading }: SignUpStep3Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpStep3Data>({
    resolver: zodResolver(signUpStep3Schema),
  });

  const handleSkip = () => {
    onComplete({});
  };

  return (
    <form onSubmit={handleSubmit(onComplete)} className="space-y-6">
      <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Optional:</strong> Connect your channels to enable quick actions from our agents. You can always add these later in Settings.
        </p>
      </div>

      {/* Social Links */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-foreground">Social Media Links</h3>
        
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="facebookUrl" className="flex items-center gap-2 text-sm">
              <Facebook className="w-4 h-4 text-[#1877F2]" />
              Facebook
            </Label>
            <Input
              id="facebookUrl"
              placeholder="https://facebook.com/yourpage"
              {...register('facebookUrl')}
              disabled={isLoading}
            />
            {errors.facebookUrl && (
              <p className="text-xs text-destructive">{errors.facebookUrl.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="instagramUrl" className="flex items-center gap-2 text-sm">
              <Instagram className="w-4 h-4 text-[#E4405F]" />
              Instagram
            </Label>
            <Input
              id="instagramUrl"
              placeholder="https://instagram.com/yourprofile"
              {...register('instagramUrl')}
              disabled={isLoading}
            />
            {errors.instagramUrl && (
              <p className="text-xs text-destructive">{errors.instagramUrl.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tiktokUrl" className="flex items-center gap-2 text-sm">
              <TikTokIcon className="w-4 h-4" />
              TikTok
            </Label>
            <Input
              id="tiktokUrl"
              placeholder="https://tiktok.com/@yourprofile"
              {...register('tiktokUrl')}
              disabled={isLoading}
            />
            {errors.tiktokUrl && (
              <p className="text-xs text-destructive">{errors.tiktokUrl.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedinUrl" className="flex items-center gap-2 text-sm">
              <Linkedin className="w-4 h-4 text-[#0A66C2]" />
              LinkedIn
            </Label>
            <Input
              id="linkedinUrl"
              placeholder="https://linkedin.com/in/yourprofile"
              {...register('linkedinUrl')}
              disabled={isLoading}
            />
            {errors.linkedinUrl && (
              <p className="text-xs text-destructive">{errors.linkedinUrl.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* WhatsApp */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-[#25D366]" />
          WhatsApp
        </h3>
        
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="whatsappPhone">Phone Number (E.164)</Label>
            <Input
              id="whatsappPhone"
              placeholder="+1234567890"
              {...register('whatsappPhone')}
              disabled={isLoading}
            />
            {errors.whatsappPhone && (
              <p className="text-xs text-destructive">{errors.whatsappPhone.message}</p>
            )}
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="whatsappMessage">Default Message Template</Label>
            <Textarea
              id="whatsappMessage"
              placeholder="Hi! I'd like to learn more about your services..."
              className="resize-none"
              rows={2}
              {...register('whatsappMessage')}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Email */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
          <Mail className="w-4 h-4" />
          Email Settings
        </h3>
        
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="defaultEmail">Default Email Address</Label>
            <Input
              id="defaultEmail"
              type="email"
              placeholder="contact@yourcompany.com"
              {...register('defaultEmail')}
              disabled={isLoading}
            />
            {errors.defaultEmail && (
              <p className="text-xs text-destructive">{errors.defaultEmail.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="inboxUrl" className="flex items-center gap-2">
              <Inbox className="w-4 h-4" />
              Inbox URL
            </Label>
            <Input
              id="inboxUrl"
              placeholder="https://mail.google.com/..."
              {...register('inboxUrl')}
              disabled={isLoading}
            />
            {errors.inboxUrl && (
              <p className="text-xs text-destructive">{errors.inboxUrl.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={handleSkip}
          disabled={isLoading}
        >
          Connect Later
        </Button>
        <Button type="submit" className="flex-1" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating account...
            </>
          ) : (
            'Complete Setup'
          )}
        </Button>
      </div>
    </form>
  );
}
