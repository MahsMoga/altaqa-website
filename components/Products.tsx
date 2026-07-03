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
            Smart Metering &{' '}
            <span className="text-accent">Automation Solutions</span>
          </h2>
          <p className="body-lead">
            Explore our range of smart metering, IoT, automation, and energy management
            solutions for commercial, industrial, and utility applications.
          </p>
        </AnimateIn>

        {/* Responsive grid: 1 / 2 / 3-4 columns */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <AnimateIn key={product.slug} delay={idx * 70}>
              <Link
                href={`/products/${product.slug}`}
                aria-label={`View details for ${product.name}`}
                className={`group rounded-2xl border overflow-hidden shadow-sm hover:shadow-card-hover
                            transition-all duration-300 hover:-translate-y-1 h-full flex flex-col
                            ${product.color}`}
              >
                {/* Colored top strip */}
                <div className={`h-1.5 w-full ${product.strip}`} />

                {/* Image area — shows photo if available, icon otherwise */}
                <div className={`relative h-44 overflow-hidden ${!product.image ? product.iconBg : ''}`}>
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={`${product.name} product image`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 dot-pattern-bg opacity-30" />
                      <div className="relative h-full flex items-center justify-center">
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-card flex items-center
                                        justify-center border border-white/60 group-hover:scale-110
                                        transition-transform duration-300">
                          {product.icon}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="p-7 flex flex-col flex-1">
                  <h3 className="font-display text-navy font-bold text-lg leading-tight mb-2">
                    {product.name}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed flex-1">
                    {product.tagline}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 text-accent text-sm font-semibold
                                   group-hover:gap-3 transition-all duration-200">
                    View Details
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
