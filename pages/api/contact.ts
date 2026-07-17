import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  if (!process.env.RESEND_API_KEY) {
    console.error('[contact] RESEND_API_KEY is not set')
    return res.status(500).json({ error: 'RESEND_API_KEY is not configured' })
  }

  const {
    name, email, company, whatsapp,
    facilityType, facilitySize, currentBms, priority, timeline, notes,
  } = req.body as Record<string, string>

  if (!name || !email || !company) {
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
        subject: `Site Survey Request — ${name} (${company})`,
        text: [
          `Name:          ${name}`,
          `Email:         ${email}`,
          `WhatsApp:      ${whatsapp || '—'}`,
          `Company:       ${company}`,
          '',
          `Facility Type: ${facilityType || '—'}`,
          `Facility Size: ${facilitySize || '—'}`,
          `Current BMS:   ${currentBms || '—'}`,
          `Priority:      ${priority || '—'}`,
          `Timeline:      ${timeline || '—'}`,
          '',
          `Notes: ${notes || '—'}`,
        ].join('\n'),
        html: `
          <h2 style="color:#1e3a5f;margin-bottom:4px">Site Survey Request</h2>
          <table cellpadding="6" cellspacing="0" style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
            <tr><td style="color:#64748b;padding-right:16px"><strong>Name</strong></td><td>${name}</td></tr>
            <tr><td style="color:#64748b"><strong>Email</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="color:#64748b"><strong>WhatsApp</strong></td><td>${whatsapp ? `+971 ${whatsapp}` : '—'}</td></tr>
            <tr><td style="color:#64748b"><strong>Company</strong></td><td>${company}</td></tr>
          </table>
          <hr style="margin:16px 0;border:none;border-top:1px solid #e2e8f0"/>
          <table cellpadding="6" cellspacing="0" style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
            <tr><td style="color:#64748b;padding-right:16px"><strong>Facility Type</strong></td><td>${facilityType || '—'}</td></tr>
            <tr><td style="color:#64748b"><strong>Facility Size</strong></td><td>${facilitySize || '—'}</td></tr>
            <tr><td style="color:#64748b"><strong>Current BMS</strong></td><td>${currentBms || '—'}</td></tr>
            <tr><td style="color:#64748b"><strong>Priority</strong></td><td>${priority || '—'}</td></tr>
            <tr><td style="color:#64748b"><strong>Timeline</strong></td><td>${timeline || '—'}</td></tr>
          </table>
          ${notes ? `<hr style="margin:16px 0;border:none;border-top:1px solid #e2e8f0"/><p style="font-family:sans-serif;font-size:14px"><strong>Notes:</strong><br/>${notes.replace(/\n/g, '<br/>')}</p>` : ''}
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
