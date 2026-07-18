'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import AnimateIn from './AnimateIn'
import { products } from '@/data/products'

const CATEGORIES = ['All', 'Metering', 'Sensors', 'Automation', 'Valves & Controls']

const CATEGORY_MAP: Record<string, string[]> = {
  Metering:          ['btu-meters', 'smart-water-meters', 'mbus-gateways'],
  Sensors:           ['lorawan-sensors'],
  Automation:        ['plc-control-systems'],
  'Valves & Controls': ['smart-shutoff-valves'],
}

export default function Products() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All'
    ? products
    : products.filter(p => (CATEGORY_MAP[active] ?? []).includes(p.slug))

  return (
    <section id="products" className="section-padding bg-white">
      <div className="container-narrow">

        {/* Header */}
        <AnimateIn className="max-w-2xl mb-8">
          <span className="label-tag">Our Products</span>
          <h2 className="heading-section mb-4">
            Smart Metering &amp;{' '}
            <span className="text-accent">Automation Solutions</span>
          </h2>
          <p className="body-lead mb-5">
            Purpose-built hardware for BMS, energy metering, industrial automation, and
            air quality monitoring — all available through Al Taqa Technical.
          </p>
        </AnimateIn>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-4 py-1.5 rounded-full text-[12px] font-semibold border transition-all duration-150 cursor-pointer"
              style={active === cat
                ? { background: '#0f1c35', color: '#fff', borderColor: '#0f1c35' }
                : { background: '#fff', color: '#475569', borderColor: '#e2e8f0' }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((product, idx) => (
            <AnimateIn key={product.slug} delay={idx * 60}>
              <div className="group flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300"
                style={{ background: '#ffffff', border: '1px solid #e8ecf2', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.boxShadow = '0 20px 48px rgba(0,0,0,0.12)'
                  el.style.border = '1px solid #c8d0de'
                  el.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'
                  el.style.border = '1px solid #e8ecf2'
                  el.style.transform = 'translateY(0)'
                }}
              >
                {/* Image zone — dark navy, no white box */}
                <Link href={`/products/${product.slug}`} className="block flex-shrink-0 relative overflow-hidden"
                      style={{ height: '210px', background: '#f4f6fa' }}>
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
                           style={{ background: 'rgba(47,128,237,0.08)', border: '1px solid rgba(47,128,237,0.15)' }}>
                        {product.icon}
                      </div>
                    </div>
                  )}
                </Link>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="font-display font-bold text-navy text-[15px] leading-snug mb-1 hover:text-accent transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Key spec line */}
                  {product.protocols && product.protocols.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {product.protocols.slice(0, 3).map(p => (
                        <span key={p}
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{ background: '#f0f4ff', color: '#3b6fd4', border: '1px solid #dbe4ff' }}>
                          {p}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-slate-500 text-[13px] leading-relaxed flex-1">
                    {product.tagline}
                  </p>

                  {/* Availability */}
                  <div className="flex items-center gap-1.5 mt-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block flex-shrink-0" />
                    <span className="text-[11px] text-emerald-700 font-semibold">Pricing in 24–48 working hours</span>
                  </div>

                  {/* CTA row */}
                  <div className="mt-auto pt-3 grid grid-cols-2 gap-2"
                       style={{ borderTop: '1px solid #eef1f6' }}>
                    <Link href={`/products/${product.slug}`}
                      className="flex items-center justify-center py-2 rounded-xl text-[12px] font-semibold text-slate-600 transition-all hover:text-navy"
                      style={{ background: '#f4f6fa', border: '1px solid #e8ecf2' }}>
                      View Details
                    </Link>
                    <Link href={`/products/${product.slug}#inquiry`}
                      className="flex items-center justify-center py-2 rounded-xl text-[12px] font-bold text-white transition-all hover:opacity-90"
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
  )
}
