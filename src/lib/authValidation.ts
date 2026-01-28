import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string()
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  password: z.string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export const signUpStep1Schema = z.object({
  fullName: z.string()
    .trim()
    .min(1, 'Full name is required')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string()
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(72, 'Password must be less than 72 characters'),
  confirmPassword: z.string()
    .min(1, 'Please confirm your password'),
  companyName: z.string()
    .max(100, 'Company name must be less than 100 characters')
    .optional(),
  roleUseCase: z.string()
    .min(1, 'Please select your role'),
  termsAccepted: z.boolean()
    .refine(val => val === true, 'You must accept the terms and privacy policy'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const signUpStep2Schema = z.object({
  primaryGoal: z.string().min(1, 'Please select your primary goal'),
  industry: z.string().max(100, 'Industry must be less than 100 characters').optional(),
  targetAudience: z.string().max(200, 'Target audience must be less than 200 characters').optional(),
  preferredTone: z.string().min(1, 'Please select a preferred tone'),
  timezone: z.string().optional(),
});

export const signUpStep3Schema = z.object({
  facebookUrl: z.string().url('Please enter a valid URL').or(z.literal('')).optional(),
  instagramUrl: z.string().url('Please enter a valid URL').or(z.literal('')).optional(),
  tiktokUrl: z.string().url('Please enter a valid URL').or(z.literal('')).optional(),
  linkedinUrl: z.string().url('Please enter a valid URL').or(z.literal('')).optional(),
  whatsappPhone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number (E.164 format)')
    .or(z.literal(''))
    .optional(),
  whatsappMessage: z.string().max(500, 'Message must be less than 500 characters').optional(),
  defaultEmail: z.string().email('Please enter a valid email').or(z.literal('')).optional(),
  inboxUrl: z.string().url('Please enter a valid URL').or(z.literal('')).optional(),
});

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpStep1Data = z.infer<typeof signUpStep1Schema>;
export type SignUpStep2Data = z.infer<typeof signUpStep2Schema>;
export type SignUpStep3Data = z.infer<typeof signUpStep3Schema>;

export const roleOptions = [
  { value: 'sales', label: 'Sales' },
  { value: 'support', label: 'Support' },
  { value: 'content', label: 'Content Creation' },
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'agency', label: 'Agency' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'other', label: 'Other' },
];

export const goalOptions = [
  { value: 'lead_gen', label: 'Lead Generation' },
  { value: 'support_automation', label: 'Support Automation' },
  { value: 'content_automation', label: 'Content Automation' },
  { value: 'booking_appointments', label: 'Booking Appointments' },
  { value: 'other', label: 'Other' },
];

export const toneOptions = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'direct', label: 'Direct' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'playful', label: 'Playful' },
];
