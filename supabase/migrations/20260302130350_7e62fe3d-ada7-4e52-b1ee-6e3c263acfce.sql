
-- Salesflow Brokers table
CREATE TABLE public.salesflow_brokers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  admin_name text NOT NULL,
  username text NOT NULL UNIQUE,
  password text NOT NULL,
  active boolean NOT NULL DEFAULT true,
  expiry timestamp with time zone NOT NULL,
  days integer NOT NULL DEFAULT 30,
  config jsonb DEFAULT '{}',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.salesflow_brokers ENABLE ROW LEVEL SECURITY;

-- Only admins can manage brokers
CREATE POLICY "Admins can manage brokers" ON public.salesflow_brokers
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Salesflow Leads table
CREATE TABLE public.salesflow_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  broker_id uuid REFERENCES public.salesflow_brokers(id) ON DELETE SET NULL,
  score integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'COLD',
  capital text,
  experienta text,
  risc text,
  orizont text,
  sursa text,
  obiectiv text,
  profil text,
  conversation jsonb DEFAULT '[]',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.salesflow_leads ENABLE ROW LEVEL SECURITY;

-- Anyone can insert leads (public chatbot)
CREATE POLICY "Anyone can insert leads" ON public.salesflow_leads
  FOR INSERT WITH CHECK (true);

-- Admins can view all leads
CREATE POLICY "Admins can view leads" ON public.salesflow_leads
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
