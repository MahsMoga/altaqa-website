import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  if (!process.env.RESEND_API_KEY) {
    console.error('[contact] RESEND_API_KEY is not set')
    return res.status(500).json({ error: 'RESEND_API_KEY is not configured' })
  }

  const { name, email, company, message } = req.body as Record<string, string>

  if (!name || !email || !company || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const from = process.env.RESEND_FROM ?? 'Al Taqa Website <noreply@altaqauae.com>'
  const to   = process.env.RESEND_TO   ?? 'info@altaqauae.com'

  let resendStatus: number
  let resendBody: string

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: [email],
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

    resendStatus = r.status
    resendBody   = await r.text()

    if (!r.ok) {
      console.error(`[contact] Resend ${resendStatus}:`, resendBody)
      return res.status(502).json({ error: 'Resend rejected the request', resend_status: resendStatus, resend_body: resendBody })
    }

    console.log(`[contact] Sent to ${to} — Resend ${resendStatus}:`, resendBody)
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[contact] Network error calling Resend:', err)
    return res.status(500).json({ error: 'Network error', detail: String(err) })
  }
}
