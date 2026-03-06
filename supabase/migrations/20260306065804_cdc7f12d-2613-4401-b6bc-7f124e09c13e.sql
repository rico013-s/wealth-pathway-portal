CREATE TABLE public.demo_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  company text NOT NULL,
  email text NOT NULL,
  phone text,
  platform text,
  message text,
  status text NOT NULL DEFAULT 'pending'
);

ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit demo request"
  ON public.demo_requests FOR INSERT
  WITH CHECK (name IS NOT NULL AND email IS NOT NULL AND company IS NOT NULL);

CREATE POLICY "Only admins can view demo requests"
  ON public.demo_requests FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));