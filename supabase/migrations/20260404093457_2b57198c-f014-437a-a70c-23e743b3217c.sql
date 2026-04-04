
-- Create chat_conversations table for conversation persistence and RAG
CREATE TABLE public.chat_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  agent_slug TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  user_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Deny public access to chat_conversations"
ON public.chat_conversations
FOR SELECT
TO anon
USING (false);

CREATE POLICY "Users can view their own conversations"
ON public.chat_conversations
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own conversations"
ON public.chat_conversations
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role full access"
ON public.chat_conversations
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Allow anonymous inserts for unauthenticated users (user_id will be null)
CREATE POLICY "Anonymous users can insert conversations"
ON public.chat_conversations
FOR INSERT
TO anon
WITH CHECK (user_id IS NULL);

-- Indexes for RAG queries
CREATE INDEX idx_chat_conversations_session_id ON public.chat_conversations (session_id);
CREATE INDEX idx_chat_conversations_agent_slug ON public.chat_conversations (agent_slug);
CREATE INDEX idx_chat_conversations_content_search ON public.chat_conversations USING gin (to_tsvector('english', content));
