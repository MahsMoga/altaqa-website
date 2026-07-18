import Link from 'next/link'
import Image from 'next/image'
import AnimateIn from './AnimateIn'
import { products } from '@/data/products'

export default function Products() {
  return (
    <section id="products" className="section-padding bg-white">
      <div className="container-narrow">

        {/* Header */}
        <AnimateIn className="max-w-xl mb-14">
          <span className="label-tag">Our Products</span>
          <h2 className="heading-section mb-4">
            Smart Metering &amp;{' '}
            <span className="text-accent">Automation Solutions</span>
          </h2>
          <p className="body-lead">
            Purpose-built hardware for BMS, energy metering, industrial automation, and
            air quality monitoring — all available through Al Taqa Technical.
          </p>
        </AnimateIn>

        {/* Product grid — 3-col desktop, 2-col tablet, 1-col mobile */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {products.map((product, idx) => (
            <AnimateIn key={product.slug} delay={idx * 60}>
              <Link
                href={`/products/${product.slug}`}
                aria-label={`View details for ${product.name}`}
                className="group flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: '#ffffff',
                  border: '1px solid #e8ecf2',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.boxShadow = '0 20px 48px rgba(0,0,0,0.12)'
                  el.style.border = '1px solid #c8d0de'
                  el.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'
                  el.style.border = '1px solid #e8ecf2'
                  el.style.transform = 'translateY(0)'
                }}
              >
                {/* Image zone — dark navy bg, colored strip at top */}
                <div className="relative overflow-hidden flex-shrink-0"
                     style={{ height: '210px', background: '#0f1c35' }}>
                  {/* Colored accent strip at top */}
                  <div className={`absolute top-0 left-0 right-0 h-[3px] z-10 ${product.strip}`} />

                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-[1.06]"
                      style={{ padding: '28px' }}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="w-20 h-20 rounded-2xl flex items-center justify-center
                                      group-hover:scale-110 transition-transform duration-300"
                           style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>
                        {product.icon}
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="font-display font-bold text-navy text-[15px] leading-snug mb-2">
                    {product.name}
                  </h3>
                  <p className="text-slate-500 text-[13px] leading-relaxed flex-1">
                    {product.tagline}
                  </p>

                  {/* Protocols/apps chips */}
                  {product.protocols && product.protocols.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {product.protocols.slice(0, 3).map(p => (
                        <span key={p}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: '#f0f4ff', color: '#3b6fd4', border: '1px solid #dbe4ff' }}>
                          {p}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* CTA row */}
                  <div className="mt-4 pt-4 flex items-center justify-between"
                       style={{ borderTop: '1px solid #eef1f6' }}>
                    <span className="text-accent text-[13px] font-bold group-hover:underline transition-all">
                      View Details
                    </span>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center
                                    group-hover:bg-accent group-hover:[&_path]:stroke-white
                                    transition-all duration-200"
                         style={{ background: '#f0f4ff', border: '1px solid #dbe4ff' }}>
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5"
                              stroke="#2F80ED" strokeWidth="1.5"
                              strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
