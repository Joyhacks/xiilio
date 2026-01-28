import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { SignUpStep1 } from './SignUpStep1';
import { SignUpStep2 } from './SignUpStep2';
import { SignUpStep3 } from './SignUpStep3';
import {
  SignUpStep1Data,
  SignUpStep2Data,
  SignUpStep3Data,
} from '@/lib/authValidation';

interface SignUpWizardProps {
  onSuccess: () => void;
  onBack: () => void;
}

export function SignUpWizard({ onSuccess, onBack }: SignUpWizardProps) {
  const { signUp, signInWithGoogle, signInWithApple } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [step1Data, setStep1Data] = useState<SignUpStep1Data | null>(null);
  const [step2Data, setStep2Data] = useState<SignUpStep2Data | null>(null);

  const steps = [
    { number: 1, title: 'Account' },
    { number: 2, title: 'Personalization' },
    { number: 3, title: 'Connections' },
  ];

  const progress = (currentStep / steps.length) * 100;

  const handleStep1Complete = (data: SignUpStep1Data) => {
    setStep1Data(data);
    setCurrentStep(2);
    setError(null);
  };

  const handleStep2Complete = (data: SignUpStep2Data) => {
    setStep2Data(data);
    setCurrentStep(3);
    setError(null);
  };

  const handleStep3Complete = async (data: SignUpStep3Data) => {
    if (!step1Data || !step2Data) return;

    setIsLoading(true);
    setError(null);

    try {
      // Create the user account
      const { error: signUpError } = await signUp(
        step1Data.email,
        step1Data.password,
        step1Data.fullName
      );

      if (signUpError) {
        if (signUpError.message.includes('already registered')) {
          setError('An account with this email already exists. Please sign in instead.');
        } else {
          setError(signUpError.message);
        }
        setIsLoading(false);
        return;
      }

      // Wait a moment for the session to be established
      await new Promise(resolve => setTimeout(resolve, 500));

      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Save profile data
        await supabase.from('user_profiles').upsert({
          user_id: user.id,
          full_name: step1Data.fullName,
          company_name: step1Data.companyName || null,
          role_use_case: step1Data.roleUseCase,
          primary_goal: step2Data.primaryGoal,
          industry: step2Data.industry || null,
          target_audience: step2Data.targetAudience || null,
          preferred_tone: step2Data.preferredTone,
          timezone: step2Data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
          data_consent: step1Data.termsAccepted,
          personalization_enabled: true,
          onboarding_completed: true,
        });

        // Save links data if any provided
        const hasLinks = data.facebookUrl || data.instagramUrl || data.tiktokUrl || 
                        data.linkedinUrl || data.whatsappPhone || data.defaultEmail;
        
        if (hasLinks) {
          await supabase.from('user_links').upsert({
            user_id: user.id,
            facebook_url: data.facebookUrl || null,
            instagram_url: data.instagramUrl || null,
            tiktok_url: data.tiktokUrl || null,
            linkedin_url: data.linkedinUrl || null,
            whatsapp_phone_e164: data.whatsappPhone || null,
            whatsapp_prefill_message: data.whatsappMessage || null,
            default_email_to: data.defaultEmail || null,
            inbox_url: data.inboxUrl || null,
          });
        }

        // Save memory for personalization
        const memorySummary = generateMemorySummary(step1Data, step2Data, data);
        await supabase.from('user_memory').insert({
          user_id: user.id,
          memory_type: 'onboarding',
          structured_data: {
            profile: {
              fullName: step1Data.fullName,
              company: step1Data.companyName,
              role: step1Data.roleUseCase,
            },
            preferences: {
              goal: step2Data.primaryGoal,
              industry: step2Data.industry,
              audience: step2Data.targetAudience,
              tone: step2Data.preferredTone,
            },
            links: {
              hasSocial: !!(data.facebookUrl || data.instagramUrl || data.tiktokUrl || data.linkedinUrl),
              hasWhatsApp: !!data.whatsappPhone,
              hasEmail: !!data.defaultEmail,
            },
          },
          text_summary: memorySummary,
        });
      }

      toast({
        title: 'Welcome aboard! 🎉',
        description: 'Your account has been created successfully.',
      });

      onSuccess();
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    const { error } = await signInWithGoogle();
    if (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const handleAppleSignUp = async () => {
    setIsLoading(true);
    const { error } = await signInWithApple();
    if (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      onBack();
    } else {
      setCurrentStep(prev => prev - 1);
      setError(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">Create your account</h2>
        <p className="text-muted-foreground mt-1">
          {currentStep === 1 && 'Start with the basics'}
          {currentStep === 2 && 'Tell us about your goals'}
          {currentStep === 3 && 'Connect your channels (optional)'}
        </p>
      </div>

      {/* Progress */}
      <div className="space-y-3">
        <div className="flex justify-between">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex items-center gap-2"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  step.number < currentStep
                    ? 'bg-primary text-primary-foreground'
                    : step.number === currentStep
                    ? 'bg-primary/20 text-primary border-2 border-primary'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {step.number < currentStep ? (
                  <Check className="w-4 h-4" />
                ) : (
                  step.number
                )}
              </div>
              <span className={`hidden sm:block text-sm ${
                step.number <= currentStep ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
        <Progress value={progress} className="h-1" />
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Steps */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {currentStep === 1 && (
            <SignUpStep1
              onNext={handleStep1Complete}
              onGoogleSignUp={handleGoogleSignUp}
              onAppleSignUp={handleAppleSignUp}
              isLoading={isLoading}
              defaultValues={step1Data || undefined}
            />
          )}
          {currentStep === 2 && (
            <SignUpStep2
              onNext={handleStep2Complete}
              isLoading={isLoading}
              defaultValues={step2Data || undefined}
            />
          )}
          {currentStep === 3 && (
            <SignUpStep3
              onComplete={handleStep3Complete}
              isLoading={isLoading}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between pt-4 border-t border-border">
        <Button variant="ghost" onClick={handleBack} disabled={isLoading}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        {currentStep < 3 && (
          <div className="text-sm text-muted-foreground">
            Step {currentStep} of {steps.length}
          </div>
        )}
      </div>
    </div>
  );
}

function generateMemorySummary(
  step1: SignUpStep1Data,
  step2: SignUpStep2Data,
  step3: SignUpStep3Data
): string {
  const parts = [
    `User ${step1.fullName}`,
    step1.companyName ? `works at ${step1.companyName}` : null,
    `in a ${step1.roleUseCase} role.`,
    `Their primary goal is ${step2.primaryGoal}.`,
    step2.industry ? `They work in the ${step2.industry} industry.` : null,
    step2.targetAudience ? `Target audience: ${step2.targetAudience}.` : null,
    `They prefer a ${step2.preferredTone} communication style.`,
  ].filter(Boolean);

  return parts.join(' ');
}
