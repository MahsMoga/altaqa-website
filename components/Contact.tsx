import { useState, FormEvent } from 'react'
import AnimateIn from './AnimateIn'
import { gtagEvent } from '../lib/gtag'

type FormState = {
  name: string; email: string; whatsapp: string; company: string
  facilityType: string; facilitySize: string; currentBms: string
  priority: string; timeline: string; notes: string
}
type TouchedState = { name: boolean; email: boolean; company: boolean }

const FACILITY_TYPES = [
  { value: 'hotel',       label: 'Hotel & Hospitality', color: '#8B5CF6' },
  { value: 'commercial',  label: 'Commercial Tower',    color: '#2F80ED' },
  { value: 'residential', label: 'Residential / Villa', color: '#10B981' },
  { value: 'industrial',  label: 'Industrial',          color: '#F59E0B' },
  { value: 'government',  label: 'Government',          color: '#06B6D4' },
]

const FACILITY_SIZES = [
  { value: 'under-5k',  label: '< 5,000 m²' },
  { value: '5k-20k',    label: '5,000–20,000 m²' },
  { value: '20k-50k',   label: '20,000–50,000 m²' },
  { value: '50k-plus',  label: '50,000+ m²' },
]

const BMS_OPTIONS = [
  { value: 'none',      label: 'No BMS yet' },
  { value: 'jci',       label: 'Johnson Controls' },
  { value: 'honeywell', label: 'Honeywell' },
  { value: 'schneider', label: 'Schneider Electric' },
  { value: 'siemens',   label: 'Siemens' },
  { value: 'tridium',   label: 'Tridium Niagara' },
  { value: 'other',     label: 'Other' },
]

const PRIORITY_OPTIONS = [
  { value: 'new-bms',     label: 'New BMS',         color: '#2F80ED' },
  { value: 'upgrade',     label: 'System Upgrade',  color: '#8B5CF6' },
  { value: 'amc',         label: 'Maintenance AMC', color: '#10B981' },
  { value: 'energy',      label: 'Energy Audit',    color: '#F59E0B' },
]

const TIMELINE_OPTIONS = [
  { value: 'asap',     label: 'ASAP' },
  { value: '1-3mo',    label: '1–3 months' },
  { value: '3-6mo',    label: '3–6 months' },
  { value: '6mo-plus', label: '6+ months' },
  { value: 'planning', label: 'Just planning' },
]

function validate(form: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {}
  if (!form.name.trim())    errors.name    = 'Full name is required'
  if (!form.email.trim())   errors.email   = 'Email address is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email'
  if (!form.company.trim()) errors.company = 'Company or facility name is required'
  return errors
}

function ChipGroup({
  label, options, value, onChange, color,
}: {
  label: string
  options: { value: string; label: string; color?: string }[]
  value: string
  onChange: (v: string) => void
  color?: string
}) {
  return (
    <div>
      <div className="text-navy text-xs font-semibold mb-2.5 uppercase tracking-wide">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => {
          const active = value === opt.value
          const c = opt.color ?? color ?? '#2F80ED'
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(active ? '' : opt.value)}
              className="text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-150"
              style={active
                ? { background: `${c}18`, borderColor: c, color: c }
                : { background: 'transparent', borderColor: '#e2e8f0', color: '#94a3b8' }}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
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
    value: 'P.O. Box 70158, Abu Dhabi, United Arab Emirates',
    href: undefined,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 3h1.5l2 4.5-1.5 1A10 10 0 0 0 9 13l1-1.5L14.5 13.5V15A1.5 1.5 0 0 1 13 16.5 12 12 0 0 1 1.5 5 1.5 1.5 0 0 1 3 3z"
          stroke="#2F80ED" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: 'Phone',
    value: '+971 50 834 0095  ·  +971 58 599 1377',
    href: 'tel:+971508340095',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="1.5" y="4" width="15" height="10" rx="1.5" stroke="#2F80ED" strokeWidth="1.4"/>
        <path d="M1.5 6l7.5 5 7.5-5" stroke="#2F80ED" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Email',
    value: 'info@altaqauae.com  ·  rk@altaqauae.com',
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
    name: '', email: '', whatsapp: '', company: '',
    facilityType: '', facilitySize: '', currentBms: '',
    priority: '', timeline: '', notes: '',
  })
  const [touched, setTouched] = useState<TouchedState>({
    name: false, email: false, company: false,
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)

  const errors  = validate(form)
  const isValid = Object.keys(errors).length === 0

  const set = (field: keyof FormState) => (v: string) =>
    setForm(f => ({ ...f, [field]: v }))

  const handleBlur = (field: keyof TouchedState) =>
    setTouched(t => ({ ...t, [field]: true }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setTouched({ name: true, email: true, company: true })
    if (!isValid) return
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('send failed')
      gtagEvent('site_survey_request', { facility_type: form.facilityType, company: form.company })
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
       touched[field] && errors[field as keyof typeof errors]
         ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
         : 'border-slate-border focus:border-accent focus:ring-accent/10 hover:border-slate-text/30'
     }`

  return (
    <section id="contact" className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0a1628 0%, #0f1c3f 60%, #0d1f3c 100%)' }}>
      {/* Amber accent line */}
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" aria-hidden="true"
           style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(217,119,6,0.6) 30%, rgba(217,119,6,0.6) 70%, transparent 100%)' }} />
      {/* Circuit grid */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
        backgroundImage: `linear-gradient(rgba(47,128,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(47,128,237,0.04) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }} />
      {/* Ambient orb */}
      <div className="orb w-96 h-96 bg-accent/[0.07] bottom-0 right-0 animate-float-slow" style={{ filter: 'blur(90px)' }} />
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-start">

          {/* ── Left: contact info ─────────────────────────────── */}
          <AnimateIn>
            <span className="inline-flex items-center gap-2 text-accent text-xs font-bold tracking-widest uppercase mb-5">
              <span className="w-4 h-px bg-accent/50" />Site Survey Request
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight mb-5">
              Tell Us About{' '}
              <span className="text-accent">Your Facility</span>
            </h2>
            <p className="text-white/55 text-base leading-relaxed mb-10">
              Fill in what you know — our engineers use this to prepare before
              they call, so the first conversation is already a consultation.
            </p>

            <div className="space-y-4">
              {infoItems.map((item) => (
                <div key={item.label}
                  className="flex items-start gap-4 p-4 rounded-2xl transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(47,128,237,0.3)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.1)' }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                       style={{ background: 'rgba(47,128,237,0.15)', border: '1px solid rgba(47,128,237,0.25)' }}>
                    {item.icon}
                  </div>
                  <div className="pt-0.5">
                    <div className="font-display text-white font-semibold text-sm mb-0.5">{item.label}</div>
                    {item.href ? (
                      <a href={item.href}
                        className="text-white/50 text-sm hover:text-accent transition-colors duration-150">
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-white/50 text-sm">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </AnimateIn>

          {/* ── Right: contact form ────────────────────────────── */}
          <AnimateIn delay={120}>
            <div className="rounded-2xl p-8 bg-white" style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.3)' }}>
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center
                                  mx-auto mb-5 border border-green-100">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <path d="M6 14l5.5 5.5L22 8" stroke="#16a34a" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="font-display text-navy font-bold text-xl mb-2">Survey Request Received</h3>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
                    Our engineers will review your facility details and call you within one business day — prepared.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="mb-1">
                    <h3 className="font-display text-navy font-bold text-xl mb-1">
                      Request a Site Survey
                    </h3>
                    <p className="text-slate-400 text-xs">
                      Takes 60 seconds · * required
                    </p>
                  </div>

                  {/* Row 1: Name + Company */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="c-name"
                        className="block text-navy text-xs font-semibold mb-1.5 tracking-wide uppercase">
                        Full Name *
                      </label>
                      <input id="c-name" type="text" value={form.name}
                        onChange={e => set('name')(e.target.value)}
                        onBlur={() => handleBlur('name')}
                        placeholder="Ahmed Al Rashidi"
                        className={fieldClass('name')} />
                      {touched.name && errors.name && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          {errorIcon}{errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="c-company"
                        className="block text-navy text-xs font-semibold mb-1.5 tracking-wide uppercase">
                        Company / Facility *
                      </label>
                      <input id="c-company" type="text" value={form.company}
                        onChange={e => set('company')(e.target.value)}
                        onBlur={() => handleBlur('company')}
                        placeholder="Aldar Properties"
                        className={fieldClass('company')} />
                      {touched.company && errors.company && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          {errorIcon}{errors.company}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Email + WhatsApp */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="c-email"
                        className="block text-navy text-xs font-semibold mb-1.5 tracking-wide uppercase">
                        Work Email *
                      </label>
                      <input id="c-email" type="email" value={form.email}
                        onChange={e => set('email')(e.target.value)}
                        onBlur={() => handleBlur('email')}
                        placeholder="ahmed@company.ae"
                        className={fieldClass('email')} />
                      {touched.email && errors.email && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          {errorIcon}{errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="c-whatsapp"
                        className="block text-navy text-xs font-semibold mb-1.5 tracking-wide uppercase">
                        WhatsApp <span className="text-slate-400 font-normal">(optional)</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm select-none">+971</span>
                        <input id="c-whatsapp" type="tel" value={form.whatsapp}
                          onChange={e => set('whatsapp')(e.target.value)}
                          placeholder="50 123 4567"
                          className="w-full border border-slate-border rounded-xl pl-12 pr-4 py-3 text-sm text-navy
                                     placeholder-slate-400 focus:outline-none focus:ring-2 bg-white
                                     focus:border-accent focus:ring-accent/10 hover:border-slate-text/30 transition-all duration-200" />
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-slate-100 pt-1">
                    <p className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold mb-3">
                      Facility details — helps us prepare
                    </p>

                    <div className="space-y-4">
                      <ChipGroup label="Facility Type"
                        options={FACILITY_TYPES}
                        value={form.facilityType}
                        onChange={set('facilityType')} />

                      <ChipGroup label="Approximate Size"
                        options={FACILITY_SIZES}
                        value={form.facilitySize}
                        onChange={set('facilitySize')}
                        color="#2F80ED" />

                      <ChipGroup label="Current BMS"
                        options={BMS_OPTIONS}
                        value={form.currentBms}
                        onChange={set('currentBms')}
                        color="#8B5CF6" />

                      <ChipGroup label="What do you need?"
                        options={PRIORITY_OPTIONS}
                        value={form.priority}
                        onChange={set('priority')} />

                      <ChipGroup label="Timeline"
                        options={TIMELINE_OPTIONS}
                        value={form.timeline}
                        onChange={set('timeline')}
                        color="#10B981" />
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label htmlFor="c-notes"
                      className="block text-navy text-xs font-semibold mb-1.5 tracking-wide uppercase">
                      Additional Notes <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <textarea id="c-notes" rows={3} value={form.notes}
                      onChange={e => set('notes')(e.target.value)}
                      placeholder="Anything else we should know — existing issues, specific areas, access constraints…"
                      className="w-full border border-slate-border rounded-xl px-4 py-3 text-sm text-navy
                                 placeholder-slate-400 focus:outline-none focus:ring-2 resize-none bg-white
                                 focus:border-accent focus:ring-accent/10 hover:border-slate-text/30 transition-all duration-200" />
                  </div>

                  <button type="submit" disabled={loading}
                    className="w-full btn-primary justify-center py-4 text-sm disabled:opacity-70 disabled:cursor-not-allowed">
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
                        Request Site Survey
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                                strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="text-slate-400 text-[11px] text-center">
                    No obligation · Our engineer calls you within one business day
                  </p>
                </form>
              )}
            </div>
          </AnimateIn>

        </div>
      </div>
    </section>
  )
}
