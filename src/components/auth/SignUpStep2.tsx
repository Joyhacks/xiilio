import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Target, Briefcase, Users, Sparkles, Globe } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { signUpStep2Schema, SignUpStep2Data, goalOptions, toneOptions } from '@/lib/authValidation';
import { cn } from '@/lib/utils';

interface SignUpStep2Props {
  onNext: (data: SignUpStep2Data) => void;
  isLoading: boolean;
  defaultValues?: SignUpStep2Data;
}

export function SignUpStep2({ onNext, isLoading, defaultValues }: SignUpStep2Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SignUpStep2Data>({
    resolver: zodResolver(signUpStep2Schema),
    defaultValues: defaultValues || {
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  });

  // Auto-detect timezone
  useEffect(() => {
    if (!defaultValues?.timezone) {
      setValue('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);
    }
  }, [defaultValues, setValue]);

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="primaryGoal">Primary Goal *</Label>
        <div className="relative">
          <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
          <Select
            onValueChange={(value) => setValue('primaryGoal', value)}
            defaultValue={defaultValues?.primaryGoal}
          >
            <SelectTrigger className={cn('pl-10', errors.primaryGoal && 'border-destructive')}>
              <SelectValue placeholder="What's your main objective?" />
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
        {errors.primaryGoal && (
          <p className="text-xs text-destructive">{errors.primaryGoal.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="industry">Industry</Label>
        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="industry"
            placeholder="e.g., Technology, Healthcare, Retail"
            className="pl-10"
            {...register('industry')}
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="targetAudience">Target Audience</Label>
        <div className="relative">
          <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="targetAudience"
            placeholder="e.g., Small business owners, Enterprise clients"
            className="pl-10"
            {...register('targetAudience')}
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="preferredTone">Preferred Communication Style *</Label>
        <div className="relative">
          <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
          <Select
            onValueChange={(value) => setValue('preferredTone', value)}
            defaultValue={defaultValues?.preferredTone}
          >
            <SelectTrigger className={cn('pl-10', errors.preferredTone && 'border-destructive')}>
              <SelectValue placeholder="How should agents communicate with you?" />
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
        {errors.preferredTone && (
          <p className="text-xs text-destructive">{errors.preferredTone.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="timezone">Timezone</Label>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="timezone"
            className="pl-10"
            {...register('timezone')}
            disabled={isLoading}
          />
        </div>
        <p className="text-xs text-muted-foreground">Auto-detected, but you can change it</p>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        Continue
      </Button>
    </form>
  );
}
