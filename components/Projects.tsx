import AnimateIn from './AnimateIn'

const projects = [
  {
    number: '01',
    name: 'Meleha Dairy Farm',
    type: 'Vehicle & Animal Sanitization System',
    sector: 'Industrial',
    color: '#10b981',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    number: '02',
    name: 'Palm Jumeirah MJL RIWA',
    type: 'BMS Installation',
    sector: 'Residential · MERAAS',
    color: '#2F80ED',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
  },
  {
    number: '03',
    name: 'Madheef Border Post',
    type: 'BMS Installation Work',
    sector: 'Government',
    color: '#F59E0B',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21V10l9-7 9 7v11"/><rect x="8" y="14" width="3" height="7"/><rect x="13" y="14" width="3" height="7"/>
      </svg>
    ),
  },
  {
    number: '04',
    name: 'Maryah Tower',
    type: 'Staircase Pressurization System',
    sector: 'Commercial',
    color: '#8b5cf6',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/>
        <line x1="8" y1="14" x2="12" y2="14"/>
      </svg>
    ),
  },
  {
    number: '05',
    name: 'Abu Dhabi Villa',
    type: 'BMS Installation Work',
    sector: 'Residential',
    color: '#06b6d4',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    number: '06',
    name: 'Ashkal Industries',
    type: 'BMS & Energy Monitoring System',
    sector: 'Industrial',
    color: '#f97316',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 16l5-8 4 4 5-10 6 14"/><path d="M2 20h20"/>
      </svg>
    ),
  },
  {
    number: '07',
    name: 'Al Quoz Warehouse',
    type: 'VAAYU Hybrid HVAC Spot Cooling',
    sector: 'Industrial',
    color: '#10b981',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 10 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
      </svg>
    ),
  },
  {
    number: '08',
    name: 'Anantara The Palm',
    type: 'PLC-Based Hot Water Control',
    sector: 'Hospitality',
    color: '#BF5AF2',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 0 1 0 20"/><path d="M12 2a10 10 0 0 0 0 20"/><line x1="12" y1="2" x2="12" y2="22"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
      </svg>
    ),
  },
  {
    number: '09',
    name: 'Zakat Fund',
    type: 'Staircase Pressurization System',
    sector: 'Government',
    color: '#2F80ED',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/>
        <line x1="8" y1="14" x2="12" y2="14"/>
      </svg>
    ),
  },
]

const sectorColors: Record<string, string> = {
  Industrial:  '#f97316',
  Residential: '#2F80ED',
  Commercial:  '#8b5cf6',
  Government:  '#F59E0B',
  Hospitality: '#BF5AF2',
}

function getSector(sector: string) {
  const base = sector.split('·')[0].trim()
  return { label: sector, color: sectorColors[base] ?? '#64748b' }
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="section-padding relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #f8f7f5 0%, #f3f2ef 100%)',
        clipPath: 'polygon(0 48px, 100% 0, 100% 100%, 0 100%)',
        marginTop: '-48px',
        paddingTop: 'calc(var(--section-padding, 5rem) + 48px)',
      }}
    >
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }} />

      <div className="container-narrow relative z-10">

        {/* Header */}
        <AnimateIn className="flex flex-col lg:flex-row lg:items-end gap-6 mb-14">
          <div className="flex-1">
            <span className="label-tag">Project References</span>
            <h2 className="heading-section">
              Delivered Across{' '}
              <span className="text-accent">Diverse Sectors</span>
            </h2>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xs lg:mb-1">
            A selection of projects spanning residential, commercial, hospitality,
            industrial, and government facilities across the UAE.
          </p>
        </AnimateIn>

        {/* Project grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p, idx) => {
            const { label, color: sColor } = getSector(p.sector)
            return (
              <AnimateIn key={p.number} delay={idx * 40}>
                <div
                  className="group relative rounded-2xl bg-white overflow-hidden
                              transition-all duration-400 hover:-translate-y-1.5 cursor-default"
                  style={{
                    border: `1px solid rgba(0,0,0,0.07)`,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.boxShadow = `0 16px 48px ${p.color}22, 0 2px 8px rgba(0,0,0,0.08)`
                    el.style.borderColor = `${p.color}30`
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'
                    el.style.borderColor = 'rgba(0,0,0,0.07)'
                  }}
                >
                  {/* Colored top accent */}
                  <div className="h-[3px] w-full"
                       style={{ background: `linear-gradient(90deg, ${p.color}90, ${p.color}, ${p.color}90)` }} />

                  <div className="p-5">
                    {/* Row: number badge + sector tag */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-[11px]"
                        style={{
                          background: `${p.color}15`,
                          color: p.color,
                          border: `1px solid ${p.color}30`,
                        }}
                      >
                        {p.number}
                      </div>
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                        style={{ background: `${sColor}12`, color: sColor, border: `1px solid ${sColor}25` }}
                      >
                        {label}
                      </span>
                    </div>

                    {/* Icon + project type */}
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center mt-0.5"
                        style={{
                          background: `${p.color}12`,
                          color: p.color,
                          border: `1px solid ${p.color}25`,
                        }}
                      >
                        {p.icon}
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: p.color }}>
                          {p.type}
                        </div>
                        <div className="font-display font-bold text-navy text-[15px] leading-snug">
                          {p.name}
                        </div>
                      </div>
                    </div>

                    {/* Bottom separator line */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
                      <span className="text-slate-400 text-[11px]">Completed · UAE</span>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <AnimateIn className="mt-12 text-center">
          <p className="text-slate-500 text-sm mb-5">
            Interested in seeing how we can deliver for your facility?
          </p>
          <a href="#contact" className="btn-primary inline-flex">
            Discuss Your Project
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </AnimateIn>

      </div>
    </section>
  )
}
