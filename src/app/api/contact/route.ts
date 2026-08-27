import { NextResponse } from "next/server";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  service?: string;
  message?: string;
  /** Honeypot field — should always be empty for real submissions. */
  company_website?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Silently accept honeypot hits so bots do not learn they were caught.
  if (body.company_website) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  // TODO: deliver the lead — e.g. Resend/Postmark email, or append to a CRM.
  // Until that is wired up the submission is only logged server-side, so this
  // endpoint must not be treated as a working inbox in production.
  console.info("[contact] new enquiry", {
    name,
    email,
    company: body.company?.trim() || null,
    service: body.service || null,
    message,
  });

  return NextResponse.json({ ok: true });
}
