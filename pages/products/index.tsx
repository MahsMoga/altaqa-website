import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import AnimateIn from '../../components/AnimateIn'
import { products } from '@/data/products'

export default function ProductsIndex() {
  return (
    <>
      <Head>
        <title>Products — Smart Metering & Automation | Al Taqa Technical</title>
        <meta name="description" content="Browse Al Taqa Technical's full range of BMS hardware: BTU meters, water meters, gas sensors, LoRaWAN sensors, PLC systems, control valves and actuators. Official UAE distributor." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      <main>
        {/* Hero */}
        <section className="pt-32 pb-14 lg:pt-40 lg:pb-20 bg-navy hero-pattern relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/40 via-navy/80 to-navy" />
          <div className="container-narrow relative">
            <AnimateIn>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-semibold text-white/70"
                   style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
                Abu Dhabi, UAE · Official Distributor
              </div>
              <h1 className="heading-display text-white mb-5">All Products</h1>
              <p className="text-white/60 text-base leading-relaxed max-w-xl">
                Purpose-built hardware for BMS, energy metering, industrial automation, and air quality monitoring.
                Stocked locally — pricing and commissioning support included.
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* Grid */}
        <section className="section-padding bg-white">
          <div className="container-narrow">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {products.map((product, idx) => (
                <AnimateIn key={product.slug} delay={idx * 60}>
                  <div className="group flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300"
                    style={{ background: '#ffffff', border: '1px solid #e8ecf2', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = '0 20px 48px rgba(0,0,0,0.12)'; el.style.transform = 'translateY(-4px)' }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; el.style.transform = 'translateY(0)' }}
                  >
                    <Link href={`/products/${product.slug}`} className="block flex-shrink-0 relative overflow-hidden"
                          style={{ height: '210px', background: '#0f1c35' }}>
                      <div className={`absolute top-0 left-0 right-0 h-[3px] z-10 ${product.strip}`} />
                      {product.image ? (
                        <Image src={product.image} alt={product.name} fill
                          className="object-contain transition-transform duration-500 group-hover:scale-[1.06]"
                          style={{ padding: '28px', mixBlendMode: 'screen' }}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                      ) : (
                        <div className="h-full flex items-center justify-center">
                          <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
                               style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>
                            {product.icon}
                          </div>
                        </div>
                      )}
                    </Link>
                    <div className="flex flex-col flex-1 p-5">
                      <Link href={`/products/${product.slug}`}>
                        <h2 className="font-display font-bold text-navy text-[15px] leading-snug mb-1 hover:text-accent transition-colors">
                          {product.name}
                        </h2>
                      </Link>
                      {product.protocols && product.protocols.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {product.protocols.slice(0, 3).map(p => (
                            <span key={p} className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                              style={{ background: '#f0f4ff', color: '#3b6fd4', border: '1px solid #dbe4ff' }}>{p}</span>
                          ))}
                        </div>
                      )}
                      <p className="text-slate-500 text-[13px] leading-relaxed flex-1">{product.tagline}</p>
                      <div className="flex items-center gap-1.5 mt-2 mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block flex-shrink-0" />
                        <span className="text-[11px] text-emerald-700 font-semibold">Available in UAE · Pricing in 24h</span>
                      </div>
                      <div className="mt-auto pt-3 grid grid-cols-2 gap-2" style={{ borderTop: '1px solid #eef1f6' }}>
                        <Link href={`/products/${product.slug}`}
                          className="flex items-center justify-center py-2 rounded-xl text-[12px] font-semibold text-slate-600 hover:text-navy transition-all"
                          style={{ background: '#f4f6fa', border: '1px solid #e8ecf2' }}>
                          View Details
                        </Link>
                        <Link href={`/products/${product.slug}#inquiry`}
                          className="flex items-center justify-center py-2 rounded-xl text-[12px] font-bold text-white hover:opacity-90 transition-all"
                          style={{ background: '#0f1c35' }}>
                          Get Quote
                        </Link>
                      </div>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
