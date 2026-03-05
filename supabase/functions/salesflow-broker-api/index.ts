
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  try {
    const body = await req.json();
    const { action } = body;

    // ===================== BROKER LOGIN =====================
    if (action === 'login') {
      const { username, password } = body;
      const { data, error } = await supabase
        .from('salesflow_brokers')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (error || !data) {
        return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
          status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      return new Response(JSON.stringify({ broker: data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // ===================== BROKER: GET OWN LEADS =====================
    if (action === 'get-leads') {
      const { broker_id, broker_username, broker_password, filter } = body;

      // Re-validate broker credentials to prevent unauthorized access
      const { data: broker } = await supabase
        .from('salesflow_brokers')
        .select('id')
        .eq('id', broker_id)
        .eq('username', broker_username)
        .eq('password', broker_password)
        .single();

      if (!broker) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      let query = supabase
        .from('salesflow_leads')
        .select('*')
        .eq('broker_id', broker_id)
        .order('created_at', { ascending: false });

      if (filter && filter !== 'ALL') {
        query = query.eq('status', filter);
      }

      const { data: leads } = await query;
      return new Response(JSON.stringify({ leads: leads || [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // ===================== BROKER: GET OWN STATS =====================
    if (action === 'get-broker-stats') {
      const { broker_id } = body;
      const { data } = await supabase
        .from('broker_stats')
        .select('*')
        .eq('broker_id', broker_id)
        .single();

      return new Response(JSON.stringify({ stats: data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // ===================== OWNER: GET ALL BROKER STATS (NO LEAD DATA) =====================
    if (action === 'owner-stats') {
      const { data } = await supabase
        .from('broker_stats')
        .select('*');

      return new Response(JSON.stringify({ stats: data || [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // ===================== OWNER: MANAGE BROKER LICENSE =====================
    if (action === 'manage-license') {
      const { broker_id, license_action, days_extend } = body;

      if (license_action === 'activate') {
        await supabase.from('salesflow_brokers').update({
          active: true,
          license_status: 'active'
        }).eq('id', broker_id);
      } else if (license_action === 'suspend') {
        await supabase.from('salesflow_brokers').update({
          active: false,
          license_status: 'suspended'
        }).eq('id', broker_id);
      } else if (license_action === 'extend') {
        const { data: broker } = await supabase
          .from('salesflow_brokers')
          .select('expiry')
          .eq('id', broker_id)
          .single();

        if (broker) {
          const currentExpiry = new Date(broker.expiry);
          const newExpiry = new Date(Math.max(currentExpiry.getTime(), Date.now()) + (days_extend || 30) * 86400000);
          await supabase.from('salesflow_brokers').update({
            expiry: newExpiry.toISOString(),
            active: true,
            license_status: 'active'
          }).eq('id', broker_id);
        }
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // ===================== CHECK MONTHLY LIMIT =====================
    if (action === 'check-limit') {
      const { broker_id } = body;
      const { data } = await supabase
        .from('broker_stats')
        .select('total_leads_this_month, max_leads_per_month')
        .eq('broker_id', broker_id)
        .single();

      const limitReached = data && data.total_leads_this_month >= data.max_leads_per_month;
      return new Response(JSON.stringify({
        limitReached,
        current: data?.total_leads_this_month || 0,
        max: data?.max_leads_per_month || 500
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // ===================== CHECK LICENSE STATUS =====================
    if (action === 'check-license') {
      const { broker_id } = body;
      const { data } = await supabase
        .from('salesflow_brokers')
        .select('active, license_status, expiry')
        .eq('id', broker_id)
        .single();

      const isActive = data && data.active && data.license_status === 'active' && new Date(data.expiry) > new Date();
      return new Response(JSON.stringify({ isActive, broker: data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ error: 'Unknown action' }), {
      status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
