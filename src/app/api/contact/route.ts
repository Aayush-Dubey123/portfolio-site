import { NextResponse } from "next/server"

// In-memory rate limiting map: ip -> array of timestamps
const rateLimitMap = new Map<string, number[]>()
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = rateLimitMap.get(ip) || []
  const recentTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS)

  if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, recentTimestamps)
    return true
  }

  recentTimestamps.push(now)
  rateLimitMap.set(ip, recentTimestamps)

  // Periodic cleanup if map grows too large
  if (rateLimitMap.size > 1000) {
    for (const [key, times] of rateLimitMap.entries()) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) {
        rateLimitMap.delete(key)
      }
    }
  }

  return false
}

export async function POST(req: Request) {
  try {
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1"

    // Origin / CSRF Protection: Allow production custom domain, Vercel deployments, and local dev
    const origin = req.headers.get("origin") || req.headers.get("referer")
    if (origin) {
      try {
        const originUrl = new URL(origin)
        const isAllowedOrigin =
          originUrl.hostname === "ayushdubey.studio" ||
          originUrl.hostname.endsWith(".ayushdubey.studio") ||
          originUrl.hostname.endsWith(".vercel.app") ||
          originUrl.hostname === "localhost" ||
          originUrl.hostname === "127.0.0.1"

        if (!isAllowedOrigin) {
          return NextResponse.json(
            { success: false, error: "Cross-origin submission not allowed." },
            { status: 403 }
          )
        }
      } catch {
        return NextResponse.json(
          { success: false, error: "Invalid origin header." },
          { status: 400 }
        )
      }
    }

    // Rate limiting check
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many messages sent. Please wait a few minutes before trying again.",
        },
        { status: 429 }
      )
    }

    const body = await req.json().catch(() => null)
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid request payload." },
        { status: 400 }
      )
    }

    const {
      name,
      interest,
      message,
      email,
      website_hp, // Honeypot field
      formStartedAt, // Timestamp spam protection
    } = body

    // 1. Honeypot check (Spam protection)
    if (website_hp) {
      // Silently discard bot submission with 200 OK
      return NextResponse.json({
        success: true,
        message: "Message received successfully.",
      })
    }

    // 2. Submission speed check (Spam protection: human takes > 1.2s to fill)
    if (formStartedAt && typeof formStartedAt === "number") {
      const duration = Date.now() - formStartedAt
      if (duration < 1200) {
        // Suspected automated submission, silently succeed
        return NextResponse.json({
          success: true,
          message: "Message received successfully.",
        })
      }
    }

    // 3. Validation
    const trimmedName = typeof name === "string" ? name.trim() : ""
    const trimmedInterest = typeof interest === "string" ? interest.trim() : ""
    const trimmedMessage = typeof message === "string" ? message.trim() : ""
    const trimmedEmail = typeof email === "string" ? email.trim() : ""

    if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 100) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a valid name (2 to 100 characters).",
        },
        { status: 400 }
      )
    }

    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail) || trimmedEmail.length > 254) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a valid email address so I can reply to your inquiry.",
        },
        { status: 400 }
      )
    }

    if (!trimmedInterest || trimmedInterest.length < 2 || trimmedInterest.length > 200) {
      return NextResponse.json(
        {
          success: false,
          error: "Please specify your interest or what caught your attention (2 to 200 characters).",
        },
        { status: 400 }
      )
    }

    if (!trimmedMessage || trimmedMessage.length < 5 || trimmedMessage.length > 3000) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a message between 5 and 3,000 characters.",
        },
        { status: 400 }
      )
    }

    const recipientEmail =
      process.env.CONTACT_TO_EMAIL || "aayushdubey2300@gmail.com"
    const senderEmail =
      process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>"
    const resendApiKey = process.env.RESEND_API_KEY

    // If Resend API key is available, dispatch real email
    if (resendApiKey) {
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: senderEmail,
          to: [recipientEmail],
          reply_to: trimmedEmail || undefined,
          subject: `[Portfolio Inquiry] ${trimmedName} — ${trimmedInterest}`,
          text: `New Portfolio Message received for Aayush Dubey:\n\nName: ${trimmedName}\nEmail: ${trimmedEmail || "Not provided"}\nInterest: ${trimmedInterest}\n\nMessage:\n${trimmedMessage}\n\nSent: ${new Date().toUTCString()}\nIP: ${clientIp}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
              <h2 style="color: #0f172a; margin-top: 0;">New Message from Portfolio</h2>
              <div style="margin: 16px 0; padding: 12px 16px; background-color: #f8fafc; border-left: 4px solid #3b82f6; border-radius: 4px;">
                <p style="margin: 4px 0;"><strong>Name:</strong> ${escapeHtml(trimmedName)}</p>
                <p style="margin: 4px 0;"><strong>Email:</strong> ${trimmedEmail ? `<a href="mailto:${escapeHtml(trimmedEmail)}">${escapeHtml(trimmedEmail)}</a>` : "Not provided"}</p>
                <p style="margin: 4px 0;"><strong>Interest:</strong> ${escapeHtml(trimmedInterest)}</p>
              </div>
              <h3 style="color: #334155; margin-bottom: 8px;">Message:</h3>
              <p style="white-space: pre-wrap; color: #1e293b; line-height: 1.6; background: #ffffff; padding: 12px; border: 1px solid #e2e8f0; border-radius: 4px;">${escapeHtml(trimmedMessage)}</p>
              <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
              <p style="font-size: 12px; color: #64748b; margin: 0;">Delivered to ${recipientEmail} via ayushdubey.studio</p>
            </div>
          `,
        }),
      })

      if (!emailResponse.ok) {
        const errorData = await emailResponse.text().catch(() => "")
        console.error("Resend API delivery error:", errorData)
        return NextResponse.json(
          {
            success: false,
            error: "Unable to send message at the moment. Please reach out directly to aayushdubey2300@gmail.com.",
          },
          { status: 502 }
        )
      }
    } else {
      // In production without configured key, fail gracefully so sender knows
      if (process.env.NODE_ENV === "production") {
        console.error("RESEND_API_KEY environment variable is not configured.")
        return NextResponse.json(
          {
            success: false,
            error: "Message service is currently not configured. Please contact directly at aayushdubey2300@gmail.com.",
          },
          { status: 503 }
        )
      }

      // In local development:
      console.log(
        `[Contact Submission Dev Mode] Recipient: ${recipientEmail} | Name: ${trimmedName} | Interest: ${trimmedInterest} | Email: ${trimmedEmail || "N/A"}`
      )
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out! Your message has been sent.",
    })
  } catch (error) {
    console.error("Contact API route unexpected error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      },
      { status: 500 }
    )
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
