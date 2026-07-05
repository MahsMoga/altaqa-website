import Image from 'next/image'
import AnimateIn from './AnimateIn'

// TODO: Replace image URLs with real project photos
const expertise = [
  {
    number: '01',
    title: 'Building & Industrial Automation',
    short: 'BMS Design & Integration',
    desc: 'Seamless integration of mechanical, electrical, and digital systems to optimize operational efficiency and reduce maintenance costs across commercial and industrial facilities.',
    tags: ['HVAC Control', 'BMS Integration', 'SCADA'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85',
    color: '#2F80ED',
    glow: 'rgba(47,128,237,0.45)',
    grade: 'rgba(10,30,80,0.55)',
    large: true,
  },
  {
    number: '02',
    title: 'Guest Room Management',
    short: 'Hospitality Automation',
    desc: 'Intelligent room controls and occupancy-based automation delivering comfort and energy savings for hotels and serviced apartments.',
    tags: ['GRMS', 'Energy Saving', 'Comfort'],
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=85',
    color: '#14b8a6',
    glow: 'rgba(20,184,166,0.45)',
    grade: 'rgba(0,50,45,0.55)',
    large: false,
  },
  {
    number: '03',
    title: 'Automatic Control Systems',
    short: 'Precision Control',
    desc: 'Responsive, reliable control solutions that adapt to changing operational conditions in real-time across diverse applications.',
    tags: ['PLC', 'Controllers', 'Sensors'],
    image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=900&q=85',
    color: '#f97316',
    glow: 'rgba(249,115,22,0.45)',
    grade: 'rgba(80,25,0,0.55)',
    large: false,
  },
  {
    number: '04',
    title: 'Energy Management Solutions',
    short: 'Reduce, Monitor, Optimise',
    desc: 'Real-time monitoring and control systems that help organizations reduce consumption, lower operating costs, and meet sustainability targets.',
    tags: ['Energy Audits', 'Analytics', 'Reporting'],
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=85',
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.45)',
    grade: 'rgba(40,10,80,0.55)',
    large: false,
  },
  {
    number: '05',
    title: 'Smart Metering Solutions',
    short: 'Real-Time Utility Visibility',
    desc: 'Comprehensive BTU, water, and utility monitoring platforms enabling data-driven decisions for facility managers and building owners.',
    tags: ['BTU Meters', 'Water Meters', 'Tenant Billing'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85',
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.45)',
    grade: 'rgba(0,40,60,0.55)',
    large: false,
  },
]

export default function CoreExpertise() {
  return (
    <section id="expertise" className="section-padding section-light relative overflow-hidden">

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
           style={{
             backgroundImage: `linear-gradient(#1e3a8a 1px, transparent 1px),
                               linear-gradient(90deg, #1e3a8a 1px, transparent 1px)`,
             backgroundSize: '48px 48px',
           }} />

      {/* Ambient glows */}
      <div className="absolute -top-32 left-1/4 w-[600px] h-[400px] rounded-full opacity-30"
           style={{ background: 'radial-gradient(ellipse, rgba(47,128,237,0.12), transparent 70%)' }} />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full opacity-20"
           style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.15), transparent 70%)' }} />

      <div className="container-narrow relative z-10">

        {/* Header */}
        <AnimateIn className="flex flex-col lg:flex-row lg:items-end gap-6 mb-14">
          <div className="flex-1">
            <span className="label-tag">Core Expertise</span>
            <h2 className="heading-section">
              End-to-End Building{' '}
              <span className="text-accent">Intelligence</span>
            </h2>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xs lg:mb-1">
            Five integrated disciplines covering the full spectrum of building
            automation, controls, and energy efficiency.
          </p>
        </AnimateIn>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          <AnimateIn className="lg:col-span-5 lg:row-span-2">
            <ExpertiseCard item={expertise[0]} tall />
          </AnimateIn>

          <AnimateIn delay={80} className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              <ExpertiseCard item={expertise[1]} />
              <ExpertiseCard item={expertise[2]} />
            </div>
          </AnimateIn>

          <AnimateIn delay={160} className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              <ExpertiseCard item={expertise[3]} />
              <ExpertiseCard item={expertise[4]} />
            </div>
          </AnimateIn>

        </div>
      </div>
    </section>
  )
}

function ExpertiseCard({ item, tall = false }: { item: typeof expertise[0]; tall?: boolean }) {
  return (
    <div
      className={`group relative rounded-3xl overflow-hidden cursor-default
                  transition-all duration-500 ease-out
                  hover:-translate-y-2
                  ${tall ? 'h-[560px] lg:h-full min-h-[560px]' : 'h-64'}`}
      style={{
        boxShadow: `0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)`,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          `0 24px 64px ${item.glow}, 0 4px 16px rgba(0,0,0,0.12)`
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          `0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)`
      }}
    >
      {/* Background image with cinematic filter */}
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          style={{ filter: 'brightness(0.9) contrast(1.1) saturate(1.15)' }}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Cinematic color grade overlay */}
      <div className="absolute inset-0 mix-blend-multiply transition-opacity duration-400"
           style={{ background: item.grade, opacity: 0.7 }} />

      {/* Dark vignette base */}
      <div className="absolute inset-0 bg-navy/25 transition-opacity duration-400 group-hover:bg-navy/10" />

      {/* Strong bottom gradient for text */}
      <div className="absolute inset-0"
           style={{
             background: `linear-gradient(to top, rgba(5,10,30,0.97) 0%, rgba(5,10,30,0.6) 35%, rgba(5,10,30,0.1) 65%, transparent 100%)`,
           }} />

      {/* Coloured top-edge glow line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
           style={{ background: `linear-gradient(90deg, transparent 0%, ${item.color} 40%, ${item.color} 60%, transparent 100%)` }} />

      {/* Number badge + label */}
      <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold backdrop-blur-sm"
          style={{
            background: item.color + '28',
            color: item.color,
            border: `1px solid ${item.color}55`,
            boxShadow: `0 0 10px ${item.color}30`,
          }}
        >
          {item.number}
        </div>
        <span className="text-white/60 text-[10px] font-semibold uppercase tracking-widest
                         backdrop-blur-sm bg-black/10 px-2 py-0.5 rounded-full">
          {item.short}
        </span>
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-5 flex flex-col justify-end z-10">
        {/* Accent line */}
        <div
          className="rounded-full mb-3 transition-all duration-500 group-hover:w-14"
          style={{ width: '24px', height: '2px', background: item.color, boxShadow: `0 0 8px ${item.color}` }}
        />

        <h3 className={`font-display font-bold text-white leading-snug mb-2 drop-shadow-sm
                        ${tall ? 'text-xl lg:text-2xl' : 'text-base'}`}
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}>
          {item.title}
        </h3>

        {/* Description — slides up on hover */}
        <p className={`text-white/75 leading-relaxed mb-3 transition-all duration-400
                       opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0
                       ${tall ? 'text-sm max-w-xs' : 'text-xs'}`}>
          {item.desc}
        </p>

        {/* Tags — glass pills */}
        <div className="flex flex-wrap gap-1.5 transition-all duration-400
                        opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0"
             style={{ transitionDelay: '60ms' }}>
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md"
              style={{
                background: item.color + '22',
                color: '#fff',
                border: `1px solid ${item.color}55`,
                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.1)`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
