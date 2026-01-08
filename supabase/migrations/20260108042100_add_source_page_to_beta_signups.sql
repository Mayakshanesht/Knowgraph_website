-- Add source_page field to beta_signups table
ALTER TABLE public.beta_signups 
ADD COLUMN source_page TEXT DEFAULT 'Landing';

-- Add comment to document the field
COMMENT ON COLUMN public.beta_signups.source_page IS 'The page where the signup originated (Landing, Pricing, App Demo, etc.)';

-- Update existing records to have default source page
UPDATE public.beta_signups 
SET source_page = 'Landing' 
WHERE source_page IS NULL;
