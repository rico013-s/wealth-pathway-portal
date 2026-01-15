-- Drop the overly permissive INSERT policy
DROP POLICY IF EXISTS "Anyone can submit consultation request" ON public.consultation_requests;

-- Create a more explicit INSERT policy (still allows public submissions but with explicit check)
CREATE POLICY "Anyone can submit consultation request"
ON public.consultation_requests
FOR INSERT
WITH CHECK (
  first_name IS NOT NULL 
  AND last_name IS NOT NULL 
  AND email IS NOT NULL
);