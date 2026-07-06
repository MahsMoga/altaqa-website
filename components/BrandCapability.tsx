import { useState } from 'react'
import AnimateIn from './AnimateIn'

const brands = [
  {
    name: 'Johnson Controls',
    sub: 'Metasys Platform',
    color: '#FF3B30',
    detail: 'Certified specialists for the Metasys BMS ecosystem and related platforms.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="36" height="36">
        <rect x="4" y="8" width="32" height="24" rx="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 16h32" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2"/>
        <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.7"/>
        <path d="M18 24 Q20 20 22 24 Q24 28 26 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <circle cx="28" cy="24" r="1.5" fill="currentColor" opacity="0.6"/>
      </svg>
    ),
  },
  {
    name: 'Schneider Electric',
    sub: 'EcoStruxure Building',
    color: '#3DCD58',
    detail: 'Deep expertise in EcoStruxure Building Operation systems and integration.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="36" height="36">
        <path d="M20 4 L34 12 V28 L20 36 L6 28 V12 Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M20 10 L28 15 V25 L20 30 L12 25 V15 Z" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
        <path d="M20 14v12M14 17l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: 'Honeywell Alerton',
    sub: 'Compass & Ascent',
    color: '#FF9F0A',
    detail: 'Comprehensive knowledge across Compass and Ascent controller platforms.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="36" height="36">
        <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
        <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.8"/>
        <path d="M20 6 L20 10M20 30 L20 34M6 20 L10 20M30 20 L34 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M20 20 L26 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.9"/>
      </svg>
    ),
  },
  {
    name: 'Honeywell Centraline',
    sub: 'Legacy & Modern Systems',
    color: '#FF6B6B',
    detail: 'Skilled in both legacy and current-generation Honeywell Centraline systems.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="36" height="36">
        <rect x="6" y="10" width="28" height="20" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 18 h4 l2-4 2 8 2-4 2 4 h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="10" cy="14" r="1.5" fill="currentColor" opacity="0.6"/>
        <circle cx="30" cy="14" r="1.5" fill="currentColor" opacity="0.6"/>
        <path d="M14 30 v4 M26 30 v4 M10 34 h20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Honeywell Trend',
    sub: 'IQ & 963 Supervisor',
    color: '#BF5AF2',
    detail: 'Proficient in IQ controller systems and the 963 Supervisor platform.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="36" height="36">
        <path d="M6 32 L12 22 L18 26 L24 14 L30 18 L36 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="22" r="2" fill="currentColor" opacity="0.7"/>
        <circle cx="24" cy="14" r="2" fill="currentColor" opacity="0.7"/>
        <circle cx="36" cy="8" r="2" fill="currentColor"/>
        <path d="M6 36 h28" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Tridium / Niagara',
    sub: 'Niagara Framework',
    color: '#0A84FF',
    detail: 'Advanced capabilities in Niagara N4 and AX Framework open-platform solutions.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="36" height="36">
        <circle cx="20" cy="20" r="6" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="8" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="32" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="8" cy="28" r="3.5" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="32" cy="28" r="3.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M11 14 L14 17M29 14 L26 17M11 26 L14 23M29 26 L26 23" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.8"/>
      </svg>
    ),
  },
]

type Brand = typeof brands[0]

function BrandCard({ brand, idx }: { brand: Brand; idx: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="group relative rounded-2xl overflow-hidden cursor-default flex flex-col h-full"
      style={{
        background: hovered
          ? `linear-gradient(135deg, ${brand.color}14 0%, rgba(255,255,255,0.03) 100%)`
          : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hovered ? brand.color + '55' : brand.color + '22'}`,
        boxShadow: hovered
          ? `0 20px 56px ${brand.color}28, 0 0 0 1px ${brand.color}30, inset 0 1px 0 rgba(255,255,255,0.06)`
          : '0 2px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.35s ease',
        backdropFilter: 'blur(12px)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${brand.color} 40%, ${brand.color} 60%, transparent 100%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Large watermark number */}
      <div
        className="absolute -top-3 -right-2 font-display font-black text-7xl leading-none select-none pointer-events-none transition-opacity duration-500"
        style={{ color: brand.color, opacity: hovered ? 0.12 : 0.06 }}
      >
        {String(idx + 1).padStart(2, '0')}
      </div>

      {/* Icon area */}
      <div className="relative p-6 pb-4 flex items-start justify-between">
        {/* Icon with ambient glow */}
        <div
          className="relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-400 group-hover:scale-110"
          style={{
            background: `linear-gradient(135deg, ${brand.color}28, ${brand.color}12)`,
            border: `1px solid ${brand.color}45`,
            color: brand.color,
            boxShadow: hovered ? `0 0 28px ${brand.color}45` : `0 0 12px ${brand.color}20`,
          }}
        >
          {brand.icon}
        </div>

        {/* Certified badge */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full mt-1"
          style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)' }}
        >
          <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
            <path d="M2 5l2 2 4-4" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-emerald-400 text-[9px] font-bold uppercase tracking-wider">Certified</span>
        </div>
      </div>

      {/* Text content */}
      <div className="px-6 pb-6 flex flex-col flex-1">
        <div className="font-display font-bold text-base text-white mb-0.5 leading-snug">
          {brand.name}
        </div>
        <div className="text-xs font-semibold mb-4" style={{ color: brand.color }}>
          {brand.sub}
        </div>

        {/* Amber accent line — expands on hover */}
        <div
          className="rounded-full mb-4 transition-all duration-500"
          style={{
            width: hovered ? '48px' : '20px',
            height: '1.5px',
            background: `linear-gradient(90deg, ${brand.color}, ${brand.color}60)`,
            boxShadow: hovered ? `0 0 8px ${brand.color}60` : 'none',
          }}
        />

        <div className="text-xs leading-relaxed text-white/50 flex-1">
          {brand.detail}
        </div>
      </div>
    </div>
  )
}

export default function BrandCapability() {
  return (
    <section id="platforms" className="section-padding bg-navy relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-pattern opacity-20" />
      <div className="orb w-[520px] h-[520px] bg-accent/[0.07] -top-32 right-0 animate-float-slow"
           style={{ filter: 'blur(90px)' }} />
      <div className="orb w-72 h-72 bg-accent/[0.05] bottom-0 left-1/4 animate-float"
           style={{ filter: 'blur(80px)' }} />

      {/* Amber top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" aria-hidden="true"
           style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(217,119,6,0.6) 30%, rgba(217,119,6,0.6) 70%, transparent 100%)' }} />

      <div className="container-narrow relative z-10">

        {/* Header */}
        <AnimateIn className="flex flex-col lg:flex-row lg:items-end gap-8 mb-14">
          <div className="flex-1">
            <span className="inline-flex items-center gap-2 text-accent text-xs font-semibold
                             tracking-widest uppercase mb-5">
              <span className="block w-5 h-0.5 bg-accent rounded-full" />
              Multi-Brand Capability
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white leading-[1.1] tracking-tight">
              Certified Across Every{' '}
              <span className="text-accent">Major Platform</span>
            </h2>
          </div>
          <p className="text-white/50 text-sm leading-relaxed max-w-sm lg:mb-1">
            Our vendor-neutral expertise means we work with your existing
            infrastructure — not around it. No lock-in, no forced migrations.
          </p>
        </AnimateIn>

        {/* Brand grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {brands.map((brand, idx) => (
            <AnimateIn key={brand.name} delay={idx * 60}>
              <BrandCard brand={brand} idx={idx} />
            </AnimateIn>
          ))}
        </div>

        {/* Vendor-neutral full-width callout */}
        <AnimateIn>
          <div
            className="group relative rounded-2xl overflow-hidden cursor-default transition-all duration-400 hover:-translate-y-1.5"
            style={{
              background: 'linear-gradient(135deg, rgba(47,128,237,0.12) 0%, rgba(47,128,237,0.04) 100%)',
              border: '1px solid rgba(47,128,237,0.25)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)',
              backdropFilter: 'blur(12px)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLDivElement
              el.style.borderColor = 'rgba(47,128,237,0.55)'
              el.style.boxShadow = '0 20px 56px rgba(47,128,237,0.22), inset 0 1px 0 rgba(255,255,255,0.06)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLDivElement
              el.style.borderColor = 'rgba(47,128,237,0.25)'
              el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)'
            }}
          >
            {/* Top glow line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                 style={{ background: 'linear-gradient(90deg, transparent 0%, #2F80ED 40%, #2F80ED 60%, transparent 100%)' }} />

            <div className="flex items-center gap-6 p-6">
              {/* Icon */}
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-400 group-hover:scale-110"
                   style={{ background: 'linear-gradient(135deg, rgba(47,128,237,0.25), rgba(47,128,237,0.10))', border: '1px solid rgba(47,128,237,0.4)', color: '#2F80ED', boxShadow: '0 8px 24px rgba(47,128,237,0.2)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2F80ED" strokeWidth="1.5">
                  <path d="M12 2l2 5.5H20l-4.5 3.5 1.5 5.5L12 13.5 7 16.5l1.5-5.5L4 7.5h6L12 2z" strokeLinejoin="round"/>
                </svg>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-display font-bold text-base text-white">Vendor-Neutral Solutions</span>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                       style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)' }}>
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2 2 4-4" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-emerald-400 text-[9px] font-bold uppercase tracking-wider">Our Promise</span>
                  </div>
                </div>
                <div className="text-xs font-semibold mb-2" style={{ color: '#2F80ED' }}>Your System, Your Terms</div>
                <div className="text-xs leading-relaxed text-white/50 max-w-2xl">
                  We tailor every solution to your specific requirements — not to a single
                  manufacturer's ecosystem. Your system, your terms, your long-term success.
                </div>
              </div>

              {/* Decorative number */}
              <div className="hidden lg:block font-display font-black text-8xl leading-none select-none pointer-events-none text-white/[0.04]">
                07
              </div>
            </div>
          </div>
        </AnimateIn>

      </div>
    </section>
  )
}
