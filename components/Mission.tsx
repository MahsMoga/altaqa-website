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
        <path d="M5.64 5.64l2.12 2.12M16.24 16.24l2.12 2.12M5.64 18.36l2.12-2.12M16.24 7.76l2.12-2.12" stroke="#2F80ED" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Sustainability Goals',
    desc: 'Environmental responsibility embedded into every solution through intelligent energy management.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" stroke="#2F80ED" strokeWidth="1.5" strokeLinejoin="round"/>
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
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#2F80ED" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Long-Term Partnerships',
    desc: 'Scalable solutions built to evolve alongside our clients — not one-time deployments but lasting relationships.',
  },
]

export default function Mission() {
  return (
    <section className="section-padding bg-navy relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="orb w-80 h-80 bg-accent/10 bottom-0 left-1/2" style={{ filter: 'blur(100px)' }} />

      <div className="container-narrow relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-accent text-xs font-semibold tracking-widest uppercase mb-4">
            <span className="block w-6 h-0.5 bg-accent" />
            Mission & Commitment
            <span className="block w-6 h-0.5 bg-accent" />
          </span>
          <h2
            className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: 'var(--font-sora)' }}
          >
            More Than Technical Implementation —{' '}
            <span className="text-accent">True Partnership</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            Our mission extends beyond deploying systems. We build enduring
            partnerships that support our clients' operational success,
            sustainability objectives, and long-term growth through continuous
            innovation and unwavering commitment to quality.
          </p>
        </div>

        {/* 4-column commitment grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {commitments.map((c) => (
            <div
              key={c.title}
              className="text-center p-6 rounded-xl bg-white/5 border border-white/10
                         hover:bg-white/10 hover:border-accent/20 transition-all duration-200"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-accent/15 flex items-center justify-center mb-4">
                {c.icon}
              </div>
              <div
                className="text-white font-semibold text-sm mb-2"
                style={{ fontFamily: 'var(--font-sora)' }}
              >
                {c.title}
              </div>
              <div className="text-white/45 text-xs leading-relaxed">{c.desc}</div>
            </div>
          ))}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-16 p-8 rounded-2xl bg-accent/10 border border-accent/20 text-center">
          <h3
            className="text-white font-bold text-xl mb-3"
            style={{ fontFamily: 'var(--font-sora)' }}
          >
            Abu Dhabi's Trusted Partner for Intelligent Buildings
          </h3>
          <p className="text-white/55 text-sm mb-6 max-w-lg mx-auto">
            Through continuous innovation and steadfast dedication to quality, we remain
            the region's partner of choice for smart building solutions that deliver
            measurable, lasting results.
          </p>
          <a href="#contact" className="btn-primary">
            Transform Your Facility
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
