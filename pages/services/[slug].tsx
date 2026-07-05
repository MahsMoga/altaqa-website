import Head from 'next/head'
import Link from 'next/link'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import WhatsAppButton from '../../components/WhatsAppButton'
import AnimateIn from '../../components/AnimateIn'
import { servicesData, getServiceDataBySlug, serviceIcons, ServiceData } from '@/data/services'

const SITE_URL = 'https://www.altaqauae.com'

const checkIcon = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="6.5" fill="#2F80ED" fillOpacity="0.12"/>
    <path d="M4.5 7l2 2L9.5 5" stroke="#2F80ED" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

function JsonLd({ service }: { service: ServiceData }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.overview,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Al Taqa Technical General Contracting LLC',
      url: SITE_URL,
      address: { '@type': 'PostalAddress', addressLocality: 'Abu Dhabi', addressCountry: 'AE' },
    },
    areaServed: 'UAE',
    url: `${SITE_URL}/services/${service.slug}`,
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

function FaqJsonLd({ service }: { service: ServiceData }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

interface Props { service: ServiceData; related: ServiceData[] }

export default function ServicePage({ service, related }: Props) {
  const icon = serviceIcons[service.slug]

  return (
    <>
      <Head>
        <title>{service.metaTitle}</title>
        <meta name="description" content={service.metaDescription} />
        <meta name="keywords" content={service.keywords.join(', ')} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/services/${service.slug}`} />
        <meta property="og:title" content={service.metaTitle} />
        <meta property="og:description" content={service.metaDescription} />
        <meta property="og:url" content={`${SITE_URL}/services/${service.slug}`} />
        <meta property="og:type" content="website" />
        <JsonLd service={service} />
        <FaqJsonLd service={service} />
      </Head>

      <Navbar />

      <main className="bg-white min-h-screen">

        {/* ── Hero band ───────────────────────────────────────── */}
        <div className="bg-navy pt-32 pb-16">
          <div className="container-narrow">
            <nav className="flex items-center gap-2 text-white/40 text-xs mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/#services" className="hover:text-white/70 transition-colors">Services</Link>
              <span>/</span>
              <span className="text-white/70">{service.shortName}</span>
            </nav>

            <div className="flex items-start gap-5">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1"
                style={{ background: `${service.color}20`, border: `1px solid ${service.color}30` }}
                aria-hidden="true"
              >
                {icon}
              </div>
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: service.color }}>
                  Our Services
                </p>
                <h1 className="font-display text-white text-3xl lg:text-4xl font-bold leading-tight max-w-2xl">
                  {service.name}
                </h1>
                <p className="text-white/55 text-sm mt-3 max-w-xl leading-relaxed">{service.tagline}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container-narrow py-14">
          <div className="grid lg:grid-cols-3 gap-12 items-start">

            {/* ── Main content ─────────────────────────────────── */}
            <div className="lg:col-span-2 space-y-14">

              <AnimateIn>
                <p className="text-slate-600 text-base leading-relaxed">{service.overview}</p>
              </AnimateIn>

              {/* Features */}
              <AnimateIn>
                <h2 className="font-display text-navy font-bold text-xl mb-6">What&rsquo;s Included</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  {service.features.map((f, i) => (
                    <div key={i} className="rounded-2xl p-5"
                         style={{ background: `${service.color}06`, border: `1px solid ${service.color}18` }}>
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                             style={{ background: `${service.color}15` }} aria-hidden="true">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M2.5 7l3 3L11.5 3" stroke={service.color} strokeWidth="1.5"
                                  strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <h3 className="text-navy font-semibold text-sm">{f.title}</h3>
                      </div>
                      <p className="text-slate-500 text-xs leading-relaxed pl-9">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </AnimateIn>

              {/* Sectors */}
              <AnimateIn>
                <h2 className="font-display text-navy font-bold text-xl mb-5">Sectors We Serve</h2>
                <div className="flex flex-wrap gap-2.5">
                  {service.sectors.map(s => (
                    <span key={s} className="text-xs font-medium px-3.5 py-1.5 rounded-full"
                          style={{ background: `${service.color}10`, color: service.color, border: `1px solid ${service.color}25` }}>
                      {s}
                    </span>
                  ))}
                </div>
              </AnimateIn>

              {/* FAQ */}
              <AnimateIn>
                <h2 className="font-display text-navy font-bold text-xl mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {service.faqs.map((f, i) => (
                    <div key={i} className="rounded-2xl border border-slate-100 p-6">
                      <h3 className="text-navy font-semibold text-sm mb-2">{f.q}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{f.a}</p>
                    </div>
                  ))}
                </div>
              </AnimateIn>
            </div>

            {/* ── Sidebar ──────────────────────────────────────── */}
            <div className="lg:sticky lg:top-24 space-y-5">

              {/* Deliverables */}
              <div className="rounded-2xl border border-slate-200 p-6">
                <h3 className="text-navy font-bold text-xs uppercase tracking-widest mb-4">What You Receive</h3>
                <ul className="space-y-2.5">
                  {service.deliverables.map((d, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <span className="mt-0.5 flex-shrink-0">{checkIcon}</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="rounded-2xl p-6"
                   style={{ background: 'linear-gradient(135deg, #0f1c3f 0%, #1a3468 100%)' }}>
                <h3 className="text-white font-display font-bold text-sm mb-1">Discuss your requirements</h3>
                <p className="text-white/55 text-xs mb-5 leading-relaxed">
                  Our engineers are available for a no-obligation consultation on any {service.shortName} project.
                </p>
                <a href="/#contact" className="btn-primary w-full justify-center text-sm py-3">
                  Get a Free Consultation
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="/energy-calculator"
                   className="mt-3 flex items-center justify-center gap-1.5 text-white/50 hover:text-white/80 text-xs transition-colors py-2">
                  Estimate your savings first →
                </a>
              </div>

              {/* Related services */}
              {related.length > 0 && (
                <div className="rounded-2xl border border-slate-200 p-6">
                  <h3 className="text-navy font-bold text-xs uppercase tracking-widest mb-4">Related Services</h3>
                  <div className="space-y-2">
                    {related.map(r => (
                      <Link key={r.slug} href={`/services/${r.slug}`}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                             style={{ background: `${r.color}15` }} aria-hidden="true">
                          {serviceIcons[r.slug]}
                        </div>
                        <span className="text-slate-600 text-xs font-medium group-hover:text-navy transition-colors flex-1">
                          {r.shortName}
                        </span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                             className="text-slate-300 group-hover:text-accent transition-colors">
                          <path d="M3 6h6M7 4l2 2-2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: servicesData.map(s => ({ params: { slug: s.slug } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const service = getServiceDataBySlug(params?.slug as string)
  if (!service) return { notFound: true }
  const related = service.relatedSlugs
    .map(slug => servicesData.find(r => r.slug === slug))
    .filter((s): s is ServiceData => !!s)
  return { props: { service, related } }
}
