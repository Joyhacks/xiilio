-- Create agent_configurations table to store personality and settings
CREATE TABLE public.agent_configurations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_slug TEXT NOT NULL UNIQUE,
  personality_tone TEXT NOT NULL DEFAULT 'friendly',
  formality_level TEXT NOT NULL DEFAULT 'professional',
  response_length TEXT NOT NULL DEFAULT 'balanced',
  greeting_style TEXT NOT NULL DEFAULT 'warm',
  custom_instructions TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create agent_activity_history table to track interactions
CREATE TABLE public.agent_activity_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_slug TEXT NOT NULL,
  activity_type TEXT NOT NULL,
  summary TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS but allow public access for demo
ALTER TABLE public.agent_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_activity_history ENABLE ROW LEVEL SECURITY;

-- Create policies for public read/write access (demo mode)
CREATE POLICY "Allow public read access to agent configurations"
ON public.agent_configurations
FOR SELECT
USING (true);

CREATE POLICY "Allow public update access to agent configurations"
ON public.agent_configurations
FOR UPDATE
USING (true);

CREATE POLICY "Allow public insert access to agent configurations"
ON public.agent_configurations
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow public read access to activity history"
ON public.agent_activity_history
FOR SELECT
USING (true);

CREATE POLICY "Allow public insert access to activity history"
ON public.agent_activity_history
FOR INSERT
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_agent_configurations_updated_at
BEFORE UPDATE ON public.agent_configurations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster queries
CREATE INDEX idx_activity_history_agent_slug ON public.agent_activity_history(agent_slug);
CREATE INDEX idx_activity_history_created_at ON public.agent_activity_history(created_at DESC);