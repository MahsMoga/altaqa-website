import type { NextApiRequest, NextApiResponse } from 'next'

// RESEND_TO   — set to the Resend account owner email until altaqauae.com is verified,
//               then change to info@altaqauae.com
// RESEND_FROM — leave unset until altaqauae.com is verified in Resend → Domains,
//               then set to: Al Taqa Website <noreply@altaqauae.com>
const TO_EMAIL   = process.env.RESEND_TO   ?? 'info@altaqauae.com'
const FROM_EMAIL = process.env.RESEND_FROM ?? 'Al Taqa Website <onboarding@resend.dev>'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  // Guard: API key must be configured
  if (!process.env.RESEND_API_KEY) {
    console.error('[contact] RESEND_API_KEY is not set in environment variables')
    return res.status(500).json({ error: 'Email service is not configured (missing API key)' })
  }

  const { name, email, company, message } = req.body as Record<string, string>

  if (!name || !email || !company || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  let resendBody: string
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `Website Enquiry — ${name} (${company})`,
        text: [`Name:    ${name}`, `Email:   ${email}`, `Company: ${company}`, '', message].join('\n'),
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Company:</strong> ${company}</p>
          <hr/>
          <p>${message.replace(/\n/g, '<br/>')}</p>
        `,
      }),
    })

    resendBody = await r.text()

    if (!r.ok) {
      // Log the full Resend response so it appears in Vercel Function Logs
      console.error(`[contact] Resend API error — status ${r.status}:`, resendBody)
      return res.status(502).json({
        error: 'Failed to send email',
        resend_status: r.status,
        resend_message: resendBody,
      })
    }

    console.log(`[contact] Email sent successfully to ${TO_EMAIL} — Resend response:`, resendBody)
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[contact] Unexpected error calling Resend API:', err)
    return res.status(500).json({ error: 'Internal server error', detail: String(err) })
  }
}
