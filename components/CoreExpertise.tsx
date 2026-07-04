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
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
    color: '#2F80ED',
    large: true,
  },
  {
    number: '02',
    title: 'Guest Room Management',
    short: 'Hospitality Automation',
    desc: 'Intelligent room controls and occupancy-based automation delivering comfort and energy savings for hotels and serviced apartments.',
    tags: ['GRMS', 'Energy Saving', 'Comfort'],
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=80',
    color: '#10b981',
    large: false,
  },
  {
    number: '03',
    title: 'Automatic Control Systems',
    short: 'Precision Control',
    desc: 'Responsive, reliable control solutions that adapt to changing operational conditions in real-time across diverse applications.',
    tags: ['PLC', 'Controllers', 'Sensors'],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80',
    color: '#f59e0b',
    large: false,
  },
  {
    number: '04',
    title: 'Energy Management Solutions',
    short: 'Reduce, Monitor, Optimise',
    desc: 'Real-time monitoring and control systems that help organizations reduce consumption, lower operating costs, and meet sustainability targets.',
    tags: ['Energy Audits', 'Analytics', 'Reporting'],
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=80',
    color: '#8b5cf6',
    large: false,
  },
  {
    number: '05',
    title: 'Smart Metering Solutions',
    short: 'Real-Time Utility Visibility',
    desc: 'Comprehensive BTU, water, and utility monitoring platforms enabling data-driven decisions for facility managers and building owners.',
    tags: ['BTU Meters', 'Water Meters', 'Tenant Billing'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    color: '#ef4444',
    large: false,
  },
]

export default function CoreExpertise() {
  return (
    <section id="expertise" className="section-padding bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_70%_50%,rgba(47,128,237,0.05),transparent)]" />

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

          {/* Large card — Building Automation */}
          <AnimateIn className="lg:col-span-5 lg:row-span-2">
            <ExpertiseCard item={expertise[0]} tall />
          </AnimateIn>

          {/* Top-right two */}
          <AnimateIn delay={80} className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              <ExpertiseCard item={expertise[1]} />
              <ExpertiseCard item={expertise[2]} />
            </div>
          </AnimateIn>

          {/* Bottom-right two */}
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
      className={`group relative rounded-2xl overflow-hidden cursor-default
                  ${tall ? 'h-[420px] lg:h-full min-h-[420px]' : 'h-48'}`}
    >
      {/* Background image */}
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />

      {/* Base dark overlay */}
      <div className="absolute inset-0 bg-navy/30 transition-opacity duration-300 group-hover:bg-navy/15" />

      {/* Bottom gradient for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/30 to-transparent" />

      {/* Top-left number badge */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold"
          style={{ background: item.color + '30', color: item.color, border: `1px solid ${item.color}50` }}
        >
          {item.number}
        </div>
        <span className="text-white/50 text-[10px] font-semibold uppercase tracking-widest">
          {item.short}
        </span>
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-5 flex flex-col justify-end">
        {/* Accent line */}
        <div
          className="w-6 h-0.5 rounded-full mb-3 transition-all duration-300 group-hover:w-12"
          style={{ background: item.color }}
        />

        <h3 className={`font-display font-bold text-white leading-snug mb-2
                        ${tall ? 'text-xl lg:text-2xl' : 'text-base'}`}>
          {item.title}
        </h3>

        {/* Description — slides up on hover */}
        <p className={`text-white/65 leading-relaxed mb-3 transition-all duration-300
                       opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
                       ${tall ? 'text-sm max-w-xs' : 'text-xs'}`}>
          {item.desc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 transition-all duration-300
                        opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
             style={{ transitionDelay: '40ms' }}>
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: item.color + '25', color: item.color, border: `1px solid ${item.color}40` }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
