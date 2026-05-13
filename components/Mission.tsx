import AnimateIn from './AnimateIn'

const commitments = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 16l4-4 4 4 4-8 4 8" stroke="#2F80ED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Operational Efficiency',
    desc: 'Streamlined facility management and improved day-to-day efficiency through smart automation.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="4" stroke="#2F80ED" strokeWidth="1.5"/>
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="#2F80ED" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M5.64 5.64l2.12 2.12M16.24 16.24l2.12 2.12M5.64 18.36l2.12-2.12M16.24 7.76l2.12-2.12"
          stroke="#2F80ED" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Sustainability Goals',
    desc: 'Environmental responsibility embedded into every solution through intelligent energy management.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"
          stroke="#2F80ED" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Innovation Commitment',
    desc: 'Continuous investment in emerging technologies to keep our clients at the forefront of smart building.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#2F80ED" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="9" cy="7" r="4" stroke="#2F80ED" strokeWidth="1.5"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
          stroke="#2F80ED" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Long-Term Partnerships',
    desc: 'Scalable solutions built to evolve alongside our clients — not one-time deployments but lasting relationships.',
  },
]

export default function Mission() {
  return (
    <section className="section-padding bg-navy relative overflow-hidden">
      {/* Background orbs */}
      <div
        className="orb w-96 h-96 bg-accent/[0.08] bottom-0 left-1/2 -translate-x-1/2 animate-float-slow"
        style={{ filter: 'blur(100px)' }}
      />
      <div
        className="orb w-64 h-64 bg-accent/[0.06] top-10 right-10 animate-float"
        style={{ filter: 'blur(80px)' }}
      />

      <div className="container-narrow relative z-10">

        {/* Section header */}
        <AnimateIn className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-accent text-xs font-semibold
                           tracking-widest uppercase mb-5">
            <span className="block w-5 h-0.5 bg-accent rounded-full" />
            Mission & Commitment
            <span className="block w-5 h-0.5 bg-accent rounded-full" />
          </span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white leading-[1.1]
                         tracking-tight mb-6">
            More Than Technical Implementation —{' '}
            <span className="text-accent">True Partnership</span>
          </h2>
          <p className="text-white/55 text-lg leading-relaxed">
            Our mission extends beyond deploying systems. We build enduring
            partnerships that support our clients' operational success,
            sustainability objectives, and long-term growth through continuous
            innovation and unwavering commitment to quality.
          </p>
        </AnimateIn>

        {/* 4-column commitment grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {commitments.map((c, idx) => (
            <AnimateIn key={c.title} delay={idx * 80}>
              <div
                className="text-center p-6 lg:p-7 rounded-2xl bg-white/[0.04] border border-white/[0.09]
                           hover:bg-white/[0.08] hover:border-accent/25
                           transition-all duration-300 group h-full"
              >
                {/* Larger gradient icon container */}
                <div className="w-14 h-14 mx-auto rounded-2xl
                                bg-gradient-to-br from-accent/20 to-accent/[0.06]
                                border border-accent/15
                                flex items-center justify-center mb-5
                                group-hover:from-accent/25 group-hover:to-accent/10
                                transition-colors duration-300">
                  {c.icon}
                </div>
                <div className="font-display text-white font-semibold text-sm mb-2.5">
                  {c.title}
                </div>
                <div className="text-white/40 text-xs leading-relaxed">{c.desc}</div>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* CTA bar with gradient background */}
        <AnimateIn>
          <div className="relative overflow-hidden p-8 lg:p-12 rounded-2xl text-center
                          border border-accent/20 bg-gradient-to-br
                          from-accent/[0.15] via-accent/[0.08] to-navy-light/30">
            {/* Subtle inner glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(47,128,237,0.12),transparent)] pointer-events-none" />

            <div className="relative z-10">
              <h3 className="font-display text-white font-bold text-xl lg:text-2xl mb-3 leading-tight">
                Abu Dhabi's Trusted Partner for Intelligent Buildings
              </h3>
              <p className="text-white/50 text-sm mb-7 max-w-xl mx-auto leading-relaxed">
                Through continuous innovation and steadfast dedication to quality, we remain
                the region's partner of choice for smart building solutions that deliver
                measurable, lasting results.
              </p>
              <a href="#contact" className="btn-primary">
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
