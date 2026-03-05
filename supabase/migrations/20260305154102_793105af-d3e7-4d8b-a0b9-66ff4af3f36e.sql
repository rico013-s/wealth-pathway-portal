
-- Add new columns to salesflow_brokers for multi-tenant support
ALTER TABLE public.salesflow_brokers 
  ADD COLUMN IF NOT EXISTS email text,
  ADD COLUMN IF NOT EXISTS plan text NOT NULL DEFAULT 'starter',
  ADD COLUMN IF NOT EXISTS license_status text NOT NULL DEFAULT 'active',
  ADD COLUMN IF NOT EXISTS chatbot_id text UNIQUE DEFAULT gen_random_uuid()::text,
  ADD COLUMN IF NOT EXISTS max_leads_per_month integer NOT NULL DEFAULT 500;

-- Add new columns to salesflow_leads
ALTER TABLE public.salesflow_leads 
  ADD COLUMN IF NOT EXISTS session_id text,
  ADD COLUMN IF NOT EXISTS age_range text,
  ADD COLUMN IF NOT EXISTS existing_broker boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS platform text,
  ADD COLUMN IF NOT EXISTS completed boolean DEFAULT false;

-- Create broker_stats view (aggregated stats, no individual lead data)
CREATE OR REPLACE VIEW public.broker_stats AS
SELECT 
  b.id as broker_id,
  b.company_name,
  b.admin_name,
  b.username,
  b.plan,
  b.license_status,
  b.active,
  b.chatbot_id,
  b.max_leads_per_month,
  b.expiry as license_expires_at,
  b.created_at,
  COALESCE(COUNT(l.id) FILTER (WHERE l.created_at >= date_trunc('month', now())), 0)::integer as total_leads_this_month,
  COALESCE(COUNT(l.id) FILTER (WHERE l.status = 'HOT' AND l.created_at >= date_trunc('month', now())), 0)::integer as hot_leads_count,
  COALESCE(COUNT(l.id) FILTER (WHERE l.status = 'WARM' AND l.created_at >= date_trunc('month', now())), 0)::integer as warm_leads_count,
  COALESCE(COUNT(l.id) FILTER (WHERE l.status = 'COLD' AND l.created_at >= date_trunc('month', now())), 0)::integer as cold_leads_count,
  CASE WHEN COUNT(l.id) > 0 THEN 
    ROUND(COALESCE(COUNT(l.id) FILTER (WHERE l.completed = true), 0)::numeric / NULLIF(COUNT(l.id), 0) * 100, 1)
  ELSE 0 END as completion_rate,
  MAX(l.created_at) as last_lead_at
FROM public.salesflow_brokers b
LEFT JOIN public.salesflow_leads l ON l.broker_id = b.id
GROUP BY b.id;

-- Remove insecure "Anyone can read leads" policy - leads now accessed only via edge functions
DROP POLICY IF EXISTS "Anyone can read leads" ON public.salesflow_leads;

-- Grant select on view for edge functions
GRANT SELECT ON public.broker_stats TO anon, authenticated;
