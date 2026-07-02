import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

const TO_EMAIL = 'info@altaqauae.com'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error('[contact] GMAIL_USER or GMAIL_APP_PASSWORD env var is not set')
    return res.status(500).json({ error: 'Email service is not configured' })
  }

  const { name, email, company, message } = req.body as Record<string, string>

  if (!name || !email || !company || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })

  try {
    await transporter.sendMail({
      from: `"Al Taqa Website" <${process.env.GMAIL_USER}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Website Enquiry — ${name} (${company})`,
      text: [`Name:    ${name}`, `Email:   ${email}`, `Company: ${company}`, '', message].join('\n'),
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Company:</strong> ${company}</p>
        <hr/>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    })

    console.log(`[contact] Email sent to ${TO_EMAIL} from ${name} <${email}>`)
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[contact] Failed to send email:', err)
    return res.status(500).json({ error: 'Failed to send email', detail: String(err) })
  }
}
