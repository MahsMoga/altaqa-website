import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { name, company, email } = req.body as Record<string, string>
  if (!name || !company || !email) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const timestamp = new Date().toISOString()
  console.log(`[download-lead] ${timestamp} — ${name} | ${company} | ${email}`)

  // Fire-and-forget email notification — never block the download
  if (process.env.RESEND_API_KEY) {
    const from = process.env.RESEND_FROM ?? 'Al Taqa Website <noreply@altaqauae.com>'
    const to   = process.env.RESEND_TO   ?? 'info@altaqauae.com'

    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: [email],
        subject: `Company Profile Download — ${name} (${company})`,
        text: [
          'A prospect just downloaded the Al Taqa company profile.',
          '',
          `Name:    ${name}`,
          `Company: ${company}`,
          `Email:   ${email}`,
          `Time:    ${timestamp}`,
          '',
          'Reply directly to follow up.',
        ].join('\n'),
        html: `
          <h2 style="color:#1e3a5f">Company Profile Downloaded</h2>
          <p>A prospect just downloaded the Al Taqa company profile.</p>
          <table cellpadding="6" style="font-family:sans-serif;font-size:14px">
            <tr><td><strong>Name</strong></td><td>${name}</td></tr>
            <tr><td><strong>Company</strong></td><td>${company}</td></tr>
            <tr><td><strong>Email</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td><strong>Time</strong></td><td>${timestamp}</td></tr>
          </table>
          <p style="margin-top:16px">Reply directly to this email to follow up.</p>
        `,
      }),
    }).catch(err => console.error('[download-lead] Resend error:', err))
  }

  return res.status(200).json({ ok: true })
}
