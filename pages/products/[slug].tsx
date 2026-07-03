import { useState, FormEvent } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import AnimateIn from '../../components/AnimateIn'
import { products, getProductBySlug, Product, ProductVariant } from '@/data/products'

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
    // TODO: Replace with your form backend (e.g. Formspree, Resend, or a Next.js API route)
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    setSubmitted(true)
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
                  <a href="#downloads" className="btn-outline">
                    {downloadIcon}
                    Download Datasheet
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

        {/* ── When variants exist: full two-column model split ─────── */}
        {product.variants && product.variants.length > 0 ? (
          <section id="downloads" className="section-padding bg-slate-corporate">
            <div className="container-narrow">
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
                <span className="label-tag">Get in Touch</span>
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
