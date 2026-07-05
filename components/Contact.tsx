import { useState, FormEvent } from 'react'
import AnimateIn from './AnimateIn'

type FormState = {
  name: string; email: string; whatsapp: string; company: string
  service: string; timeline: string; message: string
}
type TouchedState = { name: boolean; email: boolean; company: boolean; message: boolean }

const SERVICE_OPTIONS = [
  { value: 'bms-installation',          label: 'BMS Installation',    color: '#2F80ED' },
  { value: 'energy-management',         label: 'Energy Management',   color: '#10B981' },
  { value: 'annual-maintenance',        label: 'Maintenance (AMC)',   color: '#F59E0B' },
  { value: 'guest-room-management',     label: 'Guest Room (GRMS)',   color: '#8B5CF6' },
  { value: 'smart-metering',            label: 'Smart Metering',      color: '#06B6D4' },
  { value: 'automatic-control-systems', label: 'Control Systems',     color: '#EF4444' },
  { value: 'other',                     label: 'Other / Not sure',    color: '#64748b' },
]

const TIMELINE_OPTIONS = [
  { value: 'asap',     label: 'ASAP' },
  { value: '1-3mo',    label: '1–3 months' },
  { value: '3-6mo',    label: '3–6 months' },
  { value: '6mo-plus', label: '6+ months' },
  { value: 'planning', label: 'Just planning' },
]

function validate(form: FormState) {
  const errors: Partial<FormState> = {}
  if (!form.name.trim())    errors.name    = 'Full name is required'
  if (!form.email.trim())   errors.email   = 'Email address is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email address'
  if (!form.company.trim()) errors.company = 'Company or organisation is required'
  if (!form.message.trim()) errors.message = 'Please describe your requirements'
  return errors
}

const infoItems = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 1.5C6.515 1.5 4.5 3.515 4.5 6c0 4.125 4.5 10.5 4.5 10.5S13.5 10.125 13.5 6c0-2.485-2.015-4.5-4.5-4.5z"
          stroke="#2F80ED" strokeWidth="1.4"/>
        <circle cx="9" cy="6" r="1.5" stroke="#2F80ED" strokeWidth="1.4"/>
      </svg>
    ),
    label: 'Location',
    value: 'Abu Dhabi, United Arab Emirates',
    href: undefined,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="1.5" y="4" width="15" height="10" rx="1.5" stroke="#2F80ED" strokeWidth="1.4"/>
        <path d="M1.5 6l7.5 5 7.5-5" stroke="#2F80ED" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Email',
    value: 'info@altaqauae.com',
    href: 'mailto:info@altaqauae.com',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7.5" stroke="#2F80ED" strokeWidth="1.4"/>
        <path d="M9 5v4.5l2.5 2.5" stroke="#2F80ED" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Response Time',
    value: 'Within 24 hours on business days',
    href: undefined,
  },
]

const errorIcon = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M6 4v2.5M6 8h.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: '', email: '', whatsapp: '', company: '', service: '', timeline: '', message: '',
  })
  const [touched, setTouched] = useState<TouchedState>({
    name: false, email: false, company: false, message: false,
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)

  const errors  = validate(form)
  const isValid = Object.keys(errors).length === 0

  const handleBlur = (field: keyof TouchedState) =>
    setTouched((t) => ({ ...t, [field]: true }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setTouched({ name: true, email: true, company: true, message: true })
    if (!isValid) return
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('send failed')
      setSubmitted(true)
    } catch {
      alert('Sorry, something went wrong. Please email us directly at info@altaqauae.com')
    } finally {
      setLoading(false)
    }
  }

  const fieldClass = (field: keyof TouchedState) =>
    `w-full border rounded-xl px-4 py-3 text-sm text-navy placeholder-slate-400
     focus:outline-none focus:ring-2 transition-all duration-200 bg-white ${
       touched[field] && errors[field]
         ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
         : 'border-slate-border focus:border-accent focus:ring-accent/10 hover:border-slate-text/30'
     }`

  return (
    <section id="contact" className="section-padding" style={{ background: 'linear-gradient(180deg, #eef4ff 0%, #f0f5ff 100%)' }}>
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-start">

          {/* ── Left: contact info ─────────────────────────────── */}
          <AnimateIn>
            <span className="label-tag">Contact Us</span>
            <h2 className="heading-section mb-5">
              Ready to Transform{' '}
              <span className="text-accent">Your Facility?</span>
            </h2>
            <p className="body-lead mb-10 text-base">
              Speak with our engineering team to discover how Al Taqa Technical
              can elevate your building&apos;s intelligence, efficiency, and sustainability.
            </p>

            <div className="space-y-4">
              {infoItems.map((item) => (
                <div key={item.label}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-border
                             shadow-sm hover:border-accent/15 hover:shadow-card transition-all duration-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent/15 to-accent/[0.04]
                                  rounded-xl flex items-center justify-center flex-shrink-0 border border-accent/10">
                    {item.icon}
                  </div>
                  <div className="pt-0.5">
                    <div className="font-display text-navy font-semibold text-sm mb-0.5">{item.label}</div>
                    {item.href ? (
                      <a href={item.href}
                        className="text-slate-500 text-sm hover:text-accent transition-colors duration-150">
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-slate-500 text-sm">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </AnimateIn>

          {/* ── Right: contact form ────────────────────────────── */}
          <AnimateIn delay={120}>
            <div className="bg-white rounded-2xl border border-slate-border p-8 shadow-card-xl">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center
                                  mx-auto mb-5 border border-green-100">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <path d="M6 14l5.5 5.5L22 8" stroke="#16a34a" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="font-display text-navy font-bold text-xl mb-2">Message Sent</h3>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
                    Thank you for reaching out. Our team will be in touch within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="mb-6">
                    <h3 className="font-display text-navy font-bold text-xl mb-1">
                      Send Us a Message
                    </h3>
                    <p className="text-slate-400 text-xs">Fields marked * are required</p>
                  </div>

                  {/* Service selector */}
                  <div>
                    <label className="block text-navy text-xs font-semibold mb-3 tracking-wide uppercase">
                      Service Required
                      <span className="text-slate-400 font-normal ml-1">(optional)</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SERVICE_OPTIONS.map(opt => {
                        const active = form.service === opt.value
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setForm({ ...form, service: active ? '' : opt.value })}
                            className="text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-150 cursor-pointer"
                            style={active ? {
                              background: `${opt.color}18`,
                              borderColor: opt.color,
                              color: opt.color,
                            } : {
                              background: 'transparent',
                              borderColor: '#e2e8f0',
                              color: '#94a3b8',
                            }}
                          >
                            {opt.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name"
                      className="block text-navy text-xs font-semibold mb-1.5 tracking-wide uppercase">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      onBlur={() => handleBlur('name')}
                      placeholder="Ahmed Al Rashidi"
                      className={fieldClass('name')}
                    />
                    {touched.name && errors.name && (
                      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                        {errorIcon}{errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email + WhatsApp side by side */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-email"
                        className="block text-navy text-xs font-semibold mb-1.5 tracking-wide uppercase">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        onBlur={() => handleBlur('email')}
                        placeholder="ahmed@company.ae"
                        className={fieldClass('email')}
                      />
                      {touched.email && errors.email && (
                        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                          {errorIcon}{errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-whatsapp"
                        className="block text-navy text-xs font-semibold mb-1.5 tracking-wide uppercase">
                        WhatsApp Number
                        <span className="text-slate-400 font-normal ml-1">(optional)</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm select-none">
                          +971
                        </span>
                        <input
                          id="contact-whatsapp"
                          type="tel"
                          value={form.whatsapp}
                          onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                          placeholder="50 123 4567"
                          className="w-full border border-slate-border rounded-xl pl-12 pr-4 py-3 text-sm text-navy
                                     placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200
                                     bg-white focus:border-accent focus:ring-accent/10 hover:border-slate-text/30"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="contact-company"
                      className="block text-navy text-xs font-semibold mb-1.5 tracking-wide uppercase">
                      Company / Organisation *
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      onBlur={() => handleBlur('company')}
                      placeholder="Facility name or company"
                      className={fieldClass('company')}
                    />
                    {touched.company && errors.company && (
                      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                        {errorIcon}{errors.company}
                      </p>
                    )}
                  </div>

                  {/* Project Timeline */}
                  <div>
                    <label className="block text-navy text-xs font-semibold mb-3 tracking-wide uppercase">
                      Project Timeline
                      <span className="text-slate-400 font-normal ml-1">(optional)</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {TIMELINE_OPTIONS.map(opt => {
                        const active = form.timeline === opt.value
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setForm({ ...form, timeline: active ? '' : opt.value })}
                            className="text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-150 cursor-pointer"
                            style={active ? {
                              background: 'rgba(47,128,237,0.1)',
                              borderColor: '#2F80ED',
                              color: '#2F80ED',
                            } : {
                              background: 'transparent',
                              borderColor: '#e2e8f0',
                              color: '#94a3b8',
                            }}
                          >
                            {opt.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message"
                      className="block text-navy text-xs font-semibold mb-1.5 tracking-wide uppercase">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      onBlur={() => handleBlur('message')}
                      placeholder="Describe your facility, current BMS setup, or project requirements..."
                      className={`${fieldClass('message')} resize-none`}
                    />
                    {touched.message && errors.message && (
                      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                        {errorIcon}{errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary justify-center py-4 text-sm
                               disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2"
                            strokeDasharray="28" strokeDashoffset="10"/>
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                                strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </AnimateIn>

        </div>
      </div>
    </section>
  )
}
