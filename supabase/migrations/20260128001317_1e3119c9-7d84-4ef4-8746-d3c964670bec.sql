-- Create user_profiles table for storing user onboarding data
CREATE TABLE public.user_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  company_name TEXT,
  role_use_case TEXT,
  primary_goal TEXT,
  industry TEXT,
  target_audience TEXT,
  preferred_tone TEXT DEFAULT 'professional',
  timezone TEXT,
  data_consent BOOLEAN DEFAULT true,
  personalization_enabled BOOLEAN DEFAULT true,
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_links table for external connections
CREATE TABLE public.user_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  facebook_url TEXT,
  instagram_url TEXT,
  tiktok_url TEXT,
  linkedin_url TEXT,
  whatsapp_phone_e164 TEXT,
  whatsapp_prefill_message TEXT,
  inbox_url TEXT,
  default_email_to TEXT,
  email_subject_template TEXT,
  email_body_template TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_memory table for RAG personalization (text-based, embeddings handled externally)
CREATE TABLE public.user_memory (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  memory_type TEXT NOT NULL DEFAULT 'onboarding',
  structured_data JSONB,
  text_summary TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for user_memory lookups
CREATE INDEX idx_user_memory_user_id ON public.user_memory(user_id);

-- Enable RLS on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_memory ENABLE ROW LEVEL SECURITY;

-- User profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.user_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.user_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.user_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own profile"
  ON public.user_profiles FOR DELETE
  USING (auth.uid() = user_id);

-- User links policies
CREATE POLICY "Users can view their own links"
  ON public.user_links FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own links"
  ON public.user_links FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own links"
  ON public.user_links FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own links"
  ON public.user_links FOR DELETE
  USING (auth.uid() = user_id);

-- User memory policies
CREATE POLICY "Users can view their own memory"
  ON public.user_memory FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own memory"
  ON public.user_memory FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own memory"
  ON public.user_memory FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own memory"
  ON public.user_memory FOR DELETE
  USING (auth.uid() = user_id);

-- Add trigger for updated_at
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_links_updated_at
  BEFORE UPDATE ON public.user_links
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_memory_updated_at
  BEFORE UPDATE ON public.user_memory
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();