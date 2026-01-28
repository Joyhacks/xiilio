-- Add X (Twitter) and YouTube URL columns to user_links table
ALTER TABLE public.user_links
ADD COLUMN x_url text,
ADD COLUMN youtube_url text;