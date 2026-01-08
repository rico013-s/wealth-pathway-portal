-- Create table for consultation requests
CREATE TABLE public.consultation_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  goals TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'pending'
);

-- Enable RLS
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public form)
CREATE POLICY "Anyone can submit consultation request"
ON public.consultation_requests
FOR INSERT
WITH CHECK (true);

-- Only authenticated admins can view (you can adjust this later)
CREATE POLICY "Authenticated users can view requests"
ON public.consultation_requests
FOR SELECT
USING (auth.uid() IS NOT NULL);