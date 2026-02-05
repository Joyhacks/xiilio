-- Add explicit RLS policies to deny public/anonymous access to sensitive tables
-- This addresses critical security findings from the security scan

-- 1. user_profiles: Deny public access
CREATE POLICY "Deny public access to user_profiles" 
ON public.user_profiles 
FOR SELECT 
TO anon
USING (false);

-- 2. user_links: Deny public access  
CREATE POLICY "Deny public access to user_links" 
ON public.user_links 
FOR SELECT 
TO anon
USING (false);

-- 3. user_calendar_events: Deny public access
CREATE POLICY "Deny public access to user_calendar_events" 
ON public.user_calendar_events 
FOR SELECT 
TO anon
USING (false);

-- 4. user_learned_facts: Deny public access
CREATE POLICY "Deny public access to user_learned_facts" 
ON public.user_learned_facts 
FOR SELECT 
TO anon
USING (false);

-- 5. user_memory: Deny public access
CREATE POLICY "Deny public access to user_memory" 
ON public.user_memory 
FOR SELECT 
TO anon
USING (false);

-- 6. agent_activity_history: Deny public access
CREATE POLICY "Deny public access to agent_activity_history" 
ON public.agent_activity_history 
FOR SELECT 
TO anon
USING (false);

-- 7. Restrict agent_configurations to owner access only
DROP POLICY IF EXISTS "Agent configurations are viewable by authenticated users" ON public.agent_configurations;
CREATE POLICY "Agent configurations viewable by owners only" 
ON public.agent_configurations 
FOR SELECT 
TO authenticated
USING (false);  -- Only service role should access this