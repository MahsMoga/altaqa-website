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
                           bg-white border border-slate-200/70
                           shadow-[0_2px_12px_rgba(0,0,0,0.06)]
                           hover:shadow-[0_16px_48px_rgba(0,0,0,0.13)]
                           hover:-translate-y-2 transition-all duration-350"
              >
                {/* Colored top bar — 3px */}
                <div className={`h-[3px] w-full flex-shrink-0 ${product.strip}`} />

                {/* Image area */}
                <div className={`relative flex-shrink-0 overflow-hidden
                                ${product.image ? 'h-48' : 'h-44'} ${!product.image ? product.iconBg : 'bg-slate-100'}`}>
                  {product.image ? (
                    <>
                      <Image
                        src={product.image}
                        alt={`${product.name}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      {/* Gradient fade into card */}
                      <div className="absolute inset-0"
                           style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 55%)' }} />
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 dot-pattern-bg opacity-20" />
                      <div className="relative h-full flex items-center justify-center">
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center
                                        justify-center border border-white/80
                                        group-hover:scale-110 transition-transform duration-300">
                          {product.icon}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 px-5 pt-4 pb-5">
                  <h3 className="font-display text-navy font-bold text-[15px] leading-snug mb-2">
                    {product.name}
                  </h3>
                  <p className="text-slate-500 text-[13px] leading-relaxed flex-1">
                    {product.tagline}
                  </p>

                  {/* CTA row */}
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-accent text-[13px] font-semibold
                                     group-hover:opacity-80 transition-opacity">
                      Explore Product
                    </span>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center
                                    ${product.iconBg}
                                    group-hover:scale-110 group-hover:shadow-sm
                                    transition-all duration-200`}>
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
