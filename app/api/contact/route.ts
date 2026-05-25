import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { Resend } from "resend"

export const runtime = "nodejs"

const resend = new Resend(process.env.RESEND_API_KEY)

const CONTACT_EMAIL = "neiljustinmarcelo@gmail.com"
const rateLimitMap = new Map<string, number>()
const RATE_LIMIT_MS = 24 * 60 * 60 * 1000
const MAX_FIELD_LENGTH = {
  name: 80,
  email: 254,
  subject: 120,
  message: 2000,
}

function cleanRateLimitMap() {
  const now = Date.now()
  for (const [email, timestamp] of rateLimitMap.entries()) {
    if (now - timestamp > RATE_LIMIT_MS) {
      rateLimitMap.delete(email)
    }
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function normalizeText(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
}

export async function POST(req: NextRequest) {
  console.log("─── /api/contact POST received ───")

  try {
    // 1. Verify API key is loaded
    if (!process.env.RESEND_API_KEY) {
      console.error("❌ RESEND_API_KEY is missing from environment variables")
      return NextResponse.json(
        { error: "Email service is not configured yet." },
        { status: 500 }
      )
    }

    console.log("✅ RESEND_API_KEY loaded (starts with:", process.env.RESEND_API_KEY.substring(0, 8) + "...)")

    cleanRateLimitMap()

    // 2. Parse and validate body
    let body: Record<string, unknown>
    try {
      body = await req.json()
    } catch {
      console.error("❌ Failed to parse request body as JSON")
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      )
    }

    const name = normalizeText(body.name)
    const email = normalizeText(body.email)
    const subject = normalizeText(body.subject)
    const message = normalizeText(body.message)

    console.log("📋 Form data:", { name, email, subject, messageLength: message.length })

    if (!name || !email || !subject || !message) {
      console.error("❌ Validation failed: missing required fields")
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      )
    }

    if (
      name.length > MAX_FIELD_LENGTH.name ||
      email.length > MAX_FIELD_LENGTH.email ||
      subject.length > MAX_FIELD_LENGTH.subject ||
      message.length > MAX_FIELD_LENGTH.message
    ) {
      return NextResponse.json(
        { error: "Your message is too long. Please shorten it and try again." },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      )
    }

    const normalizedEmail = email.toLowerCase().trim()
    const lastSent = rateLimitMap.get(normalizedEmail)
    const now = Date.now()

    if (lastSent && now - lastSent < RATE_LIMIT_MS) {
      const remainingMs = RATE_LIMIT_MS - (now - lastSent)
      const remainingHours = Math.ceil(remainingMs / (1000 * 60 * 60))
      return NextResponse.json(
        {
          error: `You've already sent a message. Please wait ${remainingHours} hour${remainingHours !== 1 ? "s" : ""} before sending again.`,
          rateLimited: true,
          remainingHours,
        },
        { status: 429 }
      )
    }

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeSubject = escapeHtml(subject)
    const safeMessage = escapeHtml(message)

    // 3. Send email via Resend — capture BOTH data and error
    console.log("📤 Sending email via Resend...")
    console.log("   From: Portfolio Contact <onboarding@resend.dev>")
    console.log("   To:", CONTACT_EMAIL)
    console.log("   Reply-To:", email)
    console.log("   Subject:", `[Portfolio] ${subject}`)

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [CONTACT_EMAIL],
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `New portfolio message

From: ${name} <${email}>
Subject: ${subject}

${message}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f0f1a; color: #e2e8f0; border-radius: 12px; overflow: hidden;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #7c3aed, #2563eb); padding: 32px 40px;">
            <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff;">
              💬 New Portfolio Message
            </h1>
            <p style="margin: 6px 0 0; font-size: 14px; color: rgba(255,255,255,0.75);">
              Someone reached out via your portfolio contact form
            </p>
          </div>

          <!-- Body -->
          <div style="padding: 32px 40px;">
            
            <div style="margin-bottom: 24px;">
              <p style="margin: 0 0 4px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #7c3aed; font-weight: 600;">From</p>
              <p style="margin: 0; font-size: 16px; font-weight: 600; color: #f1f5f9;">${safeName}</p>
              <p style="margin: 2px 0 0; font-size: 14px; color: #94a3b8;">${safeEmail}</p>
            </div>

            <div style="margin-bottom: 24px;">
              <p style="margin: 0 0 4px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #7c3aed; font-weight: 600;">Subject</p>
              <p style="margin: 0; font-size: 16px; font-weight: 600; color: #f1f5f9;">${safeSubject}</p>
            </div>

            <div style="margin-bottom: 8px;">
              <p style="margin: 0 0 10px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #7c3aed; font-weight: 600;">Message</p>
              <div style="background: rgba(124, 58, 237, 0.08); border: 1px solid rgba(124, 58, 237, 0.2); border-radius: 8px; padding: 16px 20px;">
                <p style="margin: 0; font-size: 15px; line-height: 1.7; color: #cbd5e1; white-space: pre-wrap;">${safeMessage}</p>
              </div>
            </div>

          </div>

          <!-- Footer -->
          <div style="padding: 20px 40px 28px; border-top: 1px solid rgba(255,255,255,0.06);">
            <p style="margin: 0; font-size: 12px; color: #475569;">
              To reply, just hit <strong style="color: #7c3aed;">Reply</strong> — the sender's email is set as the reply-to address.
            </p>
          </div>

        </div>
      `,
    })

    // 4. Handle Resend error
    if (error) {
      console.error("❌ Resend API returned an error:")
      console.error("   Error:", JSON.stringify(error, null, 2))
      return NextResponse.json(
        { error: "Failed to send email. Please try again.", detail: error.message || error },
        { status: 500 }
      )
    }

    // 5. Verify we actually got a confirmed email ID
    if (!data?.id) {
      console.error("❌ Resend returned no error but also no email ID — delivery unconfirmed")
      console.error("   Full response data:", JSON.stringify(data, null, 2))
      return NextResponse.json(
        { error: "Email delivery could not be confirmed. Please try again." },
        { status: 500 }
      )
    }

    // 6. Success — Resend confirmed with an ID
    console.log("✅ Email sent successfully!")
    console.log("   Resend Email ID:", data.id)
    console.log("   Delivered to:", CONTACT_EMAIL)

    rateLimitMap.set(normalizedEmail, now)

    return NextResponse.json(
      { success: true, message: "Message sent successfully!", emailId: data.id },
      { status: 200 }
    )
  } catch (err) {
    console.error("❌ Contact API unexpected error:", err)
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    )
  }
}
