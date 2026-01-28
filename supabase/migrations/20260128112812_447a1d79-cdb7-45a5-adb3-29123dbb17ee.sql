-- Fix Critical Security Issue #1: agent_activity_history - Remove public read/insert, require auth
-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Allow public insert access to activity history" ON public.agent_activity_history;
DROP POLICY IF EXISTS "Allow public read access to activity history" ON public.agent_activity_history;

-- Add user_id column to track ownership (nullable for legacy data)
ALTER TABLE public.agent_activity_history 
ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create new secure policies
-- Users can only read their own activity (or if user_id is null for legacy anonymous data)
CREATE POLICY "Users can view their own activity"
ON public.agent_activity_history
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Users can only insert their own activity
CREATE POLICY "Users can insert their own activity"
ON public.agent_activity_history
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow service role to insert anonymous activity (for unauthenticated demo usage)
CREATE POLICY "Service role can manage all activity"
ON public.agent_activity_history
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Fix Critical Security Issue #2: agent_configurations - Remove public insert/update
-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Allow public insert access to agent configurations" ON public.agent_configurations;
DROP POLICY IF EXISTS "Allow public update access to agent configurations" ON public.agent_configurations;
DROP POLICY IF EXISTS "Allow public read access to agent configurations" ON public.agent_configurations;

-- Keep public read access (agent configs should be readable by all for the app to function)
CREATE POLICY "Anyone can read agent configurations"
ON public.agent_configurations
FOR SELECT
USING (true);

-- Only service role can modify agent configurations (admin only via edge functions)
CREATE POLICY "Service role can manage agent configurations"
ON public.agent_configurations
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);