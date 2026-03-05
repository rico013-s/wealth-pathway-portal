
-- Fix security definer view - recreate as security invoker
DROP VIEW IF EXISTS public.broker_stats;
CREATE VIEW public.broker_stats WITH (security_invoker = true) AS
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

GRANT SELECT ON public.broker_stats TO anon, authenticated;
