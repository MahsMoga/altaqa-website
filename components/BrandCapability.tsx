import AnimateIn from './AnimateIn'

const brands = [
  {
    name: 'Johnson Controls',
    sub: 'Metasys Platform',
    badge: 'JC',
    color: '#CC0000',
    detail: 'Certified specialists for the Metasys BMS ecosystem and related platforms.',
  },
  {
    name: 'Schneider Electric',
    sub: 'EcoStruxure Building',
    badge: 'SE',
    color: '#3DCD58',
    detail: 'Deep expertise in EcoStruxure Building Operation systems and integration.',
  },
  {
    name: 'Honeywell Alerton',
    sub: 'Compass & Ascent',
    badge: 'HA',
    color: '#E8000F',
    detail: 'Comprehensive knowledge across Compass and Ascent controller platforms.',
  },
  {
    name: 'Honeywell Centraline',
    sub: 'Legacy & Modern Systems',
    badge: 'HC',
    color: '#E8000F',
    detail: 'Skilled in both legacy and current-generation Honeywell Centraline systems.',
  },
  {
    name: 'Honeywell Trend',
    sub: 'IQ & 963 Supervisor',
    badge: 'HT',
    color: '#E8000F',
    detail: 'Proficient in IQ controller systems and the 963 Supervisor platform.',
  },
  {
    name: 'Tridium / Niagara',
    sub: 'Niagara Framework',
    badge: 'TR',
    color: '#0066CC',
    detail: 'Advanced capabilities in Niagara N4 and AX Framework open-platform solutions.',
  },
]

export default function BrandCapability() {
  return (
    <section id="platforms" className="section-padding bg-navy relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="orb w-[480px] h-[480px] bg-accent/[0.07] -top-24 right-0 animate-float-slow"
        style={{ filter: 'blur(90px)' }}
      />
      <div
        className="orb w-64 h-64 bg-accent/[0.05] bottom-0 left-1/4 animate-float"
        style={{ filter: 'blur(80px)' }}
      />

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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {brands.map((brand, idx) => (
            <AnimateIn key={brand.name} delay={idx * 60}>
              <div
                className="group bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6
                           hover:bg-white/[0.08] hover:border-accent/25
                           transition-all duration-250 h-full"
              >
                <div className="flex items-start gap-4">
                  {/* Brand badge */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0
                               text-xs font-bold transition-transform duration-200 group-hover:scale-105"
                    style={{
                      background: brand.color + '1a',
                      border: `1px solid ${brand.color}33`,
                    }}
                  >
                    <span style={{ color: brand.color }} className="font-display tracking-wide">
                      {brand.badge}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-0.5">
                      <div className="font-display text-white font-semibold text-sm leading-snug">
                        {brand.name}
                      </div>
                      {/* Certified checkmark */}
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/25
                                      flex items-center justify-center mt-0.5" title="Certified">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2 2 4-4" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    <div className="text-accent text-xs font-medium mb-2">{brand.sub}</div>
                    <div className="text-white/40 text-xs leading-relaxed">{brand.detail}</div>
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Vendor-neutral callout */}
        <AnimateIn>
          <div className="flex items-center gap-5 p-6 rounded-2xl bg-accent/[0.08] border border-accent/20">
            <div className="w-11 h-11 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2l2.5 5.5H18l-4.5 3.5 1.5 6L10 14 5 17l1.5-6L2 7.5h5.5L10 2z"
                  stroke="#2F80ED" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="font-display text-white font-semibold text-sm mb-1">
                Vendor-Neutral Solutions
              </div>
              <div className="text-white/50 text-xs leading-relaxed max-w-2xl">
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
