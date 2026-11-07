import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get("SITE_ORIGIN") ?? "https://mahdihasan.pages.dev",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const apiKey = Deno.env.get("RESEND_API_KEY");
  const recipient = Deno.env.get("CONTACT_TO_EMAIL");
  const sender = Deno.env.get("CONTACT_FROM_EMAIL");
  if (!apiKey || !recipient || !sender) {
    return new Response(JSON.stringify({ error: "Email notification is not configured." }), {
      status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim().slice(0, 160);
    const email = String(body.email ?? "").trim().slice(0, 254);
    const phone = String(body.phone ?? "").trim().slice(0, 80);
    const company = String(body.company ?? "").trim().slice(0, 160);
    const service = String(body.service_interest ?? "").trim().slice(0, 160);
    const message = String(body.message ?? "").trim().slice(0, 8000);
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) {
      return new Response(JSON.stringify({ error: "Invalid contact form data." }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const text = [
      `New website inquiry from ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : "",
      company ? `Organization: ${company}` : "",
      service ? `Service: ${service}` : "",
      "",
      message,
    ].filter(Boolean).join("\n");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: email,
        subject: `Website inquiry: ${name}`,
        text,
      }),
    });
    if (!response.ok) {
      const details = await response.text();
      console.error("Resend error:", response.status, details);
      return new Response(JSON.stringify({ error: "Email provider rejected the message." }), {
        status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ ok: true }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Contact notification failure:", error);
    return new Response(JSON.stringify({ error: "Unable to send notification." }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
