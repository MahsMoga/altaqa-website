import Link from 'next/link'
import Image from 'next/image'
import AnimateIn from './AnimateIn'
import { products } from '@/data/products'

export default function Products() {
  return (
    <section id="products" className="section-padding"
      style={{ background: 'linear-gradient(160deg, #f8f9fc 0%, #f3f4f8 100%)' }}>
      <div className="container-narrow">

        {/* Header */}
        <AnimateIn className="max-w-xl mb-14">
          <span className="label-tag">Our Products</span>
          <h2 className="heading-section mb-4">
            Smart Metering &{' '}
            <span className="text-accent">Automation Solutions</span>
          </h2>
          <p className="body-lead">
            Explore our range of smart metering, IoT, automation, and energy management
            solutions for commercial, industrial, and utility applications.
          </p>
        </AnimateIn>

        {/* Product grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <AnimateIn key={product.slug} delay={idx * 70}>
              <Link
                href={`/products/${product.slug}`}
                aria-label={`View details for ${product.name}`}
                className="group flex flex-col h-full rounded-2xl overflow-hidden
                           hover:-translate-y-2 transition-all duration-300"
                style={{
                  background: 'linear-gradient(160deg, #0d1527 0%, #0f1c3a 60%, #0c1830 100%)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.28)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    '0 20px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(47,128,237,0.25)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    '0 4px 24px rgba(0,0,0,0.28)'
                }}
              >
                {/* Colored top bar */}
                <div className={`h-[3px] w-full flex-shrink-0 ${product.strip}`} />

                {/* Image area */}
                <div className={`relative flex-shrink-0 overflow-hidden h-44
                                ${!product.image ? product.iconBg : ''}`}
                     style={product.image ? { background: '#07101f' } : undefined}>
                  {product.image ? (
                    <>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover opacity-80 transition-all duration-500
                                   group-hover:opacity-95 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      {/* Dark gradient fade into card */}
                      <div className="absolute inset-0"
                           style={{ background: 'linear-gradient(to top, #0d1527 0%, rgba(13,21,39,0.4) 55%, transparent 100%)' }} />
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.3)' }} />
                      <div className="relative h-full flex items-center justify-center">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center
                                        group-hover:scale-110 transition-transform duration-300"
                             style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                          {product.icon}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 px-5 pt-4 pb-5">
                  <h3 className="font-display text-white font-bold text-[15px] leading-snug mb-2">
                    {product.name}
                  </h3>
                  <p className="text-white/50 text-[13px] leading-relaxed flex-1">
                    {product.tagline}
                  </p>

                  {/* CTA row */}
                  <div className="mt-4 pt-4 flex items-center justify-between"
                       style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                    <span className="text-accent text-[13px] font-semibold
                                     group-hover:text-accent-light transition-colors">
                      Explore Product
                    </span>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center
                                    group-hover:scale-110 transition-all duration-200"
                         style={{ background: 'rgba(47,128,237,0.15)', border: '1px solid rgba(47,128,237,0.3)' }}>
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
