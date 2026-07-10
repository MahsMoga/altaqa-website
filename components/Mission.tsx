import Image from 'next/image'
import AnimateIn from './AnimateIn'

const commitments = [
  {
    number: '01',
    title: 'Operational Efficiency',
    desc: 'Streamlined facility management and improved day-to-day efficiency through smart automation and real-time controls.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85',
    color: '#2F80ED',
    stat: { value: '30%', label: 'Avg. Efficiency Gain' },
    large: true,
  },
  {
    number: '02',
    title: 'Sustainability Goals',
    desc: 'Environmental responsibility embedded into every solution through intelligent energy management.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=85',
    color: '#10b981',
    stat: { value: '25%', label: 'Energy Reduction' },
    large: false,
  },
  {
    number: '03',
    title: 'Innovation Commitment',
    desc: 'Continuous investment in emerging technologies to keep our clients at the forefront of smart building.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=85',
    color: '#8b5cf6',
    stat: { value: '6+', label: 'BMS Platforms' },
    large: false,
  },
  {
    number: '04',
    title: 'Long-Term Partnerships',
    desc: 'Scalable solutions built to evolve alongside our clients — not one-time deployments but lasting relationships.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=85',
    color: '#F59E0B',
    stat: { value: '90%', label: 'Client Retention' },
    large: true,
  },
]

function CommitmentCard({ item }: { item: typeof commitments[0] }) {
  return (
    <div className="group relative rounded-3xl overflow-hidden cursor-default h-72 lg:h-80
                    transition-all duration-500 hover:-translate-y-2"
         style={{ boxShadow: `0 4px 24px rgba(0,0,0,0.25)` }}
         onMouseEnter={e => {
           (e.currentTarget as HTMLDivElement).style.boxShadow = `0 24px 64px ${item.color}30, 0 4px 16px rgba(0,0,0,0.3)`
         }}
         onMouseLeave={e => {
           (e.currentTarget as HTMLDivElement).style.boxShadow = `0 4px 24px rgba(0,0,0,0.25)`
         }}
    >
      {/* Photo */}
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ filter: 'brightness(0.72) contrast(1.1) saturate(1.05)' }}
        sizes="(max-width: 1024px) 100vw, 60vw"
      />

      {/* Color grade */}
      <div className="absolute inset-0" style={{ background: `${item.color}14`, mixBlendMode: 'multiply' }} />

      {/* Dark gradient */}
      <div className="absolute inset-0"
           style={{ background: 'linear-gradient(to top, rgba(5,10,30,0.97) 0%, rgba(5,10,30,0.55) 45%, rgba(5,10,30,0.1) 80%, transparent 100%)' }} />

      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
           style={{ background: `linear-gradient(90deg, transparent 0%, ${item.color} 40%, ${item.color} 60%, transparent 100%)` }} />

      {/* Top row: number + stat */}
      <div className="absolute top-5 left-5 right-5 flex items-start justify-between z-10">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-xs"
             style={{ background: `${item.color}25`, border: `1px solid ${item.color}55`, color: item.color }}>
          {item.number}
        </div>
        <div className="text-right">
          <div className="font-display font-black text-2xl leading-none" style={{ color: item.color, textShadow: `0 0 16px ${item.color}60` }}>
            {item.stat.value}
          </div>
          <div className="text-white/45 text-[9px] uppercase tracking-wider mt-0.5">{item.stat.label}</div>
        </div>
      </div>

      {/* Bottom content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
        <div className="rounded-full mb-3 transition-all duration-500 group-hover:w-12"
             style={{ width: '20px', height: '2px', background: `linear-gradient(90deg, ${item.color}, ${item.color}60)`, boxShadow: `0 0 8px ${item.color}60` }} />

        <h3 className="font-display font-bold text-white text-lg leading-snug mb-2"
            style={{ textShadow: '0 1px 10px rgba(0,0,0,0.6)' }}>
          {item.title}
        </h3>

        <p className="text-white/65 text-xs leading-relaxed opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
          {item.desc}
        </p>
      </div>
    </div>
  )
}

export default function Mission() {
  return (
    <section className="section-padding bg-navy relative overflow-hidden">
      {/* Amber accent line */}
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" aria-hidden="true"
           style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(217,119,6,0.6) 30%, rgba(217,119,6,0.6) 70%, transparent 100%)' }} />

      {/* Background orbs */}
      <div className="orb w-[500px] h-[500px] bg-accent/[0.07] bottom-0 left-1/2 -translate-x-1/2 animate-float-slow"
           style={{ filter: 'blur(100px)' }} />
      <div className="orb w-72 h-72 bg-accent/[0.05] top-10 right-10 animate-float"
           style={{ filter: 'blur(80px)' }} />

      <div className="container-narrow relative z-10">

        {/* Header — left-aligned with image panel */}
        <AnimateIn className="flex flex-col lg:flex-row lg:items-end gap-8 mb-12">
          <div className="flex-1">
            <span className="inline-flex items-center gap-2 text-accent text-xs font-semibold tracking-widest uppercase mb-5">
              <span className="block w-5 h-0.5 bg-accent rounded-full" />
              Mission & Commitment
              <span className="block w-5 h-0.5 bg-accent rounded-full" />
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white leading-[1.1] tracking-tight mb-4">
              More Than Technical Implementation —{' '}
              <span className="text-accent">True Partnership</span>
            </h2>
            <p className="text-white/50 text-sm leading-relaxed max-w-lg">
              We build enduring partnerships that support our clients' operational success,
              sustainability objectives, and long-term growth.
            </p>
          </div>

          {/* Key promise strip */}
          <div className="flex flex-col gap-3 lg:min-w-[220px]">
            {['Brand-agnostic expertise', 'UAE-based team, 24/7', 'Measurable outcomes'].map((p) => (
              <div key={p} className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                     style={{ background: 'rgba(217,119,6,0.2)', border: '1px solid rgba(217,119,6,0.5)' }}>
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1.5 4l2 2 3-3" stroke="#D97706" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-white/60 text-xs">{p}</span>
              </div>
            ))}
          </div>
        </AnimateIn>

        {/* Bento photo grid — Z-pattern */}
        <div className="grid lg:grid-cols-12 gap-4 mb-6">
          {/* Row 1: Large left, small right */}
          <AnimateIn className="lg:col-span-7">
            <CommitmentCard item={commitments[0]} />
          </AnimateIn>
          <AnimateIn delay={80} className="lg:col-span-5">
            <CommitmentCard item={commitments[1]} />
          </AnimateIn>

          {/* Row 2: Small left, large right */}
          <AnimateIn delay={120} className="lg:col-span-5">
            <CommitmentCard item={commitments[2]} />
          </AnimateIn>
          <AnimateIn delay={160} className="lg:col-span-7">
            <CommitmentCard item={commitments[3]} />
          </AnimateIn>
        </div>

        {/* CTA bar */}
        <AnimateIn>
          <div className="relative overflow-hidden rounded-2xl"
               style={{ border: '1px solid rgba(47,128,237,0.2)' }}>
            {/* Background image */}
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=80"
                alt="Abu Dhabi skyline"
                fill
                className="object-cover"
                style={{ filter: 'brightness(0.5) saturate(1.1) contrast(1.1)' }}
              />
            </div>
            <div className="absolute inset-0"
                 style={{ background: 'linear-gradient(135deg, rgba(10,22,40,0.70) 0%, rgba(15,28,63,0.60) 100%)' }} />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(47,128,237,0.1),transparent)] pointer-events-none" />

            <div className="relative z-10 p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="flex-1">
                <h3 className="font-display text-white font-bold text-xl lg:text-2xl mb-2 leading-tight">
                  Abu Dhabi's Trusted Partner for Intelligent Buildings
                </h3>
                <p className="text-white/45 text-sm leading-relaxed max-w-xl">
                  Through continuous innovation and steadfast dedication to quality, we remain
                  the region's partner of choice for smart building solutions that deliver
                  measurable, lasting results.
                </p>
              </div>
              <a href="#contact" className="btn-primary flex-shrink-0">
                Transform Your Facility
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
