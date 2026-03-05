import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, systemPrompt, saveLead, brokerId } = await req.json();

    // If saveLead data is provided, save it to the database
    if (saveLead) {
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
      );

      // Check license status if broker_id is provided
      if (brokerId) {
        const { data: broker } = await supabase
          .from('salesflow_brokers')
          .select('active, license_status, expiry, max_leads_per_month')
          .eq('id', brokerId)
          .single();

        if (!broker || !broker.active || broker.license_status !== 'active' || new Date(broker.expiry) <= new Date()) {
          return new Response(JSON.stringify({ error: 'License expired or inactive' }), {
            status: 403,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        // Check monthly limit
        const { count } = await supabase
          .from('salesflow_leads')
          .select('id', { count: 'exact', head: true })
          .eq('broker_id', brokerId)
          .gte('created_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString());

        if (count !== null && count >= (broker.max_leads_per_month || 500)) {
          return new Response(JSON.stringify({ error: 'Monthly limit reached' }), {
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      }

      const { error } = await supabase.from('salesflow_leads').insert({
        broker_id: brokerId || null,
        score: saveLead.score || 0,
        status: saveLead.status || 'COLD',
        capital: saveLead.capital,
        experienta: saveLead.experienta,
        risc: saveLead.risc,
        orizont: saveLead.orizont,
        sursa: saveLead.sursa,
        obiectiv: saveLead.obiectiv,
        profil: saveLead.profil,
        conversation: saveLead.conversation || [],
        session_id: saveLead.session_id || null,
        age_range: saveLead.age_range || null,
        existing_broker: saveLead.existing_broker || false,
        platform: saveLead.platform || null,
        completed: saveLead.completed || false,
      });

      if (error) {
        console.error('Error saving lead:', error);
        return new Response(JSON.stringify({ error: 'Failed to save lead' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // AI Chat - use Lovable AI proxy
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const response = await fetch('https://api.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        max_tokens: 1024,
      }),
    });

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || '';

    return new Response(JSON.stringify({ text }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
