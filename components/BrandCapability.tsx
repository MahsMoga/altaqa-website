import AnimateIn from './AnimateIn'

const brands = [
  {
    name: 'Johnson Controls',
    sub: 'Metasys Platform',
    badge: 'JC',
    color: '#FF3B30',
    glow: 'rgba(255,59,48,0.35)',
    detail: 'Certified specialists for the Metasys BMS ecosystem and related platforms.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
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
    badge: 'SE',
    color: '#3DCD58',
    glow: 'rgba(61,205,88,0.35)',
    detail: 'Deep expertise in EcoStruxure Building Operation systems and integration.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
        <path d="M20 4 L34 12 V28 L20 36 L6 28 V12 Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M20 10 L28 15 V25 L20 30 L12 25 V15 Z" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
        <path d="M20 14v12M14 17l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: 'Honeywell Alerton',
    sub: 'Compass & Ascent',
    badge: 'HA',
    color: '#FF9F0A',
    glow: 'rgba(255,159,10,0.35)',
    detail: 'Comprehensive knowledge across Compass and Ascent controller platforms.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
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
    badge: 'HC',
    color: '#FF6B6B',
    glow: 'rgba(255,107,107,0.35)',
    detail: 'Skilled in both legacy and current-generation Honeywell Centraline systems.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
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
    badge: 'HT',
    color: '#BF5AF2',
    glow: 'rgba(191,90,242,0.35)',
    detail: 'Proficient in IQ controller systems and the 963 Supervisor platform.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
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
    badge: 'TR',
    color: '#0A84FF',
    glow: 'rgba(10,132,255,0.35)',
    detail: 'Advanced capabilities in Niagara N4 and AX Framework open-platform solutions.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
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

export default function BrandCapability() {
  return (
    <section id="platforms" className="section-padding bg-navy relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 hero-pattern opacity-20" />
      <div className="orb w-[480px] h-[480px] bg-accent/[0.07] -top-24 right-0 animate-float-slow"
           style={{ filter: 'blur(90px)' }} />
      <div className="orb w-64 h-64 bg-accent/[0.05] bottom-0 left-1/4 animate-float"
           style={{ filter: 'blur(80px)' }} />

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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {brands.map((brand, idx) => (
            <AnimateIn key={brand.name} delay={idx * 60}>
              <div
                className="group relative rounded-2xl overflow-hidden cursor-default
                           transition-all duration-400 hover:-translate-y-1.5 flex flex-col h-full"
                style={{
                  background: '#ffffff',
                  border: `1px solid rgba(0,0,0,0.08)`,
                  boxShadow: `0 4px 24px rgba(0,0,0,0.14)`,
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = brand.color + '60'
                  el.style.boxShadow = `0 20px 56px ${brand.glow}, 0 6px 20px rgba(0,0,0,0.12)`
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = 'rgba(0,0,0,0.08)'
                  el.style.boxShadow = `0 4px 24px rgba(0,0,0,0.14)`
                }}
              >
                {/* Coloured header band */}
                <div className="relative overflow-hidden flex items-center justify-center"
                     style={{
                       background: `linear-gradient(135deg, ${brand.color}22 0%, ${brand.color}10 100%)`,
                       borderBottom: `1px solid ${brand.color}25`,
                       height: '110px',
                     }}>
                  {/* Decorative circles */}
                  <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-20 transition-all duration-500 group-hover:opacity-30"
                       style={{ background: `radial-gradient(circle, ${brand.color}, transparent 70%)` }} />
                  <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full opacity-10"
                       style={{ background: `radial-gradient(circle, ${brand.color}, transparent 70%)` }} />
                  {/* Subtle dot grid */}
                  <div className="absolute inset-0 opacity-[0.07]"
                       style={{
                         backgroundImage: `radial-gradient(${brand.color} 1px, transparent 1px)`,
                         backgroundSize: '18px 18px',
                       }} />
                  {/* Corner number */}
                  <div className="absolute top-3 left-4 font-display font-bold text-2xl leading-none select-none"
                       style={{ color: brand.color + '30' }}>
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  {/* Certified badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                       style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}>
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2 2 4-4" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-emerald-600 text-[9px] font-bold uppercase tracking-wider">Certified</span>
                  </div>
                  {/* Large icon */}
                  <div
                    className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center
                               transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${brand.color}30, ${brand.color}15)`,
                      border: `1.5px solid ${brand.color}45`,
                      color: brand.color,
                      boxShadow: `0 8px 24px ${brand.color}30`,
                    }}
                  >
                    {brand.icon}
                  </div>
                </div>

                {/* Text content */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Brand name */}
                  <div className="font-display font-bold text-base mb-0.5 leading-snug" style={{ color: '#0f1c3f' }}>
                    {brand.name}
                  </div>

                  {/* Platform subtitle */}
                  <div className="text-xs font-semibold mb-3" style={{ color: brand.color }}>
                    {brand.sub}
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px mb-3"
                       style={{ background: `linear-gradient(90deg, ${brand.color}40, transparent)` }} />

                  {/* Detail text */}
                  <div className="text-xs leading-relaxed" style={{ color: '#64748b' }}>
                    {brand.detail}
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Vendor-neutral callout — matches brand card style */}
        <AnimateIn>
          <div className="group relative rounded-2xl overflow-hidden cursor-default transition-all duration-400 hover:-translate-y-1.5"
               style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 4px 24px rgba(0,0,0,0.14)' }}
               onMouseEnter={e => {
                 const el = e.currentTarget as HTMLDivElement
                 el.style.borderColor = 'rgba(47,128,237,0.6)'
                 el.style.boxShadow = '0 20px 56px rgba(47,128,237,0.25), 0 6px 20px rgba(0,0,0,0.12)'
               }}
               onMouseLeave={e => {
                 const el = e.currentTarget as HTMLDivElement
                 el.style.borderColor = 'rgba(0,0,0,0.08)'
                 el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.14)'
               }}
          >
            {/* Coloured header band */}
            <div className="relative overflow-hidden flex items-center justify-center"
                 style={{
                   background: 'linear-gradient(135deg, rgba(47,128,237,0.18) 0%, rgba(47,128,237,0.08) 100%)',
                   borderBottom: '1px solid rgba(47,128,237,0.2)',
                   height: '110px',
                 }}>
              {/* Decorative glows */}
              <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-20 transition-all duration-500 group-hover:opacity-30"
                   style={{ background: 'radial-gradient(circle, #2F80ED, transparent 70%)' }} />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full opacity-10"
                   style={{ background: 'radial-gradient(circle, #2F80ED, transparent 70%)' }} />
              <div className="absolute inset-0 opacity-[0.07]"
                   style={{ backgroundImage: 'radial-gradient(#2F80ED 1px, transparent 1px)', backgroundSize: '18px 18px' }} />

              {/* Number — absolute top-left */}
              <div className="absolute top-3 left-4 font-display font-bold text-2xl leading-none select-none"
                   style={{ color: 'rgba(47,128,237,0.30)' }}>07</div>

              {/* Badge — absolute top-right */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                   style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}>
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2 2 4-4" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-emerald-600 text-[9px] font-bold uppercase tracking-wider">Our Promise</span>
              </div>

              {/* Icon — centered */}
              <div className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                   style={{ background: 'linear-gradient(135deg, rgba(47,128,237,0.25), rgba(47,128,237,0.12))', border: '1.5px solid rgba(47,128,237,0.35)', color: '#2F80ED', boxShadow: '0 8px 24px rgba(47,128,237,0.2)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2F80ED" strokeWidth="1.6">
                  <path d="M12 2l2 5.5H20l-4.5 3.5 1.5 5.5L12 13.5 7 16.5l1.5-5.5L4 7.5h6L12 2z" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Text content */}
            <div className="p-5">
              <div className="font-display font-bold text-base mb-0.5 leading-snug" style={{ color: '#0f1c3f' }}>
                Vendor-Neutral Solutions
              </div>
              <div className="text-xs font-semibold mb-3" style={{ color: '#2F80ED' }}>
                Your System, Your Terms
              </div>
              <div className="w-full h-px mb-3" style={{ background: 'linear-gradient(90deg, rgba(47,128,237,0.35), transparent)' }} />
              <div className="text-xs leading-relaxed" style={{ color: '#64748b' }}>
                We tailor every solution to your specific requirements — not to a single
                manufacturer's ecosystem. Your system, your terms, your long-term success.
              </div>
            </div>
          </div>
        </AnimateIn>

      </div>
    </section>
  )
}
