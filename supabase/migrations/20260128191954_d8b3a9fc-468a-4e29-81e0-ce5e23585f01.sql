-- Fix: Remove overly permissive RLS policy on agent_configurations
-- The "Anyone can read" policy exposes AI agent behavior settings to unauthenticated users
-- Replace with authenticated-only access

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can read agent configurations" ON public.agent_configurations;

-- Create a new policy that only allows authenticated users to read
CREATE POLICY "Authenticated users can read agent configurations" 
ON public.agent_configurations 
FOR SELECT 
USING (auth.role() = 'authenticated');

-- Also fix the "Service role can manage" policy that uses USING (true) for ALL operations
-- This is acceptable for service_role but let's make it explicit
DROP POLICY IF EXISTS "Service role can manage agent configurations" ON public.agent_configurations;

-- Recreate with proper service role check (this policy is for backend/admin operations only)
-- Note: Service role bypasses RLS anyway, so this policy is mainly for documentation
CREATE POLICY "Service role full access" 
ON public.agent_configurations 
FOR ALL 
TO service_role
USING (true) 
WITH CHECK (true);