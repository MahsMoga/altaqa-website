'use client'
import AnimateIn from './AnimateIn'

const brands = [
  {
    name: 'Johnson Controls',
    sub: 'Metasys Platform',
    color: '#FF3B30',
    detail: 'Certified specialists for the Metasys BMS ecosystem and related platforms.',
    tags: ['BMS', 'Metasys', 'DDC'],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="32" height="32">
        <rect x="4" y="8" width="32" height="24" rx="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 16h32" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2"/>
        <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.7"/>
        <path d="M18 24 Q20 20 22 24 Q24 28 26 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Schneider Electric',
    sub: 'EcoStruxure Building',
    color: '#3DCD58',
    detail: 'Deep expertise in EcoStruxure Building Operation systems and integration.',
    tags: ['EcoStruxure', 'BMS', 'Energy'],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="32" height="32">
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
    tags: ['Compass', 'Ascent', 'Controls'],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="32" height="32">
        <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
        <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.8"/>
        <path d="M20 6v4M20 30v4M6 20h4M30 20h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M20 20 L26 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.9"/>
      </svg>
    ),
  },
  {
    name: 'Honeywell Centraline',
    sub: 'Legacy & Modern Systems',
    color: '#FF6B6B',
    detail: 'Skilled in both legacy and current-generation Honeywell Centraline systems.',
    tags: ['Centraline', 'HVAC', 'Legacy'],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="32" height="32">
        <rect x="6" y="10" width="28" height="20" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 18 h4 l2-4 2 8 2-4 2 4 h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="10" cy="14" r="1.5" fill="currentColor" opacity="0.6"/>
        <circle cx="30" cy="14" r="1.5" fill="currentColor" opacity="0.6"/>
      </svg>
    ),
  },
  {
    name: 'Honeywell Trend',
    sub: 'IQ & 963 Supervisor',
    color: '#BF5AF2',
    detail: 'Proficient in IQ controller systems and the 963 Supervisor platform.',
    tags: ['IQ Controllers', '963', 'Supervisor'],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="32" height="32">
        <path d="M6 32 L12 22 L18 26 L24 14 L30 18 L36 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="22" r="2" fill="currentColor" opacity="0.7"/>
        <circle cx="24" cy="14" r="2" fill="currentColor" opacity="0.7"/>
        <circle cx="36" cy="8" r="2" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: 'Tridium / Niagara',
    sub: 'Niagara N4 Framework',
    color: '#0A84FF',
    detail: 'Advanced capabilities in Niagara N4 and AX Framework open-platform solutions.',
    tags: ['Niagara N4', 'AX', 'Open Platform'],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="32" height="32">
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

function BrandCard({ brand }: { brand: typeof brands[0] }) {
  return (
    <div
      className="group relative flex-shrink-0 w-[280px] rounded-2xl overflow-hidden cursor-default flex flex-col"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: `1px solid ${brand.color}25`,
        backdropFilter: 'blur(12px)',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.background = `linear-gradient(135deg, ${brand.color}14 0%, rgba(255,255,255,0.03) 100%)`
        el.style.borderColor = `${brand.color}55`
        el.style.boxShadow = `0 16px 48px ${brand.color}28, inset 0 1px 0 rgba(255,255,255,0.06)`
        el.style.transform = 'translateY(-4px)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.background = 'rgba(255,255,255,0.04)'
        el.style.borderColor = `${brand.color}25`
        el.style.boxShadow = 'none'
        el.style.transform = 'translateY(0)'
      }}
    >
      {/* Colored top border */}
      <div className="absolute top-0 left-0 right-0 h-[2px]"
           style={{ background: `linear-gradient(90deg, ${brand.color}80, ${brand.color}, ${brand.color}80)` }} />

      {/* Top glow on hover */}
      <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
           style={{ background: `linear-gradient(90deg, transparent, ${brand.color}, transparent)` }} />

      {/* Header row */}
      <div className="flex items-start justify-between p-5 pb-3">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl flex items-center justify-center"
             style={{
               background: `linear-gradient(135deg, ${brand.color}25, ${brand.color}10)`,
               border: `1px solid ${brand.color}40`,
               color: brand.color,
             }}>
          {brand.icon}
        </div>

        {/* Certified badge */}
        <div className="flex items-center gap-1 px-2 py-1 rounded-full"
             style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
          <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
            <path d="M2 5l2 2 4-4" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-emerald-400 text-[9px] font-bold uppercase tracking-wider">Certified</span>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pb-5 flex flex-col flex-1">
        <div className="font-display font-bold text-white text-[15px] leading-snug mb-0.5">
          {brand.name}
        </div>
        <div className="text-xs font-semibold mb-3" style={{ color: brand.color }}>
          {brand.sub}
        </div>

        <div className="text-[11px] leading-relaxed text-white/45 mb-4 flex-1">
          {brand.detail}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {brand.tags.map(tag => (
            <span key={tag}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                  style={{ background: `${brand.color}14`, color: brand.color, border: `1px solid ${brand.color}30` }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function BrandCapability() {
  // Duplicate for seamless loop
  const loopBrands = [...brands, ...brands, ...brands]

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

      <div className="relative z-10">

        {/* Header */}
        <AnimateIn className="container-narrow flex flex-col lg:flex-row lg:items-end gap-8 mb-14">
          <div className="flex-1">
            <span className="inline-flex items-center gap-2 text-accent text-xs font-semibold tracking-widest uppercase mb-5">
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

        {/* ── Infinite marquee strip ── */}
        <div className="relative mb-14 overflow-hidden">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
               style={{ background: 'linear-gradient(to right, #0a1628, transparent)' }} />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
               style={{ background: 'linear-gradient(to left, #0a1628, transparent)' }} />

          <style>{`
            @keyframes marquee {
              0%   { transform: translateX(0); }
              100% { transform: translateX(calc(-280px * ${brands.length} - ${brands.length * 16}px)); }
            }
            .marquee-track {
              animation: marquee ${brands.length * 4}s linear infinite;
            }
            .marquee-track:hover {
              animation-play-state: paused;
            }
          `}</style>

          <div className="marquee-track flex gap-4 pb-3" style={{ width: 'max-content' }}>
            {loopBrands.map((brand, idx) => (
              <BrandCard key={`${brand.name}-${idx}`} brand={brand} />
            ))}
          </div>
        </div>

        {/* Vendor-neutral callout */}
        <AnimateIn className="container-narrow">
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
            <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                 style={{ background: 'linear-gradient(90deg, transparent 0%, #2F80ED 40%, #2F80ED 60%, transparent 100%)' }} />

            <div className="flex items-center gap-6 p-6">
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
