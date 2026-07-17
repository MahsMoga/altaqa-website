import Image from 'next/image'
import AnimateIn from './AnimateIn'

const projects = [
  {
    number: '01',
    name: 'Palm Jumeirah MJL RIWA',
    client: 'MERAAS',
    type: 'BMS Installation',
    sector: 'Residential',
    sectorColor: '#2F80ED',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85',
    color: '#2F80ED',
    featured: true,
  },
  {
    number: '02',
    name: 'Anantara The Palm',
    client: 'Hospitality',
    type: 'PLC-Based Hot Water Control',
    sector: 'Hospitality',
    sectorColor: '#BF5AF2',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=85',
    color: '#BF5AF2',
  },
  {
    number: '03',
    name: 'Maryah Tower',
    client: 'Abu Dhabi',
    type: 'Staircase Pressurization',
    sector: 'Commercial',
    sectorColor: '#8b5cf6',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=900&q=85',
    color: '#8b5cf6',
  },
  {
    number: '04',
    name: 'Ashkal Industries',
    client: 'Industrial',
    type: 'BMS & Energy Monitoring',
    sector: 'Industrial',
    sectorColor: '#f97316',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=85',
    color: '#f97316',
  },
  {
    number: '05',
    name: 'Meleha Dairy Farm',
    client: 'Al Ain',
    type: 'Vehicle & Animal Sanitization',
    sector: 'Industrial',
    sectorColor: '#10b981',
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=900&q=85',
    color: '#10b981',
  },
  {
    number: '06',
    name: 'Madheef Border Post',
    client: 'Government',
    type: 'BMS Installation Work',
    sector: 'Government',
    sectorColor: '#F59E0B',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=85',
    color: '#F59E0B',
  },
  {
    number: '07',
    name: 'Al Quoz Warehouse',
    client: 'Industrial',
    type: 'VAAYU Hybrid HVAC Spot Cooling',
    sector: 'Industrial',
    sectorColor: '#06b6d4',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=85',
    color: '#06b6d4',
  },
  {
    number: '08',
    name: 'Abu Dhabi Villa',
    client: 'Residential',
    type: 'BMS Installation Work',
    sector: 'Residential',
    sectorColor: '#2F80ED',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=85',
    color: '#2F80ED',
  },
  {
    number: '09',
    name: 'Zakat Fund',
    client: 'Abu Dhabi',
    type: 'Staircase Pressurization',
    sector: 'Government',
    sectorColor: '#F59E0B',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=85',
    color: '#F59E0B',
  },
]

function FeaturedCard({ p }: { p: typeof projects[0] }) {
  return (
    <div
      className="group relative rounded-3xl overflow-hidden cursor-default
                 transition-all duration-500 hover:scale-[1.01]"
      style={{
        minHeight: '500px',
        boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 32px 80px rgba(0,0,0,0.7)`,
      }}
    >
      <Image src={p.image} alt={p.name} fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ filter: 'brightness(0.55) contrast(1.15) saturate(1.1)' }}
        sizes="(max-width: 1024px) 100vw, 40vw"
      />

      {/* Color tone */}
      <div className="absolute inset-0" style={{ background: `${p.color}1a`, mixBlendMode: 'screen' }} />

      {/* Gradients */}
      <div className="absolute inset-0"
           style={{ background: 'linear-gradient(to top, rgba(3,5,12,0.99) 0%, rgba(3,5,12,0.55) 45%, rgba(3,5,12,0.15) 80%, transparent 100%)' }} />
      <div className="absolute inset-0"
           style={{ background: `linear-gradient(135deg, ${p.color}30 0%, transparent 55%)` }} />

      {/* Top glowing bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px]"
           style={{ background: `linear-gradient(90deg, ${p.color}, ${p.color}60, transparent)`,
                    boxShadow: `0 0 20px ${p.color}80` }} />

      {/* "FEATURED" ribbon */}
      <div className="absolute top-5 left-5 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: p.color }} />
        <span className="text-[9px] font-black uppercase tracking-[0.2em]"
              style={{ color: p.color }}>
          Featured Project
        </span>
      </div>

      {/* Sector badge top right */}
      <div className="absolute top-4 right-4">
        <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(0,0,0,0.5)', color: p.sectorColor,
                       border: `1px solid ${p.sectorColor}50`, backdropFilter: 'blur(8px)' }}>
          {p.sector}
        </span>
      </div>

      {/* Watermark */}
      <div className="absolute bottom-0 right-4 font-display font-black text-[130px] leading-none
                      select-none pointer-events-none"
           style={{ color: 'rgba(255,255,255,0.04)' }}>
        {p.number}
      </div>

      {/* Bottom content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <div className="text-[11px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: p.color }}>
          {p.type}
        </div>
        <h3 className="font-display font-black text-white text-2xl lg:text-3xl leading-tight mb-1">
          {p.name}
        </h3>
        <div className="text-white/35 text-xs mb-5">{p.client}</div>
        <div className="w-10 h-[2px] rounded-full" style={{ background: p.color, boxShadow: `0 0 12px ${p.color}` }} />
      </div>
    </div>
  )
}

function ProjectCard({ p }: { p: typeof projects[0] }) {
  return (
    <div
      className="group relative rounded-2xl overflow-hidden cursor-default
                 transition-all duration-400 hover:-translate-y-1.5"
      style={{
        height: '230px',
        boxShadow: '0 0 0 1px rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.5)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          `0 0 0 1px ${p.color}40, 0 24px 64px ${p.color}30, 0 8px 24px rgba(0,0,0,0.6)`
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          '0 0 0 1px rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.5)'
      }}
    >
      <Image src={p.image} alt={p.name} fill
        className="object-cover transition-transform duration-600 group-hover:scale-105"
        style={{ filter: 'brightness(0.5) contrast(1.1) saturate(0.9)' }}
        sizes="(max-width: 1024px) 100vw, 30vw"
      />

      <div className="absolute inset-0" style={{ background: `${p.color}12`, mixBlendMode: 'screen' }} />
      <div className="absolute inset-0"
           style={{ background: 'linear-gradient(to top, rgba(3,5,12,0.98) 0%, rgba(3,5,12,0.35) 55%, transparent 100%)' }} />

      {/* Top color bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px]"
           style={{ background: `linear-gradient(90deg, ${p.color}, ${p.color}40, transparent)` }} />

      {/* Sector */}
      <div className="absolute top-3 right-3">
        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
              style={{ background: 'rgba(0,0,0,0.55)', color: p.sectorColor,
                       border: `1px solid ${p.sectorColor}40`, backdropFilter: 'blur(6px)' }}>
          {p.sector}
        </span>
      </div>

      {/* Number */}
      <div className="absolute top-3 left-4 font-display font-black text-xs"
           style={{ color: p.color, opacity: 0.7 }}>{p.number}</div>

      {/* Content */}
      <div className="absolute inset-0 p-5 flex flex-col justify-end">
        <div className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: p.color }}>
          {p.type}
        </div>
        <div className="font-display font-bold text-white text-[15px] leading-snug">
          {p.name}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [featured, ...rest] = projects

  return (
    <section id="projects" className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #f0f4ff 0%, #eef1f8 50%, #f2f0fb 100%)',
        paddingTop: 'calc(var(--section-padding, 5rem) + 48px)',
        paddingBottom: 'var(--section-padding, 5rem)',
        clipPath: 'polygon(0 48px, 100% 0, 100% 100%, 0 100%)',
        marginTop: '-48px',
      }}
    >
      {/* Dot pattern */}
      <div className="absolute inset-0 pointer-events-none"
           suppressHydrationWarning
           style={{
             backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.055) 1px, transparent 1px)',
             backgroundSize: '22px 22px',
           }} />

      {/* Soft ambient colour blobs */}
      <div className="absolute top-0 left-0 w-[600px] h-[400px] pointer-events-none rounded-full"
           style={{ background: 'radial-gradient(ellipse, rgba(47,128,237,0.07) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[350px] pointer-events-none rounded-full"
           style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 70%)' }} />

      {/* Accent line at diagonal edge */}
      <div className="absolute top-[48px] left-0 right-0 h-px pointer-events-none"
           style={{ background: 'linear-gradient(90deg, transparent, rgba(217,119,6,0.45) 30%, rgba(217,119,6,0.45) 70%, transparent)' }} />

      <div className="container-narrow relative z-10">

        {/* Header */}
        <AnimateIn className="flex flex-col lg:flex-row lg:items-end gap-8 mb-12">
          <div className="flex-1">
            <span className="label-tag">Project References</span>
            {/* Massive display headline */}
            <h2 className="font-display font-black text-navy leading-[1.0] tracking-tight"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
              Real Work.{' '}
              <br className="hidden lg:block" />
              <span className="text-accent">Real Results.</span>
            </h2>
          </div>

          {/* Right: stats 2×2 */}
          <div className="grid grid-cols-2 gap-3 lg:min-w-[280px]">
            {[
              { value: '500+', label: 'Projects', color: '#F59E0B' },
              { value: '20+',  label: 'Years',    color: '#2F80ED' },
              { value: '4',    label: 'Sectors',  color: '#10b981' },
              { value: 'UAE',  label: 'Wide',     color: '#8b5cf6' },
            ].map(s => (
              <div key={s.label}
                   className="rounded-2xl px-4 py-3 text-center"
                   style={{
                     background: `linear-gradient(135deg, #0a1628 0%, #0f1c3f 100%)`,
                     border: `1px solid ${s.color}40`,
                   }}>
                <div className="font-display font-black text-xl leading-none mb-0.5"
                     style={{ color: s.color }}>
                  {s.value}
                </div>
                <div className="text-[10px] uppercase tracking-widest font-semibold text-white/50">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </AnimateIn>

        {/* ── Project bento grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Featured — spans 2 rows */}
          <AnimateIn className="lg:row-span-2">
            <div className="h-full" style={{ minHeight: '480px' }}>
              <FeaturedCard p={featured} />
            </div>
          </AnimateIn>

          {/* 8 smaller cards */}
          {rest.map((p, idx) => (
            <AnimateIn key={p.number} delay={idx * 45}>
              <ProjectCard p={p} />
            </AnimateIn>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <AnimateIn>
          <div className="relative rounded-2xl overflow-hidden"
               style={{ border: '1px solid rgba(217,119,6,0.3)', background: 'linear-gradient(135deg, #0a1628 0%, #0f1c3f 100%)' }}>
            <div className="absolute inset-0"
                 style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(47,128,237,0.05) 100%)' }} />
            <div className="absolute top-0 left-0 right-0 h-px"
                 style={{ background: 'linear-gradient(90deg, transparent, rgba(217,119,6,0.6), transparent)' }} />

            <div className="relative z-10 px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-5">
              <div>
                <div className="font-display font-black text-white text-xl mb-1">
                  Your facility could be next
                </div>
                <div className="text-white/60 text-sm">
                  500+ projects delivered. 20+ years of trusted engineering across the UAE.
                </div>
              </div>
              <a href="#contact" className="btn-primary flex-shrink-0">
                Discuss Your Project
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </AnimateIn>

      </div>
    </section>
  )
}
