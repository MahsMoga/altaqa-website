import { useState, FormEvent, useMemo } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import AnimateIn from '../../components/AnimateIn'
import { products, getProductBySlug, Product, ProductVariant } from '@/data/products'

// ── Sensor filter UI (used when a product has > 5 variants) ──────────────────

const GAS_TAGS = ['CO', 'CO₂', 'NO₂', 'H₂', 'H₂S', 'NH₃', 'CH₄', 'O₂', 'LPG', 'PM', 'TVOC', 'CH₃SH', 'Cl₂', 'Temperature']
const ENCLOSURE_TAGS = ['Indoor', 'Weatherproof', 'ATEX']
const PROTOCOL_TAGS = ['LoRaWAN', 'Modbus']

function getSpecVal(variant: ProductVariant, label: string) {
  return variant.specs.find(s => s.label === label)?.value ?? ''
}

function variantMatchesGas(variant: ProductVariant, gas: string) {
  const params = getSpecVal(variant, 'Parameters').toLowerCase()
  const name = variant.name.toLowerCase()
  const map: Record<string, string[]> = {
    'CO': ['co ','co,','(co)','carbon monoxide'],
    'CO₂': ['co2','co₂','carbon dioxide'],
    'NO₂': ['no2','no₂','nitrogen dioxide'],
    'H₂': ['h2 ','h2,','h2)','hydrogen)','hydrogen '],
    'H₂S': ['h2s','h₂s','hydrogen sulphide'],
    'NH₃': ['nh3','nh₃','ammonia'],
    'CH₄': ['ch4','ch₄','methane'],
    'O₂': ['o2 ','o2,','o2)','oxygen'],
    'LPG': ['lpg','propane','butane'],
    'PM': ['pm1','pm2','pm10','particulate'],
    'TVOC': ['tvoc'],
    'CH₃SH': ['ch3sh','ch₃sh','methyl mercaptan'],
    'Cl₂': ['cl2','cl₂','chlorine'],
    'Temperature': ['temperature','temp'],
  }
  const terms = map[gas] ?? [gas.toLowerCase()]
  return terms.some(t => params.includes(t) || name.includes(t))
}

function variantMatchesEnclosure(variant: ProductVariant, enc: string) {
  const val = (getSpecVal(variant, 'Enclosure') + ' ' + variant.name).toLowerCase()
  if (enc === 'Indoor') return val.includes('indoor') && !val.includes('weatherproof') && !val.includes('atex') && !val.includes('ip65') && !val.includes('ex ')
  if (enc === 'Weatherproof') return val.includes('weatherproof') || val.includes('ip65') || val.includes('ip 65')
  if (enc === 'ATEX') return val.includes('atex') || val.includes('ex enclosure') || val.includes('(ex)')
  return true
}

function variantMatchesProtocol(variant: ProductVariant, proto: string) {
  const val = getSpecVal(variant, 'Communication').toLowerCase()
  if (proto === 'LoRaWAN') return val.includes('lorawan')
  if (proto === 'Modbus') return val.includes('modbus')
  return true
}

// Enclosure config — drives the card's top glow stripe and indicator dot
const ENC_CONFIG = {
  ATEX:         { label: 'ATEX',         stripe: '#f59e0b', dot: '#f59e0b', glow: 'rgba(245,158,11,0.35)' },
  Weatherproof: { label: 'Weatherproof', stripe: '#06b6d4', dot: '#06b6d4', glow: 'rgba(6,182,212,0.30)'  },
  Indoor:       { label: 'Indoor',       stripe: '#2f80ed', dot: '#2f80ed', glow: 'rgba(47,128,237,0.28)' },
}

function getEnclosureConfig(variant: ProductVariant) {
  const enc = (getSpecVal(variant, 'Enclosure') + ' ' + variant.name).toLowerCase()
  if (enc.includes('atex') || enc.includes('(ex)')) return ENC_CONFIG.ATEX
  if (enc.includes('weatherproof') || enc.includes('ip65'))  return ENC_CONFIG.Weatherproof
  return ENC_CONFIG.Indoor
}

function FilteredVariants({ variants, allDownloads }: { variants: ProductVariant[]; allDownloads: { label: string; type: string; file?: string }[] }) {
  const [gases, setGases] = useState<string[]>([])
  const [enclosures, setEnclosures] = useState<string[]>([])
  const [protocols, setProtocols] = useState<string[]>([])
  const [search, setSearch] = useState('')

  function toggleFilter(arr: string[], val: string, set: (v: string[]) => void) {
    set(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])
  }

  const filtered = useMemo(() => variants.filter(v => {
    if (search && !v.name.toLowerCase().includes(search.toLowerCase()) &&
        !getSpecVal(v, 'Parameters').toLowerCase().includes(search.toLowerCase())) return false
    if (gases.length && !gases.some(g => variantMatchesGas(v, g))) return false
    if (enclosures.length && !enclosures.some(e => variantMatchesEnclosure(v, e))) return false
    if (protocols.length && !protocols.some(p => variantMatchesProtocol(v, p))) return false
    return true
  }), [variants, search, gases, enclosures, protocols])

  const hasFilters = gases.length || enclosures.length || protocols.length || search

  // Filter bar chip — white with navy active state
  function chipClass(active: boolean) {
    return `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border cursor-pointer select-none transition-all duration-150 ${
      active
        ? 'bg-[#0f1c35] text-white border-[#0f1c35] shadow-sm'
        : 'bg-white text-slate-600 border-slate-200 hover:border-[#0f1c35] hover:text-[#0f1c35]'
    }`
  }

  return (
    <div>
      {/* ── Filter bar — white control panel on cream ── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-8 shadow-sm">
        {/* Search */}
        <div className="relative mb-5">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search by sensor name or gas (e.g. CO2, hydrogen, methane…)"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-navy
                       placeholder:text-slate-400 focus:outline-none focus:border-[#0f1c35] focus:ring-1 focus:ring-[#0f1c35]/10"
          />
        </div>

        <div className="space-y-3.5">
          <div>
            <div className="text-slate-400 text-[10px] font-bold tracking-widest uppercase mb-2">Gas / Parameter</div>
            <div className="flex flex-wrap gap-1.5">
              {GAS_TAGS.map(g => (
                <button key={g} onClick={() => toggleFilter(gases, g, setGases)} className={chipClass(gases.includes(g))}>
                  {gases.includes(g) && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4l2 2 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <div className="text-slate-400 text-[10px] font-bold tracking-widest uppercase mb-2">Enclosure</div>
              <div className="flex flex-wrap gap-1.5">
                {ENCLOSURE_TAGS.map(e => (
                  <button key={e} onClick={() => toggleFilter(enclosures, e, setEnclosures)} className={chipClass(enclosures.includes(e))}>
                    {enclosures.includes(e) && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4l2 2 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    {e}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-slate-400 text-[10px] font-bold tracking-widest uppercase mb-2">Protocol</div>
              <div className="flex flex-wrap gap-1.5">
                {PROTOCOL_TAGS.map(p => (
                  <button key={p} onClick={() => toggleFilter(protocols, p, setProtocols)} className={chipClass(protocols.includes(p))}>
                    {protocols.includes(p) && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4l2 2 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
          <span className="text-sm text-slate-500">
            Showing <span className="font-semibold text-navy">{filtered.length}</span> of {variants.length} sensors
          </span>
          {hasFilters && (
            <button onClick={() => { setGases([]); setEnclosures([]); setProtocols([]); setSearch('') }}
              className="text-xs text-[#0f1c35] font-semibold hover:underline">
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* ── Sensor cards — dark instruments on cream ── */}
      {filtered.length === 0 ? (
        <div className="text-center py-16" style={{ color: 'rgba(255,255,255,0.3)' }}>
          <svg className="mx-auto mb-3" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="14" cy="14" r="9" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M21 21l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <p className="text-sm">No sensors match those filters.</p>
          <button onClick={() => { setGases([]); setEnclosures([]); setProtocols([]); setSearch('') }}
            className="text-xs font-semibold hover:underline mt-2" style={{ color: '#f59e0b' }}>
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((variant, i) => {
            const enc = getEnclosureConfig(variant)
            const params = getSpecVal(variant, 'Parameters')
            const comm = getSpecVal(variant, 'Communication')
            const dl = variant.downloads[0]
            const commProtos = comm ? comm.split('/').map(c => c.trim()).filter(Boolean) : []

            return (
              <div
                key={i}
                className="relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: 'linear-gradient(160deg, #111d33 0%, #0a1525 100%)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  el.style.transform = 'translateY(-3px)'
                  el.style.boxShadow = `0 12px 40px rgba(0,0,0,0.28), 0 0 0 1px ${enc.stripe}40`
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.transform = 'translateY(0)'
                  el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.18)'
                }}
              >
                {/* Glowing top stripe */}
                <div style={{
                  height: '3px',
                  background: `linear-gradient(90deg, ${enc.stripe}, ${enc.stripe}88, transparent)`,
                  boxShadow: `0 0 12px ${enc.glow}`,
                }} />

                <div className="p-5 flex-1">
                  {/* Status row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {/* Pulsing indicator dot */}
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                              style={{ backgroundColor: enc.dot }} />
                        <span className="relative inline-flex rounded-full h-2 w-2"
                              style={{ backgroundColor: enc.dot }} />
                      </span>
                      <span className="text-[10px] font-bold tracking-widest uppercase"
                            style={{ color: enc.dot }}>{enc.label}</span>
                    </div>

                    {/* Protocol pills */}
                    <div className="flex gap-1">
                      {commProtos.map(p => (
                        <span key={p}
                          className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                          style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.1)' }}>
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sensor name */}
                  <h3 className="font-display font-bold text-sm leading-snug mb-4"
                      style={{ color: 'rgba(255,255,255,0.92)' }}>
                    {variant.name}
                  </h3>

                  {/* Measures — terminal readout style */}
                  {params && (
                    <div className="rounded-xl px-4 py-3"
                         style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div className="text-[9px] font-bold tracking-widest uppercase mb-1.5"
                           style={{ color: 'rgba(255,255,255,0.25)' }}>Measures</div>
                      <div className="font-mono text-xs leading-relaxed"
                           style={{ color: '#4ade80' }}>
                        {params}
                      </div>
                    </div>
                  )}
                </div>

                {/* Download button — amber, full width */}
                <div className="px-5 pb-5">
                  {dl ? (
                    <a
                      href={dl.file ?? '#inquiry'}
                      download={dl.file ? true : undefined}
                      target={dl.file ? '_blank' : undefined}
                      rel={dl.file ? 'noopener noreferrer' : undefined}
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-200"
                      style={{
                        background: 'linear-gradient(135deg, #d97706, #f59e0b)',
                        color: 'white',
                        boxShadow: '0 2px 12px rgba(217,119,6,0.3)',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(217,119,6,0.5)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(217,119,6,0.3)' }}
                    >
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <path d="M8 2v8m0 0l-3-3m3 3l3-3M3 13h10" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Download Datasheet
                    </a>
                  ) : (
                    <a href="#inquiry"
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-200"
                      style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      Request Datasheet
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* All downloads — on cream, stays light */}
      {allDownloads.length > 0 && (
        <div className="mt-10 bg-white rounded-2xl border border-slate-200 p-7 shadow-sm">
          <div className="text-navy/40 text-xs font-bold tracking-widest uppercase mb-5">All Downloads</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {allDownloads.map((dl) => (
              <a key={dl.label} href={dl.file ?? '#inquiry'}
                download={dl.file ? true : undefined}
                target={dl.file ? '_blank' : undefined}
                rel={dl.file ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50
                           border border-slate-200 text-sm font-semibold text-navy
                           hover:border-accent hover:text-accent hover:shadow-card transition-all duration-200">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0
                                group-hover:bg-accent group-hover:[&_path]:stroke-white transition-colors">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2v8m0 0l-3-3m3 3l3-3M3 13h10" stroke="#2F80ED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="text-navy/40 text-xs font-normal">{dl.type}</div>
                  <div className="truncate leading-snug">{dl.label}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const SITE_URL = 'https://www.altaqauae.com'

const downloadIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2v8m0 0l-3-3m3 3l3-3M3 13h10" stroke="#2F80ED" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const checkIcon = (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M2 5l2.5 2.5L8 2.5" stroke="#2F80ED" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

type FormState = { name: string; company: string; email: string; phone: string; message: string }
type TouchedState = Record<keyof FormState, boolean>

function validate(form: FormState) {
  const errors: Partial<FormState> = {}
  if (!form.name.trim()) errors.name = 'Full name is required'
  if (!form.company.trim()) errors.company = 'Company or organisation is required'
  if (!form.email.trim()) errors.email = 'Email address is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email address'
  if (!form.phone.trim()) errors.phone = 'Phone number is required'
  if (!form.message.trim()) errors.message = 'Please describe your requirements'
  return errors
}

function InquiryForm({ productName }: { productName: string }) {
  const [form, setForm] = useState<FormState>({ name: '', company: '', email: '', phone: '', message: '' })
  const [touched, setTouched] = useState<TouchedState>({ name: false, company: false, email: false, phone: false, message: false })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const errors = validate(form)
  const isValid = Object.keys(errors).length === 0

  const handleBlur = (field: keyof TouchedState) => setTouched((t) => ({ ...t, [field]: true }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setTouched({ name: true, company: true, email: true, phone: true, message: true })
    if (!isValid) return
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          email: form.email,
          message: `Phone: ${form.phone}\n\n${form.message}`,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        alert(`Failed to send: ${data.error ?? res.statusText}`)
        setLoading(false)
        return
      }
      setSubmitted(true)
    } catch {
      alert('Network error — please try again or email us at info@altaqauae.com')
    }
    setLoading(false)
  }

  const fieldClass = (field: keyof FormState) =>
    `w-full border rounded-xl px-4 py-3 text-sm text-navy placeholder-slate-400
     focus:outline-none focus:ring-2 transition-all duration-200 bg-white ${
       touched[field] && errors[field]
         ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
         : 'border-slate-border focus:border-accent focus:ring-accent/10 hover:border-slate-text/30'
     }`

  const errorMsg = (field: keyof FormState) =>
    touched[field] && errors[field] ? (
      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M6 4v2.5M6 8h.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        {errors[field]}
      </p>
    ) : null

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center
                        mx-auto mb-5 border border-green-100">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M6 14l5.5 5.5L22 8" stroke="#16a34a" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="font-display text-navy font-bold text-xl mb-2">Inquiry Received</h3>
        <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
          Thank you for your interest in {productName}. Our team will be in touch within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="inq-name" className="block text-navy text-xs font-semibold mb-1.5 tracking-wide uppercase">
            Name
          </label>
          <input id="inq-name" type="text" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            onBlur={() => handleBlur('name')} placeholder="Ahmed Al Rashidi"
            className={fieldClass('name')} />
          {errorMsg('name')}
        </div>
        <div>
          <label htmlFor="inq-company" className="block text-navy text-xs font-semibold mb-1.5 tracking-wide uppercase">
            Company
          </label>
          <input id="inq-company" type="text" value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            onBlur={() => handleBlur('company')} placeholder="Facility name or company"
            className={fieldClass('company')} />
          {errorMsg('company')}
        </div>
        <div>
          <label htmlFor="inq-email" className="block text-navy text-xs font-semibold mb-1.5 tracking-wide uppercase">
            Email
          </label>
          <input id="inq-email" type="email" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            onBlur={() => handleBlur('email')} placeholder="ahmed@company.ae"
            className={fieldClass('email')} />
          {errorMsg('email')}
        </div>
        <div>
          <label htmlFor="inq-phone" className="block text-navy text-xs font-semibold mb-1.5 tracking-wide uppercase">
            Phone
          </label>
          <input id="inq-phone" type="tel" value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            onBlur={() => handleBlur('phone')} placeholder="+971 5X XXX XXXX"
            className={fieldClass('phone')} />
          {errorMsg('phone')}
        </div>
      </div>

      <div>
        <label htmlFor="inq-message" className="block text-navy text-xs font-semibold mb-1.5 tracking-wide uppercase">
          Message
        </label>
        <textarea id="inq-message" rows={4} value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          onBlur={() => handleBlur('message')}
          placeholder={`Tell us about your project and how ${productName} could fit your requirements...`}
          className={`${fieldClass('message')} resize-none`} />
        {errorMsg('message')}
      </div>

      <button type="submit" disabled={loading}
        className="w-full btn-primary justify-center py-4 text-sm disabled:opacity-70 disabled:cursor-not-allowed">
        {loading ? (
          <>
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="28" strokeDashoffset="10"/>
            </svg>
            Sending…
          </>
        ) : (
          <>
            Submit Inquiry
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </>
        )}
      </button>
    </form>
  )
}

interface PageProps { slug: string }

export default function ProductDetailPage({ slug }: PageProps) {
  const product = getProductBySlug(slug) as Product
  const pageUrl = `${SITE_URL}/products/${product.slug}`
  const ogImage = `${SITE_URL}/al-taqa-logo.png`

  return (
    <>
      <Head>
        <title>{product.metaTitle}</title>
        <meta name="description" content={product.metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={pageUrl} />

        <meta property="og:type" content="product" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={product.metaTitle} />
        <meta property="og:description" content={product.metaDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:locale" content="en_AE" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.metaTitle} />
        <meta name="twitter:description" content={product.metaDescription} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: product.name,
              description: product.metaDescription,
              image: ogImage,
              url: pageUrl,
              brand: { '@type': 'Organization', name: 'Al Taqa Technical General Contracting LLC' },
              additionalProperty: product.specs.map((spec) => ({
                '@type': 'PropertyValue',
                name: spec.label,
                value: spec.value,
              })),
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
                { '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE_URL}/#products` },
                { '@type': 'ListItem', position: 3, name: product.name, item: pageUrl },
              ],
            }),
          }}
        />
      </Head>

      <Navbar />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-navy hero-pattern relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/40 via-navy/80 to-navy" />
          <div className="container-narrow relative">
            <nav aria-label="Breadcrumb" className="mb-8 text-sm text-white/50 flex items-center gap-2 flex-wrap">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/#products" className="hover:text-white transition-colors">Products</Link>
              <span>/</span>
              <span className="text-white/80">{product.name}</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <AnimateIn>
                <span className="label-pill">Product Overview</span>
                <h1 className="heading-display text-white mb-5">
                  {product.name}
                </h1>
                <p className="text-white/65 text-lg leading-relaxed mb-8 max-w-xl">
                  {product.overview}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#inquiry" className="btn-primary">
                    Request Quote
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </AnimateIn>

              <AnimateIn delay={120}>
                <div
                  className={`relative h-72 lg:h-96 rounded-3xl border border-white/10 overflow-hidden
                              flex items-center justify-center ${!product.image ? product.iconBg : ''}`}
                >
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={`${product.name} product image`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 dot-pattern-bg opacity-25" />
                      <div className="relative w-28 h-28 bg-white rounded-3xl shadow-card-xl flex items-center justify-center">
                        <div className="scale-[1.8]">{product.icon}</div>
                      </div>
                    </>
                  )}
                </div>
              </AnimateIn>
            </div>
          </div>
        </section>

        {/* ── When variants exist ──────────────────────────────────── */}
        {product.variants && product.variants.length > 0 ? (
          <section
            id="downloads"
            className="section-padding"
            style={product.variants.length > 5 ? { background: '#F4F1EA' } : undefined}
          >
            <div className="container-narrow">

              {/* Large variant set → filter UI */}
              {product.variants.length > 5 ? (
                <>
                  <AnimateIn className="max-w-xl mb-10">
                    <span className="label-tag">Sensor Range</span>
                    <h2 className="heading-section">
                      Find Your <span className="text-accent">Sensor</span>
                    </h2>
                    <p className="body-lead">
                      Filter by gas type, enclosure, or communication protocol to find the right
                      sensor for your application. All models available through Al Taqa Technical.
                    </p>
                  </AnimateIn>
                  <FilteredVariants variants={product.variants} allDownloads={product.downloads} />
                </>
              ) : (
              <>
              <AnimateIn className="max-w-xl mb-12">
                <span className="label-tag">Models in This Range</span>
                <h2 className="heading-section">
                  Compare <span className="text-accent">Models</span>
                </h2>
                <p className="body-lead">
                  Both models are available through Al Taqa Technical. Contact us for pricing,
                  sizing guidance, and technical support tailored to your project.
                </p>
              </AnimateIn>

              <div className={`grid gap-8 ${product.variants.length === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'}`}>
                {product.variants.map((variant: ProductVariant, vIdx: number) => (
                  <AnimateIn key={vIdx} delay={vIdx * 100} className="flex flex-col">
                    <div className="flex flex-col h-full rounded-3xl border border-slate-border overflow-hidden shadow-card bg-white">

                      {/* Image */}
                      {variant.image && (
                        <div className="relative h-64 bg-white border-b border-slate-border shrink-0">
                          <Image
                            src={variant.image}
                            alt={`${variant.name} product image`}
                            fill
                            className="object-contain p-8"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                        </div>
                      )}

                      {/* Name + overview */}
                      <div className="px-7 pt-7 pb-5 border-b border-slate-border shrink-0">
                        <span className="inline-block text-accent text-xs font-bold tracking-widest uppercase mb-3">
                          Model {vIdx + 1}
                        </span>
                        <h3 className="font-display text-navy font-bold text-xl leading-snug mb-3">
                          {variant.name}
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed">{variant.overview}</p>
                      </div>

                      {/* Specs table */}
                      <div className="flex-1">
                        <div className="px-7 pt-5 pb-2">
                          <div className="text-navy/40 text-xs font-bold tracking-widest uppercase">
                            Technical Specifications
                          </div>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs min-w-[280px]">
                            <tbody>
                              {variant.specs.map((spec, idx) => (
                                <tr key={spec.label} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-corporate/50'}>
                                  <th scope="row"
                                    className="text-left font-display text-navy font-semibold px-7 py-3 w-[42%] align-top">
                                    {spec.label}
                                  </th>
                                  <td className="text-slate-500 px-7 py-3 align-top">{spec.value}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Downloads footer */}
                      {variant.downloads.length > 0 && (
                        <div className="bg-slate-corporate border-t border-slate-border px-7 py-6 shrink-0">
                          <div className="text-navy/40 text-xs font-bold tracking-widest uppercase mb-4">
                            Downloads
                          </div>
                          <div className="flex flex-col gap-2.5">
                            {variant.downloads.map((dl) => (
                              <a
                                key={dl.label}
                                href={dl.file ?? '#inquiry'}
                                download={dl.file ? true : undefined}
                                target={dl.file ? '_blank' : undefined}
                                rel={dl.file ? 'noopener noreferrer' : undefined}
                                className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-white
                                           border border-slate-border text-sm font-semibold text-navy
                                           hover:border-accent hover:text-accent hover:shadow-card
                                           transition-all duration-200 w-full"
                              >
                                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center
                                                shrink-0 group-hover:bg-accent group-hover:[&_path]:stroke-white
                                                transition-colors duration-200">
                                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 2v8m0 0l-3-3m3 3l3-3M3 13h10" stroke="#2F80ED" strokeWidth="1.5"
                                          strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </div>
                                <span className="flex-1 leading-tight">{dl.label}</span>
                                <span className="text-xs text-slate-400 font-normal shrink-0">
                                  {dl.file ? dl.type : 'On request'}
                                </span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </AnimateIn>
                ))}
              </div>

              {/* Applications & Protocols row below the cards */}
              <div className="mt-14 grid lg:grid-cols-2 gap-10">
                <AnimateIn>
                  <div className="bg-white rounded-2xl border border-slate-border p-7 shadow-card">
                    <div className="text-navy/40 text-xs font-bold tracking-widest uppercase mb-4">Applications</div>
                    <ul className="grid sm:grid-cols-2 gap-2.5">
                      {product.applications.map((app) => (
                        <li key={app}
                          className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-corporate
                                     border border-slate-border text-navy text-sm font-medium">
                          <div className="w-5 h-5 rounded-full bg-accent/10 border border-accent/20
                                          flex items-center justify-center flex-shrink-0">
                            {checkIcon}
                          </div>
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimateIn>

                {product.protocols.length > 0 && (
                  <AnimateIn delay={80}>
                    <div className="bg-white rounded-2xl border border-slate-border p-7 shadow-card">
                      <div className="text-navy/40 text-xs font-bold tracking-widest uppercase mb-4">
                        Communication Protocols
                      </div>
                      <div className="flex flex-wrap gap-2.5 mb-5">
                        {product.protocols.map((protocol) => (
                          <span key={protocol}
                            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold
                                       text-accent bg-accent/[0.08] border border-accent/20">
                            {protocol}
                          </span>
                        ))}
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        Compatible with leading BMS platforms including Johnson Controls, Schneider Electric,
                        Honeywell, and Tridium for a unified view of your facility's energy performance.
                      </p>
                    </div>
                  </AnimateIn>
                )}
              </div>

              {/* Additional downloads for variant products */}
              {product.downloads.length > 0 && (
                <AnimateIn className="mt-14">
                  <div className="bg-white rounded-2xl border border-slate-border p-7 shadow-card">
                    <div className="text-navy/40 text-xs font-bold tracking-widest uppercase mb-6">
                      All Downloads
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {product.downloads.map((dl) => (
                        <a
                          key={dl.label}
                          href={dl.file ?? '#inquiry'}
                          download={dl.file ? true : undefined}
                          target={dl.file ? '_blank' : undefined}
                          rel={dl.file ? 'noopener noreferrer' : undefined}
                          className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-corporate
                                     border border-slate-border text-sm font-semibold text-navy
                                     hover:border-accent hover:text-accent hover:shadow-card
                                     transition-all duration-200"
                        >
                          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center
                                          shrink-0 group-hover:bg-accent group-hover:[&_path]:stroke-white
                                          transition-colors duration-200">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                              <path d="M8 2v8m0 0l-3-3m3 3l3-3M3 13h10" stroke="#2F80ED" strokeWidth="1.5"
                                    strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <div className="text-navy/40 text-xs font-normal tracking-wide">{dl.type}</div>
                            <div className="truncate leading-snug">{dl.label}</div>
                            {!dl.file && <div className="text-slate-400 text-xs font-normal">On request</div>}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </AnimateIn>
              )}
              </>
              )} {/* end small-variant else */}
            </div>
          </section>
        ) : (
          <>
            {/* ── Features ─────────────────────────────────────────── */}
            <section className="section-padding bg-white">
              <div className="container-narrow">
                <AnimateIn className="max-w-xl mb-12">
                  <span className="label-tag">Key Features</span>
                  <h2 className="heading-section mb-4">
                    Engineered for{' '}
                    <span className="text-accent">Performance & Reliability</span>
                  </h2>
                  <p className="body-lead">
                    {product.name} combine precision engineering with intelligent connectivity
                    to deliver dependable performance across demanding environments.
                  </p>
                </AnimateIn>

                <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
                  {product.features.map((feature, idx) => (
                    <AnimateIn key={feature.title} delay={idx * 70}>
                      <div className={`flex gap-4 p-6 rounded-2xl border h-full ${product.color}`}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${product.iconBg}`}>
                          {checkIcon}
                        </div>
                        <div>
                          <h3 className="font-display text-navy font-bold text-base mb-1.5">{feature.title}</h3>
                          <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
                        </div>
                      </div>
                    </AnimateIn>
                  ))}
                </div>
              </div>
            </section>

            {/* ── Technical Specifications ─────────────────────────── */}
            <section className="section-padding bg-slate-corporate">
              <div className="container-narrow">
                <AnimateIn className="max-w-xl mb-12">
                  <span className="label-tag">Technical Specifications</span>
                  <h2 className="heading-section">
                    Specification <span className="text-accent">Overview</span>
                  </h2>
                </AnimateIn>

                <AnimateIn delay={80}>
                  <div className="bg-white rounded-2xl border border-slate-border shadow-card overflow-hidden overflow-x-auto">
                    <table className="w-full text-sm min-w-[480px]">
                      <tbody>
                        {product.specs.map((spec, idx) => (
                          <tr key={spec.label} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-corporate/50'}>
                            <th scope="row"
                              className="text-left font-display text-navy font-semibold px-6 py-4 w-1/3 align-top">
                              {spec.label}
                            </th>
                            <td className="text-slate-500 px-6 py-4 align-top">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </AnimateIn>
              </div>
            </section>

            {/* ── Applications & Protocols ─────────────────────────── */}
            <section className="section-padding bg-white">
              <div className="container-narrow grid lg:grid-cols-2 gap-14">
                <AnimateIn>
                  <span className="label-tag">Applications</span>
                  <h2 className="heading-section mb-6">
                    Where {product.name}{' '}
                    <span className="text-accent">Excel</span>
                  </h2>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {product.applications.map((app) => (
                      <li key={app}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-corporate
                                   border border-slate-border text-navy text-sm font-medium">
                        <div className="w-6 h-6 rounded-full bg-accent/10 border border-accent/20
                                        flex items-center justify-center flex-shrink-0">
                          {checkIcon}
                        </div>
                        {app}
                      </li>
                    ))}
                  </ul>
                </AnimateIn>

                {product.protocols.length > 0 && (
                  <AnimateIn delay={100}>
                    <span className="label-tag">Communication Protocols</span>
                    <h2 className="heading-section mb-6">
                      Seamless{' '}
                      <span className="text-accent">System Integration</span>
                    </h2>
                    <div className="flex flex-wrap gap-3">
                      {product.protocols.map((protocol) => (
                        <span key={protocol}
                          className="inline-flex items-center px-4 py-2.5 rounded-full text-sm font-semibold
                                     text-accent bg-accent/[0.08] border border-accent/20">
                          {protocol}
                        </span>
                      ))}
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed mt-6 max-w-md">
                      Our solutions integrate with leading Building Management Systems and head-end
                      platforms — including Johnson Controls, Schneider Electric, Honeywell, and Tridium —
                      ensuring a unified view of your facility's performance.
                    </p>
                  </AnimateIn>
                )}
              </div>
            </section>

            {/* ── Downloads ────────────────────────────────────────── */}
            <section id="downloads" className="section-padding bg-slate-corporate">
              <div className="container-narrow">
                <AnimateIn className="max-w-xl mb-12">
                  <span className="label-tag">Downloads</span>
                  <h2 className="heading-section">
                    Datasheets, Certificates &{' '}
                    <span className="text-accent">Manuals</span>
                  </h2>
                </AnimateIn>

                <div className="grid sm:grid-cols-3 gap-6">
                  {product.downloads.map((download, idx) => (
                    <AnimateIn key={download.label} delay={idx * 70}>
                      <a
                        href={download.file ?? '#inquiry'}
                        download={download.file ? true : undefined}
                        target={download.file ? '_blank' : undefined}
                        rel={download.file ? 'noopener noreferrer' : undefined}
                        className="group flex items-center gap-4 p-6 rounded-2xl bg-white border border-slate-border
                                   shadow-sm hover:shadow-card hover:border-accent/20 transition-all duration-200 h-full">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20
                                        flex items-center justify-center flex-shrink-0
                                        group-hover:bg-accent group-hover:[&_path]:stroke-white transition-colors duration-200">
                          {downloadIcon}
                        </div>
                        <div>
                          <div className="text-navy/40 text-xs font-semibold tracking-widest uppercase mb-1">
                            {download.type}
                          </div>
                          <div className="text-navy text-sm font-semibold leading-snug">{download.label}</div>
                          {!download.file && (
                            <div className="text-slate-400 text-xs mt-0.5">Request via inquiry form</div>
                          )}
                        </div>
                      </a>
                    </AnimateIn>
                  ))}
                </div>
                <p className="text-slate-400 text-xs mt-6">
                  Request access to documentation via the inquiry form below — our team will share the
                  relevant files for {product.name} directly.
                </p>
              </div>
            </section>
          </>
        )}

        {/* ── Inquiry Form ─────────────────────────────────────────── */}
        <section id="inquiry" className="section-padding bg-white">
          <div className="container-narrow">
            <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-start">
              <AnimateIn>
                <span className="label-tag">Request a Site Survey</span>
                <h2 className="heading-section mb-5">
                  Request a Quote for{' '}
                  <span className="text-accent">{product.name}</span>
                </h2>
                <p className="body-lead mb-6 text-base">
                  Share your project details and our engineering team will respond with pricing,
                  technical guidance, and datasheets tailored to your facility.
                </p>
                <Link href="/#contact" className="btn-outline-dark">
                  General Enquiries
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </AnimateIn>

              <AnimateIn delay={120}>
                <div className="bg-white rounded-2xl border border-slate-border p-8 shadow-card-xl">
                  <div className="mb-6">
                    <h3 className="font-display text-navy font-bold text-xl mb-1">Product Inquiry</h3>
                    <p className="text-slate-400 text-xs">All fields are required</p>
                  </div>
                  <InquiryForm productName={product.name} />
                </div>
              </AnimateIn>
            </div>
          </div>
        </section>

        {/* ── Related products ─────────────────────────────────────── */}
        <section className="pb-20 lg:pb-28 bg-white">
          <div className="container-narrow">
            <div className="divider pt-16 lg:pt-20">
              <h2 className="heading-section mb-8">
                Explore Other <span className="text-accent">Products</span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.filter((p) => p.slug !== product.slug).slice(0, 3).map((p) => (
                  <Link key={p.slug} href={`/products/${p.slug}`}
                    className={`group rounded-2xl border p-6 flex items-center gap-4 transition-all duration-200
                                hover:-translate-y-0.5 hover:shadow-card ${p.color}`}>
                    <div className={`w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0`}>
                      {p.icon}
                    </div>
                    <div>
                      <div className="font-display text-navy font-bold text-sm mb-0.5">{p.name}</div>
                      <div className="text-slate-500 text-xs">{p.tagline}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: products.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const slug = params?.slug as string
  const product = getProductBySlug(slug)

  if (!product) return { notFound: true }

  return { props: { slug } }
}
