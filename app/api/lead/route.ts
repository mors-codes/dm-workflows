import { NextResponse } from "next/server";
import { Resend } from "resend";

type LeadPayload = {
  name?: string;
  email?: string;
  message?: string;
  company_website?: string;
};

export async function POST(request: Request) {
  let body: LeadPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  // Honeypot: only bots fill this.
  if (body.company_website) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const lead = {
    name,
    email,
    message,
    source: "dmworkflows.site",
    submittedAt: new Date().toISOString(),
  };

  const results = await Promise.allSettled([
    sendToWebhook(lead),
    sendNotificationEmail(lead),
  ]);

  const delivered = results.some((result) => result.status === "fulfilled");

  if (!delivered) {
    console.error("Lead delivery failed entirely", lead);
    return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

async function sendToWebhook(lead: Record<string, string>) {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) throw new Error("No webhook configured");

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
}

async function sendNotificationEmail(lead: Record<string, string>) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;

  if (!apiKey || !to) throw new Error("No email fallback configured");

  const recipients = to
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "DM Workflows <leads@dmworkflows.com>",
    to: recipients,
    replyTo: lead.email,
    subject: `New enquiry — ${lead.name}`,
    text: [
      `Name: ${lead.name}`,
      `Email: ${lead.email}`,
      "",
      lead.message,
      "",
      `Submitted: ${lead.submittedAt}`,
    ].join("\n"),
  });

  if (error) throw new Error(error.message);
}

export const runtime = "nodejs";