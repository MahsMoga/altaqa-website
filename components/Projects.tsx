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
    featured: false,
  },
  {
    number: '03',
    name: 'Maryah Tower',
    client: 'Abu Dhabi',
    type: 'Staircase Pressurization System',
    sector: 'Commercial',
    sectorColor: '#8b5cf6',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=900&q=85',
    color: '#8b5cf6',
    featured: false,
  },
  {
    number: '04',
    name: 'Ashkal Industries',
    client: 'Industrial',
    type: 'BMS & Energy Monitoring System',
    sector: 'Industrial',
    sectorColor: '#f97316',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=85',
    color: '#f97316',
    featured: false,
  },
  {
    number: '05',
    name: 'Meleha Dairy Farm',
    client: 'Industrial · Al Ain',
    type: 'Vehicle & Animal Sanitization System',
    sector: 'Industrial',
    sectorColor: '#10b981',
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=900&q=85',
    color: '#10b981',
    featured: false,
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
    featured: false,
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
    featured: false,
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
    featured: false,
  },
  {
    number: '09',
    name: 'Zakat Fund',
    client: 'Government · Abu Dhabi',
    type: 'Staircase Pressurization System',
    sector: 'Government',
    sectorColor: '#F59E0B',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=85',
    color: '#F59E0B',
    featured: false,
  },
]

const stats = [
  { value: '500+', label: 'Projects Delivered' },
  { value: '4',    label: 'Sectors Served' },
  { value: '20+',  label: 'Years Experience' },
  { value: 'UAE',  label: 'Wide Presence' },
]

function FeaturedCard({ p }: { p: typeof projects[0] }) {
  return (
    <div
      className="group relative rounded-3xl overflow-hidden cursor-default
                 transition-all duration-500 hover:-translate-y-2 lg:row-span-2"
      style={{ minHeight: '480px', boxShadow: `0 8px 40px rgba(0,0,0,0.5)` }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 32px 80px ${p.color}40, 0 8px 32px rgba(0,0,0,0.6)`
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 40px rgba(0,0,0,0.5)`
      }}
    >
      <Image src={p.image} alt={p.name} fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ filter: 'brightness(0.6) contrast(1.1) saturate(1.1)' }}
        sizes="(max-width: 1024px) 100vw, 40vw"
      />

      {/* Color grade */}
      <div className="absolute inset-0" style={{ background: `${p.color}18`, mixBlendMode: 'multiply' }} />

      {/* Gradients */}
      <div className="absolute inset-0"
           style={{ background: 'linear-gradient(to top, rgba(5,10,30,0.98) 0%, rgba(5,10,30,0.5) 45%, rgba(5,10,30,0.1) 80%, transparent 100%)' }} />
      <div className="absolute inset-0"
           style={{ background: `linear-gradient(135deg, ${p.color}25 0%, transparent 60%)` }} />

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px]"
           style={{ background: `linear-gradient(90deg, ${p.color}, ${p.color}60, transparent)` }} />

      {/* Number watermark */}
      <div className="absolute top-4 right-6 font-display font-black text-[120px] leading-none
                      select-none pointer-events-none"
           style={{ color: p.color, opacity: 0.08 }}>
        {p.number}
      </div>

      {/* Sector badge top-left */}
      <div className="absolute top-5 left-5">
        <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
              style={{ background: `${p.color}30`, color: p.color, border: `1px solid ${p.color}60`,
                       backdropFilter: 'blur(8px)' }}>
          {p.sector}
        </span>
      </div>

      {/* Content bottom */}
      <div className="absolute inset-0 p-7 flex flex-col justify-end">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${p.color}80, transparent)` }} />
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: p.color }}>
            Featured Project
          </span>
        </div>

        <div className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-1">
          {p.type}
        </div>
        <h3 className="font-display font-black text-white text-2xl lg:text-3xl leading-tight mb-1"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>
          {p.name}
        </h3>
        <div className="text-white/40 text-xs mb-4">{p.client}</div>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: p.color }} />
          <span className="text-white/40 text-xs">Completed · UAE</span>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ p }: { p: typeof projects[0] }) {
  return (
    <div
      className="group relative rounded-2xl overflow-hidden cursor-default
                 transition-all duration-400 hover:-translate-y-1.5"
      style={{ height: '220px', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 56px ${p.color}35, 0 4px 16px rgba(0,0,0,0.5)`
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)'
      }}
    >
      <Image src={p.image} alt={p.name} fill
        className="object-cover transition-transform duration-600 group-hover:scale-106"
        style={{ filter: 'brightness(0.55) contrast(1.1) saturate(1.0)' }}
        sizes="(max-width: 1024px) 100vw, 30vw"
      />

      <div className="absolute inset-0" style={{ background: `${p.color}14`, mixBlendMode: 'multiply' }} />
      <div className="absolute inset-0"
           style={{ background: 'linear-gradient(to top, rgba(5,10,30,0.97) 0%, rgba(5,10,30,0.4) 55%, transparent 100%)' }} />

      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px]"
           style={{ background: `linear-gradient(90deg, ${p.color}, ${p.color}50, transparent)` }} />

      {/* Number watermark */}
      <div className="absolute -bottom-2 right-3 font-display font-black text-[80px] leading-none
                      select-none pointer-events-none"
           style={{ color: p.color, opacity: 0.07 }}>
        {p.number}
      </div>

      {/* Sector badge */}
      <div className="absolute top-3.5 left-3.5">
        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
              style={{ background: `${p.color}28`, color: p.color, border: `1px solid ${p.color}50`,
                       backdropFilter: 'blur(6px)' }}>
          {p.sector}
        </span>
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-4 flex flex-col justify-end">
        <div className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: p.color }}>
          {p.type}
        </div>
        <div className="font-display font-bold text-white text-base leading-snug mb-2"
             style={{ textShadow: '0 1px 12px rgba(0,0,0,0.8)' }}>
          {p.name}
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
          <span className="text-white/35 text-[10px]">Completed · UAE</span>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [featured, ...rest] = projects

  return (
    <section
      id="projects"
      className="section-padding relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #060e1d 0%, #0a1628 50%, #0d1f3c 100%)',
        clipPath: 'polygon(0 48px, 100% 0, 100% 100%, 0 100%)',
        marginTop: '-48px',
        paddingTop: 'calc(var(--section-padding, 5rem) + 48px)',
      }}
    >
      {/* Circuit grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(47,128,237,0.035) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(47,128,237,0.035) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] pointer-events-none"
           style={{ background: 'radial-gradient(ellipse, rgba(47,128,237,0.1) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] pointer-events-none"
           style={{ background: 'radial-gradient(ellipse, rgba(191,90,242,0.08) 0%, transparent 70%)' }} />

      {/* Amber accent line at diagonal edge */}
      <div className="absolute top-[48px] left-0 right-0 h-px pointer-events-none"
           style={{ background: 'linear-gradient(90deg, transparent, rgba(217,119,6,0.5) 30%, rgba(217,119,6,0.5) 70%, transparent)' }} />

      <div className="container-narrow relative z-10">

        {/* Header */}
        <AnimateIn className="flex flex-col lg:flex-row lg:items-end gap-6 mb-10">
          <div className="flex-1">
            <span className="inline-flex items-center gap-2 text-accent text-xs font-bold tracking-widest uppercase mb-5">
              <span className="w-4 h-px bg-accent/50" />
              Project References
              <span className="w-4 h-px bg-accent/50" />
            </span>
            <h2 className="font-display text-3xl lg:text-5xl font-black text-white leading-[1.05] tracking-tight">
              Real Work.{' '}
              <span className="text-accent">Real Results.</span>
            </h2>
          </div>
          <p className="text-white/40 text-sm leading-relaxed max-w-xs lg:mb-2">
            Delivered across the UAE — from luxury hotels and government facilities
            to industrial plants and iconic residential towers.
          </p>
        </AnimateIn>

        {/* Stats strip */}
        <AnimateIn className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
          {stats.map((s) => (
            <div key={s.label}
                 className="rounded-2xl px-5 py-4 text-center"
                 style={{
                   background: 'rgba(255,255,255,0.04)',
                   border: '1px solid rgba(255,255,255,0.08)',
                   backdropFilter: 'blur(8px)',
                 }}>
              <div className="font-display font-black text-2xl lg:text-3xl text-accent leading-none mb-1">
                {s.value}
              </div>
              <div className="text-white/40 text-[10px] uppercase tracking-widest font-semibold">
                {s.label}
              </div>
            </div>
          ))}
        </AnimateIn>

        {/* ── Bento project grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Featured — spans 2 rows on left */}
          <AnimateIn className="lg:row-span-2">
            <FeaturedCard p={featured} />
          </AnimateIn>

          {/* 8 smaller cards in 2-col right area */}
          {rest.map((p, idx) => (
            <AnimateIn key={p.number} delay={idx * 50}>
              <ProjectCard p={p} />
            </AnimateIn>
          ))}
        </div>

        {/* Bottom CTA */}
        <AnimateIn className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6
                              rounded-2xl px-8 py-6"
                   style={{
                     background: 'rgba(255,255,255,0.04)',
                     border: '1px solid rgba(255,255,255,0.08)',
                   }}>
          <div>
            <div className="font-display font-bold text-white text-lg mb-1">
              Your project could be next
            </div>
            <div className="text-white/40 text-sm">
              Join 500+ clients who trust Al Taqa Technical across the UAE
            </div>
          </div>
          <a href="#contact" className="btn-primary flex-shrink-0">
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
