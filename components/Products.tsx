import Link from 'next/link'
import Image from 'next/image'
import AnimateIn from './AnimateIn'
import { products } from '@/data/products'

export default function Products() {
  return (
    <section id="products" className="section-padding"
      style={{ background: 'linear-gradient(160deg, #f8f9fc 0%, #f1f3f8 100%)' }}>
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
                  background: 'linear-gradient(175deg, #0d1527 0%, #0f1c3a 100%)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    '0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(47,128,237,0.2)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    '0 4px 24px rgba(0,0,0,0.3)'
                }}
              >
                {/* Colored top strip */}
                <div className={`h-[3px] w-full flex-shrink-0 ${product.strip}`} />

                {/* ── Product image zone — clean light studio background ── */}
                <div className="relative flex-shrink-0 overflow-hidden"
                     style={{ height: '168px', background: '#f5f6f8' }}>

                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="relative h-full flex items-center justify-center">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center
                                      group-hover:scale-110 transition-transform duration-300"
                           style={{ background: 'rgba(47,128,237,0.1)', border: '1px solid rgba(47,128,237,0.2)' }}>
                        {product.icon}
                      </div>
                    </div>
                  )}

                  {/* Bottom shadow blending into dark card */}
                  <div className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
                       style={{ background: 'linear-gradient(to bottom, transparent, rgba(13,21,39,0.35))' }} />
                </div>

                {/* ── Dark content area ── */}
                <div className="flex flex-col flex-1 px-5 pt-4 pb-5">
                  <h3 className="font-display font-bold text-white text-[15px] leading-snug mb-1.5">
                    {product.name}
                  </h3>
                  <p className="text-white/45 text-[12.5px] leading-relaxed flex-1">
                    {product.tagline}
                  </p>

                  {/* CTA */}
                  <div className="mt-4 pt-4 flex items-center justify-between"
                       style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                    <span className="text-[#60a5fa] text-[13px] font-semibold
                                     group-hover:text-blue-300 transition-colors">
                      Explore Product
                    </span>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center
                                    group-hover:scale-110 transition-all duration-200"
                         style={{
                           background: 'rgba(47,128,237,0.12)',
                           border: '1px solid rgba(47,128,237,0.3)',
                         }}>
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5"
                              stroke="#60a5fa" strokeWidth="1.5"
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
