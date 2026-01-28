-- Create table for storing extracted facts from conversations
CREATE TABLE public.user_learned_facts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  fact_type TEXT NOT NULL DEFAULT 'general',
  fact_key TEXT NOT NULL,
  fact_value TEXT NOT NULL,
  source_agent TEXT,
  confidence DECIMAL(3,2) DEFAULT 0.8,
  mentioned_count INTEGER DEFAULT 1,
  first_learned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_mentioned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add index for efficient lookups
CREATE INDEX idx_user_learned_facts_user_id ON public.user_learned_facts(user_id);
CREATE INDEX idx_user_learned_facts_type ON public.user_learned_facts(fact_type);

-- Add comment describing fact_type categories
COMMENT ON COLUMN public.user_learned_facts.fact_type IS 'Categories: identity, colleague, client, company, project, preference, workflow, goal';

-- Enable Row Level Security
ALTER TABLE public.user_learned_facts ENABLE ROW LEVEL SECURITY;

-- Users can only access their own facts
CREATE POLICY "Users can view their own facts" 
ON public.user_learned_facts 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own facts" 
ON public.user_learned_facts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own facts" 
ON public.user_learned_facts 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own facts" 
ON public.user_learned_facts 
FOR DELETE 
USING (auth.uid() = user_id);

-- Service role can manage all facts (for edge functions)
CREATE POLICY "Service role can manage all facts" 
ON public.user_learned_facts 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Add trigger for updated_at
CREATE TRIGGER update_user_learned_facts_updated_at
BEFORE UPDATE ON public.user_learned_facts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();