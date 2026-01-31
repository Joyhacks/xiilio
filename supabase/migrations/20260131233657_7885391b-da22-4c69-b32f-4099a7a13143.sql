-- Add Google Meet and Zoom URL columns to user_links table
ALTER TABLE public.user_links 
ADD COLUMN IF NOT EXISTS google_meet_url TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS zoom_url TEXT DEFAULT NULL;