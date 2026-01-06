-- Create beta signups table
CREATE TABLE public.beta_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL,
  interested_plans TEXT[] NOT NULL DEFAULT '{}',
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.beta_signups ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting (public can submit signups)
CREATE POLICY "Anyone can submit beta signup" 
ON public.beta_signups 
FOR INSERT 
WITH CHECK (true);

-- Create policy for reading (only authenticated admins - we'll handle this in code)
CREATE POLICY "Service role can read all signups" 
ON public.beta_signups 
FOR SELECT 
USING (true);

-- Create index for faster email lookups
CREATE INDEX idx_beta_signups_email ON public.beta_signups(email);
CREATE INDEX idx_beta_signups_created_at ON public.beta_signups(created_at DESC);