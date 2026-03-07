import { corsHeaders } from "../_shared/cors.ts";

const RECIPIENT_EMAIL = "armancristian96@gmail.com";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, message, source } = await req.json();
    const timestamp = new Date().toLocaleString("ro-RO", { timeZone: "Europe/Bucharest" });

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return new Response(JSON.stringify({ error: "Email service not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Markets4All <onboarding@resend.dev>",
        to: [RECIPIENT_EMAIL],
        subject: `🔔 Lead nou — ${source} — ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #d4a843; border-bottom: 2px solid #d4a843; padding-bottom: 10px;">Lead nou pe Markets4All</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
              <tr><td style="padding: 8px; font-weight: bold; color: #666;">Nume:</td><td style="padding: 8px;">${name}</td></tr>
              <tr style="background: #f9f9f9;"><td style="padding: 8px; font-weight: bold; color: #666;">Email:</td><td style="padding: 8px;">${email}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; color: #666;">Telefon:</td><td style="padding: 8px;">${phone || "N/A"}</td></tr>
              <tr style="background: #f9f9f9;"><td style="padding: 8px; font-weight: bold; color: #666;">Mesaj:</td><td style="padding: 8px;">${message || "N/A"}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; color: #666;">Sursa:</td><td style="padding: 8px;">${source}</td></tr>
              <tr style="background: #f9f9f9;"><td style="padding: 8px; font-weight: bold; color: #666;">Data:</td><td style="padding: 8px;">${timestamp}</td></tr>
            </table>
          </div>
        `,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Resend error:", data);
      return new Response(JSON.stringify({ error: "Failed to send email", details: data }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Notification error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
