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
    <section className="section-padding bg-navy relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="orb w-96 h-96 bg-accent/10 -top-24 right-0"
        style={{ filter: 'blur(90px)' }}
      />

      <div className="container-narrow relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-8 mb-14">
          <div className="flex-1">
            <span className="inline-flex items-center gap-2 text-accent text-xs font-semibold tracking-widest uppercase mb-4">
              <span className="block w-6 h-0.5 bg-accent" />
              Multi-Brand Capability
            </span>
            <h2
              className="text-3xl lg:text-4xl font-bold text-white leading-tight"
              style={{ fontFamily: 'var(--font-sora)' }}
            >
              Certified Across Every{' '}
              <span className="text-accent">Major Platform</span>
            </h2>
          </div>
          <p className="text-white/55 text-sm leading-relaxed max-w-sm">
            Our vendor-neutral expertise means we work with your existing
            infrastructure — not around it. No lock-in, no forced migrations.
          </p>
        </div>

        {/* Brand grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="group bg-white/5 border border-white/10 rounded-xl p-6
                         hover:bg-white/10 hover:border-accent/30 transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                {/* Badge */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
                  style={{ background: brand.color + '22', border: `1px solid ${brand.color}44` }}
                >
                  <span style={{ color: brand.color }}>{brand.badge}</span>
                </div>
                <div>
                  <div
                    className="text-white font-semibold text-sm mb-0.5"
                    style={{ fontFamily: 'var(--font-sora)' }}
                  >
                    {brand.name}
                  </div>
                  <div className="text-accent text-xs font-medium mb-2">{brand.sub}</div>
                  <div className="text-white/45 text-xs leading-relaxed">{brand.detail}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Vendor-neutral callout */}
        <div className="flex items-center gap-4 p-5 rounded-xl bg-accent/10 border border-accent/20">
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2l2.5 5.5H18l-4.5 3.5 1.5 6L10 14 5 17l1.5-6L2 7.5h5.5L10 2z"
                stroke="#2F80ED" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div className="text-white font-semibold text-sm mb-0.5" style={{ fontFamily: 'var(--font-sora)' }}>
              Vendor-Neutral Solutions
            </div>
            <div className="text-white/55 text-xs">
              We tailor every solution to your specific requirements — not to a single manufacturer's ecosystem.
              Your system, your terms.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
