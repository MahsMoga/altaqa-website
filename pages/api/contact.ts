import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { name, email, company, message } = req.body as Record<string, string>

  if (!name || !email || !company || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Al Taqa Website <onboarding@resend.dev>',
        to: 'info@altaqauae.com',
        reply_to: email,
        subject: `Website Enquiry — ${name} (${company})`,
        text: [
          `Name:    ${name}`,
          `Email:   ${email}`,
          `Company: ${company}`,
          '',
          message,
        ].join('\n'),
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Company:</strong> ${company}</p>
          <hr/>
          <p>${message.replace(/\n/g, '<br/>')}</p>
        `,
      }),
    })

    if (!r.ok) {
      const body = await r.text()
      console.error('Resend error', r.status, body)
      return res.status(502).json({ error: 'Failed to send email' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Contact API error', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
